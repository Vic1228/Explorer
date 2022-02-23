$(function () {
    'use strict';

    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);

    /*---------------------------------------------------------------*/
    /*-------------------------- 左側navbar -------------------------*/
    /*---------------------------------------------------------------*/
    {
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
                        $('#blur_all').css({ 'backdrop-filter': 'none' });
                        $('#blur_all').fadeOut(150);
                    }
                    else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 30 + 0.25}s`;
                        $('#blur_all').css({ 'backdrop-filter': 'blur(20px)' });
                        $('#blur_all').fadeIn(150);
                    }
                });

                //Burger Animation
                burger.classList.toggle('toggle');
            });
        }
        navSlide();
    }

    /*---------------------------------------------------------------*/
    /*----------------------------- 聊天室 ---------------------------*/
    /*---------------------------------------------------------------*/
    {
        $('#uploadImg').on('change', function (e) {
            // console.log(this.value);
            if (e.target.files.length > 0) {
                console.log($('#uploadImg').val())

                $('#fileCount').css({
                    'width': '100%'
                });

                $('#chatroomText').css(({
                    'width': '0%',
                }));

                function showFileCount() {
                    $('#fileCount span').text(`已選擇 ${e.target.files.length} 個檔案 `);
                    $('#fileCount').css({ 'opacity': '1' })
                    $('#chatroomText').css({ 'opacity': '0' })

                }

                setTimeout(showFileCount, 50);
            } else {

                $('#fileCount').css({
                    'width': '0%',
                    'opacity': '0'
                });
                function hideFileCount() {
                    $('#fileCount span').text(``);
                    $('#chatroomText').css({ 'opacity': '1', 'width': '100%' })
                }
                setTimeout(hideFileCount, 50);
            }
        })

        $('#fileCountCancel').on('click', function (e) {
            $('#uploadImg').val(null);

            $('#fileCount').css({
                'width': '0%',
                'opacity': '0'
            });
            function hideFileCount() {
                $('#fileCount span').text(``);
                $('#chatroomText').css({ 'opacity': '1', 'width': '100%' })
            }
            setTimeout(hideFileCount, 250);
        })
    }




    /*---------------------------------------------------------------*/
    /*---------------------------- popover --------------------------*/
    /*---------------------------------------------------------------*/
    {
        $('.itemPopover').popover({
            trigger: 'hover',
            html: true,
            content: function () {
                var userName = $(this.closest('tr')).children('td:first-child').text();
                console.log(userName);
                return `<h1>${userName}</h1>`;
            }
        });








        

    }
})

/*---------------------------------------------------------------*/
/*----------------------------- chart ---------------------------*/
/*---------------------------------------------------------------*/

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
            legend: { display: false },
            tooltip: {
                displayColors: false,
                caretSize: 10,
                backgroundColor: "rgb(100, 99, 132)",
            }
        },
        elements: {
            line: { borderWidth: 1 }
        },
        scale: {
            beginAtZero: true,
            min: 1,
            max: 10,
            ticks: {
                stepSize: 1,
                font: { size: 0 },
            }
        },
        scales: {
            r: {
                pointLabels: { font: { size: 14 } },
                grid: { color: "rgb(100, 99, 132, 0.4)" }, // 框線顏色
                ticks: { display: false }
            }
        }
    }
}
new Chart(document.getElementById('myChart'), config);

function hoverdiv(e,showStat){
    var left  = e.clientX + 3 + "px";
    var top  = e.clientY - 150+ "px";

    var div = document.getElementById('showStat');

    div.style.left = left;
    div.style.top = top;

    $("#"+showStat).toggle();
    return false;
}
