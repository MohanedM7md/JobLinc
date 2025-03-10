import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchUser = createAsyncThunk("user/fetch", async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/user/1?select=firstName,email",
    );
    const { firstName: name, email } = response.data;

    return { name, email };
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
const intialState = {
  name: "",
  profilePicture: "",
  email: "",
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
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.name = action.payload?.name;
        state.email = action.payload?.email;
        state.profilePicture = "https://i.pravatar.cc/150?img=14";
        state.status = status.SUCCESS;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = status.FAILED;
      });
  },
});

export default userSlice.reducer;
export const { logOut } = userSlice.actions;
