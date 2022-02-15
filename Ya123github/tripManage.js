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
    var inputs = document.querySelectorAll('.uploadImg');
    inputs.forEach(function (input) {
        var label = input.nextElementSibling;

        input.addEventListener('change', function (e) {
            // console.log(e.target.files.length)
            var fileName = '';
            if (e.target.files.length > 1) {
                label.querySelector('span').innerText = `已選擇 ${e.target.files.length} 個檔案 `;
            } else {
                fileName = e.target.value.split('\\').pop();
                if (fileName) {
                    label.querySelector('span').innerText = `已選擇 1 個檔案`;
                } else {
                    label.querySelector('span').innerText = '上傳圖片'
                }
            }
        })
    })
}



