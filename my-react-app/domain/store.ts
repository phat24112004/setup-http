/** @format */
import { configureStore } from "@reduxjs/toolkit";
// import rentSpaceReducer from "./reducer";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    // rentSpace: rentSpaceReducer,
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//Đây là Redux store – nơi gom tất cả reducer lại.
