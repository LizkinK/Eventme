const form = document.getElementsByClassName('offer__container__form')[0];
const link = document.getElementsByClassName('offer__container__form__input')[0];
const wrong = document.getElementsByClassName('wrong')[0];
const hasLink = document.getElementsByClassName('offer__container__form__btn-link');
const description = document.getElementsByClassName('offer__container__form-description')[0];

let check = (e) =>{
    e.preventDefault();
    if(!link.value){
        wrong.classList.add('visible');
        link.classList.add('wrong-input');
    }else if(link.value){
        wrong.classList.remove('visible');
        link.classList.remove('wrong-input');
    }
}
let toggle = (e) => {
    if(e.target === hasLink[0]){
        hasLink[0].classList.add('unvisible');
        hasLink[1].classList.remove('unvisible');
        description.classList.remove('unvisible');
    }else if(e.target === hasLink[1]){
        hasLink[1].classList.add('unvisible');
        hasLink[0].classList.remove('unvisible');
        description.classList.add('unvisible');
    }
}

hasLink[0].addEventListener('click', toggle);
hasLink[1].addEventListener('click', toggle);
link.addEventListener('keyup', check);
form.addEventListener('submit', check);