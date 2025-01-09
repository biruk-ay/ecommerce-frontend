import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/application/slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();