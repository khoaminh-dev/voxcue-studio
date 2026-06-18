import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null, // { id, email, name, avatar, role, credits, token }
  isLoading: true,
  
  setUser: (userData) => set({ user: userData, isLoading: false }),
  clearUser: () => set({ user: null, isLoading: false }),
  setLoading: (status) => set({ isLoading: status })
}));
