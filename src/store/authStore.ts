import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserType } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  city?: string;
  userType: UserType;
}

// This is a mock API for demonstration purposes
// In a real app, you would replace these with actual API calls
const mockApi = {
  login: async (email: string, password: string): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check credentials against mock users
    const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Don't return password to the client
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },
  
  register: async (userData: RegisterData): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
    if (users.some((u: any) => u.email === userData.email)) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      ...userData,
      points: 0,
      level: 'Beginner',
      verified: true, // Auto-verify for demo
      createdAt: new Date().toISOString()
    };
    
    // Save to mock database
    localStorage.setItem('yaopets_users', JSON.stringify([...users, newUser]));
    
    // Don't return password to the client
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },
  
  updateUser: async (userId: number, updates: Partial<User>): Promise<User> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update user in mock database
    const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
    const updatedUsers = users.map((user: any) => {
      if (user.id === userId) {
        return { ...user, ...updates };
      }
      return user;
    });
    
    localStorage.setItem('yaopets_users', JSON.stringify(updatedUsers));
    
    // Find the updated user
    const updatedUser = updatedUsers.find((u: any) => u.id === userId);
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    // Don't return password to the client
    const { password: _, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword as User;
  }
};

// Initialize demo users if none exist
const initializeDemoUsers = () => {
  const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
  if (users.length === 0) {
    const demoUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'user@example.com',
        password: 'password',
        username: 'johndoe',
        city: 'New York',
        bio: 'Pet lover and volunteer',
        userType: 'tutor' as UserType,
        points: 120,
        level: 'Protector',
        verified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'Dr. Jane Smith',
        email: 'vet@example.com',
        password: 'password',
        username: 'drjane',
        city: 'Los Angeles',
        bio: 'Veterinarian with 10 years of experience',
        userType: 'veterinarian' as UserType,
        points: 350,
        level: 'Guardian',
        verified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password',
        username: 'admin',
        city: 'Chicago',
        bio: 'YaoPets Administrator',
        userType: 'admin' as UserType,
        points: 500,
        level: 'Master',
        verified: true,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('yaopets_users', JSON.stringify(demoUsers));
  }
};

// Initialize demo users
initializeDemoUsers();

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const user = await mockApi.login(email, password);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed', 
            isLoading: false 
          });
        }
      },
      
      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const user = await mockApi.register(userData);
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: async (data: Partial<User>) => {
        const { user } = get();
        if (!user) return;
        
        set({ isLoading: true, error: null });
        try {
          const updatedUser = await mockApi.updateUser(user.id, data);
          set({ user: updatedUser, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Update failed', 
            isLoading: false 
          });
        }
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'yaopets-auth',
      partialize: (state) => ({ 
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);