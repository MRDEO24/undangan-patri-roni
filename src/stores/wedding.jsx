import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import createStorePersist from '../utils/createStorePersist';

export const useWeddingStore = create(persist(
  (set) => ({
    data: null,
    setData: data => set({ data }),
  }),
  createStorePersist('weddingDataStorage'),
));