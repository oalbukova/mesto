import {ESCAPE_KEY} from '../pages/index.js';

export default class Popup { //
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose); //слушатель закрытие картинки по нажатию Esc
    document.addEventListener("click", this._handleOverlayClick); //слушатель закрытие картинки по клику на оверлей
    this._setEventListeners();
    this._popupSelector.classList.add('.popup_opened');
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose); //слушатель закрытие картинки по нажатию Esc
    document.removeEventListener("click", this._handleOverlayClick); //слушатель закрытие картинки по клику на оверлей
    this._popupSelector.classList.remove('.popup_opened');
  }

  _handleEscClose(evt) { //содержит логику закрытия попапа клавишей Esc.
  //  const formOpen = document.querySelector('.popup_opened');
    if (evt.key === ESCAPE_KEY) {
      this.close();
    }
  }

  _handleOverlayClick(evt) { //закрытие попап по клику на оверлей
    const formOpen = document.querySelector(".popup_opened");
    if (evt.target.classList.contains("popup")) {
      this.close(formOpen);
    }
  }

  _setEventListeners() { //добавляет слушатель клика иконке закрытия попапа.
    this._popupSelector.querySelector('.button-close').addEventListener('click', this.close);
  }
}