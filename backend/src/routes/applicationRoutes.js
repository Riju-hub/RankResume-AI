import express from 'express';
import {
  applyToJob,
  getJobApplications,
  updateApplicationStatus,
  getCandidateApplications
} from '../controllers/applicationController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Allow both /apply/:jobId and /apply
router.post('/apply/:jobId', protect, restrictTo('candidate'), upload.single('resume'), applyToJob);
router.post('/apply', protect, restrictTo('candidate'), upload.single('resume'), applyToJob);

router.get('/my-applications', protect, restrictTo('candidate'), getCandidateApplications);
router.get('/job/:jobId', protect, restrictTo('recruiter'), getJobApplications);
router.patch('/:id/status', protect, restrictTo('recruiter'), updateApplicationStatus);

export default router;