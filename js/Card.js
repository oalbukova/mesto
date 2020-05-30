import { togglePopup, popupBig } from "./index.js";

export default class Card {
  constructor(data, cardSelector) {
    // добавили второй параметр
    this._link = data.link; //this хранит ссылку на объект, на котором она вызвана
    this._name = data.name;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  };

  _getTemplate() {
    // забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement; // вернём DOM-элемент карточки
  };

  _cardLike(evt) {
    //функция лайков
    evt.target.classList.toggle("card__like_type_active");
  };

  _openImage(evt) {
    //открытие увеличенной картинки
    document.querySelector(".popup-view__caption").textContent = evt.target.alt;
    document.querySelector(".popup-view__img").src = evt.target.src;
    document.querySelector(".popup-view__img").alt = evt.target.alt;
    togglePopup(popupBig);
  };

  _cardDelete(evt) {
    //функция удаления
    const removeCard = evt.target.closest(".card"); //карточка
    const btnLike = removeCard.querySelector(".card__like");
    const btnDelete = removeCard.querySelector(".card__delete");
    const imageView = removeCard.querySelector(".card__img");

    btnLike.removeEventListener("click", this._cardLike); //удаление слушателя кнопки лайк
    btnDelete.removeEventListener("click", this._cardDelete); //удаление слушателя кнопки удалить
    imageView.removeEventListener("click", this._openImage); //удаление слушателя увеличения картинки

    removeCard.remove(); //удаление карточки
  };

  _setEventListeners() {
    this._element
      .querySelector(".card__like")
      .addEventListener("click", (evt) => {
        this._cardLike(evt);
      });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", (evt) => {
        this._cardDelete(evt);
      });

    this._element
      .querySelector(".card__img")
      .addEventListener("click", (evt) => {
        this._openImage(evt);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__img").src = this._link; //
    this._element.querySelector(".card__img").alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name; //добавляем текст

    return this._element;
  };
};
