import Popup from './Popup.js';

export default class PopupWithForm extends Popup { //наследует от Popup, отвечает за открытие и закрытие попапа
  constructor({
    formSubmit
  }, popupSelector) {
    super(popupSelector); //селектор попапа
    this._formSubmit = formSubmit; //// колбэк сабмита формы (Submit отправляет форму)
  }

  close() {
    super.close(); //Перезаписывает родительский метод close
    this._popupSelector.querySelector('.popup__container').reset(); //при закрытии попапа форма должна сбрасываться.
  }

  open() {
    super.open();
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
    this._popupSelector.querySelector('.popup__container').addEventListener("submit", (evt) => { // добавляет обработчик сабмита формы. 
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
      this._formSubmit(this._getInputValues());
      this.close();
    });
  }

  cleanError() { // функция обнуления ошибок
    const buttonSave = this._popupSelector.querySelector('.popup__button-save');
    this._popupSelector.querySelectorAll(".popup__span-error").forEach((span) => {
      span.classList.remove("popup__span-error_type_active"); //удаляем со спан модификатор с ошибкой
      span.textContent = "";
    });

    this._popupSelector.querySelectorAll(".popup__input").forEach((input) => {
      if (!input.value) { //если в инпут нет значений
        buttonSave.classList.add('popup__button-save_type_disabled'); //добавляем класс деактивирующий кнопку
        buttonSave.setAttribute('disabled', 'true');
      } else {
        buttonSave.classList.remove('popup__button-save_type_disabled'); //удаляет класс деактивирующий кнопку
        buttonSave.removeAttribute('disabled');
      }
      input.classList.remove("popup__input_type_error"); //удаляем с инпут модификатор с ошибкой
    });
  }
}