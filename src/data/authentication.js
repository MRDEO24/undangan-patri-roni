import request from '../utils/request';

export const register = async ({ name, email, password }) => {
  const res = await request.post('/auth/local/register', { name, email, password });
  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await request.post('/auth/local', { email, password });
  return res.data;
};