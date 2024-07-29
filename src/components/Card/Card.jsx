import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EditIcon from "../../assets/icons/Edit.png";
import DeleteIcon from "../../assets/icons/Trash.png";
import Button from "../Button/Button";
import "./Card.css";

function Card({ id, content, children, onRemoveClick, onEditClick, handleAddCardClick }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="card">
        <p className="card-content">{content}</p>
        <div className="buttons-wrapper">
          <Button handleClick={() => onEditClick(id, content)}>
            <img className="card-btn-image" src={EditIcon} alt="edit icon" />
          </Button>
          <Button handleClick={() => onRemoveClick(id)}>
            <img className="card-btn-image" src={DeleteIcon} alt="delete icon" />
          </Button>
        </div>
      </div>
      <div style={{ marginLeft: 20 }}>
        <Button handleClick={() => handleAddCardClick(id)}>
          <span className="add-card-btn">+ Add a card</span>
        </Button>
      </div>
      {children}
    </div>
  );
}

export default Card;

