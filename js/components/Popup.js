import {
  ESCAPE_KEY
} from '../../pages/index.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _handleOverlayClick(evt) { //закрытие попап по клику на оверлей
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  _handleEscClose(evt) { //содержит логику закрытия попапа клавишей Esc.
    if (evt.key === ESCAPE_KEY) {
      this.close();
    }
  }

  _setEventListeners() { //добавляет слушатель клика иконке закрытия попапа.
    this._popupSelector.querySelector('.button-close').addEventListener('click', () => this.close());

    this._popupSelector.addEventListener("click", (evt) => this._handleOverlayClick(evt)); //слушатель закрытие картинки по клику на оверлей
  }

  open() {
    this._setEventListeners();
    document.addEventListener("keydown", evt => this._handleEscClose(evt)); //слушатель закрытие картинки по нажатию Esc

    this._popupSelector.classList.add('.popup_opened');
  }

  close() {
  //  this._popupSelector.removeEventListener("keydown", this._handleEscClose); //удаляем слушатель закрытие картинки по нажатию Esc
   // this._popupSelector.removeEventListener("click", this._handleOverlayClick); //удаляем слушатель закрытие картинки по клику на оверлей
    this._popupSelector.classList.remove('.popup_opened');
  }




}