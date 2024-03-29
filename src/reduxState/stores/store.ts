import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { useDispatch } from "react-redux";

import rootReducer from "./rootReducer";
// import { actionListenerEnhancer } from "../enhancers/actionListener";
import baseCreateApi from "../apis/baseCreateApi";
import { authApi } from '../apis/authApi';

const persistConfig = {
  key: "root",
  version: 4,
  storage,
  whitelist: ["user", "expeneseCategory", "expense", "incomeCategory", "incomes", "remainder"],
};

const reducers = combineReducers({
  [baseCreateApi.reducerPath]: baseCreateApi.reducer,
  ...rootReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // enhancers: [actionListenerEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseCreateApi.middleware).concat(authApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch;
