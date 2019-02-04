document.addEventListener('DOMContentLoaded', function(){
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
    const wrongDate = document.getElementsByClassName('wrong-date');
    const formInput = document.getElementsByClassName('registration-form__container-item');
    const btn = document.getElementsByClassName('registration-form__container__btn')[0];
    const warningTextTopic = document.getElementsByClassName('wrong-form-topic')[0];
    const warningText = document.getElementsByClassName('wrong-form')[0];
    
    const re = /[А-Яа-яЁё]/g;
    // check date
    let = checkDateIntut = (date) =>{
        let today = new Date().getTime();
        console.log(date);
        if(!date){
            wrong[2].classList.add('visible');
            formDate.classList.add('wrong-input');
            return false;
        }else if(date.split('.')[1] > 12){
            formDate.classList.add('wrong-input');
            return false;
        }else{
            date = date.split('.');
            wrong[2].classList.remove('visible');
            formDate.classList.remove('wrong-input');
            [date[0], date[1], date[2]] = [date[2], date[1], date[0]];
            let clientsDate = new Date(...date).getTime();
            if(clientsDate >= today){
                wrongDate[0].classList.add('visible');
                formDate.classList.add('wrong-input');  
                return false;
            }
            else{
                // check 16 age
                dateWorkAge = date;
                dateWorkAge[0] = +dateWorkAge[0]+16;
                dateWorkAge = new Date(...dateWorkAge).getTime();            
                if(dateWorkAge > today){
                    wrongDate[1].classList.add('visible');
                    formDate.classList.add('wrong-input');  
                    return false;
                }else{
                    wrongDate[0].classList.remove('visible');
                    wrongDate[1].classList.remove('visible');
                    formDate.classList.remove('wrong-input');
                    return true;
                }
            }
        }
    }
    formDate.addEventListener('keyup', ()=>{
        let actualDate = formDate.value.split('.');
        if(actualDate.length){
            checkDateIntut(formDate.value);
        }})
    // form1 checked
    let checkForm = (e) => {
        let text = '';
        if(e.target === formName || e.target === formSurname || e.target === formPatronymic){
            let index = 0;
            // determine which input has been changed and create this index;
            if(e.target === formName){
                index = 0;
            }else if(e.target === formSurname){
                index = 1;
            }else if(e.target === formPatronymic){
                index = 2;
            }
            // if language wrong all input
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
            // if language wrong part of input
            }else if(e.target === formDate){
                console.log(0000);
                checkDateIntut(e.target.value);
            }else if(e.target.value.match(re)){
                if(e.target.value.length !== e.target.value.match(re).length){
                if(e.target !== formPatronymic){
                    wrong[index].classList.remove('visible');
                }
                formInput[index].classList.add('wrong-input');            
                wrongLength[index].classList.add('visible');
            // if input is correct 
            }else if(e.target.value.match(re) && e.target.value.length === e.target.value.match(re).length){
                if(e.target !== formPatronymic){
                    wrong[index].classList.remove('visible');
                }
                formInput[index].classList.remove('wrong-input');
                wrongLength[index].classList.remove('visible');
            }}
            
        }
        // check the form if all of inputs are filled right, the button will be active 
        if(formName.value.length && formSurname.value.length && agreementInput.checked &&
        formMaleInput[0].checked || formName.value.length && formSurname.value.length && agreementInput.checked && formMaleInput[1].checked){
            // check language && date
            if(formName.value.length === formName.value.match(re).length && 
            formSurname.value.length === formSurname.value.match(re).length && checkDateIntut(formDate.value)){
                // check language if patronymic is not empty
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
        // check form & add red color to input
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
        }
        if(!agreementInput.checked){
            agreementInput.classList.add('wrong-check');
        }
        checkDateIntut(formDate.value);
        // if button click, check that all input has filled or create warning text 
        let text = '';
        if(!formName.value.length || formName.value.length && !formName.value.match(re) || formName.value.length !== formName.value.match(re).length){
            text += ' Имя ';
        }
        if(!formSurname.value.length || formSurname.value.length && !formSurname.value.match(re) || formSurname.value.length !== formSurname.value.match(re).length){
            if(text.length) text += ',';
            text += ' Фамилия ';
        }
        if(!checkDateIntut(formDate.value)){
            if(text.length) text += ',';
            text += ' Дата рождения ';
        }
        if(!formMaleInput[0].checked && !formMaleInput[1].checked){
            if(text.length) text += ',';
            text += ' Пол ';
        }
        if(!agreementInput.checked){
            if(text.length) text += ',';
            text += ' Согласие на обработку данных';
        }
        if(text.length){
            warningTextTopic.classList.add('visible');
            warningText.classList.add('visible');
        }else{
            warningTextTopic.classList.remove('visible');
            warningText.classList.remove('visible');
        }
        warningText.innerText = text;
    })
    // check male input
    let formMaleCheck = () => {
        if(formMaleInput[0].checked || formMaleInput[1].checked){
            formMaleInput[0].classList.remove('wrong-check');
            formMaleInput[1].classList.remove('wrong-check');
        }
    }
    // create new style for car block or medical block if it was clicked
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
    formMale[0].addEventListener('click', formMaleCheck);
    formMale[1].addEventListener('click', formMaleCheck);

    agreement.addEventListener('click', (e)=>{
        if(agreementInput.checked){
            agreementInput.classList.remove('wrong-check');
        }else{
            agreementInput.classList.add('wrong-check');
        }
    })
    
// add mask to input on JQuery
    let date = $('#check4');    
    date.mask("99.99.9999");
});