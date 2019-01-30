const allItemForm = document.getElementsByClassName('registration-form__container__input');
const form = document.getElementsByClassName('registration-form__container')[0];
const formName = allItemForm[0];
const formSurname = allItemForm[1];
const formPatronymic = allItemForm[2];
const formDate = allItemForm[3];
const formMale = document.getElementsByClassName('registration-form__container__label-item');
const formMaleInput = document.getElementsByClassName('registration-form__container__checkmark');
const formMoreDetailes = document.getElementsByClassName('registration-form__container-more-details__item');
let medicalBook = false;
let car = false;
const agreement = document.getElementsByClassName('registration-form__container-agreement__label')[0];
const agreementInput = document.getElementsByClassName('registration-form__container-agreement__input')[0];
const wrongLength = document.getElementsByClassName('wrong-leng');
const wrong = document.getElementsByClassName('wrong');
const formInput = document.getElementsByClassName('registration-form__container-item');
const btn = document.getElementsByClassName('registration-form__container__btn')[0];
// btn.disabled = true;

// form1 checked
let checkForm = (e) => {
    let text = '';
    let re = /[А-Яа-яЁё]/g;
    if(e.target === formName || e.target === formSurname || e.target === formPatronymic){
        let index = 0;
        // determine which input has been changed
        if(e.target === formName){
            index = 0;
        }else if(e.target === formSurname){
            index = 1;
        }else if(e.target === formPatronymic){
            index = 2;
        }
        // if language error all input
        if(!e.target.value.match(re) && e.target.value){
            if(e.target !== formPatronymic){
                wrong[index].classList.remove('visible');
            }
            formInput[index].classList.add('wrong-input');
            wrongLength[index].classList.add('visible');
        // if input is empty
        }else if(!e.target.value && e.type !== 'click'){
            wrongLength[index].classList.remove('visible');
            if(e.target !== formPatronymic){
                wrong[index].classList.add('visible');
            }else{
                formInput[index].classList.remove('wrong-input');
            }
        // if language error part of input
        }else if(e.target.value.match(re)){
                if(e.target.value.length !== e.target.value.match(re).length){
            if(e.target !== formPatronymic){
                wrong[index].classList.remove('visible');
            }
            formInput[index].classList.add('wrong-input');            
            wrongLength[index].classList.add('visible');
        // if input is correct 
        }}else if(e.target.value.match(re) && e.target.value.length === e.target.value.match(re).length){
            if(e.target !== formPatronymic){
                wrong[index].classList.remove('visible');
            }
            formInput[index].classList.remove('wrong-input');
            wrongLength[index].classList.remove('visible');
        }
    }
    // check the form if all of inputs are filled right, the button is active 
    if(formName.value.length && formSurname.value.length && agreementInput.checked &&
       formMaleInput[0].checked || formName.value.length && formSurname.value.length && agreementInput.checked && formMaleInput[1].checked){
        if(formName.value.length === formName.value.match(re).length && 
        formSurname.value.length === formSurname.value.match(re).length){
            if(formPatronymic.value.length){
                if(formPatronymic.value.match(re)){
                    if(formPatronymic.value.length === formPatronymic.value.match(re).length){
                        btn.classList.remove('disabled');
                    } 
                }
            }
        btn.classList.remove('disabled');
        }else{
            btn.classList.add('disabled');
        }
    }else{
        btn.classList.add('disabled');
    }
}

btn.addEventListener('click', (e)=>{
    e.preventDefault();
    if(!formName.value.length){
        formInput[0].classList.add('wrong-input');
        wrong[0].classList.add('visible');
    }
    if(!formSurname.value.length){
        formInput[1].classList.add('wrong-input');
        wrong[1].classList.add('visible');
    }
    if(!formMaleInput[0].checked && !formMaleInput[1].checked){
        formMaleInput[0].classList.add('wrong-check');
        formMaleInput[1].classList.add('wrong-check');
        console.log(formMaleInput);
    }
    if(!agreementInput.checked){
        agreementInput.classList.add('wrong-check');
    }
})
let formMaleCheck = () => {
    if(formMaleInput[0].checked || formMaleInput[1].checked){
        formMaleInput[0].classList.remove('wrong-check');
        formMaleInput[1].classList.remove('wrong-check');
    }
}
formMale[0].addEventListener('click', formMaleCheck);
formMale[1].addEventListener('click', formMaleCheck);
agreement.addEventListener('click', (e)=>{
    if(agreementInput.checked){
        agreementInput.classList.remove('wrong-check');
    }else{
        agreementInput.classList.add('wrong-check');
    }
})
function chooseDetailes(){
    if(this == formMoreDetailes[0]){
        medicalBook = !medicalBook;
        if(medicalBook){
            this.classList.add('details-active');
        }else{
            this.classList.remove('details-active');
        }
    }else{
        car = !car;
        if(car){
            this.classList.add('details-active');
        }else{
            this.classList.remove('details-active');
        }
    }
}
formMoreDetailes[0].addEventListener('click', chooseDetailes);
formMoreDetailes[1].addEventListener('click', chooseDetailes);

form.addEventListener('keyup', checkForm);
form.addEventListener('focusout', checkForm);
form.addEventListener('click', checkForm);
