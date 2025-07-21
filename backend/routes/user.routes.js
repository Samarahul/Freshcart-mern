import express from 'express';
import {
    isAuthUser,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/user.Controller.js';
import { authUser } from '../middlewares/authUser.js';

const router = express.Router();

// Registration
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Logout (protected route)
router.get('/logout', authUser, logoutUser);

router.get('/is-auth', authUser, isAuthUser);
export default router;
