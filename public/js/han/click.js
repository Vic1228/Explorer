$("#button").click(function(){
    var check=$("#defaultCheck1[name='Checkbox[]']:checked").length;//判斷有多少個方框被勾選
    if(check==0){
        alert("您尚未勾選同意個人資料");
        return false;//不要提交表單
    }else{
        
        return true;//提交表單
    }
})