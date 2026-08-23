import React, { useState } from 'react';
import { HelpCircle, MessageSquare, Send, CheckCircle2, Bot, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: 'How does Gemini ATS evaluate resume matches?',
    a: 'The engine uses Google Gemini semantic extraction to analyze candidates against target skill sets, experience requirements, and qualifications defined in the job opening.'
  },
  {
    q: 'What resume formats are supported?',
    a: 'Currently, standard PDF documents up to 5MB are accepted for automated parsing.'
  },
  {
    q: 'Can recruiters drag and drop pipeline cards in real time?',
    a: 'Yes, dragging candidates between Applied, Screening, Interview, and Offered columns immediately syncs your pipeline state.'
  }
];

export const HelpFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">Help & Feedback</h1>
        <p className="text-xs text-zinc-400">Find answers to common questions or share suggestions with the team.</p>
      </div>

      {/* FAQ Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 backdrop-blur-md">
              <p className="text-xs font-semibold text-zinc-200">{faq.q}</p>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Submission Card */}
      <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 sm:p-7 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-indigo-400">
          <MessageSquare className="h-4 w-4" />
          <h2 className="text-xs font-bold uppercase tracking-wider">Submit Suggestions or Report Issues</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <textarea
            rows={4}
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you'd like to see improved or report any technical bugs..."
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/70 p-3.5 text-xs text-zinc-100 outline-none focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
          />
          {submitted && (
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Thank you! Your feedback has been received.</span>
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-2 rounded-xl bg-indigo-600 px-5 text-xs font-medium text-white shadow-md hover:bg-indigo-500 active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Feedback</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpFeedback;