import languageReducer from "./language";
import systemReducer from "./system";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appEnv } from "configs/env";
import systemPersistReducer from "./system_persist";

const rootReducer = combineReducers({
  language: languageReducer,
  system: systemReducer,
  systemPersist: systemPersistReducer,
});

const persistConfig = {
  key: "Gwislab",
  storage: AsyncStorage,
  // whitelist: ['key1', 'key2'],//Things you want to persist
  blacklist: ["system"], //Things you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: appEnv.isDev,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
