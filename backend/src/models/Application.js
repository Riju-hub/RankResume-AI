import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUrl: { type: String, required: true },
  parsedText: { type: String },
  matchScore: { type: Number, default: 0 },
  aiFeedback: { type: String },
  status: { 
    type: String, 
    enum: ['applied', 'reviewing', 'shortlisted', 'rejected'], 
    default: 'applied' 
  },
  appliedAt: { type: Date, default: Date.now }
});

export const Application = mongoose.model('Application', applicationSchema);