
export default class UserInfo {
  constructor(user) {
    this._profileTitle = user.profileTitle;
    this._profileSubtitle = user.profileSubtitle;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const userInfo = {
      person: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent
    }
    return userInfo
  }

  setUserInfo(data) {
    this._profileTitle.textContent = data.person;
    this._profileSubtitle.textContent = data.about;
  }
}

/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/
/*
import {
  nameInput,
  jobInput
} from '../utils/constants.js'

export default class UserInfo {
  constructor(user) {
    this._name = user.name;
    this._job = user.job;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const userObject = {
    name: this._name.textContent,
    job: this._job.textContent
  }
  return userObject
  }

  setUserInfo() { //принимает новые данные пользователя и добавляет их на страницу.
    this._name.textContent = nameInput.value;
    this._job.textContent = jobInput.value;
   // this._name.alt = nameInput.value;
  }
}*/