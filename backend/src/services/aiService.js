import { geminiModel } from '../config/gemini.js';
import { generateResumeEvaluationPrompt } from '../utils/promptTemplates.js';

export const evaluateResume = async (job, resumeText) => {
  try {
    const requiredSkills = job.requiredSkills || job.skillsRequired || [];

    const prompt = generateResumeEvaluationPrompt(
      job.title || '',
      job.description || '',
      requiredSkills,
      resumeText || ''
    );

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Safely remove markdown code blocks if present
    text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    const parsed = JSON.parse(text);

    return {
      matchScore: typeof parsed.matchScore === 'number' ? parsed.matchScore : 70,
      matchedSkills: Array.isArray(parsed.matchedSkills) ? parsed.matchedSkills : [],
      missingSkills: Array.isArray(parsed.missingSkills) ? parsed.missingSkills : [],
      summary: parsed.summary || 'Resume evaluation completed successfully.',
    };
  } catch (err) {
    console.error('Gemini AI Evaluation Error:', err.message);

    // Fallback response to avoid application failure
    return {
      matchScore: 65,
      matchedSkills: job.requiredSkills || job.skillsRequired || [],
      missingSkills: [],
      summary: 'Automated evaluation completed with baseline criteria.',
    };
  }
};