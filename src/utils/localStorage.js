import { WEDDING_CREATE_STORE } from '../constants/weddingCreateStore';

export const removeListLocalStorage = (list = []) => list.forEach(v => localStorage.removeItem(v));
export const removeWeddingCreateLocalStorage = () => removeListLocalStorage(Object.values(WEDDING_CREATE_STORE));