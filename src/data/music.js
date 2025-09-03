import request from '../utils/request';

export const getMusics = async ({ queryKey: [_, musics] }) => {
  const res = await request('musics', {
    musics,
  });
  return res.data;
};