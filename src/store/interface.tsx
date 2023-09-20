import { appModals } from "configs";
import { store } from "store";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// modal types

type IModalName = keyof typeof appModals;

interface IModalConfigData {
  multiple: boolean;
  richText: string;
}

export interface IModalConfig {
  modalName: IModalName | null;
  modalData: IModalConfigData | null;
  variant: "default" | "simple";
  height: number | `${number}%`;
  innerHeight: number | `${number}%`;
  placeholder: string;
  noPadding?: boolean;
  noScrollView?: boolean;
  snapPoints: string[];
  noBorder?: boolean;
}

export interface IUploadedFile {
  id: string;
  url: string;
  name: string;
  createdBy: string;
}

export interface ISystemState {
  loading: boolean;
  initUserLoading: boolean;
  modalConfig: IModalConfig;
  imagePickerResult: any;
  currentModalResult: any;
  systemData: any;
  error: string | null;
  success: string | null;
  systemIsReady: boolean;
  progress: number;
}

export interface ILanguageState {
  systemLanguage: string;
}

export interface IUploadedFile {
  id: string;
  url: string;
  name: string;
  createdBy: string;
}

export interface ISystemPersistState {
  token: string | null;
  isUserInitialized: boolean;
  user: any;
  uploadedImages: Record<string, IUploadedFile>;
}

export interface IAppState {
  system: ISystemState;
  language: ILanguageState;
  systemPersist: ISystemPersistState;
}
