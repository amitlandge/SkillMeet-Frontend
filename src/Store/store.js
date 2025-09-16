import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./Reducers/userSlice.js";
import miscSlice from "./Reducers/misc.js";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
  },
  devTools: true,
});

export default store;
