/** @format */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RentSpace } from "@domain/models/rent-space.model";

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
