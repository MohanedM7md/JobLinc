import { PostInterface } from "./postInterfaces";

export interface UserProfile {
  userId: string;
  firstname: string;
  lastname: string;
  headline: string;
  profilePicture: string;
  phoneNumber: string;
  biography: string;
  //coverPicture: string,
  role: number;
  email: string;
  country: string;
  city: string;
  confirmed: string;
  connectionStatus: string;
  numberofConnections: number;
  mutualConnections: number;
  recentPosts: PostInterface[];
  skills: string[];
  education: EducationInterface[];
  experience: ExperienceInterface[];
  certificates: CertificateInterface[];
}

export interface EducationInterface {
  educationId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startYear: Date;
  endYear: Date;
}

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface NewExperience {
  position: string;
  company: string;
  startDate: Date;
  endDate: Date;
  description: string;
}

export interface CertificateInterface {}
