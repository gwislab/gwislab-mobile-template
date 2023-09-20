import { createSlice } from "@reduxjs/toolkit";
import { appDimension } from "configs";
import { ISystemState } from "./interface";
import { convertArrayToObject, removeNulls } from "utils";

const initialState: ISystemState = {
  loading: false,
  initUserLoading: false,
  modalConfig: {
    modalName: null,
    modalData: null,
    variant: "default",
    height: appDimension.height * 0.3,
    innerHeight: "98%",
    placeholder: "No Placeholder provided",
    snapPoints: ["25%", "50%"],
    noPadding: false,
    noScrollView: false,
    noBorder: false,
  },
  imagePickerResult: null,
  currentModalResult: null,
  systemData: {} as any,
  error: null,
  success: null,
  systemIsReady: false,
  progress: 0,
};

export const systemSlice = createSlice({
  initialState,
  name: "system",
  reducers: {
    startLoading: (state) => {
      return { ...state, loading: true };
    },

    finishLoading: (state) => {
      return { ...state, loading: false };
    },

    setProgress: (state, action) => {
      return { ...state, progress: action.payload };
    },

    endProgress: (state) => {
      return { ...state, progress: 0 };
    },

    reinitializeSystem: (state) => {
      return { ...state, ...initialState };
    },

    setSystemIsReady: (state) => {
      return { ...state, systemIsReady: true };
    },

    setSystemFinishedSettingUp: (state) => {
      return { ...state, systemIsReady: false };
    },

    startInitUserLoading: (state) => {
      return { ...state, initUserLoading: true };
    },

    finishInitUserLoading: (state) => {
      return { ...state, initUserLoading: false };
    },

    openModal: (state, action) => {
      return { ...state, modalConfig: action.payload };
    },

    removeError: (state) => {
      return { ...state, error: null };
    },

    showError: (state, action) => {
      return { ...state, error: action.payload };
    },

    removeSuccess: (state) => {
      return { ...state, success: null };
    },

    showSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },

    closeModal: (state) => {
      return {
        ...state,
        modalConfig: {
          ...state.modalConfig,
          modalData: null,
          modalName: null,
        },
      };
    },

    setImagePickerResult: (state, action) => {
      return { ...state, imagePickerResult: action.payload };
    },

    setCurrentModalResult: (state, action) => {
      return { ...state, currentModalResult: action.payload };
    },

    setSystemData: (state, action) => {
      return {
        ...state,
        systemData: {
          ...state.systemData,
          [action.payload.key]: action.payload.value,
        },
      };
    },

    deleteSystemData: (state, action) => {
      const { [action.payload]: _, ...rest } = state.systemData;
      return { ...state, systemData: rest };
    },
  },
});

export const {
  startLoading,
  finishLoading,
  openModal,
  closeModal,
  setImagePickerResult,
  setCurrentModalResult,
  setSystemData,
  deleteSystemData,
  removeError,
  showError,
  removeSuccess,
  showSuccess,
  startInitUserLoading,
  finishInitUserLoading,
  setSystemIsReady,
  endProgress,
  setProgress,
  setSystemFinishedSettingUp,
  reinitializeSystem,
} = systemSlice.actions;

export default systemSlice.reducer;
