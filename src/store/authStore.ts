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

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Find user by email
        const user = mockUsers.find(u => u.email === email);
        
        if (!user || password !== 'password') {
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

      register: async (userData: Partial<User>) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === userData.email);
        if (existingUser) {
          set({ isLoading: false });
          throw new Error('Email already exists');
        }

        const newUser: User = {
          id: Date.now(),
          name: userData.name || '',
          email: userData.email || '',
          username: userData.username || '',
          profileImage: userData.profileImage || '',
          city: userData.city || '',
          bio: userData.bio || '',
          userType: userData.userType || 'tutor',
          points: 0,
          level: 'Beginner'
        };

        mockUsers.push(newUser);
        
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
        
        // Update in mock users array
        const userIndex = mockUsers.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          mockUsers[userIndex] = updatedUser;
        }
        
        set({ user: updatedUser });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);