import { publicRequest, userRequest } from '../requestMethods';
import {
  createForumFailure,
  createForumStart,
  createForumSuccess,
  deleteForumFailure,
  deleteForumStart,
  deleteForumSuccess,
  getForumFailure,
  getForumStart,
  getForumSuccess,
  updateForumStart,
  updateForumSuccess
} from './forumRedux';
import {
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
  remove,
  update,
  updateFailure,
  updateStart
} from './peopleRedux';
import {
  findUserFailure,
  findUserStart,
  findUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  registrationFailure,
  registrationStart,
  registrationSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from './userRedux';

// *User API Calls*

export const login = async (dispatch, userCredentials) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', userCredentials);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid email or password'); // Throw an error for incorrect password
    }
    dispatch(loginFailure());
    throw error;
  }
};

export const register = async (dispatch, user) => {
  dispatch(registrationStart());
  try {
    const res = await publicRequest.post('/auth/register', user);
    setTimeout(() => {
      dispatch(registrationSuccess());
    }, 3000);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error('Email already exists'); // Throw an error for invalid email or password
    }
    dispatch(registrationFailure());
    throw error;
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get('/users');
    await dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const updateOtherUser = async (id, user, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(update(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
};

export const findUser = async (id, dispatch) => {
  dispatch(findUserStart());
  try {
    const res = await publicRequest.get(`/users/find/${id}`);
    await dispatch(findUserSuccess(res.data));
  } catch (err) {
    dispatch(findUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(updateStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(remove(id));
  } catch (err) {
    dispatch(updateFailure());
  }
};

// *Forum API Calls*

export const createForum = async (dispatch, forum) => {
  dispatch(createForumStart());
  try {
    const res = await userRequest.post('/forums', forum);
    dispatch(createForumSuccess(res.data));
  } catch (err) {
    dispatch(createForumFailure());
  }
};

export const getForums = async (dispatch) => {
  dispatch(getForumStart());
  try {
    const res = await publicRequest.get('/forums');
    await dispatch(getForumSuccess(res.data));
  } catch (err) {
    dispatch(getForumFailure());
  }
};

export const updateForum = async (id, forum, dispatch) => {
  dispatch(updateForumStart());
  try {
    const res = await userRequest.put(`/forums/${id}`, forum);
    dispatch(updateForumSuccess(res.data));
  } catch (err) {
    dispatch(updateFailure());
  }
};

export const deleteForum = async (id, dispatch) => {
  dispatch(deleteForumStart());
  try {
    await userRequest.delete(`/forums/${id}`);
    dispatch(deleteForumSuccess(id));
  } catch (err) {
    dispatch(deleteForumFailure());
  }
};

//TODO - Reply API functions
export const createReply = async (reply) => {
  try {
    const res = await userRequest.post(`/replies`, reply);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error('Failed to create reply:', err);
    throw err;
  }
};

export const getReplies = async () => {
  try {
    const res = await publicRequest.get('/replies');
    return res.data;
  } catch (err) {
    console.error('Failed to get replies:', err);
    throw err;
  }
};

// export const getReply = async (dispatch) => {
//   dispatch(getReplyStart());
//   try {
//     const res = await publicRequest.get('/replies');
//     await dispatch(getReplySuccess(res.data));
//   } catch (err) {
//     dispatch(getReplyFailure());
//   }
// };

// export const updateReply = async (id, dispatch) => {
//   dispatch(updateReplyStart());
//   try {
//     const res = await userRequest.put(`/replies/${id}`);
//     dispatch(updateReplySuccess(res.data));
//   } catch (err) {
//     dispatch(updateFailure());
//   }
// };

// export const deleteReply = async (id, dispatch) => {
//   dispatch(deleteReplyStart());
//   try {
//     await userRequest.delete(`/replies/${id}`);
//     dispatch(deleteReplySuccess(id));
//   } catch (err) {
//     dispatch(deleteReplyFailure());
//   }
// };

//TODO - Feedback API functions
export const createFeedback = async (feedback) => {
  try {
    const res = await userRequest.post(`/feedback`, feedback);
    return res.data;
  } catch (err) {
    console.error('Failed to create feedback:', err);
    throw err;
  }
};

export const getFeedback = async () => {
  try {
    const res = await userRequest.get('/feedback');
    return res.data;
  } catch (err) {
    console.error('Failed to get feedback:', err);
    throw err;
  }
};

export const deleteFeedback = async (id) => {
  try {
    await userRequest.delete(`/feedback/${id}`);
  } catch (err) {
    console.error('Failed to delete feedback:', err);
    throw err;
  }
};
