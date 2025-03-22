import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api/api";

interface UserState {
  userId: number | null;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  country: string | null;
  city: string | null;
  phoneNumber: string | null;
  profilePicture: string | null;
  email: string | null;
  password: string | null;
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  forgotToken: string | null;
  resetToken: string | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}

const initialState: UserState = {
  userId: null,
  username: null,
  firstname: null,
  lastname: null,
  country: null,
  city: null,
  phoneNumber: null,
  profilePicture: null,
  email: null,
  password: null,
  role: null,
  accessToken: null,
  refreshToken: null,
  forgotToken: null,
  resetToken: null,
  status: "IDLE",
  loggedIn: false,
};

// Fetch User Profile (Placeholder API)
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log(userData);
      const response = await api.post("http://joblinc.me:3000/api/auth/login", userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: { firstname:string, lastname:string, email: string; password: string, country: string, city: string, phoneNumber: string }, { rejectWithValue }) => {
    try {
      console.log("from userSlice: " + userData);
      
      const response = await api.post("http://joblinc.me:3000/api/auth/register", userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Register failed");
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (userData: { email: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("http://joblinc.me:3000/api/auth/forgot-password", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (userData: { email: string, newPassword: string, resetToken: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("http://joblinc.me:3000/api/auth/reset-password", userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Forgot password failed");
    }
  }
);

export const confirmOTP = createAsyncThunk(
  "user/confirmOTP",
  async (userData: { email: string; forgotToken: string, otp: string }, { rejectWithValue }) => {
    try {
      console.log("from userSlice: " + userData);
      
      const response = await api.post("http://joblinc.me:3000/api/auth/confirm-otp", userData);
      console.log("Response in ConfirmOTP: " + JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Confirm OTP failed");
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (userData: { oldPassword: string, newPassword: string, refreshToken: string }, { rejectWithValue }) => {
    try {
      console.log("from userSlice: " + userData);
      
      const response = await api.post("http://joblinc.me:3000/api/auth/change-password", userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Change Password failed");
    }
  }
);


export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("http://joblinc.me:3000/api/user/me");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "User details fetch failed");
    }
  } 
);
// Create Redux Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.username = null;
      state.email = null;
      state.profilePicture = null;
      state.role = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loggedIn = false;
      state.status = "IDLE";
    },
    setEmail: (
      state,
      action: PayloadAction<{ email: string; }>,
    ) => {
      state.email = action.payload.email;
    },
    setPassword: (
      state,
      action: PayloadAction<{ password: string }>,
    ) => {
      state.password = action.payload.password; // May be changed later
    },
    setUserDetailsOnRegister: (
      state,
      action: PayloadAction<{firstname: string, lastname: string, country: string, city: string, phoneNumber: string}>,
    ) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.country = action.payload.country;
      state.city = action.payload.city;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
  extraReducers: (builder) => {
    builder
        // login user
      .addCase(loginUser.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Redux Payload:", action.payload); // Debug Redux update

        const userData = action.payload; // Extract user object from response

        if (userData) {
          state.userId = userData.userID || null;
          state.username = userData.username || null;
          state.firstname = userData.firstname || null;
          state.lastname = userData.lastname || null;
          state.country = userData.country || null;
          state.city = userData.city || null;
          state.phoneNumber = userData.phoneNumber || null;
          state.profilePicture = userData.profilePicture || null;
          state.email = userData.email || null;
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          state.refreshToken = userData.refreshToken || null;
          state.status = "SUCCESS";
          state.loggedIn = true;
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
        console.log("Redux payload:", action.payload);

        const userData = action.payload;

        if (userData)
        {
          state.userId = userData.userID || null;
          state.username = userData.username || null;
          state.email = userData.email || null; // Can be removed since we already dispatched and set the email
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          state.refreshToken = userData.refreshToken || null;
          state.status = "SUCCESS";
          state.loggedIn = true;
        }
        
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "FAILED";
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Redux payload:", action.payload);

        const userData = action.payload;

        if (userData)
        {
          state.forgotToken = userData.forgotToken || null;
          state.status = "SUCCESS"
          
        }
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Confirm OTP
      .addCase(confirmOTP.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(confirmOTP.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Redux payload:", action.payload);

        const userData = action.payload;

        if (userData)
        {
          state.resetToken = userData.resetToken || null;
          state.status = "SUCCESS"
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
        console.log("Redux payload:", action.payload);

        const userData = action.payload;

        if (userData)
        {
          state.userId = userData.userId || null;
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          state.refreshToken = userData.refreshToken || null;
          state.status = "SUCCESS";
        }
      })
      .addCase(resetPassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(changePassword.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Redux payload:", action.payload);

        const userData = action.payload;

        if (userData)
        {
          state.accessToken = userData.accessToken || null;
          state.refreshToken = userData.refreshToken || null;
          state.status = "SUCCESS";
        }
      })
      .addCase(changePassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Get User Details
      .addCase(getUserDetails.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Redux payload:", action.payload);

        const userData = action.payload;

        if (userData)
        {
          state.userId = userData.userId || null;
          state.username = userData.username || null;
          state.firstname = userData.firstname || null;
          state.lastname = userData.lastname || null;
          state.country = userData.country || null;
          state.city = userData.city || null;
          state.phoneNumber = userData.phoneNumber || null;
          state.profilePicture = userData.profilePicture || null;
          state.email = userData.email || null;
          state.role = userData.role || null;
          state.status = "SUCCESS";
          state.loggedIn = true;
        }
        else 
        {
          console.error("User data missing in API response:", action.payload);
        }
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});

export default userSlice.reducer;
export const { logOut, setEmail, setPassword, setUserDetailsOnRegister } = userSlice.actions;