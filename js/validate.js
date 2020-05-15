const object = {
  //объект с полями форм, которые надо проверить
  formSelector: ".popup__container", //форма
  inputSelector: ".popup__input", //инпуты
  submitButtonSelector: ".popup__button-save", //кнопка сохранить/создать
  inactiveButtonClass: "popup__button-save_type_disabled", //неактивная кнопка
  inputErrorClass: "popup__input_type_error", //ошибка в инпуте
  errorClass: "popup__span-error_type_active", //ошибка в спане
};

//formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
//inputElement — проверяемое поле ввода.
const showInputError = (formElement, inputElement, errorMessage, form) => {
  // Функция, которая добавляет класс с ошибкой
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add(form.inputErrorClass); //добавляет класс popup__input_type_error(красную полоску)
  errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр
  errorElement.classList.add(form.errorClass);
};

const hideInputError = (formElement, inputElement, form) => {
  // Функция, которая удаляет класс с ошибкой
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки
  inputElement.classList.remove(form.inputErrorClass); //убирает класс popup__input_type_error(красную полоску)
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = ""; //очистить текстовое содержимое
};

const checkInputValidity = (formElement, inputElement, form) => {
  // Функция checkInputValidity  принимает formElement и inputElement, внутри вызывает showInputError или hideInputError
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      form); //showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, form); // hideInputError получает  параметром форму, в которой находится проверяемое поле, и само это поле
  }
};

const hasInvalidInput = (inputList) => {
  //обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле, которое не прошло валидацию?».
  return inputList.some((inputElement) => {
    //Функция возвращает true, если в массиве inputList есть хотя бы один невалидный input. Если все поля валидны — false.
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, form) => {
  // Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять

  if (hasInvalidInput(inputList)) {
    // проверяем есть ли в массиве inputList невалидные поля
    buttonElement.classList.add(form.inactiveButtonClass); // делает кнопку неактивной
    buttonElement.setAttribute("disabled", true); //Если хотя бы одно из полей пустое, условие её заблокирует
  } else {
    buttonElement.classList.remove(form.inactiveButtonClass); // иначе делает кнопку активной
    buttonElement.removeAttribute("disabled"); //Если с формой всё в порядке, условие разблокирует
  }
};

const setEventListeners = (formElement, form) => {
  // Находим все поля внутри формы
  const inputList = Array.from(
    formElement.querySelectorAll(form.inputSelector)
  ); //сделаем из них массив методом Array.from
  const buttonElement = formElement.querySelector(form.submitButtonSelector); // Находим в текущей форме кнопку отправки

  inputList.forEach((inputElement) => {
    // Обойдем все элементы полученной коллекции
    inputElement.addEventListener("input", function () {
      // каждому полю добавим обработчик события input
      toggleButtonState(inputList, buttonElement, form); // вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
      checkInputValidity(formElement, inputElement, form); //Внутри колбэка вызовем checkInputValidity, передав ей форму и проверяемый элемент
    });
  });
};

const enableValidation = (form) => {
  // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(form.formSelector)); // сделаем из них массив методом Array.from
  formList.forEach((formElement) => {
    //  Переберём полученную коллекцию
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
    });
    setEventListeners(formElement, form); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

enableValidation(object); //вызываем функцию, передаем ей объект с полями форм, которые надо проверить