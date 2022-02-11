var linkbt = document.getElementById("opener");
var light = document.getElementById('light');
var closebt = document.getElementById("closebt");

$(".opener").click(function () {
    $(".light").show(200);
    // $("body").css({"filter": "blur(2px)"});
});
$("#closebt").click(function () {
    $(".light").hide(200);
});

