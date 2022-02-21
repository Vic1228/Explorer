// chartJS----------------
const data = {
labels: ["領導力", "醫術", "方向感", "團結", "體力", "求生力"],
    datasets: [
        {
            label: "王曉明",
            data: [6, 6, 7, 8, 5, 10],
            fill: true,
            backgroundColor: "rgb(100, 99, 132, 0.2)",
            borderColor: "rgb(100, 99, 132, 0.1)",
            pointBackgroundColor: "rgb(100, 99, 132, 0.5)",
            pointBorderColor: "rgb(100, 99, 132)",
            pointHoverBackgroundColor: "rgb(100, 99, 132)",
            pointHoverBorderColor: "rgb(100, 99, 132)",
            pointRadius: 3,
        },
    ],
};
const config = {
    type: "radar",
    data: data,
    options: {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                displayColors: false,
                caretSize: 10,
                backgroundColor: "rgb(100, 99, 132)",
            },
        },
        elements: {
            line: {
                borderWidth: 1,
            },
        },
        scale: {
            beginAtZero: true,
            min: 1,
            max: 10,
            ticks: {
                stepSize: 1,
                font: {
                    size: 0,
                },
            },
        },
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 14,
                    },
                },
                grid: {
                    // 框線顏色
                    color: "rgb(100, 99, 132, 0.4)",
                },
                ticks: {
                    display: false,
                },
            },
        },
    },
};
const myChart = new Chart(document.getElementById("myChart"), config);


// 上傳檔案-------------

const inputelement = document.getElementById("upload");
// console.log(inputelement)

const reader = new FileReader()
inputelement.addEventListener('change', (a) => {

    // 獲取FileList陣列
    const files = a.target.files[0];
    const size = files.size;
    reader.readAsDataURL(files)

    const img = document.getElementById('imagegrid');
    reader.addEventListener('load', (a) => {
        // 檢視檔案大小並顯示
        if (size < 1024 * 1024) {
            img.src = a.target.result;
            img.alt = files.name;
            $("#imagegrid").show();
            alert('success');
        } else {
            $("#imagegrid").hide();
            alert('too big');
        }
    });
})

// ----------------------按鈕
$('#telbtn').click(function () {
    let val = document.getElementById('tel').value
    var result = document.getElementById('tel').hasAttribute('readonly');
    let a = document.getElementById("tel");
    a.focus()
    if (result == true) {
        $('#telbtn2').show()
        $('#telbtn').hide()
        $('#tel').val(val);
        $('#tel').prop('readonly', false);
    }
});
$('#namebtn').click(function () {
    let val = document.getElementById('name').value
    var result = document.getElementById('name').hasAttribute('readonly');
    let a = document.getElementById("name");
    a.focus()
    if (result == true) {
        $('#namebtn2').show()
        $('#namebtn').hide()
        $('#name').val(val);
        $('#name').prop('readonly', false);
    }
});
$('#mailbtn').click(function () {
    let val = document.getElementById('mail').value
    var result = document.getElementById('mail').hasAttribute('readonly');
    let a = document.getElementById("mail");
    a.focus()
    if (result == true) {
        $('#mailbtn2').show()
        $('#mailbtn').hide()
        $('#mail').val(val);
        $('#mail').prop('readonly', false);
    }
});
$('#textbtn').click(function () {
    let val = document.getElementById('text').value
    var result = document.getElementById('text').hasAttribute('readonly');
    let a = document.getElementById("text");
    a.focus()
    if (result == true) {
        $('#textbtn2').show()
        $('#textbtn').hide()
        $('#text').val(val);
        $('#text').prop('readonly', false);
    }
});