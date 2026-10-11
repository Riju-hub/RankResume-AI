
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true },
  companyName: { type: String, default: 'Confidential Company', trim: true },
  salary: { type: String, default: 'Competitive CTC', trim: true }, // e.g. "₹18 - ₹24 LPA" or "$120k - $150k"
  isActivelyHiring: { type: Boolean, default: true },
  department: { type: String, default: 'Engineering', trim: true },
  location: { type: String, default: 'Remote', trim: true },
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], default: 'Full-time' },
  experienceRequired: { type: String, default: '2-4 years' },
  description: { type: String, required: true },
  requirements: { type: String, default: '' },
  requiredSkills: [{ type: String }],
  skillsRequired: [{ type: String }],
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});

export const Job = mongoose.model('Job', jobSchema);