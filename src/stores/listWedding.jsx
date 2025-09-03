import { create } from 'zustand';

export const useListWeddingStore = create(set => ({
  data: null,
  setData: data => set({ data }),
}));