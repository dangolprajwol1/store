import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosBase from "../../axiosBase";
export const UserLogin = createAsyncThunk(
  "user/UserLogin",
  async (credentials) => {
    const data = await axiosBase.post("login", {
      username: credentials[0],
      password: credentials[1],
    });
    console.log(data.data);
    return data.data;
  }
);
const UserSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    loggedIn: false,
    loggedInUser: "",
    userId: "",
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(UserLogin.pending, (state, action) => {})
      .addCase(UserLogin.fulfilled, (state, action) => {
        console.log(action);
        state.token = action.payload.token;
        state.loggedInUser = action.payload.user;
        state.userId = action.payload.uid;
        state.loggedIn = true;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
  },
});
export const { LoginActions, LogoutActions } = UserSlice.actions;
export default UserSlice;
