function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <>
      <div className="elements__card">
        <button
          type="button"
          aria-label="Удалить"
          className="elements__delete-button button"
        ></button>
        <img
          className="elements__photo"
          src={card.link}
          onClick={handleClick}
        />
      </div>
      <div className="elements__subline">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__likes">
          <button
            type="button"
            aria-label="Нравится"
            className="elements__like-button button"
          ></button>
          <p className="elements__likes-quantity">{card.likes.length}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
