import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "data/api/services/CreateAppSlice";
import { UserInfo } from "types";

interface AuthSliceState {
  user: UserInfo | null;
  token: string | null;
}

const initialState: AuthSliceState = {
  token: null,
  user: null,
};

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (auth) => ({
    setCredentials: auth.reducer(
      (state, action: PayloadAction<{ token: string; user: UserInfo }>) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      }
    ),
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  }),

  selectors: {
    selectUser: (auth) => auth.user,
    selectToken: (auth) => auth.token,
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const { selectUser, selectToken } = authSlice.selectors;
export default authSlice.reducer;
