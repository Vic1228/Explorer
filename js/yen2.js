// chartJS----------------



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
        img.src = a.target.result;
        img.alt = files.name;
        $("#imagegrid").show();
    });
})




// ----------------------按鈕
// 照片按鈕
$('#photobtn').click(function () {
    $('#photobtn2').show()
    $('#photobtn').hide()
});

// 姓名按鈕
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
// 電話按鈕
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
// 信箱按鈕
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
// 經驗按鈕
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