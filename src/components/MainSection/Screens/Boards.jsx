import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import Button from "../../Button/Button";
import Card from "../../Card/Card";
import Modal from "../../Modal/Modal";
import { v4 as uuidv4 } from "uuid";
import { addBoard, deleteBoard, updateBoard, moveBoard } from "../../../store/boards/boardsSlice";

function Boards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editableId, setEditableId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const boardsList = useSelector((state) => state.boards.boardsList);
  const dispatch = useDispatch();

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleAddCardClick = (id) => {
    setParentId(id || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInputValue("");
    setEditableId(null);
    setParentId(null);
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
    }
    setInputValue("");
    setIsModalOpen(false);
    setParentId(null);
  };

  const handleRemoveCardClick = (id) => {
    dispatch(deleteBoard(id));
  };

  const handleOnEditCardClick = (id, content) => {
    setEditableId(id);
    setIsModalOpen(true);
    setInputValue(content);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      dispatch(moveBoard({ activeId: active.id, overId: over.id }));
    }
  };

  const flattenBoards = (boards) => {
    return boards.reduce((acc, board) => {
      acc.push(board);
      if (board.children) {
        acc.push(...flattenBoards(board.children));
      }
      return acc;
    }, []);
  };

  const renderBoard = (board) => (
    <Card key={board.id} id={board.id} content={board.content} onRemoveClick={handleRemoveCardClick} onEditClick={handleOnEditCardClick} handleAddCardClick={handleAddCardClick}>
      {board.children && (
        <div className="card-child">
          <SortableContext items={board.children.map((child) => child.id)} strategy={verticalListSortingStrategy}>
            {board.children.map(renderBoard)}
          </SortableContext>
        </div>
      )}
    </Card>
  );

  return (
    <>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
        <SortableContext items={flattenBoards(boardsList).map((board) => board.id)} strategy={verticalListSortingStrategy}>
          <div className="boards-wrapper">{boardsList.map(renderBoard)}</div>
        </SortableContext>
      </DndContext>
      <Button handleClick={() => handleAddCardClick(null)}>
        <p className="add-card-btn">+ Add a card</p>
      </Button>
      {isModalOpen && <Modal onSubmit={handleSubmit} inputValue={inputValue} onInputChange={handleInputChange} closeModal={closeModal} />}
    </>
  );
}

export default Boards;

