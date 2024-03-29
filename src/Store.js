import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
  } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/User"
import artsReducer from "./slices/Arts"
import errorReducer from "./slices/Error"

const rootReducer = combineReducers({
    arts: artsReducer,
    user: userReducer,
    error: errorReducer
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage: storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
        }
    })
})

export const persistor = persistStore(store)
export default store