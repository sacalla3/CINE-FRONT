import { create } from 'zustand';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserStore {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  loading: false,

  fetchUsers: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token no encontrado');

      const response = await axios.get('https://cine-nest-production.up.railway.app/api/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ users: response.data, loading: false });
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      set({ loading: false });
    }
  },
}));
