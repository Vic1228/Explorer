const data = {
    labels: [
        '領導力',
        '醫術',
        '方向感',
        '團結',
        '體力',
    ],
    datasets: [{
        label: '王曉明',
        data: [2, 3, 5, 6, 8],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)',
        pointRadius: 5
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
                caretSize: 6
            },
        },
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scale: {
            beginAtZero: true,
            min: 0,
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
                    color: 'black',
                    font: {
                        size: 25
                    }
                },
                grid: {
                    color: "#C2C2C2"
                },
                ticks: {
                    display: false
                }
            },
        }
    },

};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);


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