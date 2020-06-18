import Popup from './Popup.js';

export default class PopupWithForm extends Popup { //отвечает за открытие и закрытие попапа
  constructor({
    formSubmit
  }, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;
  }
  
  close() {
    if (this._popupSelector.id === 'popupCards') { //при закрытии попапа форма должна сбрасываться.
      this._popupSelector.querySelector(".popup__input_type_link").value = ""; //линк в инпут
      this._popupSelector.querySelector(".popup__input_type_link").value = ""; //имя в инпут
    }
    super.close() //Перезаписывает родительский метод close
  }

  _getInputValues() { //собирает данные всех полей формы
    const item = {
      link: this.popupSelector.querySelector(".popup__input_type_link").value = "",
      name: this.popupSelector.querySelector(".popup__input_type_link").value = ""
    };
    return item;
  }

  _setEventListeners() {  
    this._popupSelector.querySelector('.popup__container').addEventListener("submit", 
     this._formSubmit); // не только добавляет обработчик клика иконке закрытия, но и добавляет обработчик сабмита формы. 

    super._setEventListeners() //Перезаписывает родительский метод setEventListeners
  }
}
//  Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
//  Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
// Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm //должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
// Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
// Для каждого попапа создавайте свой экземпляр класса PopupWithForm