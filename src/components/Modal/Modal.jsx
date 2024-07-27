import Button from "../Button/Button";
import "./Modal.css";
function Modal({ onSubmit, inputValue, onInputChange }) {
  const handleInputChange = (event) => {
    onInputChange(event.target.value);
  };
  return (
    <div className="modal">
      <form className="modal-form" onSubmit={onSubmit}>
        <input onChange={handleInputChange} value={inputValue} className="modal-form-input" type="text" placeholder="Type something..." />
        <Button>Save</Button>
      </form>
    </div>
  );
}

export default Modal;
