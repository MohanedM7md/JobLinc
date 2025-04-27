import { api } from "./api";

export async function searchCompanies(name?: string) {
  try {
    const params = name ? { search: name } : {};
    const response = await api.get(`companies`, { params });
    return response.data;
  } catch (error) {
    console.log("Error fetching companies:", error)
    throw error
  }
}
