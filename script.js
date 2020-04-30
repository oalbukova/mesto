const popup = document.querySelector(".popup");
const formElement = document.querySelector(".popup__container"); //форма попап профиль
const popupView = document.querySelector(".popup-view"); //форма попап картинки
const openPopup = document.querySelector(".popup_opened");
const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
const popupElements = document.querySelector("#popupElements"); //id попап картинки
const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия формы профиль
const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль
const savePopup = document.querySelector(".popup__button-save"); //кнопка сохранить формы профиль
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия формы картинок
const elemBtnClose = document.getElementById("elements-close"); //кнопка закрытия формы картинок
const elementsContainer = document.querySelector(".elements");
const elementTemplate = document.getElementById("element-template");
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
  placeInput.value = "";
  linkInput.value = "";
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInputAdd = nameInput.value;
  let jobInputAdd = jobInput.value;
  profileTitle.textContent = `${nameInputAdd}`;
  profileSubtitle.textContent = `${jobInputAdd}`;
  editForm(popupProfile)
}

function placeSubmitHandler(evt) {
  evt.preventDefault();
  elementsContainer.prepend(addCard(placeInput.value, linkInput.value)); //добавили картинку впереди остальных
  editForm(popupElements);
}

//function addCard( placeInput.value, linkInput.value) {
 // imgElement.querySelector(".elements__img").src = linkInput.value; //добавляем картинку
 // imgElement.querySelector(".elements__text").textContent = placeInput.value; //добавляем текст
 // imgElement.querySelector(".elements__img").alt = placeInput.value; //добавляем alt

 // let placeInputAdd = placeInput.value;
 // let linkInputAdd = linkInput.value;
 // let altInputAdd = placeInput.value;
//}

const renderCards = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    const imgElement = elementTemplate.content.cloneNode(true); //клонируем шаблон
    imgElement.querySelector(".elements__img").src = arr[i].link; //добавляем картинку
    imgElement.querySelector(".elements__text").textContent = arr[i].name; //добавляем текст
    imgElement.querySelector(".elements__img").alt = arr[i].name; //добавляем alt
    imgElement
      .querySelector(".elements__like")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("elements__like_type_active"); //переключатель класса кнопки лайк
      });
    imgElement
      .querySelector(".elements__delete")
      .addEventListener("click", function (evt) {
        evt.target.parentElement.classList.add("elements__item_type_delete");
      });
    elementsContainer.append(imgElement);
  }
};
renderCards(initialElements);


editButton.addEventListener("click", () => editForm(popupProfile)); //слушатель кнопки открытия попап профиль
closePopup.addEventListener("click", () => editForm(popupProfile)); //слушатель кнопки закрытия попап профиль

addButton.addEventListener("click", () => editForm(popupElements)); //слушатель кнопки открытия попап картинки
elemBtnClose.addEventListener("click", () => editForm(popupElements)); //слушатель кнопки закрытия попап картинки

formElement.addEventListener("submit", formSubmitHandler);
popupView.addEventListener("submit", placeSubmitHandler);