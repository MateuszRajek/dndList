import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.boards.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.boards = state.boards.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.boards = state.boards.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = boardsSlice.actions;

export default boardsSlice.reducer;
