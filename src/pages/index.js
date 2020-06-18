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
  formCard,
  formProfile,
  profileTitle,
  profileSubtitle,
  nameInput,
  jobInput,
  cardTemplate
} from './../js/utils/constants.js';

import kavkazImage from '../images/kavkaz.jpg';
import crimeaImage from '../images/crimea.jpg';
import nuegushImage from '../images/nuegush.jpg';
import toksovoImage from '../images/toksovo.jpg';
import baykalImage from '../images/baykal.jpg';
import './../pages/index.css';

//const formProfile = document.querySelector("#formProfile"); //id форма профиль
//const formCard = document.querySelector("#formCard"); //id форма картинки
const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
const popupCards = document.querySelector("#popupCards"); //id попап картинки
//const popupBig = document.querySelector("#popupBig"); //id попап большой картинки

const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль

const formCardsClose = document.getElementById("formCards-close"); //кнопка закрытия формы картинок

const viewClose = document.querySelector("#view-close"); //кнопка закрытия попап увеличенной картинки

const profileAlt = document.querySelector(".profile__img"); //alt в профиле

const placeInput = document.querySelector(".popup__input_type_place"); //имя в инпут
const linkInput = document.querySelector(".popup__input_type_link"); //линк в инпут
const ESCAPE_KEY = 'Escape';

const initialCards = [{
    name: 'Кавказ',
    link: kavkazImage,
  },
  {
    name: 'Крым',
    link: crimeaImage,
  },
  {
    name: 'Хребет Нургуш',
    link: nuegushImage,
  },
  {
    name: 'Токсово',
    link: toksovoImage,
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Байкал',
    link: baykalImage,
  }
];

function cleanError(form) { // функция обнуления ошибок
  form.querySelectorAll(".popup__span-error").forEach((span) => {
    span.classList.remove("popup__span-error_type_active"); //удаляем со спан модификатор с ошибкой
    span.textContent = "";
  });
  form.querySelectorAll(".popup__input").forEach((input) => {
    input.classList.remove("popup__input_type_error"); //удаляем с инпут модификатор с ошибкой
  });
  // linkInput.value = "";
  // placeInput.value = "";
}
/*
function togglePopup(elem) { //открытие/закрытие попап
  const isOpen = elem.classList.contains("popup_opened");
  if (!isOpen) {
    formValidation();
    document.addEventListener("keydown", handleEscapeKeydown); //слушатель закрытие попап по нажатию Esc
    document.addEventListener("click", handleOverlayClick); //слушатель закрытие попап по клику на оверлей
  } else {
    document.removeEventListener("keydown", handleEscapeKeydown); //снятие слушателя закрытие попап по нажатию Esc
    document.removeEventListener("click", handleOverlayClick); //снятие слушателя закрытие попап по клику на оверлей
  }
  elem.classList.toggle("popup_opened");
  cleanError(elem);
}

function handleEscapeKeydown(event) { //функция закрытия попап по нажатию Esc
  const formOpen = document.querySelector(".popup_opened");
  if (event.key === ESCAPE_KEY) {
    togglePopup(formOpen);
  }
}

function handleOverlayClick(evt) { //закрытие попап по клику на оверлей
  const formOpen = document.querySelector(".popup_opened");
  if (evt.target.classList.contains("popup")) {
    togglePopup(formOpen);
  }
}

function editForm() { //при открытии формы профиль там стоят значения из профиля
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  togglePopup(popupProfile);
}
*/
const popupWithImage = new PopupWithImage(popupBig) //передаем селектор по id попапа с большой картинкой

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

const userInfo = new UserInfo({ //изменение информации о пользователе 
  name: profileTitle,
  job: profileSubtitle
});

const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    },  cardTemplate); // передаём селектор темплейта при создании
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, formCard);

const openCardForm = () => {
  cardForm.open();
  cleanError(formCard);
};


//function formSubmitHandler(evt) { //сохранияем значения введеные в инпут профиля на странице
 // evt.preventDefault();
 // profileTitle.textContent = nameInput.value;
 // profileSubtitle.textContent = jobInput.value;
 // profileAlt.alt = nameInput.value;
 // togglePopup(popupProfile);
//}

//function placeSubmitHandler(evt) {
//  evt.preventDefault();
 // const cardValue = {};
 // cardValue.link = linkInput.value;
  //cardValue.name = placeInput.value;
  //const card = new Card(cardValue, ".card-template_type_default")
  // cardList.prepend(card.generateCard());
 // togglePopup(popupCards);
//}*/


const profileForm = new PopupWithForm ({
  formSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, formProfile);

const openProfileForm = () => {
  const profilInfo = userInfo.getUserInfo();
  nameInput.value = profilInfo.name
  jobInput.value = profilInfo.info
  profileForm.open();
  cleanError(formProfile);
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

//closePopup.addEventListener("click", () => editForm()); //слушатель кнопки закрытия попап профиль

//formCardsClose.addEventListener("click", () => togglePopup(popupCards)); //слушатель кнопки закрытия попап картинки
//viewClose.addEventListener("click", () => togglePopup(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
//formProfile.addEventListener("submit", formSubmitHandler);

//formCard.addEventListener("submit", placeSubmitHandler);

