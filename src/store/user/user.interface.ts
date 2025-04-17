export interface UserState {
  userId: string | null;
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  email: string | null;
  profilePicture: string | null;
  coverPicture: string | null;
  confirmed: boolean;
  country: string | null;
  city: string | null;
  phoneNumber: string | null;
  role: number | null;
  numberOfConnections: number | null;
  mutualConnections: number | null;
  skills: string[];
  experiences: string[];
  certificates: string[];
  resumes: string[];
  accessToken: string | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}
