import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: user => set(user),
      cleanUser: () => set({user: null}),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
