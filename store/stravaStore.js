import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Crea el store de zustand
const useUserStore = create(
  persist(
    (set) => ({
      fake: false,
      activities: null, // actividades del usuario
      user: null, // datos del usuario
      authData: null, // authData contiene access_token, refresh_token, expires_at
      setUser: (user) => set({ user }),
      setIsFake: (fake) => set({ fake }),
      setAuthData: (authData) => set({ authData }),
      setActivities: (activities) => set({ activities }),
      clearAuthData: () => set({ user: null, authData: null, activities: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        authData: state.authData,
        user: state.user,
        activities: state.activities,
        fake: state.fake,
      }),
      onError: (error) => {
        console.error('Error en persistencia de Zustand:', error);
        alert('Error en el almacenamiento');
      },
    }
  )
);

export default useUserStore;
