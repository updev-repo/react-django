import { configureStore } from "@reduxjs/toolkit";
import SignInReducer from "./Reducers/SignInReducer";
import SignUpReducer from "./Reducers/SignUpReducer";

export const store = configureStore({
  reducer: {
    signin: SignInReducer,
    signup: SignUpReducer,
  },
});
