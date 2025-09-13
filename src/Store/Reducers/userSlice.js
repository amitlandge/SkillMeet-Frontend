import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticated: false,
};
const userSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice;
