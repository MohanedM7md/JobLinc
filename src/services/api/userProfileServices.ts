import {
  CertificateInterface,
  ExperienceInterface,
  NewCertificate,
  NewExperience,
} from "interfaces/userInterfaces";
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
