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
  profilePicture?: string;
  coverPicture?: string;
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
  phoneNumber:string;
  profilePicture: string;
  biography: string;
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
  _id: string;
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

export interface CertificateInterface {
  _id: string;
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
