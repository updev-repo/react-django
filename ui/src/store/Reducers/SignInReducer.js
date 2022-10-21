import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  userInfo: {},
  error: false,
  success: false,
};

export const userSignIn = createAsyncThunk(
  "user/signin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:8000/api/signin/",
        { username, password },
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

// export const logout = createAsyncThunk(
//   "user/logout",
//   async (rejectWithValue) => {
//     try {
//       // configure header's Content-Type as JSON
//       const { data } = await axios.post(
//         process.env.REACT_APP_API_URL + "/authentication/logout"
//       );
//       // store user's token in local storage
//       return data;
//     } catch (error) {
//       // return custom error message from API if any
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         return rejectWithValue(error);
//       }
//     }
//   }
// );

export const signinSlicer = createSlice({
  name: "signin",
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
    // login user
    [userSignIn.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [userSignIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    [userSignIn.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.userInfo = payload;
    },
    // logut user
    // [logout.pending]: (state) => {
    //   state.loading = true;
    //   state.error = null;
    //   state.isLoggedIn = false;
    //   state.success = false;
    // },
    // [logout.fulfilled]: (state, { payload }) => {
    //   state.loading = false;
    //   state.userInfo = payload;
    //   state.success = true;
    //   state.isLoggedIn = false;
    //   localStorage.removeItem("userDetails");
    // },
    // [logout.rejected]: (state, { payload }) => {
    //   state.loading = false;
    //   state.success = false;
    //   state.error = true;
    //   state.userInfo = payload;
    //   state.isLoggedIn = false;
    // },
  },
});

export const { reset, resetAll } = signinSlicer.actions;

export default signinSlicer.reducer;
