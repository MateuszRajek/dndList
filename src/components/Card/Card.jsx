import EditIcon from "../../assets/icons/Edit.png";
import DeleteIcon from "../../assets/icons/Trash.png";
import Button from "../Button/Button";
import "./Card.css";

function Card({ content, id, onRemoveClick, onEditClick }) {
  const handleRemoveClick = () => {
    onRemoveClick(id);
  };

  const handleEditClick = () => {
    onEditClick(id, content);
  };
  return (
    <div className="card">
      <p className="card-content">{content}</p>
      <div className="buttons-wrapper">
        <Button handleClick={handleEditClick}>
          <img className="card-btn-image" src={EditIcon} alt="edit icon" />
        </Button>
        <Button handleClick={handleRemoveClick}>
          <img className="card-btn-image" src={DeleteIcon} alt="edit icon" />
        </Button>
      </div>
    </div>
  );
}

export default Card;
