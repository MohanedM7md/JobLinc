export interface ProfileInterface {
  userId: string;
  firstname: string;
  lastname: string;
  headline: string;
  username: string;
  email: string;
  confirmed: string;
  country: string;
  city: string;
  phoneNumber: string;
  role: number;
  numberofConnections: number;
  mutualConnections: number;
  profilePicture: string;
  coverPicture: string;
  skills: SkillInterface[];
  experiences: ExperienceInterface[];
  certificates: CertificateInterface[];
}

export interface ProfileUpdateInterface {
  firstname: string;
  lastname: string;
  headline: string;
  country: string;
  city: string;
  phoneNumber?:string;
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
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | string;
  description: string;
  mode: ExperienceModes;
  type: ExperienceTypes;
}

export interface NewExperience {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | string;
  description: string;
  mode: ExperienceModes;
  type: ExperienceTypes;
}

export interface CertificateInterface {
  id: string;
  name: string;
  organization: string;
  issueDate: Date;
  expirationDate: Date;
}

export interface NewCertificate {
  name: string;
  organization: string;
  issueDate: Date;
  expirationDate: Date;
}

export interface SkillInterface {
  id: string;
  name: string;
  level: number;
}

export interface NewSkill {
  name: string;
  level: number;
}

export enum ExperienceModes {
  onsite = "OnSite",
  remote = "Remote",
  hybrid = "Hybrid",
}

export enum ExperienceTypes {
  fulltime = "FullTime",
  parttime = "PartTime",
  internship = "Internship",
  contract = "Contract",
}
