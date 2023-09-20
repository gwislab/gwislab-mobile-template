import { createSlice } from "@reduxjs/toolkit";
import { ISystemPersistState } from "./interface";

const initialState: ISystemPersistState = {
  token: null,
  isUserInitialized: false,
};

export const systemPersistSlice = createSlice({
  initialState,
  name: "system",
  reducers: {
    setToken: (state, action) => {
      return { ...state, token: action.payload };
    },

    removeToken: (state) => {
      return { ...state, token: null };
    },

    reinitializeSystemPersist: (state) => {
      return { ...state, ...initialState };
    },

    setIsUserInitialized: (state) => {
      return { ...state, isUserInitialized: true };
    },

    removeIsUserInitialized: (state) => {
      return { ...state, isUserInitialized: false };
    },
  },
});

export const {
  setToken,
  removeToken,
  reinitializeSystemPersist,
  setIsUserInitialized,
  removeIsUserInitialized,
} = systemPersistSlice.actions;

export default systemPersistSlice.reducer;
