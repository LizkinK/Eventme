const workForm = document.getElementsByClassName('registration-next-form__container')[0];
const workFormItem = document.getElementsByClassName('registration-next-form__item');
const workFormInput = document.getElementsByClassName('registration-next-form__item-check');
const workRange = document.getElementsByClassName('registration-next-form__container__range')[0];
const workRangeAnswer = document.getElementsByClassName('registration-next-form__container__range-answer')[0];
const rangeProgress = document.getElementsByClassName('progess')[0];

let openWorkForm = (e) => {
    if(workFormInput[0].checked){
        workFormItem[0].classList.add('active-work');
    }else{
        workFormItem[0].classList.remove('active-work');
    }
    if(workFormInput[1].checked){
        workFormItem[1].classList.add('active-work');
    }else{
        workFormItem[1].classList.remove('active-work');
    }
    if(workFormInput[2].checked){
        workFormItem[2].classList.add('active-work');
    }else{
        workFormItem[2].classList.remove('active-work');
    }
}

let changeRange =()=>{
    workRangeAnswer.innerText = `от ${workRange.value} 000 рублей`;
    rangeProgress.style.width = `${workRange.value/60*100}%`
}

workRange.addEventListener('input', changeRange)
workForm.addEventListener('click', openWorkForm, false);