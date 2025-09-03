import { create } from 'zustand';

export const useWeddingPreviewStore = create(set => ({
  data: null,
  setData: data => set({ data }),
}));