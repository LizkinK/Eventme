document.addEventListener("DOMContentLoaded", function(event) { 
const updateBlock = document.getElementsByClassName('profile__container__photo_upload')[0];
const photo = document.getElementsByClassName('profile__container__photo-item')[0];

let visibleBlock=(e)=> {
    updateBlock.classList.remove('invisible');
    updateBlock.style.height = '25%';
    console.log(e.type);
}
let invisibleBlock =(e)=>{
    updateBlock.style.height = '0';
    updateBlock.classList.add('invisible');
    console.log(e.type);
}
photo.addEventListener('mouseover', visibleBlock);
photo.addEventListener('mouseout', invisibleBlock);
});