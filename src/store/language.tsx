import { createSlice } from "@reduxjs/toolkit";
import { locale } from "expo-localization";
import i18next from "i18next";
import { ILocal } from "configs/interface";
import { AppDispatch, IAppState } from "./interface";
import { Log } from "utils";

const defaultLang = locale.slice(0, 2) || "en";

export const languageSlice: any = createSlice({
  initialState: {
    systemLanguage: defaultLang as string,
  },
  name: "language",
  reducers: {
    setLanguage: (state, action) => {
      return { ...state, systemLanguage: action.payload };
    },
  },
});

const { setLanguage } = languageSlice.actions;

export const initializeLang =
  (): any => async (dispatch: AppDispatch, getState: () => IAppState) => {
    try {
      const state = getState();
      i18next.changeLanguage(state.language.systemLanguage);
      dispatch(setLanguage(state.language.systemLanguage));
    } catch (error) {
      Log(`initialize language error ${error}`);
    }
  };

export const changeLanguage =
  (language: ILocal): any =>
    async (dispatch: AppDispatch) => {
      try {
        i18next.changeLanguage(language);
        dispatch(setLanguage(language));
      } catch (error) {
        Log(`change language error ${error}`);
      }
    };

export default languageSlice.reducer;
