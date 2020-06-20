import Popup from './Popup.js';

export default class PopupWithForm extends Popup { //наследует от Popup, отвечает за открытие и закрытие попапа
  constructor({
    formSubmit
  }, popupSelector) {
    super(popupSelector); //селектор попапа
    this._formSubmit = formSubmit; //// колбэк сабмита формы
    this._submit = (evt) => { // не только добавляет обработчик клика иконке закрытия, но и добавляет обработчик сабмита формы. 
      evt.preventDefault();
      this._formSubmit(this._getInputValues());
      this.close();
    };
  }

  close() {
    super.close(); //Перезаписывает родительский метод close
      this._popupSelector.querySelector('.popup__container').reset();//при закрытии попапа форма должна сбрасываться.
      this._popupSelector.querySelector('.popup__container').removeEventListener('submit', this._submit);//снятие слушателя сабмита формы
   // }
  }

  _getInputValues() { //собирает данные всех полей формы
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _setEventListeners() {
    super._setEventListeners(); //Перезаписывает родительский метод setEventListeners
    this._popupSelector.querySelector('.popup__container').addEventListener("submit", this._submit);
  }
}