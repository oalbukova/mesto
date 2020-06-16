/*Создайте класс Popup, который отвечает за открытие и закрытие попапа. Этот класс:
Принимает в конструктор единственный параметр — селектор попапа.
Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
Содержит публичный метод setEventListeners, который добавляет слушатель клика иконке закрытия попапа.*/
import {
  ESCAPE_KEY
} from './../utils/constants.js'

export default class Popup { //отвечает за открытие и закрытие попапа
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.setEventListeners();
  }
  open() { //открытие попапа
    this._popupSelector.classList.add("popup_opened");
  }

  close() { //закрытие попапа
    this._popupSelector.classList.remove("popup_opened");
  }

  _handleEscClose(evt) { //закрытие попапа клавишей Esc
    if (evt.key === ESCAPE_KEY) {
      this._close();
    }
  }

  _handleOverlayClick(evt) { //закрытие попап по клику на оверлей
    if (evt.target.classList.contains("popup_opened")) {
      this._close();
    }
  }
    setEventListeners() { 
      this._popupSelector.querySelector(".button-close").addEventListener('click', () => this.close());//добавляет слушатель клика иконке закрытия попапа
      document.addEventListener("keydown", this._handleEscClose(evt)); //слушатель закрытие попап по нажатию Esc
      document.addEventListener("click", this._handleOverlayClick(evt)); //слушатель закрытие попап по клику на оверлей
    }
  }
  