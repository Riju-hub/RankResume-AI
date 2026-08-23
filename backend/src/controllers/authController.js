import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { generateToken } from '../utils/tokenHelper.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);
    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/auth/profile
export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (email && email !== user.email) {
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'Email is already in use' });
      user.email = email;
    }

    if (name) user.name = name;
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/auth/account (Cascading Cleanup)
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    if (userRole === 'candidate') {
      // Remove all submitted applications
      await Application.deleteMany({ candidateId: userId });
    } else if (userRole === 'recruiter') {
      // Find all recruiter's jobs and remove their associated applications
      const jobs = await Job.find({ recruiterId: userId });
      const jobIds = jobs.map((j) => j._id);
      await Application.deleteMany({ jobId: { $in: jobIds } });
      await Job.deleteMany({ recruiterId: userId });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'Account and associated records deleted permanently.' });
  } catch (error) {
    next(error);
  }
};