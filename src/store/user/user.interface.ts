export interface UserState {
  userId: string | null;
  role: string | null;
  accessToken: string | null;
  confirmed: boolean | null;
  status: "IDLE" | "LOADING" | "SUCCESS" | "FAILED";
  loggedIn: boolean;
}
