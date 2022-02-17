var currentTab = 0; // 目前步驟
      showTab(currentTab); // 顯示步驟(目前步驟)

      // 此方法會顯示特定的步驟
      function showTab(nowPage) {
        // 抓到所有的div.tab存入一個陣列
        var tabArray = document.getElementsByClassName("tab");
        // 陣列[目前步驟]display: block;
        tabArray[nowPage].style.display = "block";
        if (nowPage == 0) {
          document.getElementById("prevBtn").style.display = "none";
        } else {
          document.getElementById("prevBtn").style.display = "inline";
        }
        // 最後一頁按鈕會變成送出
        if (nowPage == tabArray.length - 1) {
          document.getElementById("nextBtn").innerHTML = "Submit";
        } else {
          document.getElementById("nextBtn").innerHTML = "Next";
        }
        // TODO: 執行步驟燈方法(目前步驟)
        fixStepIndicator(nowPage);
      }

      //   上一頁 下一頁 方法 turn 1/-1
      function nextPrev(turn) {
        // 抓到所有的div.tab存入一個陣列
        var tabArray = document.getElementsByClassName("tab");
        // TODO:沒輸入資訊無法下一頁
        if (turn == 1 && !validateForm()) return false;
        // 隱藏填寫完成的表單
        tabArray[currentTab].style.display = "none";
        // 步驟 +1 -1
        currentTab = currentTab + turn;
        // 第四步驟
        if (currentTab >= tabArray.length) {
          // 提交
          document.getElementById("regForm").submit();
        }
        // 顯示正確的步驟
        showTab(currentTab);
      }

      // 有效問卷 方法
      function validateForm() {
        var valid = true;
        var tabArray = document.getElementsByClassName("tab");
        var inputArray = tabArray[currentTab].getElementsByTagName("form-input");

        // 遍歷每個空格
        for (i = 0; i < inputArray.length; i++) {
          // 如果空格是空的
          if (inputArray[i].value == "") {
            // 如果空格是空的 加入.invalid樣式
            inputArray[i].className += " invalid";
            // 如果空格是空的 狀態是無效的
            valid = false;
          }
        }

        // 能進到下一頁
        return valid;
      }

      function fixStepIndicator(n) {
        // This function removes the "active" class of all steps...
        var i,
          x = document.getElementsByClassName("step");
        for (i = 0; i < x.length; i++) {
          x[i].className = x[i].className.replace(" active", "");
        }
        //... and adds the "active" class on the current step:
        x[n].className += " active";
      }