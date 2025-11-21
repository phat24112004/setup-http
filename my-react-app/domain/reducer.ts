/** @format */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RentSpace } from "./models/rent-space.model";

interface RentSpaceState {
  items: RentSpace[];
}

const initialState: RentSpaceState = {
  items: [],
};

const rentSpaceSlice = createSlice({
  name: "rentSpace",
  initialState,
  reducers: {
    setRentSpaces(state, action: PayloadAction<RentSpace[]>) {
      state.items = action.payload;
    },
  },
});

export const { setRentSpaces } = rentSpaceSlice.actions;
export default rentSpaceSlice.reducer;
