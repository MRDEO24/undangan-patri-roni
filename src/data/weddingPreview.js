import request from '../utils/request';

export const getWeddingPreview = async ({ queryKey: [_, uuid] }) => {
  const res = await request(`wedding-preview/${uuid}`);
  return res.data;
};