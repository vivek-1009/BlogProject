import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";   // import reducer

const store = configureStore({
  reducer: {
    auth: authReducer   // add reducer here
  }
})

export default store;