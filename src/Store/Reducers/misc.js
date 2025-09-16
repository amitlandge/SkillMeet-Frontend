import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sideMenu: false,
};
const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setSideMenu: (state, action) => {
      state.sideMenu = action.payload;
    },
  },
});
export const { setSideMenu } = miscSlice.actions;
export default miscSlice;
