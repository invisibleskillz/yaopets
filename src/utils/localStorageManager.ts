// This file provides utility functions for managing data in localStorage
// It's a simplified version that doesn't handle complex data operations

// User management
export const userManagement = {
  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem('yaopets_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Login user (simplified)
  login: (email: string, password: string) => {
    try {
      // In a real app, this would validate against a backend
      // For demo, we'll just check against stored users
      const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Store the logged in user
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('yaopets_user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Register a new user (simplified)
  register: (userData: any) => {
    try {
      // In a real app, this would send data to a backend
      // For demo, we'll just store in localStorage
      const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
      
      // Check if email already exists
      if (users.some((u: any) => u.email === userData.email)) {
        throw new Error('Email already in use');
      }
      
      // Create new user with ID
      const newUser = {
        id: Date.now(),
        ...userData,
        points: 0,
        level: 'Beginner',
        createdAt: new Date().toISOString()
      };
      
      // Save to users array
      users.push(newUser);
      localStorage.setItem('yaopets_users', JSON.stringify(users));
      
      // Save as current user
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem('yaopets_user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('yaopets_user');
  },

  // Update user data
  updateUser: (userId: number, data: any) => {
    try {
      // Update in users array
      const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
      const updatedUsers = users.map((user: any) => {
        if (user.id === userId) {
          return { ...user, ...data };
        }
        return user;
      });
      
      localStorage.setItem('yaopets_users', JSON.stringify(updatedUsers));
      
      // Update current user if it's the same
      const currentUser = JSON.parse(localStorage.getItem('yaopets_user') || 'null');
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem('yaopets_user', JSON.stringify({ ...currentUser, ...data }));
      }
      
      return { ...currentUser, ...data };
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: (userId: number) => {
    try {
      const users = JSON.parse(localStorage.getItem('yaopets_users') || '[]');
      return users.find((u: any) => u.id === userId) || null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  },

  // Get followers for a user
  getFollowers: (userId: number) => {
    try {
      // In a real app, this would query a relationships table
      // For demo, we'll return a simple array
      return [1, 2, 3]; // Mock follower IDs
    } catch (error) {
      console.error('Error getting followers:', error);
      return [];
    }
  },

  // Get users that a user is following
  getFollowing: (userId: number) => {
    try {
      // In a real app, this would query a relationships table
      // For demo, we'll return a simple array
      return [4, 5]; // Mock following IDs
    } catch (error) {
      console.error('Error getting following:', error);
      return [];
    }
  },

  // Check if a user is following another user
  isFollowing: (userId: number, targetUserId: number) => {
    try {
      // In a real app, this would query a relationships table
      // For demo, we'll return a simple boolean
      return false; // Mock relationship status
    } catch (error) {
      console.error('Error checking following status:', error);
      return false;
    }
  },

  // Follow a user
  followUser: (userId: number, targetUserId: number) => {
    // In a real app, this would create a relationship in the database
    console.log(`User ${userId} is now following user ${targetUserId}`);
    return true;
  },

  // Unfollow a user
  unfollowUser: (userId: number, targetUserId: number) => {
    // In a real app, this would remove a relationship from the database
    console.log(`User ${userId} unfollowed user ${targetUserId}`);
    return true;
  }
};

// Chat storage
export const chatStorage = {
  // Create or get a chat between two users
  createChat: (userId1: number, userId2: number) => {
    // In a real app, this would create a chat in the database
    // For demo, we'll return a mock chat object
    return {
      id: 1,
      participant1Id: userId1,
      participant2Id: userId2,
      createdAt: new Date().toISOString()
    };
  },

  // Get messages for a chat
  getMessages: (chatId: number) => {
    // In a real app, this would query messages from the database
    // For demo, we'll return mock messages
    return [
      {
        id: 1,
        conversationId: chatId,
        senderId: 1,
        recipientId: 2,
        content: "Hello! I'm interested in your pet for adoption.",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        read: true
      },
      {
        id: 2,
        conversationId: chatId,
        senderId: 2,
        recipientId: 1,
        content: "Hi there! Thanks for your interest. Would you like to know more about them?",
        createdAt: new Date(Date.now() - 3000000).toISOString(),
        read: true
      }
    ];
  },

  // Mark messages as read
  markMessagesAsRead: (chatId: number, userId: number) => {
    // In a real app, this would update message read status in the database
    console.log(`Marking messages in chat ${chatId} as read for user ${userId}`);
    return true;
  },

  // Send a message
  sendMessage: (chatId: number, senderId: number, recipientId: number, content: string) => {
    // In a real app, this would create a message in the database
    // For demo, we'll return a mock message
    return {
      id: Date.now(),
      conversationId: chatId,
      senderId,
      recipientId,
      content,
      createdAt: new Date().toISOString(),
      read: false
    };
  },

  // Get user chats
  getUserChats: (userId: number) => {
    // In a real app, this would query chats from the database
    // For demo, we'll return mock chats
    return [
      {
        id: 1,
        participant1Id: userId,
        participant2Id: 2,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
  }
};

// Post storage
export const postStorage = {
  // Get all posts
  getAllPosts: () => {
    // In a real app, this would query posts from the database
    // For demo, we'll return mock posts
    return [];
  },

  // Get post by ID
  getPostById: (postId: number) => {
    // In a real app, this would query a post from the database
    // For demo, we'll return null
    return null;
  },

  // Add a post
  addPost: (postData: any) => {
    // In a real app, this would create a post in the database
    console.log('Adding post:', postData);
    return { id: Date.now(), ...postData };
  },

  // Update a post
  updatePost: (postId: number, postData: any) => {
    // In a real app, this would update a post in the database
    console.log(`Updating post ${postId}:`, postData);
    return { id: postId, ...postData };
  }
};

// Pet storage
export const petStorage = {
  // Get user pets
  getUserPets: (userId: number) => {
    // In a real app, this would query pets from the database
    // For demo, we'll return an empty array
    return [];
  }
};

// Interaction storage
export const interactionStorage = {
  // Check if a post is liked by a user
  isPostLiked: (userId: number, postId: number) => {
    // In a real app, this would query likes from the database
    return false;
  },

  // Check if a post is saved by a user
  isPostSaved: (userId: number, postId: number) => {
    // In a real app, this would query saved posts from the database
    return false;
  },

  // Check if a comment is liked by a user
  isCommentLiked: (userId: number, commentId: number) => {
    // In a real app, this would query comment likes from the database
    return false;
  },

  // Get comments for a post
  getPostComments: (postId: number) => {
    // In a real app, this would query comments from the database
    return [];
  },

  // Like a post
  likePost: (userId: number, postId: number) => {
    // In a real app, this would create a like in the database
    console.log(`User ${userId} liked post ${postId}`);
  },

  // Unlike a post
  unlikePost: (userId: number, postId: number) => {
    // In a real app, this would remove a like from the database
    console.log(`User ${userId} unliked post ${postId}`);
  },

  // Save a post
  savePost: (userId: number, postId: number) => {
    // In a real app, this would save a post in the database
    console.log(`User ${userId} saved post ${postId}`);
  },

  // Unsave a post
  unsavePost: (userId: number, postId: number) => {
    // In a real app, this would remove a saved post from the database
    console.log(`User ${userId} unsaved post ${postId}`);
  },

  // Get saved posts for a user
  getSavedPosts: (userId: number) => {
    // In a real app, this would query saved posts from the database
    return [];
  },

  // Add a comment to a post
  addComment: (userId: number, postId: number, content: string) => {
    // In a real app, this would create a comment in the database
    return {
      id: Date.now(),
      postId,
      userId,
      content,
      createdAt: new Date().toISOString(),
      likesCount: 0
    };
  },

  // Like a comment
  likeComment: (userId: number, commentId: number) => {
    // In a real app, this would create a comment like in the database
    console.log(`User ${userId} liked comment ${commentId}`);
  },

  // Unlike a comment
  unlikeComment: (userId: number, commentId: number) => {
    // In a real app, this would remove a comment like from the database
    console.log(`User ${userId} unliked comment ${commentId}`);
  }
};

// Local interactions for fundraisers
export const localInteractions = {
  // Get all public fundraisers
  getAllFundraisersPublic: () => {
    // In a real app, this would query fundraisers from the database
    // For demo, we'll return mock fundraisers with calculated fields
    return [
      {
        id: 1,
        userId: 2,
        title: "Surgery for Max",
        description: "Max needs an emergency surgery after an accident.",
        amount: 1500,
        daysToComplete: 30,
        motivo: "surgery",
        createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200",
        status: "active",
        // Calculated fields for UI
        currentAmount: 750,
        percentComplete: 50,
        daysRemaining: 25
      },
      {
        id: 2,
        userId: 3,
        title: "Treatment for Luna",
        description: "Luna needs ongoing treatment for a chronic condition.",
        amount: 800,
        daysToComplete: 15,
        motivo: "treatment",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?q=80&w=200",
        status: "active",
        // Calculated fields for UI
        currentAmount: 320,
        percentComplete: 40,
        daysRemaining: 12
      }
    ];
  },

  // Create a new fundraiser (mock)
  createFundraiser: (fundraiserData: any) => {
    console.log('Creating fundraiser:', fundraiserData);
    // In a real app, this would create a fundraiser in the database
    return {
      id: Date.now(),
      ...fundraiserData,
      status: 'active',
      createdAt: new Date().toISOString(),
      // Mock calculated fields
      currentAmount: 0,
      percentComplete: 0,
      daysRemaining: fundraiserData.daysToComplete
    };
  }
};