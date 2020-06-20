import './../pages/index.css';
import Card from './../js/components/Card.js';
import FormValidator from './../js/components/FormValidator.js';
import Section from './../js/components/Section.js';
import PopupWithImage from './../js/components/PopupWithImage.js';
import PopupWithForm from './../js/components/PopupWithForm.js';
import UserInfo from './../js/components/UserInfo.js';
import {
  editButton,
  addButton,
  popupBig,
  cardList,
  nameInput,
  jobInput,
  cardTemplate,
  initialCards,
  popupProfile,
  popupCards,
  profileTitle,
  profileSubtitle,
  profileAlt
} from './../js/utils/constants.js';

function cleanError(form) { // функция обнуления ошибок
  const buttonSave = form.querySelector('.popup__button-save');
  form.querySelectorAll(".popup__span-error").forEach((span) => {
    span.classList.remove("popup__span-error_type_active"); //удаляем со спан модификатор с ошибкой
    span.textContent = "";
  });

  form.querySelectorAll(".popup__input").forEach((input) => {
    if (!input.value) {//если в инпут нет значений
      buttonSave.classList.add('popup__button-save_type_disabled');//добавляем класс деактивирующий кнопку
      buttonSave.setAttribute('disabled', 'true');
    } else {
      buttonSave.classList.remove('popup__button-save_type_disabled');//удаляет класс деактивирующий кнопку
      buttonSave.removeAttribute('disabled');
    }
    input.classList.remove("popup__input_type_error"); //удаляем с инпут модификатор с ошибкой
  });
}

const popupWithImage = new PopupWithImage(popupBig); //передаем селектор по id попапа с большой картинкой

const defaultCardList = new Section({ //добавление картинок из массива
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    }, cardTemplate); // передаём селектор темплейта при создании
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardList);

const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    }, cardTemplate); // передаём селектор темплейта при создании
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, popupCards);

const openCardForm = () => {
  cardForm.open();
  cleanError(popupCards);
};

const userInfo = new UserInfo({//изменение информации о пользователе 
  userName: profileTitle,
  userInfo: profileSubtitle,
  userImg: profileAlt
});

const profileForm = new PopupWithForm({
  formSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, popupProfile);

const openProfileForm = () => {
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  jobInput.value = infoAuthor.info;
  profileForm.open();
  cleanError(popupProfile);
};

function formValidation() { // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(".popup__container")); // сделаем из них массив методом Array.from
  formList.forEach((form) => { //  Переберём полученную коллекцию
    const validator = new FormValidator({ // создаем экземпляр клааса с валидацией
      inputSelector: ".popup__input", //инпуты
      submitButtonSelector: ".popup__button-save", //кнопка сохранить/создать
      inactiveButtonClass: "popup__button-save_type_disabled", //неактивная кнопка
      inputErrorClass: "popup__input_type_error", //ошибка в инпуте
      errorClass: "popup__span-error_type_active",
    }, form);
    validator.enableValidation();
  });
}

addButton.addEventListener("click", openCardForm); //слушатель кнопки открытия попап картинки
editButton.addEventListener("click", openProfileForm); //слушатель кнопки открытия попап профиль
defaultCardList.renderItems(initialCards);
formValidation();
