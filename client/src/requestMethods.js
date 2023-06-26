import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/';

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL
});

// Function to set the token in the request headers
export const setAuthToken = (token) => {
  if (token) {
    userRequest.defaults.headers.common[
      ('Authorization', 'token')
    ] = `${token}`;
  } else {
    delete userRequest.defaults.headers.common['Authorization'];
  }
};

// Intercept requests to set the token
userRequest.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('persist:root'))?.user;
    const currentUser = token && JSON.parse(token).currentUser;
    const accessToken = currentUser?.accessToken;
    setAuthToken(accessToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
