import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import UserInfo from '../js/components/UserInfo.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import PopupWithImage from '../js/components/PopupWithImage.js';

const formProfile = document.querySelector("#formProfile"); //id форма профиль
const formCard = document.querySelector("#formCard"); //id форма картинки
const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
const popupCards = document.querySelector("#popupCards"); //id попап картинки
//const popupBig = document.querySelector("#popupBig"); //id попап большой картинки
const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия формы профиль
//const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия формы картинок
//const formCardsClose = document.getElementById("formCards-close"); //кнопка закрытия формы картинок
const cardList = document.querySelector(".card-list");
//const viewClose = document.querySelector("#view-close"); //кнопка закрытия попап увеличенной картинки
const profileTitle = document.querySelector(".profile__title"); //имя на странице
const profileSubtitle = document.querySelector(".profile__subtitle"); //профессия на странице
const profileAlt = document.querySelector(".profile__img"); //alt в профиле
export const nameInput = document.querySelector(".popup__input_type_name"); //имя в инпут
export const jobInput = document.querySelector(".popup__input_type_job"); //профессия в инпут
const placeInput = document.querySelector(".popup__input_type_place"); //имя в инпут
const linkInput = document.querySelector(".popup__input_type_link"); //линк в инпут
export const popupViewImg = document.querySelector(".popup-view__img");
const popupBig = document.querySelector("#popupBig"); //id попап большой картинки 
export const popupViewCaption = document.querySelector(".popup-view__caption");
export const ESCAPE_KEY = 'Escape';
const cardTemplate = '#template';

const initialCards = [{ // массив картинок
    name: 'Кавказ',
    link: './images/kavkaz.jpg',
  },
  {
    name: 'Крым',
    link: './images/crimea.jpg',
  },
  {
    name: 'Хребет Нургуш',
    link: './images/nuegush.jpg',
  },
  {
    name: 'Токсово',
    link: './images/toksovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Байкал',
    link: './images/baykal.jpg',
  }
];
/*
function cleanError(form) {
  form.querySelectorAll(".popup__span-error").forEach((span) => { //функция обнуления ошибок
    span.classList.remove("popup__span-error_type_active"); //удаляем со спан модификатор с ошибкой
    span.textContent = "";
  });
  form.querySelectorAll(".popup__input").forEach((input) => {
    input.classList.remove("popup__input_type_error"); //удаляем с инпут модификатор с ошибкой
  });

}
*/
// function togglePopup(elem) { //открытие/закрытие попап
//   const isOpen = elem.classList.contains("popup_opened");
//   if (!isOpen) {
//     formValidation();
//     document.addEventListener("keydown", handleEscapeKeydown); //слушатель закрытие попап по нажатию Esc
//     document.addEventListener("click", handleOverlayClick); //слушатель закрытие попап по клику на оверлей
//   } else {
//     document.removeEventListener("keydown", handleEscapeKeydown); //снятие слушателя закрытие попап по нажатию Esc
//     document.removeEventListener("click", handleOverlayClick); //снятие слушателя закрытие попап по клику на оверлей
//   }
//   elem.classList.toggle("popup_opened");
//   cleanError(elem);
// }

// function handleEscapeKeydown(event) { //функция закрытия попап по нажатию Esc
//   const formOpen = document.querySelector(".popup_opened");
//   if (event.key === ESCAPE_KEY) {
//     togglePopup(formOpen);
//   }
// }

// function handleOverlayClick(evt) { //закрытие попап по клику на оверлей
//   const formOpen = document.querySelector(".popup_opened");
//   if (evt.target.classList.contains("popup")) {
//     togglePopup(formOpen);
//   }
// }

// function editForm() { //при открытии формы профиль там стоят значения из профиля
//                       // const personValue = {};
//                       // personValue.title = profileTitle.textContent;
//                       // personValue.about = profileSubtitle.textContent;
//                       // const userInfo = new UserInfo( personValue )
//
//   nameInput.value = profileTitle.textContent;
//   jobInput.value = profileSubtitle.textContent;
//
//     togglePopup(popupProfile);
// }

