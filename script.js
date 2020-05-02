const formElement = document.querySelector(".popup__container"); //форма попап профиль
const form = document.querySelector("#form"); //форма попап картинки
const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
const popupElements = document.querySelector("#popupElements"); //id попап картинки
const popupBig = document.querySelector("#popupBig"); //id попап большой картинки
const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия формы профиль
const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия формы картинок
const elemBtnClose = document.getElementById("elements-close"); //кнопка закрытия формы картинок
const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.getElementById("element-template");
const viewClose = document.querySelector("#view-close"); //кнопка закрытия попап увеличенной картинки
const viewLink = document.querySelector(".popup-view__img"); // картинка в попап
const viewCaption = document.querySelector(".popup-view__caption"); //название увеличенной картинки
const profileTitle = document.querySelector(".profile__title"); //имя на странице
const profileSubtitle = document.querySelector(".profile__subtitle"); //профессия на странице
const profileAlt = document.querySelector(".profile__img"); //alt в профиле
const nameInput = document.querySelector(".popup__input_type_name"); //имя в инпут
const jobInput = document.querySelector(".popup__input_type_job"); //профессия в инпут
const placeInput = document.querySelector(".popup__input_type_place"); //имя в инпут
const linkInput = document.querySelector(".popup__input_type_link"); //линк в инпут

function togglePopup(elem) {
  elem.classList.toggle('popup_opened')
}

function editForm() { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  togglePopup(popupProfile);
}



function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameInputAdd = nameInput.value;
  const jobInputAdd = jobInput.value;
  profileTitle.textContent = nameInputAdd;
  profileSubtitle.textContent = jobInputAdd;
  profileAlt.alt = nameInputAdd;
  togglePopup(popupProfile);
}


function placeSubmitHandler(evt) { //добавление своей карточки
  evt.preventDefault();
  elementsContainer.prepend(createCard(linkInput.value, placeInput.value));
  linkInput.value = "";
  placeInput.value = "";
  togglePopup(popupElements);
}

function openImage(link, name) { //открытие увеличенной картинки
  viewCaption.textContent = name;
  viewLink.src = link;
  viewLink.alt = name;
  togglePopup(popupBig);
}

function createCard(link, name) { //карточка
  const imgElement = elementTemplate.content.cloneNode(true); //клонируем шаблон
  imgElement.querySelector(".element__img").src = link; //добавляем картинку
  imgElement.querySelector(".element__text").textContent = name; //добавляем текст
  imgElement.querySelector(".element__img").alt = name; //добавляем alt
  imgElement.querySelector(".element__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_type_active"); //переключатель класса кнопки лайк
  });
  imgElement.querySelector(".element__delete").addEventListener("click", function (evt) {
    evt.target.closest('.element').remove(); //удаление картинок
  });
  imgElement.querySelector(".element__img").addEventListener("click", function () {
    openImage(link, name); //открытие большой картинки
  });
  return imgElement;
}

initialElements.forEach(function (item) {
  elementsContainer.prepend(createCard(item.link, item.name));
}) //добавление картинок

editButton.addEventListener("click", () => togglePopup(popupProfile)); //слушатель кнопки открытия попап профиль
closePopup.addEventListener("click", () => togglePopup(popupProfile)); //слушатель кнопки закрытия попап профиль
addButton.addEventListener("click", () => togglePopup(popupElements)); //слушатель кнопки открытия попап картинки
elemBtnClose.addEventListener("click", () => togglePopup(popupElements)); //слушатель кнопки закрытия попап картинки
viewClose.addEventListener("click", () => togglePopup(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
formElement.addEventListener("submit", formSubmitHandler);
form.addEventListener("submit", placeSubmitHandler);