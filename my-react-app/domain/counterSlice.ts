/** @format */
import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
      console.log("✅ Đã ấn nút, giá trị hiện tại:", state.value); // ✅ log ra console
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
