import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  profileImage?: string;
  city?: string;
  bio?: string;
  website?: string;
  userType?: string;
  points?: number;
  level?: string;
  [key: string]: any;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: Partial<User>) => Promise<User>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

// Mock users for demo
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    profileImage: '',
    city: 'New York',
    bio: 'Pet lover and volunteer',
    website: 'johndoe.com',
    userType: 'tutor',
    points: 150,
    level: 'Beginner'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    username: 'janesmith',
    profileImage: '',
    city: 'Los Angeles',
    bio: 'Animal rescue volunteer',
    website: '',
    userType: 'volunteer',
    points: 300,
    level: 'Advanced'
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string): Promise<User> => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = mockUsers.find(u => u.email === email);
        if (!user) {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }

        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return user;
      },

      register: async (userData: Partial<User>): Promise<User> => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Date.now(),
          name: userData.name || '',
          email: userData.email || '',
          username: userData.username || '',
          profileImage: userData.profileImage || '',
          city: userData.city || '',
          bio: userData.bio || '',
          website: userData.website || '',
          userType: userData.userType || 'tutor',
          points: 0,
          level: 'Beginner'
        };

        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false 
        });
        
        return newUser;
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false 
        });
      },

      updateUser: (data: Partial<User>) => {
        const { user } = get();
        if (!user) return;
        
        const updatedUser = { ...user, ...data };
        set({ user: updatedUser });
      }
    }),
    {
      name: 'yaopets-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      })
    }
  )
);