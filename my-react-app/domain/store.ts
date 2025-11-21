/** @format */

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

// Tạo store chính
export const RootStore = configureStore({
  reducer: rootReducer,
});

// Kiểu dữ liệu của state và dispatch
export type RootState = ReturnType<typeof RootStore.getState>;
export type AppDispatch = typeof RootStore.dispatch;
  