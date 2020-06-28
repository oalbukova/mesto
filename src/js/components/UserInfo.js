export default class UserInfo { //отвечает за управление отображением информации о пользователе на странице.
  constructor({
    userName,
    userInfo,
    userImg
  }) { //Принимает объект с селекторами элементов: элемента имени пользователя, элемента информации о себе и элемента подписи к картинке.
    this._name = userName;
    this._about = userInfo;
    this._img = userImg;
  }

  getUserInfo() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    }
  }

    setUserInfo(data) { //принимает новые данные пользователя с сервера и добавляет их на страницу.
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._img.alt = data.name;
      this._img.src = data.avatar;
    }

    setInfoUser(data) { //принимает новые данные пользователя из формы и добавляет их на страницу.
      this._name.textContent = data.name;
      this._about.textContent = data.about;
      this._img.alt = data.name;
    }
}