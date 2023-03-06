import { useEffect, useState } from "react";
import { CardsContext } from "../../contexts/CardsContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { AddPlacePopup } from "../AddPlacePopup/AddPlacePopup.js";
import { EditAvatarPopup } from "../EditAvatarPopup/EditAvatarPopup.js";
import { EditProfilePopup } from "../EditProfilePopup/EditProfilePopup.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import Main from "../Main/Main.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import { apiCards, apiNewUserInfo, apiUserInfo } from "../utils/Api.js";

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

  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    function getUserInfo() {
      apiUserInfo
        .getData()
        .then((data) => {
          setCurrentUser(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUserInfo();
  }, []);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    function getCardsInfo() {
      apiCards
        .getData()
        .then((data) => {
          setCards(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCardsInfo();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const methodType = isLiked ? "DELETE" : "PUT";
    // console.log(methodType);
    apiCards.likeCard(card._id, methodType).then((newCard) => {
      // console.log(newCard); данные карточки, которую лайкнули
      setCards((state) =>
        // console.log(state)  массив со всеми карточками
        state.map((c) =>
          // console.log(c)  каждая карточка этого массива
          c._id === card._id ? newCard : c
        )
      );
    });
  }

  function handleCardDelete(card) {
    apiCards.deleteCardBtn(card._id).then((newCard) => {
      setCards((state) => {
        const newState = state.filter((item) => {
          return item._id !== card._id;
        });
        return newState;
      });
    });
  }

  function handleUpdateUser(data) {
    apiNewUserInfo.sendData(data, "PATCH").then((newData) => {
      setCurrentUser(newData);
    });
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    apiNewUserInfo.changeAvatar(data).then((newAvatar) => {
      setCurrentUser(newAvatar);
    });
    closeAllPopups();
  }

  function handleAddPlaceSubmit(data) {
    apiCards.sendData(data, "POST").then((newCard) => {
      setCards([newCard, ...cards]);
    });
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCard={handleAddPlaceSubmit}
          />

          <PopupWithForm
            title="Вы уверены?"
            name="delete"
            children={null}
            nameBtn="Да"
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Footer />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
