import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface FetchUserPayload {
  name: string;
  email: string;
  profilePicture: string;
  title: string;
}
export const fetchUser = createAsyncThunk("user/fetch", async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/user/1?select=firstName,email",
    );
    const { firstName: name, email }: { firstName: string; email: string } =
      response.data;
    const profilePicture: string = "https://i.pravatar.cc/150?img=14";
    const title: string = "Phd in Something Something | Software Engineer probably";
    return { name, email, profilePicture, title };
  } catch (error) {
    console.log(Error);
  }
});

enum status {
  IDLE = "IDLE",
  LOADING = "LOADING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
interface UserState {
  name: string | null;
  profilePicture: string | null;
  email: string | null;
  title: string | null;
  status: status | null;
  loggedIn: boolean | null;
}
const intialState: UserState = {
  name: "",
  profilePicture: "",
  email: "",
  title: "",
  status: status.IDLE,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    logOut: (state) => {
      state.loggedIn = false;
      state.name = "";
      state.profilePicture = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = status.LOADING;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<FetchUserPayload | undefined>) => {
          if (action.payload) {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profilePicture = action.payload.profilePicture;
            state.title = action.payload.title;
            state.status = status.SUCCESS;
          }
        },
      )
      .addCase(fetchUser.rejected, (state) => {
        state.status = status.FAILED;
      });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
