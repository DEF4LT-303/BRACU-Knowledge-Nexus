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
      console.log('Updated currentUser:', state.currentUser);
    },
    updateUserFailure: (state) => {
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
  updateUserFailure
} = userSlice.actions;

export default userSlice.reducer;
