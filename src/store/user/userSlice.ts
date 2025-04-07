import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  confirmOTP,
  changePassword,
  getUserDetails,
  sendConfirmationEmail,
  confirmEmail,
  updateEmail,
} from "./userThunks";
import { loadState, saveState } from "./userUtils";
import { UserState } from "./user.interface";

const initialState: UserState = loadState();
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    logOut: (state) => {
      state.userId = null;
      state.role = null;
      state.confirmed = null;
      state.status = "IDLE";
      state.loggedIn = false;
      state.accessToken = null;
      localStorage.removeItem("userState");
      localStorage.removeItem("refreshToken");
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
          localStorage.setItem("refreshToken", userData.refreshToken);
          console.log(state);
          saveState(userData);
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
          state.confirmed = userData.confirmed || false;
          state.status = "SUCCESS";
          state.loggedIn = true;
          localStorage.setItem("refreshToken", userData.refreshToken);
          saveState(userData);
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
          state.status = "SUCCESS";
          localStorage.setItem("refreshToken", userData.refreshToken);
          saveState(userData);
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
            state.status = "SUCCESS";
            localStorage.setItem("refreshToken", userData.refreshToken);
          }
        },
      )
      .addCase(changePassword.rejected, (state) => {
        state.status = "FAILED";
      })
      // Update Email
      .addCase(updateEmail.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(updateEmail.fulfilled, (state, action: PayloadAction<any>) => {
        const userData = action.payload;
        if (userData)
        {
          state.status = "SUCCESS";
        }
      })
      .addCase(updateEmail.rejected, (state) => {
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
            console.log("get user details Payload:", userData);

            state.userId = userData.userId || null;
            state.loggedIn = true;
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
          state.confirmed = userData.confirmed;
          localStorage.setItem("refreshToken", userData.refreshToken);
          saveState(userData);
        } else {
          console.error("User data missing in API response:", action.payload);
        }
      })
      .addCase(confirmEmail.rejected, (state) => {
        state.status = "FAILED";
      });
  },
});

export const { logOut, updateAccessToken } = userSlice.actions;
export default userSlice.reducer;
