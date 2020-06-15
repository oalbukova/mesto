import {
  nameInput,
  jobInput
} from '../../pages/index.js';

export default class UserInfo { //отвечает за управление отображением информации о пользователе на странице
  constructor(name, about ) { //принимает объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
    this._name = name;
    this._about = about;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии. При открытии формы профиль там стоят значения из профиля
    nameInput.value = this._name.textContent; //вставляем в инпут значение имени из профиля
    jobInput.value = this._about.textContent; //вставляем в инпут значение профессии из профиля
  }

  setUserInfo() { //принимает новые данные пользователя и добавляет их на страницу.
    this._name.textContent = nameInput.value; //присваиваим имени значение, введенное пользователем в инпут
    this._about.textContent = jobInput.value; //присваиваим профессии значение, введенное пользователем в инпут
    this._name.alt = nameInput.value; //присваиваим альт значение имени, введенное пользователем в инпут
  }
}