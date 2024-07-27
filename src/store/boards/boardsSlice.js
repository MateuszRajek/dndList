import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boardsList: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
      state.boardsList.push(action.payload);
    },
    deleteBoard: (state, action) => {
      state.boardsList = state.boardsList.filter((board) => board.id !== action.payload);
    },
    updateBoard: (state, action) => {
      state.boardsList = state.boardsList.map((board) => (board.id === action.payload.id ? action.payload : board));
    },
  },
});

export const { addBoard, deleteBoard, updateBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
