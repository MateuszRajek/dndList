import EditIcon from "../../assets/icons/Edit.png";
import DeleteIcon from "../../assets/icons/Trash.png";
import Button from "../Button/Button";
import "./Card.css";

function Card({ content, id, onRemoveClick, onEditClick, isEditable }) {
  const handleRemoveClick = () => {
    onRemoveClick(id);
  };

  const handleEditClick = () => {
    onEditClick(id, content);
  };
  return (
    <div className="card">
      <div className="card-content" contentEditable={isEditable}>
        {content}
      </div>
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
