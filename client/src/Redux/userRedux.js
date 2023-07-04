import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting login
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false; // Reset error to false on successful login
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false; // Reset error to false on logout
    },
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting update
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false; // Reset error to false on successful update
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    findUserStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting find
    },
    findUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false; // Reset error to false on successful find
    },
    findUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  findUserStart,
  findUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
