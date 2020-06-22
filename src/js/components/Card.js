export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector) {
    this._name = data.name; //this хранит ссылку на объект, на котором она вызвана
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  }

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement; // вернём DOM-элемент карточки
  }

  _cardLike(evt) { //функция лайков
    evt.target.classList.toggle("card__like_type_active");
  }

  _cardDelete() { //функция удаления карточки
    this._element.remove();
    this._element = null;
  }

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
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImg = this._element.querySelector(".card__img");
    this._element.querySelector(".card__text").textContent = this._name; //добавляем текст
    cardImg.src = this._link;
    cardImg.alt = this._name;
    return this._element;
  }
}