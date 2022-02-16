/*---------------------------------------------------------------*/
/*----------------------------- nav -----------------------------*/
/*---------------------------------------------------------------*/
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

//監聽滾動，header固定
// window.onscroll = function () {
//     if (window.scrollY > 400) {
//         document.querySelector('header').classList.add('active');
//     } else {
//         document.querySelector('header').classList.remove('active');
//     }
// }


//左側navbar滑出動畫
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
                $('#blur_all').css({'backdrop-filter':'none'});
                $('#blur_all').fadeOut(150);

            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 30 + 0.25}s`;
                $('#blur_all').css({'backdrop-filter':'blur(20px)'});
                $('#blur_all').fadeIn(150);
            }
        });



        console.log($);

        //Burger Animation
        burger.classList.toggle('toggle');
    });
}
navSlide();

/*---------------------------------------------------------------*/
/*----------------------------- nav -----------------------------*/
/*---------------------------------------------------------------*/