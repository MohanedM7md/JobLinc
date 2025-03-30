import { api } from "@services/api/api";

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

export const getUserDetailsAPI = async () => {
  const response = await api.get("user/me");
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
