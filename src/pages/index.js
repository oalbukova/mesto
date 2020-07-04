import './index.css';
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
  avatarButton,
  popupBig,
  cardList,
  nameInput,
  jobInput,
  cardTemplate,
  popupProfile,
  popupCards,
  popupСonfirm,
  popupAvatar,
  profileInfo,
  profileAvatar,
  prepend
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

const loading = (isLoading, form, defaultButtonText, loadingMessage) => {  /*не знаю как упростить эту функцию, делал как в тренажере*/
  const currentButton = form.querySelector('.popup__button-save');

  if(isLoading) {
      currentButton.textContent = loadingMessage;
  } else {
      currentButton.textContent = defaultButtonText;
  }
}

const userInfo = new UserInfo( //изменение информации о пользователе 
  profileInfo, profileAvatar
);

const profileForm = new PopupWithForm({ //отправляем информацию, введенную пользоавателем на сервер
  formSubmit: () => {
    loading(true, popupProfile,'Сохранить', 'Сохранение...');
    api.updateInfo(nameInput.value, jobInput.value)
      .then((result) => {
        userInfo.setInfoUser(result);
        profileForm.close();
      })
      .catch((err) => {
        console.log(err);// выведем ошибку в консоль
      })
      .finally(() => {
        loading(false, popupProfile,'Сохранить', 'Сохранение...');
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

const avatarForm = new PopupWithForm({ //отправляем информацию, введенную пользоавателем на сервер
  formSubmit: (item) => {
    loading(true, popupAvatar, 'Сохранить', 'Сохранение...');
    api.updateAvatar(item.link)
      .then((item) => {
        userInfo.
        setUserAvatar(item);       
      })
      .then(() => {
        avatarForm.close();
    })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading(false, popupAvatar, 'Сохранить', 'Сохранение...');
    });
  }
}, popupAvatar);

const openAvatarForm = () => {
  avatarForm.open();
  avatarForm.cleanError();
}

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
}, popupСonfirm);


const addLike = (object) => { //добавление лайка
  api.addLike(object)
    .then((result) => {
      valueCard.class.cardLike(result.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteLike = (object) => {//удаление лайка
  api.deleteLike(object)
    .then((result) => {
      valueCard.class.cardLike(result.likes.length);
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupWithImage = new PopupWithImage(popupBig);//передаем селектор по id попапа с большой картинкой

const addCards = (card, position) => {//добавление карточки в DOM
  if (position === 'prepend') {
    defaultCardList.addItemPrepend(card);
  } else {
    defaultCardList.addItemAppend(card);
  }
};

const writeValueCard = (object, className) => {//запись значений в текущую карточк
  valueCard = {
    object: object,
    class: className
  };
};

const createCard = (item, userId, position) => { //создание карточки и добавление в разметку
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleCardLike: (cardObject) => {
      if (cardObject.like) {
        deleteLike(cardObject);
      } else {
        addLike(cardObject);
      }
      writeValueCard(item, card);
    },
    handleCardDelete: () => {
      deleteCardConfirm.open();
      writeValueCard(item, card);
    }
  }, cardTemplate, userId);
  const cardElement = card.generateCard();
  addCards(cardElement, position);
};

const cardForm = new PopupWithForm({
  formSubmit: (item) => {
    loading(true, popupCards, 'Создать', 'Создание...');
    api.addNewCard(item.name, item.link)
      .then((result) => {
        createCard(result, result.owner._id, prepend);
        cardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        loading(false, popupCards, 'Создать', 'Создание...');
    });
  }
}, popupCards);

const openCardForm = () => {
  cardForm.cleanError();
  cardForm.open();
};

const defaultCardList = new Section({//класс для добавления начальных карточек
  renderer: (item, userId) => {
    createCard(item, userId); 
  }
}, cardList);

Promise.all([api.getInfoUser(), api.getInitialCards()]) //загрузка данных профиля и карточек 
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    defaultCardList.renderItems(cards, user._id);
  })
  .catch((err) => {
    console.log(err);
  });

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
avatarButton.addEventListener("click", openAvatarForm); //слушатель кнопки открытия попап аватар

formValidation()