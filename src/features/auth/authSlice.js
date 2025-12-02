import { createSlice } from "@reduxjs/toolkit";

// Helper: Load user from localStorage
const loadUserFromStorage = () => {
  try {
    const serializedUser = localStorage.getItem("user");
    return serializedUser ? JSON.parse(serializedUser) : null;
  } catch (e) {
    return null;
  }
};

const initialState = {
  user: loadUserFromStorage(), // Load on startup
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to Storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Clear Storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("cart"); // Optional: clear cart on logout
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
