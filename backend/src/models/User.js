import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['candidate', 'recruiter'], required: true },
  savedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  // Password Reset Fields
  resetPasswordToken: { type: String, default: undefined },
  resetPasswordExpires: { type: Date, default: undefined },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);