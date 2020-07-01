
/*import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({
    onConfirm
  }, popupSelector) {
    super(popupSelector); //селектор попапа
    this._onConfirm = onConfirm; //// колбэк сабмита формы (Submit отправляет форму)
  }

  _setEventListeners() {
    super._setEventListeners(); //Перезаписывает родительский метод setEventListeners
    this._popupSelector.querySelector('.popup__container').addEventListener("submit", (evt) => { // добавляет обработчик сабмита формы. 
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
      this._onConfirm(this._card, this._cardClass);
      this.close();
    });
  }

  setCard(card, cardClass) {
    this._card = card;
    this._cardClass = cardClass;
  }
}*/
/*
import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector); //селектор попапа
  }
open() {
  super.open()
}*/
}/*
export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
      super(popupSelector);
      this._confirmButton = this._popupElement.querySelector('.popup__button-save_type_confirm');
      this._setEventListeners();
  }

  open (onConfirmCallback) {
      super.open();
      this._onConfirmCallback = onConfirmCallback;
  }

  _setEventListeners() {
      super._setEventListeners();
      this._confirmButton.addEventListener('click', (evt) => {
          evt.preventDefault();
          if(this._onConfirmCallback) {
              this._onConfirmCallback();
          }
      });
  }
}*/