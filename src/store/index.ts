import { configureStore } from "@reduxjs/toolkit";
import flowReducer from "./editor/flowSlice";
import themeSlice from "./slices/theme.slice";
import sliceMenuTutor from "./slices/menu.slice";
import slicingStorage from "./slices/storage.slice";
import { api } from "./api";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    flow: flowReducer,
    theme: themeSlice,
    menu: sliceMenuTutor,
    slicingStorage: slicingStorage,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
