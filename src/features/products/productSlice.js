import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchTerm: "",
  filters: {},
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export const {
  /*actions */
} = productSlice.actions;
export default productSlice.reducer;
