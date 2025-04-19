import { api } from "./api";
import { FormData } from "../../components/Company/interfaces/inputs.interface";
import store from "@store/store";

import { updateAccessToken } from "@store/user/userSlice";
export const slugChecker = async (slug: string) => {
  const response = await api.post(`/companies/${slug}`, {});
  return response.data;
};
export const enterAdminPage = async (companyId: string) => {
  const userId = localStorage.getItem("userId");
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post("auth/refresh-token", {
    userId,
    companyId,
    refreshToken,
  });
  if (response.status != 200)
    throw new Error("Failed to refresh token. Please try again.");
  const { data } = response;
  store.dispatch(updateAccessToken(data.accessToken));
  localStorage.setItem("refreshToken", data.refreshToken);
  localStorage.setItem("companyId", companyId);
};
export const createCompnay = async (formData: FormData) => {
  console.log("Form Data", formData);
  const response = await api.post(`/companies`, { ...formData });
  return response;
};

export const updateInfo = async (formData: FormData) => {
  console.log("Form Data", formData);
  const response = await api.patch(`/companies`, { ...formData });
  return response;
};

export const checkUniqueSlug = async (slug: string) => {
  const response = await api.get(`/companies/check-unique-slug/${slug}`);
  return response;
};

export const getMyCompany = async () => {
  const response = await api.get(`/companies/me`);
  return response;
};
export const getMyCompanies = async () => {
  const response = await api.get(`/companies`);
  return response;
};
