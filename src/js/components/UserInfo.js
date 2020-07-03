export default class UserInfo {
  constructor(userElement, avatarElement) {
    this._profileTitle = userElement.profileTitle;
    this._profileSubtitle = userElement.profileSubtitle;
    this._avatar = avatarElement;
  }
  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
      avatar: this._avatar.textContent
    };
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
  }
  
  getUserAvatar() {
      return this._avatar.src;
  }
  setUserAvatar(data) {
      this._avatar.src = data.avatar;
  };
  
  setInfoUser(data) {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
    this._profileTitle.id = data._id;
    this._avatar.src = data.avatar;
  }
}

/*export default class UserInfo {
  constructor(userElement, avatarElement) {
    this._profileTitle = userElement.profileTitle;
    this._profileSubtitle = userElement.profileSubtitle;
    this._avatar = avatarElement;
  }
  getUserInfo() {
    return {
      name: this._profileTitle.textContent,
      about: this._profileSubtitle.textContent,
    };
  }
  setUserInfo(data) {
    this._profileTitle.textContent = data.name;
    this._profileSubtitle.textContent = data.about;
  }
  
  getUserAvatar() {
      return this._avatar.src;
  }
  setUserAvatar(user) {
      this._avatar.src = user.avatar;
  };
  
  setInfoUser(user) {
    this._profileTitle.textContent = user.name;
    this._profileSubtitle.textContent = user.about;
    this._profileTitle.id = user._id;
    this._avatar.src = user.avatar;
  }
}*/



/*
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

  getUserAvatar() { //возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
    return {
      avatar: this._img.src
    }
  }

  setUserAvatar(data) { //принимает новые данные пользователя с сервера и добавляет их на страницу.
    this._img.src = data.avatar
  }

  setUserInfo(user) { //принимает новые данные пользователя с сервера и добавляет их на страницу.
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    this._img.alt = user.name;
    this._img.src = user.avatar;
 //   this._name.id = data._id;
  }

  setInfoUser(data) { //принимает новые данные пользователя из формы и добавляет их на страницу.
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._img.alt = data.name;
  }
}
/*
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

  setUserInfo() {
    //принимает новые данные пользователя с сервера и добавляет их на страницу.
    this._name.textContent =  user.name;
    this._about.textContent =  user.about;
 //   this._name.id = user._id;
    this._img.alt =  user.name;
    this._img.src =  user.avatar;
  }

  setInfoUser(data) { //принимает новые данные пользователя из формы и добавляет их на страницу.
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._img.alt = data.name;
  }
}*/