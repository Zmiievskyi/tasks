import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getDone, getTodo } from "../operations/boardOperations";
import {
  refreshUser,
  signupAction,
  signinAction,
  logoutAction,
} from "./operations";

// export type AuthStateType = {
//     user: {
//         name?: string;
//         email: string;
//         token: string;
//     };
//     status: {
//         isLogin: boolean;
//         isLoading: boolean;
//         isError: boolean;
//     };
// };

export interface AuthState {
  user: {
    id?: string;
    name?: string;
    email: string;
    token: string;
  };
  task:any;
  status: {
    isLogin: boolean;
    isLoading: boolean;
    isError: boolean;
    isRefreshing: boolean;
  };
}

const initialState: AuthState = {
  user: {
    id: "",
    name: "Guest",
    email: "",
    token: "",
  },
  task: {},
  status: {
    isLogin: false,
    isLoading: false,
    isError: false,
    isRefreshing: false,
  },
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<AuthState["user"]>) => {
      state.user = { ...payload };
    },
    setTask: (state, { payload }: PayloadAction<AuthState["task"]>) => {
      state.task = { ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutAction.pending, (state) => {
        state.status.isLoading = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = {
          isLogin: false,
          isLoading: false,
          isError: false,
          isRefreshing: false,
        };
        state.user = {
          name: "Guest",
          email: "",
          token: "",
        };
      })
      .addCase(logoutAction.rejected, (state) => {
        state.status.isLoading = false;
        state.status.isError = true;
      })
      .addCase(refreshUser.pending, (state) => {
        state.status.isLoading = true;
        state.status.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, { payload }) => {
        state.status.isLoading = false;
        state.status.isLogin = true;
        state.status.isRefreshing = false;
        state.user = {
          ...state.user,
          id: payload.id,
          email: payload.email,
        };
      })
      .addCase(refreshUser.rejected, (state) => {
        state.status.isLoading = false;
        state.status.isError = true;
        state.status.isRefreshing = false;
      })
      .addCase(signupAction.pending, (state) => {
        state.status.isLoading = true;
      })
      .addCase(signupAction.fulfilled, (state, { payload }) => {
        state.status.isLoading = false;
        state.status.isLogin = true;
        state.status.isError = false;

        state.user = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          token: payload.token,
        };
      })
      .addCase(signupAction.rejected, (state) => {
        state.status.isLoading = false;
        state.status.isError = true;
      })
      .addCase(signinAction.pending, (state) => {
        state.status.isLoading = true;
      })
      .addCase(signinAction.fulfilled, (state, { payload }) => {
        state.status.isLoading = false;
        state.status.isLogin = true;
        state.status.isError = false;

        state.user = {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          token: payload.token,
        };
      })
      .addCase(signinAction.rejected, (state) => {
        state.status.isLoading = false;
        state.status.isError = true;
      });
  },
});

export const { setUser, setTask } = AuthSlice.actions;
export const authReducer = AuthSlice.reducer;
