import request from '../utils/request';
import unauthenticatedRequest from '../utils/unauthenticatedRequest';

export const getListWedding = async ({ queryKey: [_, user_id] }) => {
  const res = await request(`wedding/me/${user_id}`);
  return res.data;
};

export const getWeddingBasedUrl = async ({ queryKey: [_, weddingurl] }) => {
  const res = await unauthenticatedRequest(`weddinginv/${weddingurl}`);
  return res.data;
};