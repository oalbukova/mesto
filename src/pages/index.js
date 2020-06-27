import './index.css';
import custo from '../images/custo.jpg';
import logo from '../images/logo.svg';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';
import {
  editButton,
  addButton,
  popupBig,
  cardList,
  nameInput,
  jobInput,
  cardTemplate,
 // initialCards,
  popupProfile,
  popupCards,
  profileTitle,
  profileSubtitle,
  profileImg
} from '../js/utils/constants.js';
import { data } from 'autoprefixer';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '77aadbcb-6e04-47e7-b5a0-c659fba79fac',
    'Content-Type': 'application/json'
  }
});

api.getInfoUser()
.then(data => userInfo.setUserInfo(data))
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
});

const userInfo = new UserInfo({//изменение информации о пользователе 
  userName: profileTitle,
  userInfo: profileSubtitle,
  userImg: profileImg
});

api.getInitialCards().then((data) => {
const defaultCardList = new Section({ //добавление картинок из массива
  items: data,
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
defaultCardList.renderItems();
})



/*
const profileForm = new PopupWithForm ({
  formSubmit: () => {
    api.updateInfo(nameInput.value, jobInput.value)
    .then((result) => {
    userInfo.setUserInfo();
  })
  .catch((err) => {
    console.log(err);
  });
}
}, popupProfile);*/


const profileForm = new PopupWithForm({
  formSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, popupProfile);


const openProfileForm = () => {//прни открытии формы там стоят данные из 
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  jobInput.value = infoAuthor.about;
  profileForm.cleanError();
  profileForm.open();
};






/*
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
defaultCardList.renderItems(initialCards);
*/
  
const popupWithImage = new PopupWithImage(popupBig); //передаем селектор по id попапа с большой картинкой

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
  cardForm.cleanError();
  cardForm.open();
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

formValidation();
