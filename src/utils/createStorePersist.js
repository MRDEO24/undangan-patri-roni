import { createJSONStorage } from 'zustand/middleware';

const createStorePersist = (key, storage = localStorage) => ({
  name: key,
  storage: createJSONStorage(() => storage),
});

export default createStorePersist;