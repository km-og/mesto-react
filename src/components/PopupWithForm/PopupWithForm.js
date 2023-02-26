function PopupWithForm({ title, name, children, isOpen, onClose }) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className="popup__container"
          name={`${name}-forma`}
          method="post"
          noValidate
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
