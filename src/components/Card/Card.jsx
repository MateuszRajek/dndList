import EditIcon from "../../assets/icons/Edit.png";
import DeleteIcon from "../../assets/icons/Trash.png";
import Button from "../Button/Button";
import "./Card.css";

function Card({ content, id, children, onRemoveClick, onEditClick, handleAddCardClick }) {
  const handleRemoveClick = () => {
    onRemoveClick(id);
  };

  const handleEditClick = () => {
    onEditClick(id, content);
  };
  return (
    <>
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
      <div style={{ marginLeft: 20 }}>
        <Button handleClick={() => handleAddCardClick(id)}>
          <span className="add-card-btn">+ Add a card</span>
        </Button>
      </div>
      {children &&
        children.length > 0 &&
        children.map(({ id: childId, content: childContent, children: childChildren }) => (
          <div style={{ marginLeft: 20 }} key={childId}>
            <Card id={childId} content={childContent} children={childChildren} onRemoveClick={onRemoveClick} onEditClick={onEditClick} handleAddCardClick={handleAddCardClick} />
          </div>
        ))}
    </>
  );
}

export default Card;

