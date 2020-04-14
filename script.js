const popup = document.querySelector(".popup");
const openPopup = document.querySelector(".popup_opened");
const editButton = document.querySelector(".profile__edit-button");
const closePopup = document.querySelector(".popup__button_type_close");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".popup__imput_type_name");
let jobInput = document.querySelector(".popup__imput_type_job");
const formElement = document.querySelector(".popup__container");
const savePopup = document.querySelector(".popup__button_type_save");

function open() {
  let profileTitleName = profileTitle.textContent;
  let profileTitleJob = profileSubtitle.textContent;
  nameInput.value = `${profileTitleName}`;
  jobInput.value = `${profileTitleJob}`;
  popup.classList.add("popup_opened");
}

function close() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInputAdd = nameInput.value;
  let jobInputAdd = jobInput.value;
  profileTitle.textContent = `${nameInputAdd}`;
  profileSubtitle.textContent = `${jobInputAdd}`;
  close()
}

editButton.addEventListener("click", open);
closePopup.addEventListener("click", close);
formElement.addEventListener("submit", formSubmitHandler);