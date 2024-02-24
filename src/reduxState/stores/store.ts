import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// import {
// 	FLUSH,
// 	REHYDRATE,
// 	PAUSE,
// 	PERSIST,
// 	PURGE,
// 	REGISTER,
// } from "redux-persist"
import storage from "redux-persist/lib/storage";
import baseCreateApi from "../apis/baseCreateApi";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  version: 4,
  storage,
  whitelist: ["user", "expeneseCategory"],
};

const reducers = combineReducers({
  [baseCreateApi.reducerPath]: baseCreateApi.reducer,
  ...rootReducer,
});

const persistedreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedreducer,
  // enhancers: [],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //   serializableCheck: {
      //     ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //     ignoreActions: false,
      //   },
      serializableCheck: false,
    }).concat(baseCreateApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
