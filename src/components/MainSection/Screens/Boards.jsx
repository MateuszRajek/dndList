import { useDispatch, useSelector } from "react-redux";
import Button from "../../Button/Button";
import Card from "../../Card/Card";
import { useState } from "react";
import Modal from "../../Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import { addBoard, deleteBoard, updateBoard } from "../../../store/boards/boardsSlice";

function Boards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editableId, setEditableId] = useState(null);
  const boardsList = useSelector((state) => state.boards.boardsList);
  const dispatch = useDispatch();

  const handleAddCardClick = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editableId) {
      dispatch(updateBoard({ content: inputValue, id: editableId }));
      setEditableId(null);
    } else {
      dispatch(addBoard({ content: inputValue, id: uuidv4() }));
    }
    setInputValue("");
    setIsModalOpen(false);
  };

  const handleRemoveCardClick = (id) => {
    dispatch(deleteBoard(id));
  };

  const handleOnEditCardClick = (id, content) => {
    setEditableId(id);
    setIsModalOpen(true);
    setInputValue(content);
  };

  return (
    <div>
      <div className="boards-wrapper">
        {boardsList.map(({ id, content }) => (
          <Card key={id} id={id} content={content} onRemoveClick={handleRemoveCardClick} onEditClick={handleOnEditCardClick} is />
        ))}
      </div>
      <Button handleClick={handleAddCardClick}>
        <p className="add-card-btn">+ Add a card</p>
      </Button>
      {isModalOpen && <Modal onSubmit={handleSubmit} inputValue={inputValue} onInputChange={handleInputChange} />}
    </div>
  );
}

export default Boards;
