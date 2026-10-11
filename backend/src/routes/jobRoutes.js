// backend/src/routes/jobRoutes.js
import express from 'express';
import {
  createJob,
  getJobs,
  getRecruiterJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobReviews,
  addJobReview,
  updateJobReview,
  deleteJobReview,
  toggleSaveJob,
  getSavedJobs,
} from '../controllers/jobController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. General Public Listings
router.get('/', getJobs);

// 2. Specific Named Routes (MUST be declared BEFORE parameter routes like /:id)
router.get('/saved/all', protect, getSavedJobs);
router.get('/recruiter', protect, restrictTo('recruiter'), getRecruiterJobs); //  MOVED ABOVE /:id

// 3. Dynamic ID Parameter Routes
router.get('/:id', getJobById);
router.get('/:id/reviews', getJobReviews);

// 4. Protected Reviews & Save Routes
router.post('/:id/save', protect, toggleSaveJob);
router.post('/:id/reviews', protect, addJobReview);
router.put('/:id/reviews/:reviewId', protect, updateJobReview);
router.delete('/:id/reviews/:reviewId', protect, deleteJobReview);

// 5. Recruiter Mutation Routes
router.post('/', protect, restrictTo('recruiter'), createJob);
router.put('/:id', protect, restrictTo('recruiter'), updateJob);
router.delete('/:id', protect, restrictTo('recruiter'), deleteJob);

export default router;