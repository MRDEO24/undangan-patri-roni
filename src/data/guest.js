import request from '../utils/request';

export const getGuest = async ({ queryKey: [_, uuid] }) => {
  const res = await request(`guests/${uuid}`);
  return res.data;
};

export const findGuestWedding = async ({ queryKey: [_, uuid] }) => {
  const res = await request(`guests/wedding/${uuid}`);
  return res.data;
};