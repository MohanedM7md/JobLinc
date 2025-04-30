import {
  CertificateInterface,
  ExperienceInterface,
  NewCertificate,
  NewExperience,
  NewSkill,
  ProfileUpdateInterface,
  SkillInterface,
} from "interfaces/userInterfaces";
import { api } from "./api";

export async function getMe() {
  try {
    const response = await api.get("user/me");
    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export async function updateMe(newProfile: ProfileUpdateInterface) {
  try {
    const response = await api.put("user/edit/personal-info", newProfile);
    return response.status;
  } catch (error) {
    console.error("Error updating user data:", error);
    throw error;
  }
}

export async function updateProfilePicture(file: File) {
  try {
    const form = new FormData();
    form.append("file", file);
    const response = await api.post("user/edit/profile-picture", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile picture:", error);
    throw error;
  }
}

export async function updateCoverPicture(file: File) {
  try {
    const form = new FormData();
    form.append("file", file);
    const response = await api.post("user/edit/cover-picture", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating cover picture:", error);
    throw error;
  }
}

export async function getMyCompanies()
{
  try {
    const respone = await api.get("user/companies");
    return respone.data;
  }
  catch(error)
  {
    console.error("Error fetching user companies", error);
    throw error;
  }
}

export async function getExperience() {
  try {
    const response = await api.get("user/experience");
    return response.data;
  } catch (error) {
    console.error("Error fetching experience data:", error);
    throw error;
  }
}

export async function addExperience(experience: NewExperience) {
  try {
    const response = await api.post("user/experience/add", experience);
    return response.status;
  } catch (error) {
    console.error("Error adding new experience:", error);
    throw error;
  }
}

export async function editExperience(experience: ExperienceInterface) {
  try {
    const response = await api.put(
      `user/experience/${experience._id}`,
      experience,
    );
    return response.status;
  } catch (error) {
    console.error("Error editing experience:", error);
    throw error;
  }
}

export async function deleteExperience(experienceId: string) {
  try {
    const response = await api.delete(`user/experience/${experienceId}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting experience:", error);
    throw error;
  }
}

export async function getCertificate() {
  try {
    const response = await api.get("user/certificate");
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate data:", error);
    throw error;
  }
}

export async function addCertificate(certificate: NewCertificate) {
  try {
    const response = await api.post("user/certificate/add", certificate);
    return response.status;
  } catch (error) {
    console.error("Error adding new certificate:", error);
    throw error;
  }
}

export async function editCertificate(certificate: CertificateInterface) {
  try {
    const response = await api.put(
      `user/certificate/${certificate._id}`,
      certificate,
    );
    return response.status;
  } catch (error) {
    console.error("Error editing certificate:", error);
    throw error;
  }
}

export async function deleteCertificate(certificateId: string) {
  try {
    const response = await api.delete(`user/certificate/${certificateId}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error;
  }
}

export async function getSkills() {
  try {
    const response = await api.get("user/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills data:", error);
    throw error;
  }
}

export async function addSkill(skill: NewSkill) {
  try {
    const response = await api.post("user/skills/add", skill);
    return response.status;
  } catch (error) {
    console.error("Error adding new skill:", error);
    throw error;
  }
}

export async function editSkill(skill: SkillInterface) {
  try {
    const response = await api.put(`user/skills/${skill.id}`, skill);
    return response.status;
  } catch (error) {
    console.error("Error editing skill:", error);
    throw error;
  }
}

export async function deleteSkill(skillId: string) {
  try {
    const response = await api.delete(`user/skills/${skillId}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await api.get(`user/u/${userId}/public`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
}

