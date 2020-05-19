const formProfile = document.querySelector("#formProfile"); //id форма профиль
const formCard = document.querySelector("#formCard"); //id форма картинки
const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
const popupCards = document.querySelector("#popupCards"); //id попап картинки
const popupBig = document.querySelector("#popupBig"); //id попап большой картинки
const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия формы профиль
const closePopup = document.querySelector(".button-close"); //кнопка закрытия формы профиль
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия формы картинок
const formCardsClose = document.getElementById("formCards-close"); //кнопка закрытия формы картинок
const cardList = document.querySelector(".card-list");
const cardTemplate = document.getElementById("card-template");
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
const formInput = Array.from(document.querySelectorAll('.popup__input')); //массив инпутов 
const spanError = Array.from(document.querySelectorAll('.popup__span-error')); //массив спан с ошибкой

function cleanError() { // функция обнуления ошибок
  spanError.forEach((span) => {
    span.classList.remove('popup__span-error_type_active'); //удаляем со спан модификатор с ошибкой
    span.textContent = '';
  })
  formInput.forEach((input) => {
    input.classList.remove('popup__input_type_error'); //удаляем с инпут модификатор с ошибкой
  });
};

function handleEscapeKeydown (evt) {
  if (evt.key === 'Escape') { //закрытие попап по нажатию Esc
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    clearInputCard();
  };
};

function togglePopup (elem) { //открытие/закрытие всех попап
  elem.classList.toggle('popup_opened');
  cleanError(elem);
  if (elem.classList.contains('popup_opened')) {
    document.addEventListener('keydown', handleEscapeKeydown); //слушатель закрытие попап по нажатию Esc
  } else {
    document.removeEventListener('keydown', handleEscapeKeydown); //снятие слушателя закрытие попап по нажатию Esc
  };
};

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

function cardLike (evt) { //функция лайков
  evt.target.classList.toggle("card__like_type_active");
}

function cardDelete(evt) { //функция удаления
  const removeCard = evt.target.closest('.card'); //карточка
  const btnLike = removeCard.querySelector(".card__like");
  const btnDelete = removeCard.querySelector('.card__delete');
  const imageView = removeCard.querySelector('.card__img');

  btnLike.removeEventListener("click", cardLike); //удаление слушателя кнопки лайк
  btnDelete.removeEventListener('click', cardDelete); //удаление слушателя кнопки удалить
  imageView.removeEventListener('click', openImage); //удаление слушателя увеличения картинки 

  removeCard.remove(); //удаление карточки
}

function createCard(link, name) { //создаем шаблон карточки
  const imgElement = cardTemplate.content.cloneNode(true); //клонируем шаблон
  const cardImage = imgElement.querySelector(".card__img"); //картинка
  const btnLike = imgElement.querySelector(".card__like"); //кнопка лайк
  const btnDelete = imgElement.querySelector('.card__delete'); //кнопка удалить
  const imageView = cardImage; //увеличенная картинка

  cardImage.src = link; //добавляем картинку
  cardImage.alt = name; //добавляем alt
  imgElement.querySelector(".card__text").textContent = name; //добавляем текст

  btnLike.addEventListener("click", cardLike); //слушатель кнопки лайк
  btnDelete.addEventListener("click", cardDelete); //слушатель кнопки удалить
  imageView.addEventListener("click", openImage); //слушатель увеличения картинки 

  return imgElement;
}

function addCards(initialCards) { //добавление картинок из массива
  initialCards.forEach(function (item) {
    cardList.append(createCard(item.link, item.name));
  });
}

function formSubmitHandler(evt) { //сохранияем значения введеные в инпут профиля на странице
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  profileAlt.alt = nameInput.value;
  togglePopup(popupProfile);
}

function clearInputCard() { //очищаем инпуты в форме карточек
  linkInput.value = "";
  placeInput.value = "";
};

function placeSubmitHandler(evt) { //добавление своей карточки
  evt.preventDefault();
  cardList.prepend(createCard(linkInput.value, placeInput.value));
  clearInputCard();
  togglePopup(popupCards);
};

function handleOverlayClick (evt) {//закрытие попап по клику на оверлей
  if (evt.target.classList.contains('popup')) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    clearInputCard();
  }
};


editButton.addEventListener("click", () => editForm()); //слушатель кнопки открытия попап профиль
closePopup.addEventListener("click", () => editForm()); //слушатель кнопки закрытия попап профиль
addButton.addEventListener("click", () => togglePopup(popupCards)); //слушатель кнопки открытия попап картинки
formCardsClose.addEventListener("click", () => togglePopup(popupCards)); //слушатель кнопки закрытия попап картинки
viewClose.addEventListener("click", () => togglePopup(popupBig)); //слушатель кнопки закрытия попап увеличенной картинки
formProfile.addEventListener("submit", formSubmitHandler);
formCard.addEventListener("submit", placeSubmitHandler);
document.addEventListener('click', handleOverlayClick);//слушатель закрытие попап по клику на оверлей

addCards(initialCards)