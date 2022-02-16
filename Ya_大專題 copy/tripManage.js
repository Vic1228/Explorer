'use strict';

var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//左側navbar滑出動畫
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

{
    $('#uploadImg').on('change', function (e) {
        // console.log(this.value);
        if (e.target.files.length > 1) {
            console.log($('#uploadImg').val())

            $('#fileCount').css({
                'width': '100%'
            });

            $('#chatroomText').css(({
                'width': '0%',
            }));

            function showFileCount(){
                $('#fileCount span').text(`已選擇 ${e.target.files.length} 個檔案 `);
                $('#fileCount').css({'opacity':'1'})
                $('#chatroomText').css({'opacity':'0'})
                
            }

            setTimeout(showFileCount,50);
        } else {

            $('#fileCount').css({
                'width': '0%',
                'opacity':'0'
            });     
            function hideFileCount(){
                $('#fileCount span').text(``);
                $('#chatroomText').css({'opacity':'1','width':'100%'})
            }
            setTimeout(hideFileCount,50);
        }
    })

    $('#fileCountCancel').on('click',function(e){
        $('#uploadImg').val(null);

        $('#fileCount').css({
            'width': '0%',
            'opacity':'0'
        });      
        function hideFileCount(){
            $('#fileCount span').text(``);
            $('#chatroomText').css({'opacity':'1','width':'100%'})
        }
        setTimeout(hideFileCount,50);
    })
}
