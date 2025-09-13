import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./Reducers/userSlice.js";

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  devTools: true,
});

export default store;
