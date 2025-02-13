import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/application/slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
  };

const persistedReducer = persistReducer<ReturnType<typeof authReducer>>(
    persistConfig,
    authReducer
  );  

export const store = configureStore({
    reducer: {
        auth: persistedReducer
    }
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();