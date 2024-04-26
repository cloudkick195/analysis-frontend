import api from "utils/api_public";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "utils/app/@reduxjs/toolkit";
import { useInjectReducer } from "utils/app/redux-injectors";
import { AuthState } from "./types";
import {
  setCookie,
  deleteCookie,
  hasCookie
} from "cookies-next";
import Router from "next/router";



const AUTH_KEY = process.env.AUTH_KEY as string;
const TRY_GAME_KEY = process.env.TRY_GAME_KEY as string;

export const initialState: AuthState = {
  loading: {
    login: false,
    register: false,
    email: false,
    phone: false,
    forgotPassword: false
  },
  error: {
    login: "",
    register: "",
    email: "",
    phone: "",
    forgotPassword: ""
  },
  isLoggedIn: hasCookie(AUTH_KEY) ?? false
};

const logOut = createAsyncThunk(
  "auth/logout",
  async (params: any, action: any) => {
    try {
      deleteCookie(AUTH_KEY);
      
      // if (Router.pathname === "/") {
      //   window.location.reload()
      // }
      window.location.href = "/login"
      return true;
    } catch (err: any) {
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const login = createAsyncThunk(
  "auth/login",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.post(`${process.env.BASE_API_URL_PUBLIC}/login`, params);

      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
    
      const user = {
        token: data.token,
      };
      setCookie(AUTH_KEY, user);
      await action.dispatch(resetState());
      if (params.register) {
        return window.location.href = "/thank-you"
      }
      // if (Router.pathname === "/sign-up" || Router.pathname === "/forgot-password") {
      //   return window.location.href = "/"
      // }
      return window.location.href = "/"
      //window.location.reload()
      return user;
    } catch (err: any) {
     
      if (err.response?.data?.message === 'wrong_password' || err.response?.data?.message === 'user_not_found') {
        return action.rejectWithValue('Tên đăng nhập hoặc mật khẩu không đúng');
      }
      return action.rejectWithValue('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
  }
);

const register = createAsyncThunk(
  "auth/sign-up",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.post('/identity-mbe/profile/register', params);
      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
      action.dispatch(login({ username: params.username, password: params.password, register: true }));
      return data;
    } catch (err: any) {
      if (err.response?.data?.username === 'UsernameExisted') {
        return action.rejectWithValue('Tên đăng nhập đã tồn tại');
      }
      return action.rejectWithValue(
        // showError(err.response?.data?.errors, ", ")
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }
);

const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (params: any, action: any) => {
    try {
      const { status, data } = await api.post('/identity-mbe/profile/forgot-password', params);
      if (status !== 200) {
        return action.rejectWithValue("Đã có lỗi xảy ra, vui lòng thử lại sau");
      }
      return data;
    } catch (err: any) {
      return action.rejectWithValue(
        // showError(err.response?.data?.errors, ", ")
        'Đã có lỗi xảy ra, vui lòng thử lại sau'
      );
    }
  }

);
const resetState = createAsyncThunk("auth/resetState", () => {
  return true;
});
const checkAuth = createAsyncThunk("auth/check", (isLoginPage:any) => {
  const isCookie = hasCookie(AUTH_KEY) ?? false;
  if(!isCookie && !isLoginPage){
    return window.location.href = "/login"
  }

  if(isCookie && isLoginPage){
    return window.location.href = "/"
  }

  return 
});


const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /***
     *
     * Login
     *
     */
    builder.addCase(login.pending, (state: any, action: any) => {
      state.loading.login = true;
      state.error.login = "";
    });
    builder.addCase(login.fulfilled, (state: any, action: any) => {
      state.loading.login = false;
      state.isLoggedIn = true;
      state.error.login = "success";
    });
    builder.addCase(login.rejected, (state: any, action: any) => {
      state.loading.login = false;
      state.error.login = action.payload;
    });
    /***
     *
     * Logout
     *
     */
    builder.addCase(logOut.fulfilled, (state: any, action: any) => {
      state.isLoggedIn = false;
    });
    /***
     *
     * Register
     *
     */
    builder.addCase(register.pending, (state: any, action: any) => {
      state.loading.register = true;
      state.error.register = "";
    });
    builder.addCase(register.fulfilled, (state: any, action: any) => {
      state.loading.register = false;
      state.error.register = "success"
    });
    builder.addCase(register.rejected, (state: any, action: any) => {
      state.loading.register = false;
      state.error.register = action.payload;
    });
    /***
     *
     * Forgot Password
     *
     */
    builder.addCase(forgotPassword.pending, (state: any, action: any) => {
      state.loading.forgotPassword = true;
      state.error.forgotPassword = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state: any, action: any) => {
      state.loading.forgotPassword = false;
      state.error.forgotPassword == "success"
    });
    builder.addCase(forgotPassword.rejected, (state: any, action: any) => {
      state.loading.forgotPassword = false;
      state.error.forgotPassword = action.payload;
    });
    /***
     *
     * Reset state
     *
     */
    builder.addCase(resetState.pending, (state: any, action: any) => {
      state.loading = {
        login: false,
        register: false
      };
      state.error = {
        login: "",
        register: "",
      };
    });
    builder.addCase(resetState.fulfilled, (state: any, action: any) => {
      state.loading = {
        login: false,
        register: false
      };
      state.error = {
        login: "",
        register: ""
      };
    });
    builder.addCase(resetState.rejected, (state: any, action: any) => {
      state.loading = {
        login: false,
        register: false
      };
      state.error = {
        login: "",
        register: "",
      };
    });

    /***
     *
     * Check auth
     *
     */
    builder.addCase(checkAuth.fulfilled, (state: any, action: any) => {
      state.isLoggedIn = false;
    });
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return {
    ...slice.actions,
    register,
    login,
    logOut,
    resetState,
    forgotPassword,
    checkAuth
  };
};