// function addCards(initialCards) {
//   initialCards.forEach((item) => {
//     const card = new Card(item, ".card-template_type_default");//передаём селектор темплейта при создании
//     const cardElement = card.generateCard();
//     document.querySelector(".card-list").append(cardElement);
//   });
// }

// const addCards = new Section({//функция добавления картинок из массива
//   items: initialCards,//массив картинок
//   renderer: (item) => {
//     const card = new Card(item, ".card-template_type_default");//передаём селектор темплейта при создании
//     const cardElement = card.generateCard();
//     addCards.addItem(cardElement);
//   }
// }, cardList);


const addCards = new Section({ //функция добавления картинок из массива
    items: initialCards, //массив картинок
    renderer: (item) => {
      const card = new Card({
        data: item,
        handleCardClick: () => {
          const popupWithImage = new popupWithImage(item, popupBig);
          popupViewImg.open();
        }
      }, cardTemplate); //передаём селектор темплейта при создании                  
      const cardElement = card.generateCard();
      addCards.addItem(cardElement);
    }
  },
  cardList);


//function formSubmitHandler(evt) { //сохранияем значения введеные в инпут профиля на странице
//evt.preventDefault();
//profileTitle.textContent = nameInput.value;
//profileSubtitle.textContent = jobInput.value;
//profileAlt.alt = nameInput.value;
// togglePopup(popupProfile);
//}

//класс формы профиль
//const openFormProfil = () => { //форма профиль

const userInfo = new UserInfo({
  name: document.querySelector('.profile__title'),
  about: document.querySelector('.profile__subtitle')
});

const popupWithProfile = new PopupWithForm('#formProfile', {
  submitForm: (evt) => {
    evt.preventDefault();
    infoUser.setUserInfo();
    popupWithProfile.close();
  }
});
// userInfo.getUserInfo();
// popupWithProfile.open();
// cleanError(formProfile);
//};

const openFormProfil = function () {
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name
  jobInput.value = infoUser.info
  changeAuthorForm.open();
}




editButton.addEventListener("click", () => {
  popupWithProfile.open()
}); //слушатель кнопки открытия попап профиль
//const profil = new PopupWithForm ({
// submitForm: (evt) => {
//  evt.preventDefault();
// }



// function placeSubmitHandler(evt) {
//   evt.preventDefault();
//   const cardValue = {};
//   cardValue.link = linkInput.value;
//   cardValue.name = placeInput.value;
//   const card = new Card(cardValue, ".card-template_type_default")
//   cardList.prepend(card.generateCard());
//   togglePopup(popupCards);
// }

const OpenFormCard = () => { //форма карточки
  const popupWithCard = new PopupWithForm({
    submitForm: (evt) => {
      evt.preventDefault();
      const item = popupWithCard.getInputValues();
      const card = new Card(".card-template", {
        data: item,
        handleCardClick: () => {
          const popupImage = new PopupWithImage(item, popupBig);
          popupImage.open();
        }
      });
      const cardElement = card.generateCard();
      addCards.setItem(cardElement);
      popupWithCard.close();
    }
  }, formCard);
  popupWithCard.open();
  // cleanError(formCard);
};

addButton.addEventListener("click", () => OpenFormCard()); //слушатель кнопки открытия попап картинки




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



//addEventListener(editButton, openFormProfil, 'click');

//closePopup.addEventListener("click", () => editForm()); //слушатель кнопки закрытия попап профиль

//formCardsClose.addEventListener("click", () => togglePopup(popupCards)); //слушатель кнопки закрытия попап картинки
//viewClose.addEventListener("click", () => togglePopup(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
//formProfile.addEventListener("submit", formSubmitHandler);
//formCard.addEventListener("submit", placeSubmitHandler);

addCards.renderItems(initialCards);
formValidation();