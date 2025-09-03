import request from '../utils/request';

export const findTemplates = async ({ queryKey: [_, templates] }) => {
  const res = await request.post('templates/find', {
    templates,
  });
  return res.data;
};