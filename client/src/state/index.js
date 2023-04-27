import { createSlice } from "@reduxjs/toolkit";

// STORE: The state that is stored in our global state- accessible throughout whole app.
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    // Sets Darkmode/Lightmode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Sets User and JWTToken
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Removes User and JWTToken
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Sets Friends of User to Payload
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User Friends non existant");
      }
    },
    // Set Posts Array to Payload
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // ???
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post_id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions; // Export Reducers
export default authSlice.reducer; // Export Values
