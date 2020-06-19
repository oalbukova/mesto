export default class UserInfo {
  constructor(user) {
    this._name = user.name;
    this._job = user.job;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    const userInfo = {
      person: this._name.textContent,
      about: this._job.textContent
    }
    return userInfo
  }

  setUserInfo(data) {
    this._name.textContent = data.person;
    this._job.textContent = data.about;
  }
}

/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
*/