const popup = document.querySelector(".popup");
const formElement = document.querySelector(".popup__container"); //форма попап профиль
const form = document.querySelector("#form"); //форма попап картинки
const popupView = document.querySelector(".popup-view"); //форма попап картинки увеличенной
const openPopup = document.querySelector(".popup_opened");
const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
const popupElements = document.querySelector("#popupElements"); //id попап картинки
const popupBig = document.querySelector("#popupBig"); //id попап большой картинки
const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия формы профиль
const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль
const savePopup = document.querySelector(".popup__button-save"); //кнопка сохранить формы профиль
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия формы картинок
const elemBtnClose = document.getElementById("elements-close"); //кнопка закрытия формы картинок
const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.getElementById("element-template");
const viewClose = document.querySelector("#view-close"); //кнопка закрытия попап увеличенной картинки
let viewLink = document.querySelector(".popup-view__img"); // картинка в попап
let viewCaption = document.querySelector(".popup-view__caption"); //название увеличенной картинки
let profileTitle = document.querySelector(".profile__title"); //имя на странице
let profileSubtitle = document.querySelector(".profile__subtitle"); //профессия на странице
let nameInput = document.querySelector(".popup__imput_type_name"); //имя в инпут
let jobInput = document.querySelector(".popup__imput_type_job"); //профессия в инпут
let placeInput = document.querySelector(".popup__imput_type_place"); //имя в инпут
let linkInput = document.querySelector(".popup__imput_type_link"); //линк в инпут

function editForm(elem) {
  elem.classList.toggle('popup_opened')
  let profileTitleName = profileTitle.textContent;
  let profileTitleJob = profileSubtitle.textContent;
  nameInput.value = `${profileTitleName}`;
  jobInput.value = `${profileTitleJob}`;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInputAdd = nameInput.value;
  let jobInputAdd = jobInput.value;
  profileTitle.textContent = `${nameInputAdd}`;
  profileSubtitle.textContent = `${jobInputAdd}`;
  editForm(popupProfile);
}

function placeSubmitHandler(evt) {
  evt.preventDefault();
  addCard(linkInput.value, placeInput.value);
  linkInput.value = "";
  placeInput.value = "";
  editForm(popupElements);
}

function openImage(link, name) { //открытие увеличенной картинки
  viewCaption.textContent = name;
  viewLink.src = link;
  viewLink.alt = name;
  editForm(popupBig);
}

function addCard(link, name) {
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
  elementsContainer.prepend(imgElement);
}

initialElements.forEach(function (item) {
  addCard(item.link, item.name);
});//добавление картинок

editButton.addEventListener("click", () => editForm(popupProfile)); //слушатель кнопки открытия попап профиль
closePopup.addEventListener("click", () => editForm(popupProfile)); //слушатель кнопки закрытия попап профиль
addButton.addEventListener("click", () => editForm(popupElements)); //слушатель кнопки открытия попап картинки
elemBtnClose.addEventListener("click", () => editForm(popupElements)); //слушатель кнопки закрытия попап картинки
viewClose.addEventListener("click", () => editForm(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
formElement.addEventListener("submit", formSubmitHandler);
form.addEventListener("submit", placeSubmitHandler);