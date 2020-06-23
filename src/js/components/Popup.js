import {
  ESCAPE_KEY
} from '../utils/constants.js'

export default class Popup { //отвечает за открытие и закрытие попапа
  constructor(popupSelector) {//Принимает в конструктор селектор попапа
    this._popupSelector = popupSelector;
    this._handleEscClose = (evt) => {
        if (evt.key === ESCAPE_KEY) {
            this.close();
        }
    }
    this._handleOverlayClick = (evt) => {
        if (evt.target.classList.contains("popup_opened")) {
            this.close();
        }
    }
    this._setEventListeners();
}

  open() { //открытие попапа    
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener("keydown", this._handleEscClose); //слушатель закрытие попап по нажатию Esc
    document.addEventListener("click", this._handleOverlayClick); //слушатель закрытие попап по клику на оверлей
  }

  close() { //закрытие попапа
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); //снятие слушателя закрытие картинки по нажатию Esc
    document.removeEventListener("click", this._handleOverlayClick); //снятие слушателя закрытие картинки по клику на оверлей
  }

  _setEventListeners() { //добавляет слушатель клика иконке закрытия попапа
    this._popupSelector.querySelector(".button-close").addEventListener('click', () => this.close()); //добавляет слушатель клика иконке закрытия попапа
  }
  
}