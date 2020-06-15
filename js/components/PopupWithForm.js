import Popup from './Popup.js';

export default class PopupWithForm extends Popup { //наследует от Popup
  constructor({ submitForm }, popupSelector) {//Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
    super(popupSelector);
    this._submitForm = submitForm;
  }

  getInputValues() { //собирает данные всех полей формы.
    const item = {
      place: this._popupSelector.querySelector('.popup__input_type_place').value,
      link: this._popupSelector.querySelector('.popup__input_type_link').value
    };
    return item;
  }

  _setEventListeners() {
    super._setEventListeners();//добавляет обработчик клика иконке закрытия
    this._popupSelector.querySelector('.popup__container').addEventListener("submit", this._submitForm);//добавляет обработчик сабмита формы
  }

  // _cleanError(form) {
  //   form.querySelectorAll(".popup__span-error").forEach((span) => {//функция обнуления ошибок
  //     span.classList.remove("popup__span-error_type_active"); //удаляем со спан модификатор с ошибкой
  //     span.textContent = "";
  //   });
  //   form.querySelectorAll(".popup__input").forEach((input) => {
  //     input.classList.remove("popup__input_type_error"); //удаляем с инпут модификатор с ошибкой
  //   });
  // }
  
  close() {
    if (this._popupSelector.id === 'formCard') {//если мы закрываем попап карточки, данные в форме сбрасываются.
      this._popupSelector.querySelector('.popup__input_type_link').value = '';
      this._popupSelector.querySelector('.popup__input_type_place').value = '';
    }
    this._popupSelector.querySelector('.popup__container').removeEventListener("submit", this._submitForm);
    super.close();
    //this._cleanError();
  }


}
// Создайте класс PopupWithForm, который наследует от Popup. Этот класс:
//   Кроме селектора попапа принимает в конструктор колбэк сабмита формы.
//   Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
//   Перезаписывает родительский метод _setEventListeners. Метод _setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
//   Перезаписывает родительский метод close, так как при закрытии попапа форма должна ещё и сбрасываться.
//   Для каждого попапа создавайте свой экземпляр класса PopupWithForm.
