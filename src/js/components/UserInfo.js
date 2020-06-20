export default class UserInfo { //отвечает за управление отображением информации о пользователе на странице.
  constructor({userName, userInfo, userImg}) { //Принимает объект с селекторами элементов: элемента имени пользователя, элемента информации о себе и элемента подписи к картинке.
    this._name = userName;
    this._info = userInfo;
    this._img = userImg;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    }
  }

  setUserInfo(data) { //принимает новые данные пользователя и добавляет их на страницу.
    this._name.textContent = data.name;
    this._info.textContent = data.info;
    this._img.alt = data.name;
  }
}