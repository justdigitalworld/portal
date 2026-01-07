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

// Employer routes
router.post('/', protect, authorize('employer'), createJob);
router.get('/employer/my-jobs', protect, authorize('employer'), getEmployerJobs);
router.put('/:id', protect, authorize('employer'), updateJob);
router.delete('/:id', protect, authorize('employer'), deleteJob);

export default router;
