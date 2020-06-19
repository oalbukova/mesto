import Popup from './Popup.js';

export default class PopupWithImage extends Popup { //наследует от Popup 
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) { //перезаписывает родительский метод open. Вставляет в попап картинку, атрибут src изображения и подпись к картинке.
    const popupViewImg = this._popupSelector.querySelector(".popup-view__img");
    const popupViewCaption = this._popupSelector.querySelector(".popup-view__caption");
    popupViewImg.src = data.link;
    popupViewImg.alt = data.name;
    popupViewCaption.textContent = data.name;
    super.open();
  }

}

/*
  Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения и подпись к картинке.
  */