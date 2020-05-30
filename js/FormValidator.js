export default class FormValidator {
  constructor(data, element) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector; //инпуты
    this._submitButtonSelector = data.submitButtonSelector; //кнопка сохранить/создать
    this._inactiveButtonClass = data.inactiveButtonClass; //неактивная кнопка
    this._inputErrorClass = data.inputErrorClass; //ошибка в инпуте
    this._errorClass = data.errorClass; //ошибка в спане
    this._element = element;
  };

  //formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
  //inputElement — проверяемое поле ввода.
  _showInputError(formElement, inputElement, errorMessage) {
    // Функция, которая добавляет класс с ошибкой
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(this._inputErrorClass); //добавляет класс popup__input_type_error(красную полоску)
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(formElement, inputElement) {
    // Функция, которая удаляет класс с ошибкой
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._inputErrorClass); //убирает класс popup__input_type_error(красную полоску)
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = ""; //очистить текстовое содержимое
  };

  _checkInputValidity(formElement, inputElement) { // Функция checkInputValidity  принимает formElement и inputElement, внутри вызывает showInputError или hideInputError
    if (!inputElement.validity.valid) { // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage); //showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
    } else {
      // Если проходит, скроем
      this._hideInputError(formElement, inputElement);
    }; // hideInputError получает  параметром форму, в которой находится проверяемое поле, и само это поле
  };

  _hasInvalidInput(inputList) {
    //обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
    return inputList.some((inputElement) => {
      //Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input. Если все поля валидны — false.
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) { // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять

    if (this._hasInvalidInput(inputList)) {
      // проверяем есть ли в массиве inputList невалидные поля
      buttonElement.classList.add(this._inactiveButtonClass); // делает кнопку неактивной
      buttonElement.setAttribute("disabled", true); //Если хотя бы одно из полей пустое, условие её заблокирует
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass); // иначе делает кнопку активной
      buttonElement.removeAttribute("disabled", false); //Если с формой всё в порядке, условие разблокирует
    };
  };

  _setEventListeners(formElement) {
    // Находим все поля внутри формы
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    ); //сделаем из них массив методом Array.from
    const buttonElement = formElement.querySelector(this._submitButtonSelector); // Находим в текущей форме кнопку отправки
    formElement.checkForm = () => {
      this._toggleButtonState(inputList, buttonElement);
    };

    inputList.forEach((inputElement) => {
      // Обойдем все элементы полученной коллекции
      inputElement.addEventListener("input", () => {
        // каждому полю добавим обработчик события input
        this._checkInputValidity(formElement, inputElement); //Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
        // formElement.checkForm = () => {
        this._toggleButtonState(inputList, buttonElement);
        //   } // вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
      });
    });
  };

  enableValidation() { // функция запускающая процесс валидации
    this._setEventListeners(this._element); // вызываем метод на форму
  };

};