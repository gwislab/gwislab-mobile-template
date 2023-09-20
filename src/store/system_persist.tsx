import { createSlice } from "@reduxjs/toolkit";
import { ISystemPersistState } from "./interface";
import { removeNulls } from "utils";

const initialState: ISystemPersistState = {
  token: null,
  isUserInitialized: false,
  uploadedImages: {},
  user: null
};

export const systemPersistSlice = createSlice({
  initialState,
  name: "system",
  reducers: {
    setToken: (state: ISystemPersistState, action) => {
      return { ...state, token: action.payload };
    },

    removeToken: (state: ISystemPersistState) => {
      return { ...state, token: null };
    },

    reinitializeSystemPersist: (state: ISystemPersistState) => {
      return { ...state, ...initialState };
    },

    setIsUserInitialized: (state: ISystemPersistState) => {
      return { ...state, isUserInitialized: true };
    },

    removeIsUserInitialized: (state: ISystemPersistState) => {
      return { ...state, isUserInitialized: false };
    },
    setUploadedImages: (state: ISystemPersistState, action) => {
      const uploadedImages = {
        ...state.uploadedImages,
        [action.payload.id]: action.payload,
      };

      return {
        ...state,
        uploadedImages: removeNulls(uploadedImages),
      };
    },

    resetUploadedImages: (state: ISystemPersistState) => {
      return {
        ...state,
        uploadedImages: {},
      };
    },

    removeUploadedImages: (state: ISystemPersistState, action) => {
      const uploadedImages = {
        ...state.uploadedImages,
        [action.payload.id]: undefined,
      };

      return {
        ...state,
        uploadedImages: removeNulls(uploadedImages),
      };
    },
  },
});

export const {
  setToken,
  removeToken,
  reinitializeSystemPersist,
  setIsUserInitialized,
  removeIsUserInitialized,
  setUploadedImages,
  removeUploadedImages,
  resetUploadedImages
} = systemPersistSlice.actions;

export default systemPersistSlice.reducer;
