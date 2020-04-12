let popup = document.querySelector('.popup');
popup.classList.add('popup_opened');

let openPopup = document.querySelector('.popup_opened');

let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function () {
  document.querySelector('.popup_opened').style.display = 'block';
});

let closePopup = document.querySelector('.popup__button_type_close');

closePopup.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});


let formElement = document.querySelector('.popup__container');// Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__imput_type_name')// Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector('.popup__imput_type_job')// Воспользуйтесь инструментом .querySelector()


   // nameInput.value = '';
   // jobInput.value = '';    
    // Получите значение полей из свойства value
    //let addName = document.querySelector('.profile__title');
    //let addJob = document.querySelector('.profile__subtitle');
    // Выберите элементы, куда должны быть вставлены значения полей
   // addName.textContent = nameInput;
   // addJob.textContent = jobInput;
    // Вставьте новые значения с помощью textContent
//}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//formElement.addEventListener('submit', formSubmitHandler);


//let addButton = document.querySelector('.popup__button_type_save');


//addButton.addEventListener('click', function () {
 // addPeople,
 // popup.classList.remove('popup_opened');
//});
