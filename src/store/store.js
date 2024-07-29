import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import boardsReducer from "./boards/boardsSlice";

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, logger),
});
