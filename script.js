let popup = document.querySelector('.popup');

let openPopup = document.querySelector('.popup_opened');

let editButton = document.querySelector('.profile__edit-button');


function open() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', open);

let closePopup = document.querySelector('.popup__button_type_close');

function close() {
  popup.classList.remove('popup_opened');
}

closePopup.addEventListener('click', close);

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


let nameInput = document.querySelector('.popup__imput_type_name');
let jobInput = document.querySelector('.popup__imput_type_job');

function Add() {
  let profileTitleName = profileTitle.textContent;
  let profileTitleJob = profileSubtitle.textContent;
  nameInput.value = `${profileTitleName}`;
  jobInput.value = `${profileTitleJob}`;
}

Add()

let formElement = document.querySelector('.popup__container');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInputAdd = nameInput.value;
  let jobInputAdd = jobInput.value;

  profileTitle.textContent = `${nameInputAdd}`;
  profileSubtitle.textContent = `${jobInputAdd}`;
}

formElement.addEventListener('submit', formSubmitHandler);

let savePopup = document.querySelector('.popup__button_type_save');

savePopup.addEventListener('click', close);