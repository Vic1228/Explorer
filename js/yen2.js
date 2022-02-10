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