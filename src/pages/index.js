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
  formCard,
  formProfile,
  profileTitle,
  profileSubtitle,
  profileAlt,
  nameInput,
  jobInput,
  cardTemplate,
  initialCards,
  popupProfile,
  popupCards,
  profileInfo
} from './../js/utils/constants.js';

//const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль
//const formCardsClose = document.getElementById("formCards-close"); //кнопка закрытия формы картинок
//const viewClose = document.querySelector("#view-close"); //кнопка закрытия попап увеличенной картинки


function cleanError(form) { // функция обнуления ошибок
  form.querySelectorAll(".popup__span-error").forEach((span) => {
    span.classList.remove("popup__span-error_type_active"); //удаляем со спан модификатор с ошибкой
    span.textContent = "";
  });
  form.querySelectorAll(".popup__input").forEach((input) => {
    input.classList.remove("popup__input_type_error"); //удаляем с инпут модификатор с ошибкой
  });

}

const userInfo = new UserInfo(profileInfo); //изменение информации о пользователе 

const profileForm = new PopupWithForm({
  formSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, popupProfile);

const openProfileForm = () => {
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.person;
  jobInput.value = infoAuthor.about;
  profileForm.open();
  cleanError(popupProfile);
};

const popupWithImage = new PopupWithImage(popupBig); //передаем селектор по id попапа с большой картинкой

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
//}
//closePopup.addEventListener("click", () => editForm()); //слушатель кнопки закрытия попап профиль

//formCardsClose.addEventListener("click", () => togglePopup(popupCards)); //слушатель кнопки закрытия попап картинки
//viewClose.addEventListener("click", () => togglePopup(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
//formProfile.addEventListener("submit", formSubmitHandler);

//formCard.addEventListener("submit", placeSubmitHandler);