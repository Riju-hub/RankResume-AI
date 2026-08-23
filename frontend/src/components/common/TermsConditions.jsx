import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsConditions = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">Terms & Conditions</h1>
        <p className="text-xs text-zinc-400">Platform guidelines, resume data privacy, and ethical AI scoring standards.</p>
      </div>

      <div className="space-y-6 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-xl text-xs text-zinc-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-400" />
            1. Automated Resume Parsing & AI Evaluation
          </h2>
          <p className="text-zinc-400">
            RankResume AI uses semantic language models to extract text from candidate PDF documents solely for the purpose of matching qualifications against active job postings. Uploaded documents are not sold or used for third-party public training.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-400" />
            2. Recruiter & Candidate Responsibilities
          </h2>
          <p className="text-zinc-400">
            Candidates must submit accurate, authentic work history. Recruiters are responsible for maintaining fair hiring practices and verifying applicant credentials independently.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-zinc-100">3. Account Termination & Data Purging</h2>
          <p className="text-zinc-400">
            Users may permanently delete their accounts at any time via the profile settings. Account deletion immediately cascades and purges all uploaded resumes, match scores, and associated job applications.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;