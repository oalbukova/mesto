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

function togglePopup(elem) { //открытие/закрытие всех попап
  elem.classList.toggle('popup_opened')
}

function editForm() { //при открытии формы профиль там стоят значения из профиля
  togglePopup(popupProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function openImage(evt) { //открытие увеличенной картинки
  viewCaption.textContent = evt.target.alt;
  viewLink.src = evt.target.src;
  viewLink.alt = evt.target.alt;
  togglePopup(popupBig);
}

function elementLike(evt) { //функция лайков
  evt.target.classList.toggle("element__like_type_active");
}

function elementDelete(evt) { //функция удаления
  const removeElement = evt.target.closest('.element'); //карточка
  const btnLike = removeElement.querySelector(".element__like");
  const btnDelete = removeElement.querySelector('.element__delete');
  const imageView = removeElement.querySelector('.element__img');

  btnLike.removeEventListener("click", elementLike); //удаление слушателя кнопки лайк
  btnDelete.removeEventListener('click', elementDelete); //удаление слушателя кнопки удалить
  imageView.removeEventListener('click', openImage); //удаление слушателя увеличения картинки 

  removeElement.remove(); //удаление карточки
}

function createCard(link, name) { //создаем шаблон карточки
  const imgElement = elementTemplate.content.cloneNode(true); //клонируем шаблон
  const elementImage = imgElement.querySelector(".element__img"); //картинка
  const btnLike = imgElement.querySelector(".element__like"); //кнопка лайк
  const btnDelete = imgElement.querySelector('.element__delete'); //кнопка удалить
  const imageView = elementImage; //увеличенная картинка

  elementImage.src = link; //добавляем картинку
  elementImage.alt = name; //добавляем alt
  imgElement.querySelector(".element__text").textContent = name; //добавляем текст

  btnLike.addEventListener("click", elementLike); //слушатель кнопки лайк
  btnDelete.addEventListener("click", elementDelete); //слушатель кнопки удалить
  imageView.addEventListener("click", openImage); //слушатель увеличения картинки 

  return imgElement;
}

function addCards(initialElements) { //добавление картинок из массива
  initialElements.forEach(function (item) {
    elementsContainer.append(createCard(item.link, item.name));
  });
}

function formSubmitHandler(evt) { //сохранияем значения введеные в инпут профиля на странице
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  profileAlt.alt = nameInput.value;
  togglePopup(popupProfile);
}

function placeSubmitHandler(evt) { //добавление своей карточки
  evt.preventDefault();
  elementsContainer.prepend(createCard(linkInput.value, placeInput.value));
  linkInput.value = "";
  placeInput.value = "";
  togglePopup(popupElements);
}

editButton.addEventListener("click", () => editForm()); //слушатель кнопки открытия попап профиль
closePopup.addEventListener("click", () => editForm()); //слушатель кнопки закрытия попап профиль
addButton.addEventListener("click", () => togglePopup(popupElements)); //слушатель кнопки открытия попап картинки
elemBtnClose.addEventListener("click", () => togglePopup(popupElements)); //слушатель кнопки закрытия попап картинки
viewClose.addEventListener("click", () => togglePopup(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
formElement.addEventListener("submit", formSubmitHandler);
form.addEventListener("submit", placeSubmitHandler);

addCards(initialElements);