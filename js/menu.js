document.addEventListener("DOMContentLoaded", function(event) {
const menu = document.getElementsByClassName('search-job__header__menu')[0];
const mobileMenu = document.getElementsByClassName('header_mobile_toggle_menu_new')[0];
const body = document.getElementsByTagName('body')[0];
let openMenu =()=>{
    if(body.classList.contains('fixed')){
        body.classList.remove('fixed');
        mobileMenu.classList.remove('visible');
    }else{
        body.classList.add('fixed');            
        mobileMenu.classList.add('visible');
    }
}
menu.addEventListener('click', openMenu);
})