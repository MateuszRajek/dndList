import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardsList: [
    {
      id: "1",
      content: "Board 1",
      children: [
        { id: "4", content: "Card 1", children: [{ id: "6", content: "Task 1", children: [] }] },
        { id: "5", content: "Card 2", children: [] },
      ],
    },
    { id: "2", content: "Board 2", children: [] },
    { id: "3", content: "Board 3", children: [] },
  ],
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
  },
});

export const { addBoard, deleteBoard, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;

