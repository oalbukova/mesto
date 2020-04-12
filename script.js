let popup = document.querySelector('.popup');
popup.classList.add('popup_opened');

let openPopup = document.querySelector('.popup_opened');

let editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function () {
  document.querySelector('.popup_opened').style.display = 'block';
});

let closePopup = document.querySelector('.popup__button_type_close');

closePopup.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
});



