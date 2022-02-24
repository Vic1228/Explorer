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

function hoverdiv(e, showStat) {
    var left = e.clientX + 3 + "px";
    var top = e.clientY - 150 + "px";

    var div = document.getElementById('showStat');

    div.style.left = left;
    div.style.top = top;

    $("#" + showStat).toggle();
    return false;
}


// 裝備清單編輯
{
    const itineraryRow = `<tr>
                <td class="form-td">
                  <select name="schedule" id="" class="border-0 text-center h-100 form-input w-100"
                    oninput="this.className = 'border-0 text-center h-100 form-input w-100'">
                    <option value="" selected disabled>第?天</option>
                    <option value="1">第1天</option>
                    <option value="2">第2天</option>
                    <option value="3">第3天</option>
                    <option value="4">第4天</option>
                  </select>
                </td>
                <td class="form-td"><input name="schedule" type="time" id=""
                    class="text-center border-0 h-100 time-input form-input w-100"
                    oninput="this.className = 'text-center border-0 h-100 time-input form-input w-100'">
                </td>
                <td class="form-td"><input name="schedule" class="h-100 w-75 border-0 act-input text-center form-input"
                    type="text" class="border-0"
                    oninput="this.className = 'h-100 w-75 border-0 act-input text-center form-input'" placeholder="活動名稱"
                    style="margin-right: 1rem;">
                  <p onclick="addItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                  <p onclick="deleteItineraryRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
                    x</p>
                </td>
              </tr>`;

    const privateItem = `<tr>
                <td class="form-td"><input name="private" type="text" class="text-center border-0 h-100 form-input"
                    placeholder="物品名稱" oninput="this.className = 'text-center border-0 h-100 form-input'"></td>
                <td class="form-td"><input name="private" type="number"
                    class="text-center border-0 w-25 h-100 form-input"
                    oninput="this.className = 'text-center border-0 w-25 h-100 form-input'" style="margin-right: 1rem;">
                  <p onclick="addPrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                  <p onclick="deletePrivateItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
                    x</p>
                </td>
              </tr>`;
    const sharedItem = `<tr>
                <td class="form-td"><input name="shared" type="text" class="text-center border-0 h-100 form-input"
                    placeholder="物品名稱" oninput="this.className = 'text-center border-0 h-100 form-input'"></td>
                <td class="form-td"><input name="shared" type="number" id=""
                    class="text-center border-0 h-100 form-input w-50"
                    oninput="this.className = 'text-center border-0 h-100 form-input w-50'" style="margin-right: 1rem;">
                  <p onclick="addSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn">
                    +</p>
                  <p onclick="deleteSharedItemRow(this)" class="d-inline-block rounded-circle add-delete-btn table-btn"
                    style="margin-inline: 1rem;">
                    x</p>
                </td>
              </tr>`;

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
}

