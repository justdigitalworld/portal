import express from 'express';
import { register, login, getProfile, updateProfile, uploadResume } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';
import upload from '../config/upload.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/upload-resume', protect, authorize('jobseeker'), upload.single('resume'), uploadResume);

export default router;
