import { api } from "./api";

export const slugChecker = async (slug: string) => {
  const response = await api.post(`/companies/${slug}`, {});
  return response.data;
};

export const submitForm = async (formData) => {
  console.log("Form Data", formData);
  const response = await api.post(`/companies`, { ...formData });
  return response;
};
