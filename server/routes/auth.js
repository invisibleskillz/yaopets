import express from 'express';
import { 
  register, 
  login, 
  getCurrentUser, 
  changePassword,
  requestPasswordReset,
  resetPassword
} from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Register a new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get current user (requires authentication)
router.get('/me', auth, getCurrentUser);

// Change password (requires authentication)
router.post('/change-password', auth, changePassword);

// Request password reset
router.post('/request-reset', requestPasswordReset);

// Reset password with token
router.post('/reset-password', resetPassword);

export default router;