import { useEffect, useState } from "react";
import { apiUserInfo, apiCards } from "../utils/Api";
import avatar from "../../images/profile-avatar.png";
import Card from "../Card/Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    function getUserData() {
      apiUserInfo
        .getData()
        .then((data) => {
          setUserName(`${data.name}`);
          setUserDescription(`${data.about}`);
          setUserAvatar(`${data.avatar}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUserData();
  });

  const [cards, setCards] = useState([]);
  useEffect(() => {
    function getCardsInfo() {
      apiCards
        .getData()
        .then((data) => {
          console.log(data);
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCardsInfo();
  }, []);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-box">
            <img src={userAvatar} alt="аватар" className="profile__avatar" />
            <button
              type="button"
              aria-label="Редактировать фото"
              className=" button profile__avatar-overlay"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__name">{userName}</h1>
              <button
                type="button"
                aria-label="Редактировать информацию страницы"
                className="profile__edit-button button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__add-button button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements">
          <ul className="elements__table">
            {cards.map((card) => (
              <li className="elements__item" key={card._id}>
                <Card card={card} onCardClick={onCardClick} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
