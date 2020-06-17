import {
  nameInput,
  jobInput
} from './../utils/constants.js'

export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    nameInput.value = this._name.textContent,
      jobInput.value = this._job.textContent
  }

  setUserInfo() { //принимает новые данные пользователя и добавляет их на страницу.
    this._name.textContent = nameInput.value;
    this._job.textContent = jobInput.value;
    this._name.alt = nameInput.value;
  }
}

/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/