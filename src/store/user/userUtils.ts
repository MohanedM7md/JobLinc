import { useAppDispatch } from "@store/hooks";
import { UserState } from "./user.interface";
import { getUserDetails } from "./userThunks";
export const loadState = (): UserState => {
  const initialState : UserState = {
    userId: null,
    firstname: null,
    lastname: null,
    username: null,
    email: null,
    profilePicture: null,
    coverPicture: null,
    confirmed: false,
    country: null,
    city: null,
    phoneNumber: null,
    role: null,
    numberOfConnections: null,
    mutualConnections: null,
    skills: [],
    experiences: [],
    certificates: [],
    resumes: [],
    accessToken: null,
    status: "IDLE",
    loggedIn: false
  }
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken)
    {
      return initialState;
    }
    const dispatch = useAppDispatch();
    let serializedState: UserState = initialState;
    dispatch(getUserDetails())
    .then((action) => {
      if (!serializedState){
        console.log("User Details fetched successfully", action.payload);
        serializedState = action.payload;
      }
    });

  } catch (err) {
    console.error("Error while loading user state (loadState fn. userUtils.ts)", err);
    return initialState;
  }
  return initialState;
};

export const saveState = (state: UserState) => {
  try {
    localStorage.setItem("userState", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};
