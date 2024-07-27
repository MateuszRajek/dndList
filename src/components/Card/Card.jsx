import EditIcon from "../../assets/icons/Edit.png";
import DeleteIcon from "../../assets/icons/Trash.png";
import Button from "../Button/Button";
import "./Card.css";

function Card() {
  return (
    <div className="card">
      <div className="card-content">content</div>
      <div className="buttons-wrapper">
        <Button>
          <img className="card-btn-image" src={EditIcon} alt="edit icon" />
        </Button>
        <Button>
          <img className="card-btn-image" src={DeleteIcon} alt="edit icon" />
        </Button>
      </div>
    </div>
  );
}

export default Card;
