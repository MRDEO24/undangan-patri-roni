import { throwError } from './error';
import request from './request';

/**
 * @param {{
 *  [key: string]: File
 * }} files 
 * @returns {Promise}
 */
export const uploadFile = async (files) => {
  const keys = Object.keys(files);
  const data = new FormData();
  Object.values(files).forEach((file) => {
    data.append('files', file);
  });


  const res = await request('upload', {
    method: 'POST',
    data,
  }).catch(() => {
    throwError('Unggah File', 'File yang anda unggah gagal');
  });

  return res.data.reduce((list, image, index) => {
    list[keys[index]] = image;
    return list;
  }, {});
};