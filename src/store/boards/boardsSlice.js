import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";

const initialState = {
  boardsList: [],
};

const moveItem = (items, activeId, overId) => {
  const oldIndex = items.findIndex((item) => item.id === activeId);
  const newIndex = items.findIndex((item) => item.id === overId);

  if (oldIndex !== -1 && newIndex !== -1) {
    return arrayMove(items, oldIndex, newIndex);
  }

  for (let i = 0; i < items.length; i++) {
    if (items[i].children) {
      const newChildren = moveItem(items[i].children, activeId, overId);
      if (newChildren !== items[i].children) {
        return [...items.slice(0, i), { ...items[i], children: newChildren }, ...items.slice(i + 1)];
      }
    }
  }

  return items;
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      const { parentId, newBoard } = action.payload;

      const addNested = (items, parentId, newBoard) => {
        if (parentId === null) {
          return [...items, newBoard];
        }

        return items.map((item) => {
          if (item.id === parentId) {
            return { ...item, children: [...item.children, newBoard] };
          }
          return {
            ...item,
            children: addNested(item.children, parentId, newBoard),
          };
        });
      };

      state.boardsList = addNested(state.boardsList, parentId, newBoard);
    },
    deleteBoard: (state, action) => {
      const deleteNested = (items, id) => {
        return items
          .filter((item) => item.id !== id)
          .map((item) => ({
            ...item,
            children: deleteNested(item.children, id),
          }));
      };

      state.boardsList = deleteNested(state.boardsList, action.payload);
    },
    updateBoard: (state, action) => {
      const updateNested = (items, payload) => {
        return items.map((item) => {
          if (item.id === payload.id) {
            return { ...item, content: payload.content };
          }
          return {
            ...item,
            children: updateNested(item.children, payload),
          };
        });
      };

      state.boardsList = updateNested(state.boardsList, action.payload);
    },
    moveBoard: (state, action) => {
      const { activeId, overId } = action.payload;
      state.boardsList = moveItem(state.boardsList, activeId, overId);
    },
  },
});

export const { addBoard, deleteBoard, updateBoard, moveBoard } = boardsSlice.actions;

export default boardsSlice.reducer;

