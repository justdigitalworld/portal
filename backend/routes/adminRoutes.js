import express from 'express';
import { getUsers, createJobSeeker, getAdminStats } from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Protect all routes
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.post('/jobseeker', createJobSeeker);
router.get('/stats', getAdminStats);

export default router;
