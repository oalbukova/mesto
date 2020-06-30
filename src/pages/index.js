import './index.css';
import custo from '../images/custo.jpg';
import logo from '../images/logo.svg';
import Card from '../js/components/Card.js';
import FormValidator from '../js/components/FormValidator.js';
import Section from '../js/components/Section.js';
import PopupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';
import {
  editButton,
  addButton,
  popupBig,
  cardList,
  nameInput,
  jobInput,
  //placeInput,
  //linkInput,
  cardTemplate,
  // initialCards,
  popupProfile,
  popupCards,
 // formСonfirm,
  profileTitle,
  profileSubtitle,
  profileImg,
  //prepend
} from '../js/utils/constants.js';
import {
  data
} from 'autoprefixer';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '77aadbcb-6e04-47e7-b5a0-c659fba79fac',
    'Content-Type': 'application/json'
  }
});

const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    api.addNewCard(item.name, item.link)
      .catch((err) => {
        console.log(err);
      });
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    }, cardTemplate);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
    cardForm.close();
  }
}, popupCards);


const popupWithImage = new PopupWithImage(popupBig); //передаем селектор по id попапа с большой картинкой

const openCardForm = () => {
  cardForm.cleanError();
  cardForm.open();
};

const userInfo = new UserInfo({ //изменение информации о пользователе 
  userName: profileTitle,
  userInfo: profileSubtitle,
  userImg: profileImg
});

api.getInfoUser()
  .then(data => userInfo.setUserInfo(data))
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

  const profileForm = new PopupWithForm({ //отправляем информацию, введенную пользоавателем на сервер
    formSubmit: () => {
      api.updateInfo(nameInput.value, jobInput.value)
        .then((result) => {
          userInfo.setInfoUser(result)
          profileForm.close();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, popupProfile);
  
  const openProfileForm = () => { //при открытии формы там стоят данные из профиля
    const infoAuthor = userInfo.getUserInfo();
    nameInput.value = infoAuthor.name;
    jobInput.value = infoAuthor.about;
    profileForm.cleanError();
    profileForm.open();
  };  

api.getInitialCards()
  .then((items) => {
    defaultCardList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

const defaultCardList = new Section({ //добавление картинок с сервера
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupWithImage.open(item);
      }
    }, cardTemplate); // передаём селектор темплейта при создании
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardList);


function formValidation() { // Найдём все формы с указанным классом в DOM
  const formList = Array.from(document.querySelectorAll(".popup__container")); // сделаем из них массив методом Array.from
  formList.forEach((form) => { //  Переберём полученную коллекцию
    const validator = new FormValidator({ // создаем экземпляр клааса с валидацией
      inputSelector: ".popup__input", //инпуты
      submitButtonSelector: ".popup__button-save", //кнопка сохранить/создать
      inactiveButtonClass: "popup__button-save_type_disabled", //неактивная кнопка
      inputErrorClass: "popup__input_type_error", //ошибка в инпуте
      errorClass: "popup__span-error_type_active",
    }, form);
    validator.enableValidation();
  });
}

addButton.addEventListener("click", openCardForm); //слушатель кнопки открытия попап картинки
editButton.addEventListener("click", openProfileForm); //слушатель кнопки открытия попап профиль

formValidation();

/*
const userInfo = new UserInfo({ //изменение информации о пользователе 
  userName: profileTitle,
  userInfo: profileSubtitle,
  userImg: profileImg
});


const profileForm = new PopupWithForm({ //отправляем информацию, введенную пользоавателем на сервер
  formSubmit: (item) => {
    api.updateInfo(item.name, item.about)
      .then((result) => {
        userInfo.setInfoUser(result)
        profileForm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, popupProfile);

const openProfileForm = () => { //при открытии формы там стоят данные из профиля
  const infoAuthor = userInfo.getUserInfo();
  nameInput.value = infoAuthor.name;
  jobInput.value = infoAuthor.about;
  profileForm.cleanError();
  profileForm.open();
};


let valueCard;
const deleteCardConfirm = new PopupWithForm({
  formSubmit: () => {
    api.deleteCard(valueCard.object._id)
      .then((result) => {
        valueCard.class.cardDelete();
        deleteCardConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}, formСonfirm);

const popupWithImage = new PopupWithImage(popupBig); //передаем селектор по id попапа с большой картинкой

const addCards = (card, position) => {
  //добавление карточки в DOM
  if (position === 'prepend') {
    defaultCardList.addItemPrepend(card);
  } else {
    defaultCardList.addItemAppend(card);
  }
};

const writeValueCard = (object, className) => {
  //запись значений в текущую карточку
  valueCard = {
    object: object,
    class: className
  };
};

const createCard = (item, userId, position) => {
  //создание карточки и добавление в разметку
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleDeleteClick: () => {
      deleteCardConfirm.open();
      writeValueCard(item, card);
    }
  }, cardTemplate, userId)
  const cardElement = card.generateCard();
  addCards(cardElement, position);
};

const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    api.addNewCard(item)
      .then((result) => {
        createCard(result, result.owner._id, prepend);
        cardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
  }
}, popupCards);

const openCardForm = () => {
  cardForm.cleanError();
  cardForm.open();
};

const defaultCardList = new Section({ //добавление картинок с сервера
  renderer: (item, userId) => {
    createCard(item, userId);
  }
}, cardList);

*/

/*
Promise.all([api.getInfoUser(), api.getInitialCards()]) //загрузка данных профиля и карточек 
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    defaultCardList.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.log(err);
  });

const deleteCardConfirm = new PopupWithForm ({  
      api.deleteCard(valueCard.object._id)  
          .then((result) => {
            valueCard.class.cardDelete(result);
              deleteCardConfirm.close();
          })
          .catch((err) => {
              console.log(err);
          });
  }
}, formСonfirm);

*/