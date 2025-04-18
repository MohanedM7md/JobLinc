export interface UserState {
  userId: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  profilePicture: string | null;
  confirmed: boolean | null;
  role: number | null;
  accessToken: string | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}
