import { NewExperience } from "interfaces/userInterfaces";
import { api } from "./api"

export async function getMe() {
    try {
        const response = await api.get("user/me");
        return response.data;
    }
    catch (error) {
        console.error("Error fetching user data:", error);
    }
}

export async function addExperience(experience: NewExperience) {
    try {
        const response = await api.post("user/experience/add", experience)
        console.log(response.data);
    }
    catch (error) {
        console.error("Error adding new experience:", error)
    }
}