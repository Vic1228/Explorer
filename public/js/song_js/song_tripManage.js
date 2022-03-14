$(function () {
  'use strict';

  var script = document.createElement('script');
  script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);

  /*---------------------------------------------------------------*/
  /*----------------------------- 聊天室 ---------------------------*/
  /*---------------------------------------------------------------*/
  






  /*---------------------------------------------------------------*/
  /*---------------------------- popover --------------------------*/
  /*---------------------------------------------------------------*/
  {
    $('.itemPopover').popover({
      trigger: 'hover',
      html: true,
      content: function () {
        // var userName = $(this.closest('tr')).children('td:first-child').text();         
        var test = $(this).children('ul').html().trim();
        // console.log(test.length)
        if (test.length > 0) {
          return test;
        }
        else {
          return `<span>---</span>`;
        }

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


/*---------------------------------------------------------------*/
/*-------------------------- input num --------------------------*/
/*---------------------------------------------------------------*/
(function () {
  'use strict';
  function ctrls() {
    var _this = this;
    this.counter = 0;
    this.els = {
      decrement: document.querySelector('.ctrl__button--decrement'),
      counter: {
        container: document.querySelector('.ctrl__counter'),
        num: document.querySelector('.ctrl__counter-num'),
        input: document.querySelector('.ctrl__counter-input')
      },
      increment: document.querySelector('.ctrl__button--increment')
    };
    this.decrement = function () {
      var counter = _this.getCounter();
      var nextCounter = (_this.counter > 0) ? --counter : counter;
      _this.setCounter(nextCounter);
    };
    this.increment = function () {
      var counter = _this.getCounter();
      var nextCounter = (counter < 9999999999) ? ++counter : counter;
      _this.setCounter(nextCounter);
    };
    this.getCounter = function () {
      return _this.counter;
    };
    this.setCounter = function (nextCounter) {
      _this.counter = nextCounter;
    };
    this.debounce = function (callback) {
      setTimeout(callback, 100);
    };
    this.render = function (hideClassName, visibleClassName) {
      _this.els.counter.num.classList.add(hideClassName);
      setTimeout(function () {
        _this.els.counter.num.innerText = _this.getCounter();
        _this.els.counter.input.value = _this.getCounter();
        _this.els.counter.num.classList.add(visibleClassName);
      }, 100);
      setTimeout(function () {
        _this.els.counter.num.classList.remove(hideClassName);
        _this.els.counter.num.classList.remove(visibleClassName);
      }, 200);
    };
    this.ready = function () {
      _this.els.decrement.addEventListener('click', function () {
        _this.debounce(function () {
          _this.decrement();
          _this.render('is-decrement-hide', 'is-decrement-visible');
        });
      });
      _this.els.increment.addEventListener('click', function () {
        _this.debounce(function () {
          _this.increment();
          _this.render('is-increment-hide', 'is-increment-visible');
        });
      });
      _this.els.counter.input.addEventListener('input', function (e) {
        var parseValue = parseInt(e.target.value);
        if (!isNaN(parseValue) && parseValue >= 0) {
          _this.setCounter(parseValue);
          _this.render();
        }
      });
      _this.els.counter.input.addEventListener('focus', function (e) {
        _this.els.counter.container.classList.add('is-input');
      });
      _this.els.counter.input.addEventListener('blur', function (e) {
        _this.els.counter.container.classList.remove('is-input');
        _this.render();
      });
    };
  };
  // init
  var controls = new ctrls();
  document.addEventListener('DOMContentLoaded', controls.ready);
})();


// 裝備清單編輯
const itineraryRow = `<tr>
                <td class="form-td">
                    <select name="schedule" id="" class="border-0 text-center h-100 form-input w-100"
                      oninput="this.className = 'border-0 text-center h-100 form-input w-100'"
                      style="font-size: 1.4rem;">
                      <option value="" selected disabled>第__天</option>
                      <option value="1">第1天</option>
                      <option value="2">第2天</option>
                      <option value="3">第3天</option>
                      <option value="4">第4天</option>
                    </select>
                  </td>
                  <td class="form-td"><input name="schedule" type="time" id=""
                      class="text-center border-0 h-100 time-input form-input w-100"
                      oninput="this.className = 'text-center border-0 h-100 time-input form-input w-100'"
                      style="font-size: 1.4rem;">
                  </td>
                  <td class="form-td"><input name="schedule"
                      class="h-100 w-50 border-0 act-input text-center form-input" type="text"
                      oninput="this.className = 'h-100 w-50 border-0 act-input text-center form-input'"
                      placeholder="活動名稱"
                      style="margin-right: 1rem; font-size: 1.4rem; position: relative; left: 1.6rem;">
                    <p onclick="deleteItineraryRow(this)" class="btn-effect d-inline-block rounded-circle add-delete-btn table-btn"
                      style="margin-inline: 0.5rem; position: relative; left: 4rem; background-color: rgb(255, 80, 124);">
                      x</p>
                  </td>
              </tr>`;

const privateItem = `<tr>
                <td class="form-td"><input name="private" type="text" class="border-0 text-center h-100 form-input"
                    placeholder="裝備名稱" oninput="this.className = 'border-0 text-center h-100 form-input'" style="font-size: 1.4rem;">
                    <p onclick="deletePrivateItemRow(this)"
                    class="btn-effect d-inline-block rounded-circle add-delete-btn table-btn"
                    style="background-color: rgb(255, 80, 124); position: relative; left: 2.3rem;">
                    x</p>
                  </td>
              </tr>`;
const sharedItem = `<tr>
                <td class="form-td"><input name="shared" type="text" class="text-center border-0 h-100 form-input"
                    placeholder="裝備名稱" oninput="this.className = 'text-center border-0 h-100 form-input'" style="font-size: 1.4rem;">
                    <p onclick="deleteSharedItemRow(this)"
                    class="btn-effect d-inline-block rounded-circle add-delete-btn table-btn"
                    style="position: relative; left: 2.3rem; background-color: rgb(255, 80, 124);">
                    x</p>
                </td>
              </tr>`;



// 增加列
function addItineraryRow(p) {
  // $("#ItineraryTable>tbody").append(itineraryRow);
  $(p).closest("tr").before(itineraryRow);
}
function addPrivateItemRow(p) {
  $(p).closest("tr").before(privateItem);
}
function addSharedItemRow(p) {
  $(p).closest("tr").before(sharedItem);
}

// 刪除列
// <p onclick="deleteItineraryRow(this)" 
function deleteItineraryRow(p) {
  $(p).closest("tr").remove();
}
function deletePrivateItemRow(p) {
  $(p).closest("tr").remove();
}
function deleteSharedItemRow(p) {
  $(p).closest("tr").remove();
}
