import { api } from "./api";
import { FormData_Interface } from "../../components/Company/interfaces/inputs.interface";
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
export const createCompnay = async (formData: FormData_Interface) => {
  console.log("Form Data", formData);
  const response = await api.post(`/companies`, { ...formData });
  return response;
};

export const updateInfo = async (formData: FormData_Interface) => {
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
  const response = await api.get(`/user/companies`);
  return response;
};

export const getMyCompanyFollowers = async () => {
  const response = await api.get(`/follow/followers`);
  return response;
};

export const getCompanyBySlug = async (slug: string) => {
  const response = await api.get(`/companies/${slug}`);
  return response;
};

export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(`/chat/upload-media`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const addAdmin = async (userId: string) => {
  const response = await api.post(`/companies/admins`, { userId: userId });
  return response;
};

export const deleteAdmin = async (userId: string) => {
  const response = await api.delete(`/companies/admins/${userId}`);
  return response;
};

export const getConnections = async () => {
  const response = await api.get("/connection/connected");
  if (response.status != 200)
    throw new Error("Failed to fetch connection. Please try again.");
  return response.data;
};

export async function searchCompanies(name?: string) {
  try {
    const params = name ? { search: name } : {};
    const response = await api.get(`companies`, { params });
    return response.data;
  } catch (error) {
    console.log("Error fetching companies:", error);
    throw error;
  }
}
