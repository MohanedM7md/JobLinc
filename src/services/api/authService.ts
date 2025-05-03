import { api } from "@services/api/api";
import store from "@store/store";
import { updateAccessToken } from "@store/user/userSlice";

export const loginUserAPI = async (userData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("auth/login", userData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const loginWithGoogleAPI = async(userCredentials: {credential: string}) => {
  try {
    const response = await api.post("auth/google-login", userCredentials);
    return response.data;
  }
  catch(err)
  {
    console.error(err);
  }
}

export const registerUserAPI = async (userData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  city: string;
  phoneNumber: string;
}) => {
  const response = await api.post("auth/register", userData);
  return response.data;
};

export const forgotPasswordAPI = async (userData: { email: string }) => {
  const response = await api.post("auth/forgot-password", userData);
  return response.data;
};

export const resetPasswordAPI = async (userData: {
  email: string;
  newPassword: string;
  resetToken: string;
}) => {
  const response = await api.post("auth/reset-password", userData);
  return response.data;
};

export const confirmOTPAPI = async (userData: {
  email: string;
  forgotToken: string;
  otp: string;
}) => {
  const response = await api.post("auth/confirm-otp", userData);
  return response.data;
};

export const changePasswordAPI = async (userData: {
  oldPassword: string;
  newPassword: string;
  refreshToken: string;
}) => {
  const response = await api.post("auth/change-password", userData);
  return response.data;
};

export const updateEmailAPI = async (userData: {
  userId: string;
  email: string;
}) => {
  const response = await api.put("user/edit/email", userData);
  return response.data;
};

export const updateUsernameAPI = async (userData: {
  userId: string;
  username: string;
}) => {
  const response = await api.put("user/edit/username", userData);
  return response.data;
};

export const getUserDetailsAPI = async () => {
  const response = await api.get("user/me");
  console.log("response of user Details yarb: ", response.data);
  return response.data;
};

export const sendConfirmationEmailAPI = async (userData: { email: string }) => {
  const response = await api.post("auth/send-confirmation-email", userData);
  return response.data;
};

export const confirmEmailAPI = async (userData: {
  email: string;
  token: string;
  otp: string;
}) => {
  const response = await api.post("auth/confirm-email", userData);
  return response.data;
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const userId = localStorage.getItem("userId");
  const response = await api.post("auth/refresh-token", {
    userId,
    refreshToken,
  });
  if (response.status !== 200)
  {
    window.location.href = "/home";
  }
  const dispatch = store.dispatch;
  const { data } = response;
  dispatch(updateAccessToken(data.accessToken));
  localStorage.setItem("refreshToken", data.refreshToken);
}
