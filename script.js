let button = document.querySelector('.profile__edit-button');

button.addEventListener('click', function () {
  document.querySelector('.popup_opened').style.display = 'block';
});

let buttonClose = document.querySelector('.popup__button_type_cancel');
/*let mod = document.querySelector('.popup_opened');*/

buttonClose.addEventListener('click', function () {
  popup.delMod('popup_opened');
});

