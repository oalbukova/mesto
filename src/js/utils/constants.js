/*
import kavkazImage from './../../images/kavkaz.jpg';
import crimeaImage from './../../images/crimea.jpg';
import nuegushImage from './../../images/nuegush.jpg';
import toksovoImage from './../../images/toksovo.jpg';
import baykalImage from './../../images/baykal.jpg';

export const initialCards = [{//массив карточек
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
];*/
export const ESCAPE_KEY = 'Escape';
export const cardList = ".card-list";
export const cardTemplate = '#template';
export const popupCards = document.querySelector("#popupCards"); //id попап картинки
export const popupBig = document.querySelector("#popupBig"); //id попап большой картинки 
export const popupСonfirm = document.querySelector("#popupСonfirm"); //id попап подтверждения 
export const popupAvatar = document.querySelector("#popupAvatar"); //id попап подтверждения 
export const addButton = document.querySelector(".profile__add-button"); //кнопка открытия формы картинок
export const editButton = document.querySelector(".profile__edit-button"); //кнопка открытия формы профиль
export const avatarButton = document.querySelector(".profile__img-hover"); //кнопка открытия формы аватар
export const popupProfile = document.querySelector("#popupProfile"); //id попап профиль
export const nameInput = document.querySelector(".popup__input_type_name"); //имя в инпут
export const jobInput = document.querySelector(".popup__input_type_job"); //профессия в инпут
export const placeInput = document.querySelector('.popup__input_type_place');
export const linkInput = document.querySelector('.popup__input_type_link');
export const avatarInput = document.querySelector('.popup__input_type_avatar');
//export const profileTitle = document.querySelector('.profile__title');//имя в профиль
//export const profileSubtitle = document.querySelector('.profile__subtitle');//профессия в профиль
//export const profileImg = document.querySelector('.profile__img');//картинка в профиль
export const profileAvatar = document.querySelector('.profile__img');
export const profileInfo = {
  profileTitle: document.querySelector('.profile__title'),
  profileSubtitle: document.querySelector('.profile__subtitle'),
};



export const prepend = 'prepend';




