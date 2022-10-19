import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  products: null,
  messages: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      state.profile = action.payload.user;
    },
    updateUserState: (state, action) => {
      state.profile = action.payload
    },
    updateUserProducts: (state, action) => {
      state.products = action.payload
    },
    updateMessages: (state, action) => {
      state.messages = action.payload
    }
  },
});

export const { loginSuccess, logOut, tokenStillValid, updateUserState, updateUserProducts, updateMessages } = userSlice.actions;

export default userSlice.reducer;