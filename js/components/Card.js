export default class Card {
  constructor({data, handleCardClick}, cardSelector) {// добавили второй параметр
    this._name = data.name;//this хранит ссылку на объект, на котором она вызвана
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  }

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement = cardElement;

    return this._cardElement; // вернём DOM-элемент карточки
  }
  _cardLike(evt) { //функция лайков
    evt.target.classList.toggle("card__like_type_active");
  }

  //_imgEscapeKeydown(evt) { //функция закрытия картинки по нажатию Esc 
  //  if (evt.key === ESCAPE_KEY) {
  //    popupBig.classList.remove("popup_opened");
 //   }
 // }

 // _imgOverlayClick(evt) { //закрытие  картинки по клику на оверлей
 //   if (evt.target.classList.contains("popup")) {
   //   popupBig.classList.remove("popup_opened");
  //  }
 // }

  //_openCloseImage() { //открытие увеличенной картинки 
   // const isOpen = popupBig.classList.contains("popup_opened");
  //  if (!isOpen) {
  //    const popupViewImg = document.querySelector(".popup-view__img");
  //    const popupViewCaption = document.querySelector(".popup-view__caption");
  //    popupViewCaption.textContent = this._name;
   //   popupViewImg.src = this._link;
   //   popupViewImg.alt = this._name;
    //  document.addEventListener("keydown", this._imgEscapeKeydown); //слушатель закрытие картинки по нажатию Esc
    //  document.addEventListener("click", this._imgOverlayClick); //слушатель закрытие картинки по клику на оверлей
  //  } else {
  //    document.removeEventListener("keydown", this._imgEscapeKeydown); //снятие слушателя закрытие картинки по нажатию Esc
  //    document.removeEventListener("click", this._imgOverlayClick); //снятие слушателя закрытие картинки по клику на оверлей
  //  }
  //  popupBig.classList.toggle("popup_opened");
 // }

  _cardDelete() { //функция удаления
   // const removeCard = evt.target.closest(".card"); //карточка
    const removeCard = this._cardElement.closest(".card"); //карточка
    const btnLike = removeCard.querySelector(".card__like");
    const btnDelete = removeCard.querySelector(".card__delete");
  //  const imageView = removeCard.querySelector(".card__img");

    btnLike.removeEventListener("click", this._cardLike); //удаление слушателя кнопки лайк
    btnDelete.removeEventListener("click", this._cardDelete); //удаление слушателя кнопки удалить
   // imageView.removeEventListener("click", this._handleCardClick); //удаление слушателя увеличения картинки

    removeCard.remove(); //удаление карточки
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like")
      .addEventListener("click", () => {
        this._cardLike();
      });

    this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._cardDelete();
      });

    this._cardElement
      .querySelector(".card__img")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  generateCard() {
    this._getTemplate();
    //this._element = this._getTemplate();
    this._setEventListeners();

    const cardImg = this._cardElement.querySelector(".card__img");
    cardImg.src = this._link;
    cardImg.alt = this._name;
    this._cardElement.querySelector(".card__text").textContent = this._name; //добавляем текст

    //return this._element;
    return this._cardElement;
  }
}
