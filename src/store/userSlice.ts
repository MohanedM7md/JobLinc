import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  username: string | null;
  email: string | null;
  profilePicture: string | null;
  role: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}

const initialState: UserState = {
  username: null,
  email: null,
  profilePicture: null,
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
      const response = await axios.post("http://localhost:3000/api/auth/login", userData);
      console.log(response.data);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        console.log("Redux Payload:", action.payload); // Debug Redux update
    
        const userData = action.payload.user; // Extract user object from response
    
        if (userData) {
            state.username = userData.username || null;
            state.email = userData.email || null;
            state.profilePicture = userData.profilePicture || null;
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
      });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
