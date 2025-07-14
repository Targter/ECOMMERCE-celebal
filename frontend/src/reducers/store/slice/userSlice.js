// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../api/axios";

// Async Thunks for API calls
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("email:", email, password);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
      if (data.success) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Store token
        // toast.success("Login successful!");
        // navigate("/");
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("userDAta:", userData);
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.post(`/api/v1/register`, userData, config);
      if (data.success) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token); // Store token
        // toast.success("Login successful!");
        // navigate("/");
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      console.log("this called..");
      const { data } = await axios.get(`/api/v1/me`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // console.log("response:", response);
      console.log(data.user);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.get(`/api/v1/logout`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      localStorage.removeItem("token"); // Clear token on logout
      return null;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (passwords, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `/api/v1/password/update`,
        passwords,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      console.log("email:", email);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(
        `/api/v1/password/forgot`,
        email,
        config
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, passwords }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/users`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "user/getUserDetails",
  async (id, { rejectWithValue }) => {
    try {
      console.log("this called...to ge tthe user Id");
      const { data } = await axios.get(`/api/v1/admin/user/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("this the data of the user>... ", data);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
      return data.success;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/user/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    loading: false,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
    isDeleted: false,
    message: null,
    success: false,
  },
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
    resetProfile(state) {
      state.isUpdated = false;
    },
    resetDelete(state) {
      state.isDeleted = false;
    },
  },
  extraReducers: (builder) => {
    // Login, Register, Load User
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Profile Updates
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forgot and Reset Password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Admin Actions
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, resetProfile, resetDelete } = userSlice.actions;

export default userSlice.reducer;
