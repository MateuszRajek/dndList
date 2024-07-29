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
  const [parentId, setParentId] = useState(null);
  const boardsList = useSelector((state) => state.boards.boardsList);
  const dispatch = useDispatch();

  const handleAddCardClick = (id) => {
    if (id) {
      setParentId(id);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue("");
    setEditableId(null);
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
      dispatch(addBoard({ parentId, newBoard: { content: inputValue, id: uuidv4(), children: [] } }));
      setParentId(null);
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
        {boardsList.map(({ id, content, children }) => (
          <Card key={id} id={id} content={content} children={children} onRemoveClick={handleRemoveCardClick} onEditClick={handleOnEditCardClick} handleAddCardClick={handleAddCardClick} />
        ))}
      </div>
      <Button handleClick={() => handleAddCardClick()}>
        <p className="add-card-btn">+ Add a card</p>
      </Button>
      {isModalOpen && <Modal onSubmit={handleSubmit} inputValue={inputValue} onInputChange={handleInputChange} closeModal={closeModal} />}
    </div>
  );
}

export default Boards;

