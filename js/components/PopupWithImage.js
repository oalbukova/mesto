import Popup from './Popup.js';
import {
  popupViewCaption,
  popupViewImg
} from '../../pages/index.js'

export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super(popupSelector);
    this._name = data.name;
    this._link = data.link;
  }
  _setEventListeners() {
    super._setEventListeners();
  }

  open() {
    popupViewCaption.textContent = this._name;
    popupViewImg.src = this._link;
    popupViewImg.alt = this._name;
    super.open();
  }

  close() {
    super.close();
  }


_handleEscClose(evt) {
  super._handleEscClose(evt);
}
_handleOverlayClick(evt) {
  super._handleOverlayClick(evt);
}

}

//Создайте класс PopupWithImage, который наследует от Popup. Этот класс должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку и атрибут src изображения.