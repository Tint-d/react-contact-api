import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      Cookies.set("token", state.token, { expires: 30 });
      Cookies.set("user", JSON.stringify(state.user), { expires: 30 });
    },
    removeUser: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
