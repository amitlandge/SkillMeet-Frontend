import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./Reducers/userSlice.js";
import miscSlice from "./Reducers/misc.js";
import profileSlice from "./Reducers/profileSlice.js";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [profileSlice.name]: profileSlice.reducer,
  },
  devTools: true,
});

export default store;
