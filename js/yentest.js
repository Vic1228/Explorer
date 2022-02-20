
$('#telbtn').click(function () {
  $('#tel').toggleClass('noborder');
  var result = document.getElementById('tel').hasAttribute('readonly');
  if(result==false){
    $('#tel').prop('readonly',true);
    $("#telbtn").text("edit");
  }else{
    $('#tel').prop('readonly',false);
    $("#telbtn").text("save");
  }
});

