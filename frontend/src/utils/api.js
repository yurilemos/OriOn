import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

export const api = {
  main: axios.create({
    baseURL: API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
  users: axios.create({
    baseURL: process.env.REACT_APP_URL_API_USUARIOS,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
};

api.main.interceptors.request.use(async (config) => {
  if (!config.headers) {
    return config;
  }
  config.headers.Authorization = `Bearer ${await localStorage.getItem(
    'token'
  )}`;
  return config;
});
