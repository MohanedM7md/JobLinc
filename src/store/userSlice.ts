import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  userID: number | null;
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
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}

const initialState: UserState = {
  userID: null,
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
  status: "IDLE",
  loggedIn: false,
};

// Fetch User Profile (Placeholder API)
export const loginUser = createAsyncThunk(
  "user/login",
  async (userData: { email: string; password: string }, { rejectWithValue }) => {
    try {
      console.log(userData);
      const response = await axios.post("http://localhost:3000/api/auth/login", userData);
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
      
      const response = await axios.post("http://localhost:3000/api/auth/register", userData);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Register failed");
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
          state.userID = userData.userID || null;
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
          state.userID = userData.userID || null;
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
      });
  },
});

export default userSlice.reducer;
export const { logOut, setEmail, setPassword, setUserDetailsOnRegister } = userSlice.actions;