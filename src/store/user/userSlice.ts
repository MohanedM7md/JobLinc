import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  confirmOTP,
  changePassword,
  setUserDetails,
  sendConfirmationEmail,
  confirmEmail,
  updateEmail,
  loginWithGoogle,
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
      state.firstname = null;
      state.lastname = null;
      state.email = null;
      state.profilePicture = null;
      state.role = null;
      state.confirmed = null;
      state.status = "IDLE";
      state.loggedIn = false;
      state.accessToken = null;
      localStorage.removeItem("userId");
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
          state.userId = userData.userId || null;
          state.role = userData.role || null;
          state.accessToken = userData.accessToken || null;
          state.confirmed = userData.confirmed || null;
          state.email = userData.email || null;
          state.status = "SUCCESS";
          state.loggedIn = true;
          localStorage.setItem("refreshToken", userData.refreshToken);
          localStorage.setItem("userId", userData.userId);
        } else {
          console.error("User data missing in API response:", action.payload);
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "FAILED";
      })
      // login with google
      .addCase(loginWithGoogle.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(
        loginWithGoogle.fulfilled,
        (state, action: PayloadAction<any>) => {
          const userData = action.payload; // Extract user object from response

          if (userData) {
            console.log("Login Response Payload:", userData);
            state.userId = userData.userId || null;
            state.role = userData.role || null;
            state.accessToken = userData.accessToken || null;
            state.confirmed = userData.confirmed || null;
            state.email = userData.email || null;
            state.status = "SUCCESS";
            state.loggedIn = true;
            localStorage.setItem("refreshToken", userData.refreshToken);
            localStorage.setItem("userId", userData.userId);
          } else {
            console.error("User data missing in API response:", action.payload);
          }
        },
      )
      .addCase(loginWithGoogle.rejected, (state) => {
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
          state.email = userData.email || null;
          state.status = "SUCCESS";
          state.loggedIn = true;
          localStorage.setItem("refreshToken", userData.refreshToken);
          localStorage.setItem("userId", userData.userId);
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
          localStorage.setItem("userId", userData.userId);
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
        if (userData) {
          state.status = "SUCCESS";
        }
      })
      .addCase(updateEmail.rejected, (state) => {
        state.status = "FAILED";
      })
      // Get User Details
      .addCase(setUserDetails.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(
        setUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          const userData = action.payload;
          console.log("set in storage");

          if (userData) {
            state.userId = userData.userId;
            state.email = userData.email;
            state.loggedIn = true;
            state.email = userData.email;
            state.userId = userData.userId || null;
            state.firstname = userData.firstname || null;
            state.lastname = userData.lastname || null;
            state.profilePicture = userData.profilePicture || null;
            state.role = userData.role || null;
            state.allowMessages = userData.allowMessages || null;
            state.confirmed = userData.confirmed || null;
            state.status = "SUCCESS";
          } else {
            console.error("User data missing in API response:", action.payload);
          }
        },
      )
      .addCase(setUserDetails.rejected, (state) => {
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
            // localStorage.setItem("tokenForOTP", userData.token);
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
          state.userId = userData.userId;
          state.role = userData.role;
          state.accessToken = userData.accessToken;
          state.confirmed = userData.confirmed;
          localStorage.setItem("refreshToken", userData.refreshToken);
          localStorage.setItem("userId", userData.userId);
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
