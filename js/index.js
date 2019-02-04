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
        if(!date.value){
            wrongDate[0].classList.remove('visible');
            wrongDate[1].classList.remove('visible');
            wrong[2].classList.add('visible');
            formDate.classList.add('wrong-input');
            return false;        
        }else if(date.value.split('.')[1] > 12){
            wrongDate[0].classList.remove('visible');
            wrongDate[1].classList.remove('visible');
            wrong[2].classList.remove('visible');
            formDate.classList.add('wrong-input');
            return false;
        }
        date = date.value.split('.');
        wrong[2].classList.remove('visible');
        formDate.classList.remove('wrong-input');
        [date[0], date[1], date[2]] = [date[2], date[1], date[0]];
        let clientsDate = new Date(...date).getTime();
        if(clientsDate >= today){
            wrongDate[1].classList.remove('visible');
            wrongDate[0].classList.add('visible');
            formDate.classList.add('wrong-input');  
            return false;
        }else{
            // check 16 age
            dateWorkAge = date;
            dateWorkAge[0] = +dateWorkAge[0]+16;
            dateWorkAge = new Date(...dateWorkAge).getTime();            
            if(dateWorkAge > today){
                wrongDate[0].classList.remove('visible');
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
    formDate.addEventListener('keyup', ()=>{
        checkDateIntut(formDate);
    })
    formDate.addEventListener('focusout', ()=>{
        checkDateIntut(formDate);
    })

    // check name, surname, patronymic
    let checkName = (date) => {
        let index = 0;
        // determine which input has been changed and create this index;
        if(date === formName){
            index = 0;
        }else if(date === formSurname){
            index = 1;
        }else if(date === formPatronymic){
            index = 2;
        }
        // if language wrong all input
        if(!date.value.match(re) && date.value){  
            console.log(formInput[index]); 
            wrong[index].classList.remove('visible');
            console.log(formInput[index]);
            formInput[index].classList.add('wrong-input');
            wrongLength[index].classList.add('visible');
            return false;
        // if input is empty
        }else if(!date.value){
            wrongLength[index].classList.remove('visible');
            if(date !== formPatronymic){
                formInput[index].classList.add('wrong-input');
                wrong[index].classList.add('visible');
                return false;
            }else{
                formInput[index].classList.remove('wrong-input');
                return true;
            }
        // if language wrong part of input
        }else if(date.value.match(re)){
            if(date.value.length !== date.value.match(re).length){
                if(date !== formPatronymic){
                    wrong[index].classList.remove('visible');
                }
            formInput[index].classList.add('wrong-input');            
            wrongLength[index].classList.add('visible');
            return false;
        // if input is correct 
        }else if(date.value.match(re) && date.value.length === date.value.match(re).length){
            if(date !== formPatronymic){
                wrong[index].classList.remove('visible');
            }
            formInput[index].classList.remove('wrong-input');
            wrongLength[index].classList.remove('visible');
            return true;
        }}
        
    }
    // form1 checked
    let checkForm = (e) => {
        let text = '';
        if(e.target === formName || e.target === formSurname || e.target === formPatronymic){           
            checkName(e.target);
        }
        if(e.target === formDate){
            checkDateIntut(e.target);
        }
        // check the form if all of inputs are filled right, the button will be active 
        if(agreementInput.checked && formMaleInput[0].checked || agreementInput.checked && formMaleInput[1].checked){
            // check language && date
            if(checkName(formName) && checkName(formSurname) && checkName(formPatronymic) && checkDateIntut(formDate)){
                // check language if patronymic is not empty
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
        checkName(formName);
        checkName(formSurname);
        checkName(formPatronymic);
        if(!formMaleInput[0].checked && !formMaleInput[1].checked){
            formMaleInput[0].classList.add('wrong-check');
            formMaleInput[1].classList.add('wrong-check');
        }
        if(!agreementInput.checked){
            agreementInput.classList.add('wrong-check');
        }
        checkDateIntut(formDate);
        // if button click, check that all input has filled or create warning text 
        let text = '';
        if(!checkName(formName)){
            text += ' Имя ';
        }
        if(!checkName(formSurname)){
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