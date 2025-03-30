import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@services/api/api";

interface UserState {
  userId: string | null;
  role: string | null;
  accessToken: string | null;
  confirmed: boolean | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}

const storedUser = localStorage.getItem("user");
const initialState: UserState = storedUser
  ? {
      ...JSON.parse(storedUser),
      accessToken: null,
      status: "IDLE",
      loggedIn: false,
    }
  : {
      userId: null,
      role: null,
      confirmed: null,
      status: "IDLE",
      loggedIn: false,
      accessToken: null, // leave it as it is
    };

// Fetch User Profile (Placeholder API)
export const loginUser = createAsyncThunk(
  "user/login",
  async (
    userData: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("auth/login", userData);
      return response.data;
    } catch (error: any) {
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
      const response = await api.post("auth/register", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/forgot-password", userData);
      return response.data;
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
      const response = await api.post("auth/reset-password", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
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
      console.log("from userSlice: " + userData);
      const response = await api.post("auth/confirm-otp", userData);
      return response.data;
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
      console.log("from userSlice: " + userData);
      const response = await api.post("auth/change-password", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Change Password failed");
    }
  },
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("user/me");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "User details fetch failed",
      );
    }
  },
);

export const sendConfirmationEmail = createAsyncThunk(
  "user/sendConfirmationEmail",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/send-confirmation-email", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Send Confirmation Email failed",
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
      const response = await api.post("auth/confirm-email", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Confirm Email failed");
    }
  },
);
// Create Redux Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userId = null;
      state.role = null;
      state.confirmed = null;
      state.status = "IDLE";
      state.loggedIn = false;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(loginUser.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        const userData = action.payload; // Extract user object from response

        if (userData) {
          console.log("Login Response Payload:", userData);
          state.userId = userData.userID || null;
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          state.confirmed = userData.confirmed || null;
          state.status = "SUCCESS";
          state.loggedIn = true;
          localStorage.setItem("accessToken", userData.accessToken);
          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: userData.userID,
              role: userData.role,
              refreshToken: userData.refreshToken,
            }),
          );
        } else {
          console.error("User data missing in API response:", action.payload);
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "FAILED";
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        const userData = action.payload;

        if (userData) {
          state.userId = userData.userId || null;
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          localStorage.setItem("accessToken", userData.accessToken);
          localStorage.setItem("refreshToken", userData.refreshToken);
          state.confirmed = userData.confirmed || false;
          state.status = "SUCCESS";
          state.loggedIn = true;
          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: userData.userID,
              role: userData.role,
              refreshToken: userData.refreshToken,
            }),
          );
        }
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "FAILED";
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(
        forgotPassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          const userData = action.payload;

          if (userData) {
            state.status = "SUCCESS";
          }
        },
      )
      .addCase(forgotPassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Confirm OTP
      .addCase(confirmOTP.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(confirmOTP.fulfilled, (state, action: PayloadAction<any>) => {
        const userData = action.payload;

        if (userData) {
          // state.resetToken = userData.resetToken || null;
          state.status = "SUCCESS";
        }
      })
      .addCase(confirmOTP.rejected, (state) => {
        state.status = "FAILED";
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        const userData = action.payload;

        if (userData) {
          state.userId = userData.userId || null;
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          localStorage.setItem("refreshToken", userData.refreshToken);
          state.status = "SUCCESS";
          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: userData.userID,
              role: userData.role,
              refreshToken: userData.refreshToken,
            }),
          );
        }
      })
      .addCase(resetPassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          const userData = action.payload;

          if (userData) {
            state.accessToken = userData.accessToken || null;
            localStorage.setItem("refreshToken", userData.refreshToken);
            state.status = "SUCCESS";
          }
        },
      )
      .addCase(changePassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Get User Details
      .addCase(getUserDetails.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          const userData = action.payload;

          if (userData) {
            state.userId = userData.userId || null;
            state.status = "SUCCESS";
          } else {
            console.error("User data missing in API response:", action.payload);
          }
        },
      )
      .addCase(getUserDetails.rejected, (state) => {
        state.status = "FAILED";
      })
      // Send Confirmation Email
      .addCase(sendConfirmationEmail.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(
        sendConfirmationEmail.fulfilled,
        (state, action: PayloadAction<any>) => {
          const userData = action.payload;

          if (userData) {
            state.status = "SUCCESS";
          } else {
            console.error("User data missing in API response:", action.payload);
          }
        },
      )
      .addCase(sendConfirmationEmail.rejected, (state) => {
        state.status = "FAILED";
      })
      // Confirm Email
      .addCase(confirmEmail.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(confirmEmail.fulfilled, (state, action: PayloadAction<any>) => {
        const userData = action.payload;
        console.log("Redux Payload: " + JSON.stringify(action.payload));
        if (userData) {
          state.status = "SUCCESS";
          state.userId = userData.userID;
          state.role = userData.role;
          state.accessToken = userData.accessToken;
          localStorage.setItem("refreshToken", userData.refreshToken);
          state.confirmed = userData.confirmed;
        } else {
          console.error("User data missing in API response:", action.payload);
        }
      })
      .addCase(confirmEmail.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
