import { Application } from '../models/Application.js';
import { Job } from '../models/Job.js';
import { extractTextFromPDF } from '../services/parseService.js';
import { uploadResumeToSupabase } from '../services/storageService.js';
import { evaluateResume } from '../services/aiService.js';
import { sendStatusEmail } from '../services/emailService.js';

export const applyToJob = async (req, res, next) => {
  try {
    // Support both route params (/apply/:jobId) and form body (/apply)
    const jobId = req.params.jobId || req.body.jobId;
    
    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume PDF is required' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // 1. Upload to Supabase
    const resumeUrl = await uploadResumeToSupabase(req.file);

    // 2. Parse PDF text
    const parsedText = await extractTextFromPDF(req.file.buffer);

    // 3. AI Evaluation with Gemini
    const evaluation = await evaluateResume(job, parsedText);

    // 4. Persist Application
    const application = await Application.create({
      jobId,
      candidateId: req.user._id,
      resumeUrl,
      parsedText,
      matchScore: evaluation.matchScore,
      aiFeedback: evaluation.summary
    });

    res.status(201).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId })
      .populate('candidateId', 'name email')
      .sort({ matchScore: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
      .populate('candidateId', 'name email')
      .populate('jobId', 'title');

    if (!application) return res.status(404).json({ message: 'Application not found' });

    // Send notification email asynchronously
    sendStatusEmail(
      application.candidateId.email,
      application.candidateId.name,
      application.jobId.title,
      status
    ).catch(err => console.error('Status email failed:', err.message));

    res.status(200).json({ success: true, application });
  } catch (error) {
    next(error);
  }
};

export const getCandidateApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ candidateId: req.user._id })
      .populate('jobId', 'title description status department location')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    next(error);
  }
};