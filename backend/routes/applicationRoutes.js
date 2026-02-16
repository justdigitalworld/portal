import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  sendMessage,
  getMessages,
  sendOfferLetter
} from '../controllers/applicationController.js';
import { protect } from '../middleware/auth.js';
import { authorize } from '../middleware/roleCheck.js';

const router = express.Router();

// Job Seeker routes
router.post('/', protect, authorize('jobseeker'), applyForJob);
router.get('/my-applications', protect, authorize('jobseeker'), getMyApplications);

// Employer routes
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.put('/:id/status', protect, authorize('employer', 'jobseeker'), updateApplicationStatus);
router.post('/:id/messages', protect, sendMessage);
router.get('/:id/messages', protect, getMessages);
router.post('/:id/offer', protect, authorize('employer', 'admin'), sendOfferLetter);

export default router;
