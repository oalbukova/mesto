export default class Card {
  constructor({
    data,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  }, cardSelector, userId) {
    this._name = data.name; //this хранит ссылку на объект, на котором она вызвана
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
    this._clickLike = () => {
      this._handleCardLike({
        id: this._id,
        like: this._element.querySelector('.like__button').classList.contains('like__button_type_active'),
        likeSum: this._element.querySelector('.like__sum')
      });
    };
  }

  _getTemplate() { //забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement; // вернём DOM-элемент карточки
  }

  _checkCardOwner(_owner) {
    if (this._owner === this._userId) {
      return;
    } else {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }

  _likeCardOwner(_id) {
    if (this._likes.some((user) =>
        (user._id === this._userId))) {
      this._element.querySelector('.like__button').classList.add('like__button_type_active');
    }
  }

  cardLike(sum) { //функция лайков
    this._element.querySelector(".like__button").classList.toggle("like__button_type_active");
    if (sum === 0) {
      this._element.querySelector('.like__sum').style.display = 'none';
    } else {
      this._element.querySelector('.like__sum').style.display = 'block';
      this._element.querySelector('.like__sum').textContent = sum;
    }
  }

  cardDelete() {//функция удаления карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".like__button")
      .addEventListener("click", () => {
        this._clickLike();
      });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleCardDelete()
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
    this._checkCardOwner(this._owner)
    this._likeCardOwner(this._id)
    if (this._likes.length === 0) {
      this._element.querySelector('.like__sum').style.display = 'none';
    }
    this._element.querySelector('.like__sum').textContent = this._likes.length;
    return this._element;
  }
}