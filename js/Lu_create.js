/*---------------------------------------------------------------*/
/*----------------------------- date ---------------------------*/
/*---------------------------------------------------------------*/
// let startDate = document.getElementById("startDate").value;
// let endDate = document.getElementById("endDate").value;
// let dayCount = document.getElementById("dayCount").value;

// console.log(endDate);
// console.log(startDate);

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

// 畫面到頂端
$("html,body").scrollTop(0);
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
    // TODO: 執行步驟燈方法(目前步驟)
        // fixStepIndicator(nowPage);
}
// 換頁 0/1
function nextPrev(turn) {
    const tabArray = document.getElementsByClassName("tab");
    // TODO:沒輸入資訊無法下一頁
        if (turn == 1 && !validForm()) return false;
    // 當前步驟隱藏
    tabArray[currentTab].style.display = "none";
    // 目前頁面變數更新
    currentTab += turn;
    // 畫面到頂端
    $("html,body").scrollTop(0);
    // 執行目前步驟方法
    showTab(currentTab);
}

function validForm() {
    // 設定變數
    let valid = true;
    const tabArray = document.getElementsByClassName("tab");
    const inputArray = tabArray[currentTab].getElementsByClassName("form-input")
    
    // 檢查input是不是沒有東西
    for (let i = 0; i < inputArray.length; i++){
        if (inputArray[i].value == "" || inputArray[i].value == undefined) {
            // 增加 invalid的樣式
            inputArray[i].className += " invalid";
            valid = false;
        }
    }
    return valid;
}

function submitBtnClick() {
    let valid = true;
    const tabArray = document.getElementsByClassName("tab");
    const inputArray = tabArray[currentTab].getElementsByClassName("form-input")
    
    // 檢查input是不是沒有東西
    for (let i = 0; i < inputArray.length; i++){
        if (inputArray[i].value == "" || inputArray[i].value == undefined) {
            // 提醒東西沒有填
            inputArray[i].className += " invalid";
            valid = false;
        } else {
            // 
        }
    }
    // 
    console.log("123");
    document.createForm.submit();
    return valid;

}
/*---------------------------------------------------------------*/
/*------------------------- table-control -----------------------*/
/*---------------------------------------------------------------*/

// 變數

const itineraryRow = `<tr>
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
                <p onclick="addItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                +</p>
                <p onclick="deleteItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn delete123"
                   style="margin-inline: 1rem;">
                   x</p>
            </td>
          </tr>`;

const privateItem = `<tr>
                <td><input type="text" class="text-center border-0 h-100" placeholder="請輸入物品名稱"></td>
                <td class="w-25"><input type="number" class="text-center border-0 h-100 w-75" placeholder="請輸入數量">
                </td>
                <td>
                  <input type="text" class="text-center border-0 h-100" placeholder="備註">
                  <p onclick="addPrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                  +</p>
                  <p onclick="deletePrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn" style="margin-inline: 1rem;">
                    x</p>
                </td>
              </tr>`
const sharedItem = `<tr>
                <td><input type="text" class="text-center border-0 h-100" placeholder="請輸入物品名稱"></td>
                <td><input type="number" name="" id="" class="text-center border-0 h-100 w-50" placeholder="請輸入數量">
                <p onclick="addSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                +</p>
                <p onclick="deleteSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn" style="margin-inline: 1rem;">
                  x</p>
                </td>
              </tr>`

// 方法

// 增加列
function addItineraryRow(p) {
    // $("#ItineraryTable>tbody").append(itineraryRow);
    $(p).closest("tr").after(itineraryRow);
}
function addPrivateItemRow(p) {
    $(p).closest("tr").after(privateItem);
}
function addSharedItemRow(p) {
    $(p).closest("tr").after(sharedItem);
}

// 刪除列
// <p onclick="deleteItineraryRow(this)" 第165行
function deleteItineraryRow(p) {
    $(p).closest("tr").remove();
}
function deletePrivateItemRow(p) {
    $(p).closest("tr").remove();
}
function deleteSharedItemRow(p) {
    $(p).closest("tr").remove();
}
