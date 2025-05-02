import {
  EditExperienceInterface,
  NewCertificate,
  NewEducation,
  NewExperience,
  NewSkill,
  ProfileUpdateInterface,
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

export async function deleteProfilePicture() {
  try {
    const response = await api.delete("user/edit/profile-picture")
    return response.status
  }
  catch (error) {
    console.error("Error deleting profile picture:", error)
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

export async function deleteCoverPicture() {
  try {
    const response = await api.delete("user/edit/cover-picture")
    return response.status
  } catch (error) {
    console.error("Error deleting cover picture:", error)
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

export async function editExperience({experienceId, experience}:{experienceId: string, experience: EditExperienceInterface}) {
  try {
    const response = await api.put(
      `user/experience/${experienceId}`,
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

export async function editCertificate({certificateId, certificate}: {certificateId: string, certificate: NewCertificate}) {
  try {
    const response = await api.put(
      `user/certificate/${certificateId}`,
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

export async function editSkill({skillId, skill}: {skillId: string, skill: NewSkill}) {
  try {
    const response = await api.put(`user/skills/${skillId}`, skill);
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

export async function getEducation() {
  try {
    const response = await api.get("user/education");
    return response.data;
  } catch (error) {
    console.error("Error fetching educations:", error);
    throw error;
  }
}

export async function addEducation(education: NewEducation) {
  try {
    const response = await api.post("user/education/add", education);
    return response.status;
  } catch (error) {
    console.error("Error adding new education:", error);
    throw error;
  }
}

export async function editEducation({educationId, education}:{educationId: string, education: NewEducation}) {
  try {
    const response = await api.put(`user/education/${educationId}`, education);
    return response.status;
  } catch (error) {
    console.error("Error editing education:", error);
    throw error;
  }
}

export async function deleteEducation(educationId: string) {
  try {
    const response = await api.delete(`user/education/${educationId}`);
    return response.status;
  } catch (error) {
    console.error("Error deleting education:", error);
    throw error;
  }
}

export async function getUserById(userId: string) {
  try {
    const response = await api.get(`user/u/${userId}/public`);
    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error retrieving user:", error);
    throw error;
  }
}

export async function getMyPosts() {
  try {
    const response = await api.get(`post/my-posts`)
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getUserPosts(userId: string) {
  try {
    const response = await api.get(`post/${userId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
