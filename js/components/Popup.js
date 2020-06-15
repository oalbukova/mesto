import {
  ESCAPE_KEY
} from '../../pages/index.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this.popupSelector.classList.add('.popup_opened');
    this._setEventListeners();
  }

  close() {
    this.popupSelector.removeEventListener("keydown", this._handleEscClose); //удаляем слушатель закрытие картинки по нажатию Esc
    this.popupSelector.removeEventListener("click", this._handleOverlayClick); //удаляем слушатель закрытие картинки по клику на оверлей
    this.popupSelector.classList.remove('.popup_opened');
  }

  _handleEscClose(evt) { //содержит логику закрытия попапа клавишей Esc.
    if (evt.key === ESCAPE_KEY) {
      this.close();
    }
  }

  _handleOverlayClick(evt) { //закрытие попап по клику на оверлей
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  }

  _setEventListeners() { //добавляет слушатель клика иконке закрытия попапа.
    this.popupSelector.querySelector('.button-close').addEventListener('click', () => this.close());
    this._popupSelector.addEventListener("keydown", evt => this._handleEscClose(evt)); //слушатель закрытие картинки по нажатию Esc
    this._popupSelector.addEventListener("click", evt => this._handleOverlayClick(evt)); //слушатель закрытие картинки по клику на оверлей
  }
}