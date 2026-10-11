// backend\src\controllers\jobController.js
import { Job } from '../models/Job.js';
import { Review } from '../models/Review.js';
import { User } from '../models/User.js';

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      companyName,
      salary,
      isActivelyHiring,
      description,
      requiredSkills,
      skillsRequired,
      department,
      location,
      jobType,
      experienceRequired,
      requirements,
    } = req.body;

    const job = await Job.create({
      recruiterId: req.user._id,
      title,
      companyName: companyName?.trim() || 'Confidential Company',
      salary: salary?.trim() || 'Competitive CTC',
      isActivelyHiring: isActivelyHiring !== undefined ? Boolean(isActivelyHiring) : true,
      description,
      requiredSkills: requiredSkills || skillsRequired || [],
      skillsRequired: skillsRequired || requiredSkills || [],
      department: department || 'Engineering',
      location: location || 'Remote',
      jobType: jobType || 'Full-time',
      experienceRequired: experienceRequired || '2-4 years',
      requirements: requirements || '',
      status: 'open',
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ status: 'open' })
      .populate('recruiterId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, jobs, count: jobs.length });
  } catch (error) {
    next(error);
  }
};

export const getRecruiterJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, jobs, count: jobs.length });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Guard against invalid hex formats
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    const job = await Job.findById(req.params.id).populate('recruiterId', 'name email');
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only edit jobs published by your account.',
      });
    }

    const {
      title,
      companyName,
      salary,
      isActivelyHiring,
      department,
      location,
      jobType,
      experienceRequired,
      description,
      requirements,
      skillsRequired,
      requiredSkills,
      status,
    } = req.body;

    if (title !== undefined) job.title = title.trim();
    if (companyName !== undefined) job.companyName = companyName.trim();
    if (salary !== undefined) job.salary = salary.trim();
    if (isActivelyHiring !== undefined) job.isActivelyHiring = Boolean(isActivelyHiring);
    if (department !== undefined) job.department = department.trim();
    if (location !== undefined) job.location = location.trim();
    if (jobType !== undefined) job.jobType = jobType;
    if (experienceRequired !== undefined) job.experienceRequired = experienceRequired.trim();
    if (description !== undefined) job.description = description;
    if (requirements !== undefined) job.requirements = requirements;
    if (status !== undefined) job.status = status;

    const skills = skillsRequired || requiredSkills;
    if (skills !== undefined) {
      job.skillsRequired = skills;
      job.requiredSkills = skills;
    }

    const updatedJob = await job.save();

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      job: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (job.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete jobs published by your account.',
      });
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
      deletedId: id,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs/:id/reviews
export const getJobReviews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({ jobId: id })
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 });

    const total = reviews.length;
    const avgRating =
      total > 0
        ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / total).toFixed(1)
        : null;

    res.status(200).json({
      success: true,
      reviews,
      count: total,
      averageRating: avgRating ? Number(avgRating) : 5,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/jobs/:id/reviews
export const addJobReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({ success: false, message: 'Comment text is required.' });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found.' });
    }

    const newReview = await Review.create({
      jobId: id,
      userId: req.user._id,
      comment: comment.trim(),
      rating: rating ? Math.min(5, Math.max(1, Number(rating))) : 5,
    });

    const populatedReview = await newReview.populate('userId', 'name email role');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      review: populatedReview,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/jobs/:id/reviews/:reviewId
export const updateJobReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { comment, rating } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Comment not found.' });
    }

    // Authorization: Only the author can edit
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only edit your own comment.',
      });
    }

    if (comment !== undefined) {
      if (!comment.trim()) {
        return res.status(400).json({ success: false, message: 'Comment text cannot be empty.' });
      }
      review.comment = comment.trim();
    }

    if (rating !== undefined) {
      review.rating = Math.min(5, Math.max(1, Number(rating)));
    }

    await review.save();
    const populated = await review.populate('userId', 'name email role');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully.',
      review: populated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/jobs/:id/reviews/:reviewId
export const deleteJobReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Comment not found.' });
    }

    // Authorization: Only the author can delete
    if (review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You can only delete your own comment.',
      });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({
      success: true,
      message: 'Comment removed successfully.',
      reviewId,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/jobs/:id/save  (Toggles save/unsave)
export const toggleSaveJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isSaved = user.savedJobs.some(
      (savedId) => savedId.toString() === jobId.toString()
    );

    if (isSaved) {
      user.savedJobs = user.savedJobs.filter(
        (savedId) => savedId.toString() !== jobId.toString()
      );
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: isSaved ? 'Job removed from saved list' : 'Job saved successfully',
      isSaved: !isSaved,
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs/saved/all  (Fetches candidate's saved jobs)
export const getSavedJobs = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'savedJobs',
      populate: { path: 'recruiterId', select: 'name email' },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Filter out jobs that may have been deleted from DB
    const validSavedJobs = (user.savedJobs || []).filter(Boolean);

    res.status(200).json({
      success: true,
      savedJobs: validSavedJobs,
      count: validSavedJobs.length,
    });
  } catch (error) {
    next(error);
  }
};