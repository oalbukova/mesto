export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
        return err;
      })
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
      })
      .then((cards) => {
        return cards;
      })
      .catch((err) => {
        return err;
      });
  }

  updateInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        }),
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
      .then((result) => {
        return result
      })
      .catch((err) => {
        return err
      });
  }







}