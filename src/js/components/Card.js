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

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
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

  cardDelete() {
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
    console.log(this._userId);
    console.log(this._id);
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


/*
export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector, deleteCard) {
    this._name = data.name; //this хранит ссылку на объект, на котором она вызвана
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  }

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);

    this._element = cardElement;
    this._element.id = this._id;
    return this._element;
  }

  _checkCardOwner(_owner) {
    if (this._owner === '04cf6095a30093ec591c58eb') {
      return;
    } else {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }

  _cardLike(evt) { //функция лайков
    evt.target.classList.toggle("like__button_type_active");
  }

  _cardDelete() {
     //this._element.remove();
    this._deleteCard();
    this._element = null;
  }

  _cardClickHandler(evt) {
    if (evt.target.classList.contains('card__delete')) { // удаление
      this._cardDelete();
    }
  };

  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener('click', this._cardHandler);

    this._element
      .querySelector(".like__button")
      .addEventListener("click", (evt) => {
        this._cardLike(evt);
      })
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
    return this._element;
  }
}*/


/*
/*import Api from "./Api.js";
//import {
 // Popup
//} from "./Popup.js";

/*
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '77aadbcb-6e04-47e7-b5a0-c659fba79fac',
    'Content-Type': 'application/json'
  }
});

export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector, deleteCard) {
    this._name = data.name; //this хранит ссылку на объект, на котором она вызвана
    this._link = data.link;
    this._id = data._id;
    this._owner = data.owner._id;
    this._deleteCard = deleteCard;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
  }

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);
    this._element = cardElement;
    this._element.id = this._id;

    return cardElement; // вернём DOM-элемент карточки
  }

  _checkCardOwner(_owner) {
    if (this._owner === '04cf6095a30093ec591c58eb') {
      return;
    } else {
      this._element.querySelector('.card__delete').style.display = 'none';
    }
  }

  _cardDelete() {
    this._deleteCard(); // коллбэк для удаления карточки с сервера
  };


  _cardClickHandler(evt) {
    if (evt.target.classList.contains('card__delete')) { // удаление
      this._cardDelete();
    }
  };

  _cardLike(evt) { //функция лайков
    evt.target.classList.toggle("card__like_type_active");
  }
  /*
    _cardDelete() { //функция удаления карточки
      this._element.remove();
      this._element = null;
    }*/
/*
  _setEventListeners() {
    this._cardHandler = this._cardClickHandler.bind(this);
    this._element.addEventListener('click', this._cardHandler);

    this._element
      .querySelector(".like__button")
      .addEventListener("click", (evt) => {
        this._cardLike(evt);
      });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click", () => {
   //     this._cardDelete();
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
    return this._element;
  }


  deleteCardNew(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
        headers: {
          authorization: '77aadbcb-6e04-47e7-b5a0-c659fba79fac',
          'Content-Type': 'application/json'
        }
      })
      .then(this._element.remove())
   //   .then(this._element = null)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`error${res.status}`);
      });
  };

}

/*
export default class Card {
  constructor({
    data,
    handleCardClick,
 //   handleDeleteClick
  }, cardSelector, userId) {
    this._name = data.name; //this хранит ссылку на объект, на котором она вызвана
    this._link = data.link;
   // this._id = data._id;
  //  this._owner = data.owner;
  //  this._userId = userId;
    this._cardDelete = cardDelete;
    this._handleCardClick = handleCardClick;
 //   this._handleDeleteClick = handleDeleteClick;
    this._cardSelector = cardSelector;
  }

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement; // вернём DOM-элемент карточки
  }

  _cardLike(evt) { //функция лайков
    evt.target.classList.toggle("like__button_type_active");
  }
  /*
    _checkCardOwner(_owner) {
      if (this._owner === '04cf6095a30093ec591c58eb') {
        return;
      } else {
        this._element.querySelector('.card__delete').style.display = 'none';
      }
    }
 
  cardDelete() { //функция удаления карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".like__button")
      .addEventListener("click", (evt) => {
        this._cardLike(evt);
      });

    this._element
      .querySelector(".card__delete")
      .addEventListener("click",
        this._handleDeleteClick
      );

    this._element
      .querySelector(".card__img")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
 //   const cardImg = this._element.querySelector(".card__img");
 //   if (this._owner._id !== this._userId) {
  //    this._element.querySelector('.card__delete').style.display = 'none';
  //  }
    this._element.querySelector(".card__text").textContent = this._name; //добавляем текст
    cardImg.src = this._link;
    cardImg.alt = this._name;
    //  this._checkCardOwner(_owner);
    return this._element;
  }
}
*/
/*
export default class Card {
  constructor({
    data,
    handleCardClick
  }, cardSelector, userId) {
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes;
      this._id = data._id;
      this._author = data.owner;
      this._handleCardClick = handleCardClick;
      this._cardSelector = cardSelector;  
      this._userId = userId;


      this._likeClick = () => {
          this._handleLikeClick({
              id: this._id,
              like: this._element.querySelector('.like__button').classList.contains('like__button_type_active'),
              likeCounter: this._element.querySelector('.like__button-counter')
          });
      };
  }

  _getTemplate() { //забираем размеку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector) // используем this._cardSelector
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement; // вернём DOM-элемент карточки
  }


  _cardLike(evt) { //функция лайков
    evt.target.classList.toggle("like__button_type_active");
  }

  cardDelete() { //функция удаления карточки
    this._element.remove();
    this._element = null;
  }


/*
  handleLike(quantity) {
      this._element.querySelector('.like__button').classList.toggle('like__button_type_active');
      this._element.querySelector('.like__button-counter').textContent = quantity;

  }

  _setEventListeners() {
    this._element
      .querySelector(".like__button")
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

    if (this._author._id !== this._userId) {
      this._element.querySelector('.card__delete').style.display = 'none';
  }
    this._element.querySelector(".card__text").textContent = this._name; //добавляем текст
    cardImg.src = this._link;
    cardImg.alt = this._name;
    return this._element;
  }




/*
  generateCard() {
      this._element = this._getTemplate();
      const elementsImage = this._element.querySelector('.elements__image');
      this._setEventListeners();
      if (this._author._id !== this._userId) {
          this._element.querySelector('.card__delete').style.display = 'none';
      }
      if (this._likes.some((user) => (user._id === this._userId))) {
          this._element.querySelector('.like__button').classList.add('like__button_type_active');
      }
      this._element.querySelector('.elements__name').textContent = this._name;
      elementsImage.src = this._link;
      elementsImage.alt = this._name;
      this._element.querySelector('.like__button-counter').textContent = this._likes.length;

      return this._element;
  }
}
*/