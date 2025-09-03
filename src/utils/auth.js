import Cookies from 'js-cookie';
import { TOKEN_COOKIES } from '../constants/auth';
import moment from 'moment';

export const setToken = (token) => {
  const exp = decodeToken(token).exp * 1000;
  const expires = moment(exp).diff(moment(), 'days');
  Cookies.set(TOKEN_COOKIES, token, {
    expires,
  });
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_COOKIES);
  if (!verifyToken(token)) {
    Cookies.remove(TOKEN_COOKIES);
    return null;
  }
  return token;
};

export const verifyToken = (token) => token && decodeToken(token).exp > (new Date().getTime() / 1000);

export const decodeToken = (token) => JSON.parse(atob(token.split('.')[1]));