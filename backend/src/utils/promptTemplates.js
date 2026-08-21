export const generateResumeEvaluationPrompt = (jobTitle, jobDescription, requiredSkills, resumeText) => {
  return `
You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
Analyze the following resume against the job description.

Job Title: ${jobTitle}
Job Description: ${jobDescription}
Required Skills: ${requiredSkills.join(', ')}

Resume Content:
"""
${resumeText}
"""

Evaluate the resume and return a STRICT JSON object (no markdown formatting, no code fences):
{
  "matchScore": <number between 0 and 100>,
  "matchedSkills": [<list of matched skills>],
  "missingSkills": [<list of missing required skills>],
  "summary": "<2-3 sentence assessment of candidate fit>"
}
`;
};