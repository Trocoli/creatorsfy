import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "data/api/services/CreateAppSlice";
import { UserInfo } from "types";

interface AuthSliceState {
  userInfo: UserInfo | null;
  token: string | null;
  isLoggedIn?: boolean;
}

const initialState: AuthSliceState = {
  token: null,
  userInfo: null,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (auth) => ({
    setCredentials: auth.reducer(
      (state, action: PayloadAction<{ token: string; userInfo: UserInfo }>) => {
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo;
        state.isLoggedIn = !!state.userInfo;
      }
    ),
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
    },
  }),

  selectors: {
    selectUser: (auth) => auth.userInfo,
    selectToken: (auth) => auth.token,
    selectIsLoggedIn: (auth) => auth.isLoggedIn,
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const { selectUser, selectToken, selectIsLoggedIn } =
  authSlice.selectors;
export default authSlice.reducer;
