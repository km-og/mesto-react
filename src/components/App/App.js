import { useEffect, useState } from "react";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import Main from "../Main/Main.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = useState(false);

  function handleCardClick(card) {
    console.log(card);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        children={
          <>
            <label className="popup__error-box">
              <input
                id="name-input"
                type="text"
                className="popup__item popup__item_type_name"
                name="editHeading"
                placeholder="Имя"
                defaultValue="Жак-Ив Кусто"
                required
                minLength="2"
                maxLength="40"
              />
              <span className="popup__error name-input-error"></span>
            </label>
            <label className="popup__error-box">
              <input
                id="description-input"
                type="text"
                className="popup__item popup__item_type_description"
                name="editSubheading"
                placeholder="О себе"
                defaultValue="Исследователь океана"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="popup__error description-input-error"></span>
            </label>
            <button type="submit" className="popup__save-button button">
              Сохранить
            </button>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Новое место"
        name="add"
        children={
          <>
            <label className="popup__error-box">
              <input
                id="title-input"
                type="text"
                className="popup__item popup__item_type_name"
                name="cardName"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="popup__error title-input-error"></span>
            </label>
            <div className="popup__error-box">
              <input
                id="link-input"
                type="url"
                className="popup__item popup__item_type_link"
                name="cardLink"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="popup__error link-input-error"></span>
            </div>
            <button type="submit" className="popup__save-button button">
              Создать
            </button>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="delete"
        children={
          <>
            <button
              type="button"
              className="popup__save-button popup-delete__save-button button"
            >
              Да
            </button>
          </>
        }
      />

      <PopupWithForm
        title="Обновить аватар"
        name="change"
        children={
          <>
            <div className="popup__error-box">
              <input
                id="link-avatar-input"
                type="url"
                className="popup__item popup__item_type_link"
                name="cardLink"
                placeholder="Ссылка на фото"
                required
              />
              <span className="popup__error link-avatar-input-error"></span>
            </div>
            <button type="submit" className="popup__save-button button">
              Сохранить
            </button>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <Footer />
    </div>
  );
}

export default App;
