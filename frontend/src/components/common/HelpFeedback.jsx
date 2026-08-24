import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquarePlus,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Cpu,
  ShieldAlert,
  Zap,
  MailQuestion
} from 'lucide-react';

const FAQS = [
  {
    category: 'Scoring Engine',
    icon: Sparkles,
    q: 'How does Gemini ATS evaluate resume matches?',
    a: 'RankResume AI leverages Google Gemini multimodal embeddings and LLM reasoning. Rather than rigid keyword matching, it performs semantic context extraction across candidate skill clusters, impact metrics, project relevance, and verified experience against your exact job parameters.'
  },
  {
    category: 'File Processing',
    icon: Cpu,
    q: 'What resume file formats and size constraints apply?',
    a: 'We support standard PDF documents up to 5MB. Multi-column, modern LaTeX, and single-page ATS-optimized templates are fully parsed through our deterministic PDF extraction pipeline before scoring.'
  },
  {
    category: 'Pipeline & Workflows',
    icon: Zap,
    q: 'How do pipeline state updates synchronize?',
    a: 'Dragging candidates between stages (Applied, Screening, Interview, Offered, Rejected) dispatches optimistic state updates that sync with the backend database instantly while maintaining active audit logs.'
  },
  {
    category: 'Data & Privacy',
    icon: ShieldAlert,
    q: 'Is candidate resume data used to train public LLM models?',
    a: 'No. All candidate resumes, extracted text, and AI evaluation vectors are strictly sandboxed. Data is retained solely within your private workspace and deleted upon application or account purging.'
  }
];

export const HelpFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8">
      {/* Header Banner with Glow */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-900/60 to-black/80 p-8 backdrop-blur-2xl shadow-2xl">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-300">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Support & Documentation
            </div>
            <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
              Help Center & Product Feedback
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Explore ATS evaluation mechanics, platform guides, or directly submit architectural feedback.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-zinc-800/80 text-indigo-400 shadow-inner">
              <MailQuestion className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-indigo-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            Frequently Answered Insights
          </h2>
        </div>
        
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {FAQS.map((faq, idx) => {
            const Icon = faq.icon;
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveFaq(isOpen ? null : idx)}
                className={`group cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                  isOpen
                    ? 'border-indigo-500/40 bg-zinc-900/80 shadow-lg shadow-indigo-950/20'
                    : 'border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700/80 hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-zinc-800/80 text-indigo-400">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400/90">
                        {faq.category}
                      </span>
                      <h3 className="text-xs font-semibold text-zinc-100 group-hover:text-white">
                        {faq.q}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-indigo-400' : ''
                    }`}
                  />
                </div>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 mt-3.5' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <p className="overflow-hidden text-[12px] leading-relaxed text-zinc-400">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Submission Section */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/70 via-zinc-900/30 to-zinc-950/90 p-7 backdrop-blur-2xl shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800/70 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <MessageSquarePlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-wide text-zinc-100">Direct Engineering & Product Feedback</h2>
              <p className="text-[11px] text-zinc-400">Report inaccuracies, suggest new scoring heuristics, or request integrations.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {['General Idea', 'Bug Report', 'ATS Accuracy', 'Feature Request'].map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setCategory(type)}
                className={`rounded-xl px-3.5 py-1.5 text-[11px] font-semibold transition-all ${
                  category === type
                    ? 'border border-indigo-500/50 bg-indigo-600/20 text-indigo-300 shadow-sm'
                    : 'border border-zinc-800 bg-zinc-950/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <textarea
            rows={4}
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Describe the issue or feature request in detail..."
            className="w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 text-xs text-zinc-100 placeholder-zinc-500 outline-none transition-all focus:border-indigo-500/70 focus:bg-zinc-950 focus:ring-4 focus:ring-indigo-500/10"
          />

          {submitted && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Feedback submitted successfully. Thank you for making RankResume AI better!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-zinc-500">Your telemetry and app version are automatically attached.</span>
            <button
              type="submit"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 px-6 text-xs font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] hover:shadow-indigo-600/35 active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HelpFeedback;