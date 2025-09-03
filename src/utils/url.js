import { API_URL } from './env';

const API_DOMAIN_URL = API_URL.replace('/api/', '');
export const pathImageToUrl = (path) => `${API_DOMAIN_URL}${path}`;
export const getImageWithFormat = (image, format) => {
  if (typeof image === 'string') {
    return image;
  }

  const path = image?.formats[format]?.url || image?.url;
  return pathImageToUrl(path);
};