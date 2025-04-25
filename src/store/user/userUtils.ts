import { UserState } from "./user.interface";

export const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem("userState");
    return serializedState
      ? JSON.parse(serializedState)
      : {
          userId: null,
          role: null,
          confirmed: null,
          accessToken: null,
          status: "IDLE",
          loggedIn: false,
        };
  } catch (err) {
    console.error("Failed to load state:", err);
    return {
      userId: null,
      role: null,
      confirmed: null,
      accessToken: null,
      status: "IDLE",
      loggedIn: false,
    };
  }
};

export const saveState = (state: UserState) => {
  try {
    localStorage.setItem("userState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};
