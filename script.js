const popup = document.querySelector(".popup");
const formElement = document.querySelector(".popup__container");
const openPopup = document.querySelector(".popup_opened");
const closePopup = document.querySelector(".popup__button-close");
const editButton = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let nameInput = document.querySelector(".popup__imput_type_name");
let jobInput = document.querySelector(".popup__imput_type_job");
const savePopup = document.querySelector(".popup__button-save");


function editForm() {
  if (popup.classList.contains("popup_opened")) {
    popup.classList.remove("popup_opened");
  } else {
    let profileTitleName = profileTitle.textContent;
    let profileTitleJob = profileSubtitle.textContent;
    nameInput.value = `${profileTitleName}`;
    jobInput.value = `${profileTitleJob}`;
    popup.classList.add("popup_opened");
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameInputAdd = nameInput.value;
  let jobInputAdd = jobInput.value;
  profileTitle.textContent = `${nameInputAdd}`;
  profileSubtitle.textContent = `${jobInputAdd}`;
  editForm()
}

editButton.addEventListener("click", editForm);
closePopup.addEventListener("click", editForm);
formElement.addEventListener("submit", formSubmitHandler);