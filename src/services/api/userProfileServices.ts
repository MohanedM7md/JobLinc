import { ExperienceInterface, NewExperience } from "interfaces/userInterfaces";
import { api } from "./api";

export async function getMe() {
  try {
    const response = await api.get("user/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
}

export async function getExperience() {
  try {
    const response = await api.get("user/experience");
    return response.data;
  } catch (error) {
    console.error("Error fetching experience data:", error);
  }
}

export async function addExperience(experience: NewExperience) {
  try {
    const response = await api.post("user/experience/add", experience);
    console.log(response.data);
  } catch (error) {
    console.error("Error adding new experience:", error);
  }
}

export async function editExperience(experience: ExperienceInterface) {
  try {
    console.log("Sent:", experience);
    const response = await api.put(`user/experience/${experience.id}`,experience);
    console.log(response.data);
  } catch (error) {
    console.error("Error editing experience:", error);
  }
}
