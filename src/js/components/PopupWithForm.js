import Popup from './Popup.js';

export default class PopupWithForm extends Popup { //отвечает за открытие и закрытие попапа
  constructor({
    formSubmit
  }, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }

  close() {
    super.close(); //Перезаписывает родительский метод close
    if (this._popupSelector.id === 'popupCards') { //при закрытии попапа форма должна сбрасываться.
      this._popupSelector.querySelector(".popup__input_type_place").value = ""; //имя в инпут
      this._popupSelector.querySelector(".popup__input_type_link").value = ""; //линк в инпут
    }
  }

  _getInputValues() {

    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  _setEventListeners() {
    super._setEventListeners(); //Перезаписывает родительский метод setEventListeners
    this._popupSelector.querySelector('.popup__container').addEventListener("submit",
      (evt) => { // не только добавляет обработчик клика иконке закрытия, но и добавляет обработчик сабмита формы. 
        evt.preventDefault();
        this._formSubmit(this._getInputValues());
        this.close();
      }, {once: true});
  }
}
//  Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
//  Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm