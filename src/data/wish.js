import unauthenticatedRequest from "../utils/unauthenticatedRequest";

export const getWishes = async ({ queryKey: [_, uuid] }) => {
  const res = await unauthenticatedRequest(`wishes/${uuid}`);
  return res.data;
};

export const findGuestWedding = async ({ queryKey: [_, uuid] }) => {
  const res = await request(`guests/wedding/${uuid}`);
  return res.data;
};