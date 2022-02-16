/*---------------------------------------------------------------*/
/*----------------------------- chart ---------------------------*/
/*---------------------------------------------------------------*/
const data = {
    labels: [
        '領導力',
        '醫術',
        '方向感',
        '團結',
        '體力',
        '求生力'
    ],
    datasets: [{
        label: '王曉明',
        data: [6,6,7,8,5,10],
        fill: true,
        backgroundColor: 'rgb(100, 99, 132, 0.2)',
        borderColor: 'rgb(100, 99, 132, 0.1)',
        pointBackgroundColor: 'rgb(100, 99, 132, 0.5)',
        pointBorderColor: 'rgb(100, 99, 132)',
        pointHoverBackgroundColor: 'rgb(100, 99, 132)',
        pointHoverBorderColor: 'rgb(100, 99, 132)',
        pointRadius: 3
    }]
};
const config = {
    type: 'radar',
    data: data,
    options: {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                displayColors: false,
                caretSize: 10,
                backgroundColor: 'rgb(100, 99, 132)'
            },
        },
        elements: {
            line: {
                borderWidth: 1
            }
        },
        scale: {
            beginAtZero: true,
                min: 1,
                max: 10,
            ticks: {
                stepSize: 1,
                font: {
                    size: 0
                }
            },
        },
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 14
                    }
                },
                grid: {
                    // 框線顏色
                    color: "rgb(100, 99, 132, 0.4)"
                },
                ticks: {
                    display: false
                }
            }
        }
    },
};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

/*---------------------------------------------------------------*/
/*--------------------------- form-step -------------------------*/
/*---------------------------------------------------------------*/

// 變數
let currentTab = 0;
showTab(currentTab);

// 方法
function showTab(nowPage) {
    // id是唯一的 classname可以重複 所以才能變成陣列
    const tabArray = document.getElementsByClassName("tab");
    // 陣列[目前步驟]display: block;
    tabArray[nowPage].style.display = "block";
    // 0 => prevBtn 不顯示  1,2,3 => 顯示
    if (nowPage == 0) {
          document.getElementById("prevBtn").style.display = "none";
    } else {
        // 1,2,3 => prevBtn 以inline顯示
        document.getElementById("prevBtn").style.display = "inline";
    }
    
    if (nowPage == tabArray.length - 1) {
        // 3 => nextBtn-none submitBtn-block
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").innerHTML = "提交";
        document.getElementById("submitBtn").style.display = "inline";
    } else {
        document.getElementById("submitBtn").style.display = "none";
        document.getElementById("nextBtn").innerHTML = "下一步";
        document.getElementById("nextBtn").style.display = "inline";
    }

    
}
// 換頁 0/1
function nextPrev(turn) {
    const tabArray = document.getElementsByClassName("tab");
    // 當前步驟消失
    tabArray[currentTab].style.display = "none";
    // 目前頁面變數更新
    currentTab += turn;
    // 執行目前步驟方法
    showTab(currentTab);
}

// function validForm() {
//     let valid = true;
//     const tabArray = document.getElementsByClassName("tab");
//     const inputArray = tabArray[currentTab].getElementsByClassName("input")
    
//     for (let i = 0; i < inputArray.length; i++){
//         if (inputArray[i].value == "") {
//             inputArray[i].className += "invalid";
//             valid = false;
//         }
//     }
//     return valid;
// }

function submitBtnClick() {
    document.createForm.submit();
}
/*---------------------------------------------------------------*/
/*------------------------- table-control -----------------------*/
/*---------------------------------------------------------------*/

// 變數

// 方法

function addTableRow() {
    const tableRow = `<tr>
                <td>
                  <select id="" name=”mySelect” class="border-0 text-center h-100">
                    <option value="" selected disabled>第?天</option>
                    <option value=”Taipei”>第1天</option>
                    <option value=”Taoyuan”>第2天</option>
                    <option value=”Hsinchu”>第3天</option>
                    <option value=”Miaoli”>第4天</option>
                  </select>
                </td>
                <td><input type="time" name="" id="" class="text-center border-0 h-100 time-input">
                </td>
                <td><input class="h-100 border-0 act-input text-center" type="text" class="border-0"
                    placeholder="請輸入活動名稱">
                  <p onclick="deleteTableRow()" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
                    x</p>
                  <p onclick="addTableRow()" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                </td>
              </tr>`;
    dispatchEvent.innerHTML(tableRow);
}
function deleteTableRow() {
    
}

