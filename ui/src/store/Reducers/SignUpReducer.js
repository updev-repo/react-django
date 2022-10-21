import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userInfo: {},
  error: false,
  success: false,
};

export const userSignup = createAsyncThunk(
  "user/signup",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/signup/",
        { username, email, password },
        config
      );
      // store user's token in local storage
      localStorage.setItem("AccessToken", JSON.stringify(data));
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

export const signupSlicer = createSlice({
  name: "signup",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
    },
    resetAll: (state) => {
      state.error = false;
      state.success = false;
      state.loading = false;
      state.userInfo = null;
    },
  },
  extraReducers: {
    [userSignup.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [userSignup.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    [userSignup.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.userInfo = payload;
    },
  },
});

export const { reset, resetAll } = signupSlicer.actions;

export default signupSlicer.reducer;
