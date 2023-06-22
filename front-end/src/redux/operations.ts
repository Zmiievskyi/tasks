import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import User from "../models/user";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const logoutAction = createAsyncThunk("user/logout", async () => {
  clearAuthHeader();
});

export const signupAction = createAsyncThunk(
  "user/signup",
  async (user: User, thunkAPI) => {
    try {
      const response = await axios.post(`/auth/signup`, user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signinAction = createAsyncThunk(
  "user/signin",
  async (user: User, thunkAPI) => {
    try {
      const response = await axios.post(`/auth/signin`, user);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    try {
      const state: any = thunkAPI.getState();
      const persistedToken = state.auth.user.token;
      if (persistedToken === "") {
        return thunkAPI.rejectWithValue("Unable to fetch user");
      }
      setAuthHeader(persistedToken);
      const response = await axios.post(`/user/refresh`, {
        email: state.auth.user.email,
      });
      response.data.token = persistedToken;
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
