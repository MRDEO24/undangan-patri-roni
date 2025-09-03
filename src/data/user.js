import request from '../utils/request';

export const currentUser = async () => {
  const res = await request.get('users/me');
  return res.data;
};