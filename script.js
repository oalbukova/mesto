const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.popup_opened');

const editButton = document.querySelector('.profile__edit-button');
const closePopup = document.querySelector('.popup__button_type_close');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


let nameInput = document.querySelector('.popup__imput_type_name');
let jobInput = document.querySelector('.popup__imput_type_job');

const formElement = document.querySelector('.popup__container');

function Add() {
  let profileTitleName = profileTitle.textContent;
  let profileTitleJob = profileSubtitle.textContent;
  nameInput.value = `${profileTitleName}`;
  jobInput.value = `${profileTitleJob}`;
}

function open() {
  popup.classList.add('popup_opened');
  Add()
}
editButton.addEventListener('click', open);


function close() {
  popup.classList.remove('popup_opened');
}
closePopup.addEventListener('click', close);


function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInputAdd = nameInput.value;
  let jobInputAdd = jobInput.value;

  profileTitle.textContent = `${nameInputAdd}`;
  profileSubtitle.textContent = `${jobInputAdd}`;
}

formElement.addEventListener('submit', formSubmitHandler);

const savePopup = document.querySelector('.popup__button_type_save');

savePopup.addEventListener('click', close);
