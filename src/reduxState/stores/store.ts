import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import baseCreateApi from '../apis/baseCreateApi';

const persistConfig = {
	key: "root",
	version: 4,
	storage,
	whitelist: [

	]
}

const reducers = combineReducers({
	[baseCreateApi.reducerPath]: baseCreateApi.reducer,
})

const persistedreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		}
	}).concat(baseCreateApi.middleware)
})

