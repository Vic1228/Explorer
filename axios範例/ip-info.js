/*
 * TODO: 串接ipinfo.io服務取得使用者的IP資訊，並顯示結果於網頁上
 * https://ipinfo.io/
 * 一個可回傳用戶端IP資訊的公開API服務
 */

const getIPBtn = document.getElementById('getIPBtn'),
    reportDiv = document.getElementById('reportDiv'),
    // token 
    IPInfoToken = "0ced483b6f46fd",
    // https://ipinfo.io/?token=0ced483b6f46fd%22
    url = `https://ipinfo.io?token=${IPInfoToken}`;


getIPBtn.addEventListener('click', function () {
    console.log('[按鈕被點擊了]');
    // 使用IPInfo API取得使用者網路資訊
    // IPInfo API使用規則
    // https://ipinfo.io/developers#jsonpcors-requests

    // TODO:
    // 200成功 
    // 4xx前端錯誤(404寫錯網址 401權限不足) 
    // 5xx後端錯誤(500邏輯錯誤 503伺服器滿載)
    axios
        // 對url發送請求
        .get(url)
        // 成功取得回應
        .then(res => {
            // console.log("success");
            // console.log(res);

            // url回應的物件裡面的data物件存進變數data
            const data = res.data
            // HTML碼(含IP物件的) 存到變數report
            const report = `<div class="alert alert-success">
            IP:${data}.ip}<br>
            Country:${res.data.country}<br>
            City:${data.city}<br>
            Org:${data.org}<br>
            Timezone:${data.timezone}
            </div>`;
            // #reportDiv的innerHTML(渲染) = report變數;
            reportDiv.innerHTML = report;
        })
        // 錯誤
        .catch(function (err) {
            console.log("error");
            console.log(err);
        })
});

// document.addEventListener("click", function () {
//     axios
//         .get(url)
//         .then(res => {
//             const data = res.data;
//             console.log(data);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })

// 陣列
const array = ["a", "b", "c", "d", "e"]

const object = {
    a: 1,
    b: 2,
    c: 3,
    d: 4
}
// for 索引
for (var i = 0; i < array.length; i++) {
    console.log(i);
}

// for in 索引 *arr/obj*
for (const key in array) {
    console.log(key);
}

// foeach 值
array.forEach(element => {
    console.log(element);
});

// for of 值
for (const arr of array) {
    console.log(arr);
}


