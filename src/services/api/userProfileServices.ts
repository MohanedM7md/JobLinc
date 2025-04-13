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
  }
}

export async function updateMe(newProfile: ProfileUpdateInterface) {
  try {
    await api.put("user/edit/personal-info", newProfile);
  }
  catch (error) {
    console.error("Error updating user data:", error);
  }
}

export async function updateProfilePicture(file: File) {
  try {
    const form = new FormData();
    form.append("file", file);
    await api.post("user/edit/profile-picture", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  catch (error) {
    console.error("Error updating profile picture:", error);
  }
}

export async function updateCoverPicture(file: File) {
  try {
    const form = new FormData();
    form.append("file", file);
    await api.post("user/edit/cover-picture", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error updating cover picture:", error);
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
    await api.post("user/experience/add", experience);
  } catch (error) {
    console.error("Error adding new experience:", error);
  }
}

export async function editExperience(experience: ExperienceInterface) {
  try {
    await api.put(`user/experience/${experience._id}`, experience);
  } catch (error) {
    console.error("Error editing experience:", error);
  }
}

export async function deleteExperience(experienceId: string) {
  try {
    await api.delete(`user/experience/${experienceId}`);
  } catch (error) {
    console.error("Error deleting experience:", error);
  }
}

export async function getCertificate() {
  try {
    const response = await api.get("user/certificate");
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate data:", error);
  }
}

export async function addCertificate(certificate: NewCertificate) {
  try {
    await api.post("user/certificate/add", certificate);
  } catch (error) {
    console.error("Error adding new certificate:", error);
  }
}

export async function editCertificate(certificate: CertificateInterface) {
  try {
    await api.put(`user/certificate/${certificate._id}`, certificate);
  } catch (error) {
    console.error("Error editing certificate:", error);
  }
}

export async function deleteCertificate(certificateId: string) {
  try {
    await api.delete(`user/certificate/${certificateId}`);
  } catch (error) {
    console.error("Error deleting certificate:", error);
  }
}

export async function getSkills() {
  try {
    const response = await api.get("user/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills data:", error);
  }
}

export async function addSkill(skill: NewSkill) {
  try {
    await api.post("user/skills/add",  skill );
  } catch (error) {
    console.error("Error adding new skill:", error);
  }
}

export async function editSkill(skill: SkillInterface) {
  try {
    await api.put(`user/skills/${skill.id}`,  skill );
  } catch (error) {
    console.error("Error editing skill:", error);
  }
}

export async function deleteSkill(skillId: string) {
  try {
    await api.delete(`user/skills/${skillId}`);
  } catch (error) {
    console.error("Error deleting skill:", error);
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await api.get(`user/u/${userId}/public`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving user:", error);
  }
}


