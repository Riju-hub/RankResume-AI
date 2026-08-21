import express from 'express';
import { createJob, getJobs, getRecruiterJobs } from '../controllers/jobController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);
router.post('/', protect, restrictTo('recruiter'), createJob);
router.get('/recruiter', protect, restrictTo('recruiter'), getRecruiterJobs);

export default router;