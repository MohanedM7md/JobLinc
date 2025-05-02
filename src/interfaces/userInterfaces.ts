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
  connectionStatus: ConnectionStatus;
  isFollowing: boolean;
  profilePicture: string;
  coverPicture: string;
  skills: SkillInterface[];
  experiences: ExperienceInterface[];
  certificates: CertificateInterface[];
  education : EducationInterface[];
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
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  description: string;
  CGPA: number;
}

export interface NewEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate: Date;
  description: string;
  CGPA: number;
}

export interface ExperienceInterface {
  id: string;
  company: ExperienceCompany;
  position: string;
  startDate: Date;
  endDate: Date | string;
  description: string;
  mode: ExperienceModes;
  type: ExperienceTypes;
}

export interface ExperienceCompany {
  id?: string;
  name: string;
  logo: string;
}

export interface NewExperience {
  companyId?: string;
  company?: string;
  position: string;
  startDate: Date;
  endDate: Date | string;
  description: string;
  mode: ExperienceModes;
  type: ExperienceTypes;
}

export interface EditExperienceInterface {
  companyId?: string;
  company?: string;
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

export interface FollowerData {
  firstname: string;
  headline: string;
  lastname: string;
  profilePicture: string;
  time: string;
  userId: string;
}

export enum ExperienceModes {
  onsite = "OnSite",
  remote = "Remote",
  hybrid = "Hybrid",
}

export enum ExperienceTypes {
  fulltime = "Full-time",
  parttime = "Part-time",
  internship = "Internship",
  contract = "Contract",
  temporary = "Temporary",
  volunteer = "Volunteer"
}

export interface FollowerData {
  firstname: string;
  headline: string;
  lastname: string;
  profilePicture: string;
  time: string;
  userId: string
}

export enum ConnectionStatus {
    Pending="Pending",
    Sent="Sent",
    Received="Received",
    Accepted="Accepted",
    Rejected="Rejected",
    Blocked="Blocked",
    Canceled="Canceled",
    NotConnected="Not Connected",
    Unblocked="Unblocked"
};

