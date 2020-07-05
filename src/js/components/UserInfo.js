export default class UserInfo {//отвечает за управление отображением информации о пользователе на странице.
  constructor(userElement, avatarElement) {//Принимает объект с селекторами элементов: элемента имени пользователя, элемента информации о себе и элемента картинки.
    this._profileTitle = userElement.profileTitle;
    this._profileSubtitle = userElement.profileSubtitle;
    this._avatar = avatarElement;
  }
  getUserInfo() {//возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._avatar.textContent
    };
  }

  setUserInfo(data) {//принимает новые данные пользователя и добавляет их на страницу.
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
    this._profileTitle.id = data._id;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
  }
  
  getUserAvatar() {
      return this._avatar.src;
  }
  setUserAvatar(data) {
      this._avatar.src = data.avatar;
  };
  

}