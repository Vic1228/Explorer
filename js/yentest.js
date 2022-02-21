
// $('#telbtn').click(function () {
//   let a = document.getElementById('telimg')
//   let b = document.getElementById('telbtn')
//   let c = a.getAttribute('src')
//   let d = b.getAttribute('action')

//   console.log(c);
//   console.log(d);
//   if(c==='/img/edit.png'){
//     d+=''
//     console.log(d);
//   }else{
//     d+='/rephone'
//     console.log(d);
//   }


//   let val = document.getElementById('tel').value
//   var result = document.getElementById('tel').hasAttribute('readonly');
//   if(result==false){
//     $('#tel').prop('readonly',true);
//     $('#tel').val(val);
//     $("#telspan").text('edit');
//     $('#telimg').prop('src','/img/edit.png');
//   }else{
//     $('#tel').prop('readonly',false);
//     $("#telspan").text("save");
//     $('#telimg').prop('src','/img/save.png');
//   }
// });

// 新思路
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
// $('#telbtn2').click(function () {
//   let val = document.getElementById('tel').value
//   var result = document.getElementById('tel').hasAttribute('readonly');
//   if(result==true){
//     $('#tel').val(val);
//   }
// });

