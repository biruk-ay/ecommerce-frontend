// @ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthState from "../states/AuthState";
import AuthProvider from "../../di/authProvider";
import SMStatus from "../../../../lib/sm/state/smStatus";
import type { RootState } from "../../../store/store";


const initialState: AuthState = {
    isLoggedIn: false,
    name: null,
    email: null,
    token: null,
    role: null,
    id: null,
    status: SMStatus.none,
    error: undefined
}



export const login = createAsyncThunk<Omit<AuthState, "isLoggedIn" | "status" | "error">, {name: string; password: string}>(
    "auth/login",
    async ({name, password}, thunkAPI) => {   
      try {
          const response = await AuthProvider.provideAuth().login(name, password);
          return {
            name: response.user.name,
            email: response.user.email,
            token: response.user.token,
            role: response.user.role,
            id: response.user.id

          };
      }catch(error: any){
        return thunkAPI.rejectWithValue(error.message);
    }
}
);

export const register = createAsyncThunk<Omit<AuthState, "isLoggedIn" | "status" | "error">, {name: string, email: string, password: string}>(
    "auth/register",
    async ({name, email, password}, thunkAPI) => {   
      try {
          const response = await AuthProvider.provideAuth().register(name, email, password);
          return {
            name: response.user.name,
            email: response.user.email,
            token: response.user.token,
            id: response.user.id

          };
      }catch(error: any){
        return thunkAPI.rejectWithValue(error.message);
    }
}
);


export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state){
            state.isLoggedIn = false
            state.name = null
            state.email = null
            state.token = null
            state.role = null
            state.id = null
            state.status = SMStatus.none
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = SMStatus.loading;
                state.error = undefined;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.id = action.payload.id;
                state.status = SMStatus.done;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = SMStatus.failed;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.status = SMStatus.loading;
                state.error = undefined;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.token = action.payload.token;
                state.id = action.payload.id;
                state.status = SMStatus.done;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = SMStatus.failed;
                state.error = action.payload;
            })
    }
    }
)

export default AuthSlice.reducer;
export const { logout } = AuthSlice.actions;

export const selectUserEmail = (state: RootState) => state.auth.email;
export const selectUserName = (state: RootState) => state.auth.name;
export const selectUserToken = (state: RootState) => state.auth.token;
export const selectUserRole = (state: RootState) => state.auth.role;
export const selectUserId = (state: RootState) => state.auth.id;
export const selectLoading = (state: RootState) => state.auth.status
