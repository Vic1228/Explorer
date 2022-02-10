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
        data: [65, 59, 100, 81, 56],
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
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 100,
                stepSize: 10,
                font: {
                    size: 15
                }
            },


        },
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 25
                    }
                }
            }
        }
    },

};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);