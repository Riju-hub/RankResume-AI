import { Job } from '../models/Job.js';

export const createJob = async (req, res, next) => {
  try {
    const {
      title,
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
      description,
      requiredSkills: requiredSkills || skillsRequired || [],
      skillsRequired: skillsRequired || requiredSkills || [],
      department: department || 'Engineering',
      location: location || 'Remote',
      jobType: jobType || 'Full-time',
      experienceRequired,
      requirements,
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