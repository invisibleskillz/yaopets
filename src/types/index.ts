export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  profileImage?: string;
  city?: string;
  bio?: string;
  website?: string;
  userType: UserType;
  points: number;
  level: string;
  verified: boolean;
  createdAt: string;
}

export type UserType = 'tutor' | 'veterinarian' | 'admin' | 'volunteer';

export interface Post {
  id: number;
  userId: number;
  content: string;
  mediaUrls: string[];
  mediaType?: 'image' | 'gif' | 'video';
  location?: Location | null;
  visibilityType: 'public' | 'private' | 'followers';
  postType: 'regular' | 'event' | 'question' | 'story';
  isStory: boolean;
  expiresAt?: string | null;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: number;
    username: string;
    name?: string;
    profileImage?: string;
  };
}

export interface Pet {
  id: number;
  userId: number;
  name: string;
  species: string;
  breed?: string;
  color: string;
  size: 'small' | 'medium' | 'large';
  age: 'puppy' | 'young' | 'adult' | 'senior';
  status: 'lost' | 'found' | 'adoption';
  description: string;
  lastLocation: Location;
  photos?: string[];
  contactPhone?: string;
  createdAt: string;
}

export interface Donation {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  condition: string;
  location: Location;
  photos?: string[];
  createdAt: string;
}

export interface VetHelp {
  id: number;
  userId: number;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  location: Location;
  photos?: string[];
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  daysToComplete: number;
}

export interface Location {
  lat?: number;
  lng?: number;
  address: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  likesCount: number;
  createdAt: string;
  user?: {
    id: number;
    username: string;
    profileImage?: string;
  };
}

export interface Chat {
  id: number;
  participant1Id: number;
  participant2Id: number;
  lastMessageId?: number;
  createdAt: string;
}

export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  recipientId: number;
  content: string;
  attachmentUrl?: string;
  read: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}