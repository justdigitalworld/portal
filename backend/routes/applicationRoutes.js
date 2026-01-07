import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Job Seeker routes
router.post('/', protect, authorize('jobseeker'), applyForJob);
router.get('/my-applications', protect, authorize('jobseeker'), getMyApplications);

// Employer routes
router.get('/job/:jobId', protect, authorize('employer'), getJobApplications);
router.put('/:id/status', protect, authorize('employer'), updateApplicationStatus);

export default router;
