import Button from "../Button/Button";
import CloseIcon from "../../assets/icons/Close.png";
import "./Modal.css";
function Modal({ onSubmit, inputValue, onInputChange, closeModal }) {
  const handleInputChange = (event) => {
    onInputChange(event.target.value);
  };
  return (
    <div className="modal">
      <div className="modal-form-wrapper">
        <form className="modal-form" onSubmit={onSubmit}>
          <input onChange={handleInputChange} value={inputValue} className="modal-form-input" type="text" placeholder="Type something..." />
          <Button>Save</Button>
        </form>
        <div className="close-icon-wrapper">
          <Button handleClick={closeModal}>
            <img className="modal-close-icon" src={CloseIcon} alt="close-icon" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
