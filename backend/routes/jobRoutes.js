import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  getEmployerJobs,
  updateJob,
  deleteJob
} from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Employer & Admin routes
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.get('/employer/my-jobs', protect, authorize('employer', 'admin'), getEmployerJobs);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);

export default router;
