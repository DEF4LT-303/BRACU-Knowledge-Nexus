import { createSlice } from '@reduxjs/toolkit';

const threadSlice = createSlice({
  name: 'thread',
  initialState: {
    thread: null,
    isFetching: false,
    error: true
  },
  reducers: {
    getthreadStart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting find
    },
    getThreadByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.thread = action.payload;
      state.error = false; // Reset error to false on successful find
    },
    getThreadFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  getthreadStart,
  getThreadFailure,
  getThreadByIdSuccess
} = threadSlice.actions;

export default threadSlice.reducer;
