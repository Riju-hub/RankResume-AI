// backend\src\controllers\authController.js
import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { generateToken } from '../utils/tokenHelper.js';
import { sendResetPasswordEmail } from '../services/emailService.js';

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

// POST /api/auth/forgot-password
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Anti-enumeration: Return success even if email isn't in database
    if (!user) {
      return res.status(200).json({
        message: 'If an account exists with that email, a password reset link has been dispatched.'
      });
    }

    // Generate secure 32-byte token
    const rawResetToken = crypto.randomBytes(32).toString('hex');

    // Store SHA-256 hash in DB
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(rawResetToken)
      .digest('hex');

    // 15-minute expiration
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${rawResetToken}`;

    await sendResetPasswordEmail(user.email, resetUrl);

    res.status(200).json({
      message: 'If an account exists with that email, a password reset link has been dispatched.'
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/reset-password/:token
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: 'The password reset link is invalid or has expired.'
      });
    }

    // Hash new password and clear token
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      message: 'Password successfully updated. You may now sign in.'
    });
  } catch (error) {
    next(error);
  }
};