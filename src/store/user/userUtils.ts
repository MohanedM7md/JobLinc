import { UserState } from "./user.interface";

export const loadState = (): UserState => {
  try {
    const serializedState = localStorage.getItem("userState");
    return serializedState
      ? JSON.parse(serializedState)
      : {
          userId: null,
          firstname: null,
          lastname: null,
          email: null,
          profilePicture: null,
          confirmed: null,
          role: null,
          accessToken: null,
          status: "IDLE",
          loggedIn: false,
        };
  } catch (err) {
    console.error("Failed to load state:", err);
    return {
      userId: null,
      firstname: null,
      lastname: null,
      email: null,
      profilePicture: null,
      confirmed: null,
      role: null,
      accessToken: null,
      status: "IDLE",
      loggedIn: false,
    };
  }
};

export const saveState = (authData) => {
  try {
    localStorage.setItem("userData", JSON.stringify(authData));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};
