import { publicRequest, userRequest } from '../requestMethods';
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
  loginFailure,
  loginStart,
  loginSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from './userRedux';

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
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/register', user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error('Email already exists'); // Throw an error for invalid email or password
    }
    dispatch(loginFailure());
    throw error;
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get('/users');
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
  dispatch(getUsersStart());
  try {
    const res = await userRequest.get(`/users/find/${id}`);
    await dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
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
