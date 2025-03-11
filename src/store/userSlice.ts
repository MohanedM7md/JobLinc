import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface FetchUserPayload {
  name: string;
  email: string;
  profilePicture: string;
}
export const fetchUser = createAsyncThunk("user/fetch", async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/user/1?select=firstName,email",
    );
    const { firstName: name, email }: { firstName: string; email: string } =
      response.data;
    const profilePicture: string = "https://i.pravatar.cc/150?img=14";
    return { name, email, profilePicture };
  } catch (error) {
    console.error(Error);
  }
});

enum Status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
interface UserState {
  name: string;
  profilePicture: string;
  email: string;
  status: Status;
  loggedIn: boolean;
}
const initialState: UserState = {
  name: "",
  profilePicture: "",
  email: "",
  status: Status.IDLE,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logOut: (state) => {
      state.loggedIn = false;
      state.name = "";
      state.email = "";
      state.profilePicture = "";
      status: Status.IDLE;
      loggedIn: false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<FetchUserPayload | undefined>) => {
          if (action.payload) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profilePicture = action.payload.profilePicture;
            state.status = Status.SUCCESS;
          }
        },
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = Status.FAILED;
        console.error("Fetch failed:", action.payload);
      });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
