import axios from 'axios';
import { API_URL } from './env';
import { getToken } from './auth';

const request = axios.create({
  baseURL: API_URL,
});

request.interceptors.request.use(function (config) {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default request;