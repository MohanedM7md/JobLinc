import { api } from "./api";

export const slugChecker = async (slug: string) => {
  const response = await api.post(`/companies/${slug}`, {});
  return response.data;
};

export const submitForm = async (formData: FormData) => {
  const response = await api.post(`/companies`, { formData });
  return response;
};
