import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUserAPI,
  registerUserAPI,
  forgotPasswordAPI,
  resetPasswordAPI,
  confirmOTPAPI,
  changePasswordAPI,
  getUserDetailsAPI,
  sendConfirmationEmailAPI,
  confirmEmailAPI,
  updateEmailAPI,
} from "@services/api/authService";

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const data = await loginUserAPI(userData);
      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    userData: {
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      country: string;
      city: string;
      phoneNumber: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await registerUserAPI(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      return await forgotPasswordAPI(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    userData: { email: string; newPassword: string; resetToken: string },
    { rejectWithValue },
  ) => {
    try {
      return await resetPasswordAPI(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Reset password failed");
    }
  },
);

export const confirmOTP = createAsyncThunk(
  "user/confirmOTP",
  async (
    userData: { email: string; forgotToken: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      return await confirmOTPAPI(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Confirm OTP failed");
    }
  },
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    userData: {
      oldPassword: string;
      newPassword: string;
      refreshToken: string;
    },
    { rejectWithValue },
  ) => {
    try {
      return await changePasswordAPI(userData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Change password failed");
    }
  },
);

export const updateEmail = createAsyncThunk(
  "user/updateEmail",
  async(
    userData: {
      userId: string;
      email: string;
    },
    {rejectWithValue},
  ) => {
    try {
      return await updateEmailAPI(userData);
    }
    catch(error: any)
    {
      return rejectWithValue(error.respnse?.data || "Update email failed");
    }
  }
)

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserDetailsAPI();
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "User details fetch failed",
      );
    }
  },
);

export const sendConfirmationEmail = createAsyncThunk(
  "user/sendConfirmEmail",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      return await sendConfirmationEmailAPI(userData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Send confirmation email failed",
      );
    }
  },
);

export const confirmEmail = createAsyncThunk(
  "user/confirmEmail",
  async (
    userData: { email: string; token: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      return await confirmEmailAPI(userData);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Send confirmation email failed",
      );
    }
  },
);
