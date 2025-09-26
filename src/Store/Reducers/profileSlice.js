import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  profile: null,
  profileStatus: false,
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.profileStatus = true;
    },
    clearProfile: (state) => {
      state.profileStatus = false;
      state.profile = null;
    },
  },
});
export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice;
