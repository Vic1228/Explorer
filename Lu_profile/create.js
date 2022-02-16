/*---------------------------------------------------------------*/
/*----------------------------- nav -----------------------------*/
/*---------------------------------------------------------------*/
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//左側navbar滑出動畫
var navSlide = () => {
    var burger = document.querySelector('.nav_burger');
    var nav = document.querySelector('.nav_links_container');
    var navlinks = document.querySelectorAll('.nav_links li');

    burger.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav_active');

        //Animate Links
        navlinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
                $('#blur_all').css({'backdrop-filter':'none'});
                $('#blur_all').fadeOut(150);

            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 30 + 0.25}s`;
                $('#blur_all').css({'backdrop-filter':'blur(20px)'});
                $('#blur_all').fadeIn(150);
            }
        });



        console.log($);

        //Burger Animation
        burger.classList.toggle('toggle');
    });
}
navSlide();

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
        // 3 => nextBtn 內容由"下一步"換成"提交"
        document.getElementById("nextBtn").innerHTML = "提交";
    } else {
        document.getElementById("nextBtn").innerHTML = "下一步";
    }
}

function nextPrev(turn) {
    const tabArray = document.getElementsByClassName("tab");
    
    tabArray[currentTab].style.display = "none";
    currentTab += turn;

    showTab(currentTab);
}

function validForm() {
    let valid = true;
    const tabArray = document.getElementsByClassName("tab");
    const inputArray = tabArray[currentTab].getElementsByClassName("input")
    
    for (let i = 0; i < inputArray.length; i++){
        if (inputArray[i].value == "") {
            inputArray[i].className += "invalid";
            valid = false;
        }
    }
    return valid;
}



/*---------------------------------------------------------------*/
/*--------------------------- form-step -------------------------*/
/*---------------------------------------------------------------*/