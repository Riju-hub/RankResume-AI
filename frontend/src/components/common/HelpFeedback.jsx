// import React, { useState } from 'react';
// import {
//   HelpCircle,
//   MessageSquarePlus,
//   Send,
//   CheckCircle2,
//   Sparkles,
//   ChevronDown,
//   Cpu,
//   ShieldAlert,
//   Zap,
//   MailQuestion
// } from 'lucide-react';

// const FAQS = [
//   {
//     category: 'Scoring Engine',
//     icon: Sparkles,
//     q: 'How does Gemini ATS evaluate resume matches?',
//     a: 'RankResume AI leverages Google Gemini multimodal embeddings and LLM reasoning. Rather than rigid keyword matching, it performs semantic context extraction across candidate skill clusters, impact metrics, project relevance, and verified experience against your exact job parameters.'
//   },
//   {
//     category: 'File Processing',
//     icon: Cpu,
//     q: 'What resume file formats and size constraints apply?',
//     a: 'We support standard PDF documents up to 5MB. Multi-column, modern LaTeX, and single-page ATS-optimized templates are fully parsed through our deterministic PDF extraction pipeline before scoring.'
//   },
//   {
//     category: 'Pipeline & Workflows',
//     icon: Zap,
//     q: 'How do pipeline state updates synchronize?',
//     a: 'Dragging candidates between stages (Applied, Screening, Interview, Offered, Rejected) dispatches optimistic state updates that sync with the backend database instantly while maintaining active audit logs.'
//   },
//   {
//     category: 'Data & Privacy',
//     icon: ShieldAlert,
//     q: 'Is candidate resume data used to train public LLM models?',
//     a: 'No. All candidate resumes, extracted text, and AI evaluation vectors are strictly sandboxed. Data is retained solely within your private workspace and deleted upon application or account purging.'
//   }
// ];

// export const HelpFeedback = () => {
//   const [feedback, setFeedback] = useState('');
//   const [category, setCategory] = useState('General Idea');
//   const [activeFaq, setActiveFaq] = useState(null);
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!feedback.trim()) return;
//     setSubmitted(true);
//     setFeedback('');
//     setTimeout(() => setSubmitted(false), 4000);
//   };

//   return (
//     <div className="mx-auto max-w-5xl space-y-8 px-4 py-8 font-sans text-slate-900 antialiased">
      
//       {/* Background Soft Ambient Orbs */}
//       <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu">
//         <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px] will-change-transform" />
//         <div className="absolute top-1/3 -right-20 h-[520px] w-[520px] rounded-full bg-pink-500/20 blur-[130px] will-change-transform" />
//       </div>

//       {/* ========================================================================= */}
//       {/* --- SaaS Hero Header Banner --- */}
//       {/* ========================================================================= */}
//       <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.12),0_10px_30px_rgba(236,72,153,0.1)] transition-all">
//         {/* Hardware-Accelerated Ambient Glows */}
//         <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-pink-500/30 via-rose-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/30 via-sky-400/20 to-transparent blur-3xl transform-gpu will-change-transform" />
//         <div className="pointer-events-none absolute left-0 top-0 h-[3px] w-full bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 shadow-[0_0_12px_rgba(236,72,153,0.4)]" />

//         <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
//           <div className="space-y-2">
//             <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-bold text-blue-700 shadow-xs backdrop-blur-sm">
//               <Sparkles className="h-3.5 w-3.5 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
//               <span>Support & Technical Docs</span>
//             </div>
            
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
//               Help Center & <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent">Feedback</span>
//             </h1>
            
//             <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-xl leading-relaxed">
//               Explore ATS evaluation mechanics, file constraints, or submit engineering feedback directly to the RankResume team.
//             </p>
//           </div>

//           <div className="flex items-center gap-3 shrink-0">
//             <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-700 shadow-md shadow-blue-500/10">
//               <MailQuestion className="h-7 w-7 stroke-[2.2]" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- FAQ Accordion Section --- */}
//       {/* ========================================================================= */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-2 px-1">
//           <HelpCircle className="h-4 w-4 text-blue-600 stroke-[2.5]" />
//           <h2 className="font-mono text-xs font-extrabold uppercase tracking-wider text-slate-800">
//             Frequently Answered Insights
//           </h2>
//         </div>
        
//         <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
//           {FAQS.map((faq, idx) => {
//             const Icon = faq.icon;
//             const isOpen = activeFaq === idx;
//             return (
//               <div
//                 key={idx}
//                 onClick={() => setActiveFaq(isOpen ? null : idx)}
//                 className={`group cursor-pointer rounded-2xl border p-5 backdrop-blur-xl transition-all duration-200 ${
//                   isOpen
//                     ? 'border-blue-300 bg-gradient-to-br from-blue-50/60 via-white to-pink-50/40 shadow-md shadow-blue-500/5'
//                     : 'border-slate-200/90 bg-white/80 hover:border-blue-200 hover:bg-white hover:shadow-xs'
//                 }`}
//               >
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-start gap-3">
//                     <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-600 shadow-xs">
//                       <Icon className="h-4 w-4 stroke-[2.2]" />
//                     </div>
//                     <div>
//                       <span className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-blue-700">
//                         {faq.category}
//                       </span>
//                       <h3 className="mt-0.5 text-xs font-black text-slate-950 group-hover:text-blue-700 transition-colors">
//                         {faq.q}
//                       </h3>
//                     </div>
//                   </div>
//                   <ChevronDown
//                     className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-300 ${
//                       isOpen ? 'rotate-180 text-blue-600' : 'group-hover:text-slate-700'
//                     }`}
//                   />
//                 </div>
                
//                 <div
//                   className={`grid transition-all duration-300 ease-in-out ${
//                     isOpen ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0'
//                   }`}
//                 >
//                   <p className="overflow-hidden text-xs font-semibold leading-relaxed text-slate-600">
//                     {faq.a}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ========================================================================= */}
//       {/* --- Feedback Submission Container --- */}
//       {/* ========================================================================= */}
//       <div className="relative overflow-hidden rounded-3xl border border-white/90 bg-white/90 p-6 sm:p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(37,99,235,0.08)] space-y-6">
//         <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-200 bg-pink-50 text-pink-600 shadow-xs">
//             <MessageSquarePlus className="h-5 w-5 stroke-[2.2]" />
//           </div>
//           <div>
//             <h2 className="text-sm font-black tracking-wide text-slate-950">
//               Direct Engineering & Product Feedback
//             </h2>
//             <p className="text-xs font-semibold text-slate-500">
//               Report inaccuracies, suggest new scoring heuristics, or request integrations.
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Category Selector Chips */}
//           <div className="flex flex-wrap gap-2">
//             {['General Idea', 'Bug Report', 'ATS Accuracy', 'Feature Request'].map((type) => (
//               <button
//                 type="button"
//                 key={type}
//                 onClick={() => setCategory(type)}
//                 className={`rounded-xl px-3.5 py-1.5 font-mono text-[11px] font-extrabold transition-all cursor-pointer shadow-xs ${
//                   category === type
//                     ? 'border border-pink-300 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/20'
//                     : 'border border-slate-200 bg-white text-slate-700 hover:border-pink-300 hover:text-pink-600 hover:bg-pink-50/40'
//                 }`}
//               >
//                 {type}
//               </button>
//             ))}
//           </div>

//           {/* Feedback Textarea */}
//           <textarea
//             rows={4}
//             required
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             placeholder="Describe the heuristic discrepancy, feature suggestion, or platform issue in detail..."
//             className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-xs font-semibold text-slate-950 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 shadow-xs resize-none"
//           />

//           {/* Submission Success Toast */}
//           {submitted && (
//             <div className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-800 shadow-xs">
//               <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.5]" />
//               <span>Feedback submitted successfully. Thank you for making RankResume AI better!</span>
//             </div>
//           )}

//           {/* Form Actions Footer */}
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-slate-200">
//             <span className="font-mono text-[10px] font-bold text-slate-500">
//               Workspace telemetry and app version context are attached securely.
//             </span>
//             <button
//               type="submit"
//               className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-pink-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer self-start sm:self-auto"
//             >
//               <Send className="h-3.5 w-3.5 stroke-[2.5]" />
//               <span>Submit Report</span>
//             </button>
//           </div>
//         </form>
//       </div>

//     </div>
//   );
// };

// export default HelpFeedback;




// frontend/src/pages/HelpFeedback.jsx
import React, { useState, memo } from 'react';
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
  MailQuestion,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'General Idea', label: 'General Idea', color: 'hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/60' },
  { id: 'Bug Report', label: 'Bug Report', color: 'hover:border-rose-300 hover:text-rose-700 hover:bg-rose-50/60' },
  { id: 'ATS Accuracy', label: 'ATS Accuracy', color: 'hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50/60' },
  { id: 'Feature Request', label: 'Feature Request', color: 'hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/60' },
];

const FAQS = [
  {
    category: 'Scoring Engine',
    categoryBadge: 'text-violet-700 bg-violet-50 border-violet-200',
    icon: Sparkles,
    iconStyle: 'bg-violet-50 text-violet-600 border-violet-200',
    q: 'How does Gemini ATS evaluate resume matches?',
    a: 'RankResume AI leverages Google Gemini multimodal embeddings and LLM reasoning. Rather than rigid keyword matching, it performs semantic context extraction across candidate skill clusters, impact metrics, project relevance, and verified experience against your exact job parameters.',
  },
  {
    category: 'File Processing',
    categoryBadge: 'text-blue-700 bg-blue-50 border-blue-200',
    icon: Cpu,
    iconStyle: 'bg-blue-50 text-blue-600 border-blue-200',
    q: 'What resume file formats and size constraints apply?',
    a: 'We support standard PDF documents up to 5MB. Multi-column, modern LaTeX, and single-page ATS-optimized templates are fully parsed through our deterministic PDF extraction pipeline before scoring.',
  },
  {
    category: 'Pipeline & Workflows',
    categoryBadge: 'text-amber-800 bg-amber-50 border-amber-200',
    icon: Zap,
    iconStyle: 'bg-amber-50 text-amber-600 border-amber-200',
    q: 'How do pipeline state updates synchronize?',
    a: 'Dragging candidates between stages (Applied, Screening, Interview, Offered, Rejected) dispatches optimistic state updates that sync with the backend database instantly while maintaining active audit logs.',
  },
  {
    category: 'Data & Privacy',
    categoryBadge: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    icon: ShieldAlert,
    iconStyle: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    q: 'Is candidate resume data used to train public LLM models?',
    a: 'No. All candidate resumes, extracted text, and AI evaluation vectors are strictly sandboxed. Data is retained solely within your private workspace and deleted upon application or account purging.',
  },
];

export const HelpFeedback = memo(() => {
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('General Idea');
  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSubmitted(true);
    setFeedback('');
    const timer = setTimeout(() => setSubmitted(false), 4000);
    return () => clearTimeout(timer);
  };

  const toggleFaq = (idx) => {
    setActiveFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* 
        Zero-Lag Static Light Atmosphere:
        Renders without GPU animation repaints or CPU thread locking.
      */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl sm:h-[500px] sm:w-[500px]" />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full bg-pink-400/10 blur-3xl sm:h-[500px] sm:w-[500px]" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
        
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-5xl space-y-6 sm:space-y-8 px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        
        {/* ================= HERO HEADER ================= */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 md:p-9 shadow-sm">
          {/* Top Multi-Color Accent Rim */}
          <div 
            aria-hidden="true" 
            className="absolute inset-x-0 top-0 h-1 sm:h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500" 
          />

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/90 bg-blue-50/70 px-3 py-1 text-xs font-bold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                <span>Support & Technical Docs</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
                Help Center &{' '}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  Feedback
                </span>
              </h1>
              
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                Explore ATS evaluation mechanics, document criteria, and real-time candidate pipeline workflows, or send technical suggestions directly to our engineering team.
              </p>
            </div>

            <div className="hidden sm:flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50/80 text-blue-600 shadow-xs">
              <MailQuestion className="h-7 w-7 stroke-[2]" />
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 px-1">
            <HelpCircle className="h-4 w-4 text-blue-600 stroke-[2.2]" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
              Frequently Answered Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {FAQS.map((faq, idx) => {
              const Icon = faq.icon;
              const isOpen = activeFaq === idx;

              return (
                <div
                  key={idx}
                  onClick={() => toggleFaq(idx)}
                  className={`group cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all duration-150 ${
                    isOpen
                      ? 'border-indigo-300 bg-gradient-to-br from-indigo-50/40 via-white to-pink-50/20 shadow-sm'
                      : 'border-slate-200/90 bg-white/90 hover:border-indigo-200 hover:shadow-xs'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFaq(idx);
                    }
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${faq.iconStyle}`}>
                        <Icon className="h-4 w-4 stroke-[2.2]" />
                      </div>
                      <div>
                        <span className={`inline-block rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${faq.categoryBadge}`}>
                          {faq.category}
                        </span>
                        <h3 className="mt-1 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {faq.q}
                        </h3>
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : 'group-hover:text-slate-600'
                      }`}
                    />
                  </div>

                  {/* Smooth Accordion Body */}
                  <div
                    className={`grid transition-all duration-200 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-slate-100'
                        : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <p className="overflow-hidden text-xs sm:text-[13px] leading-relaxed text-slate-600">
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= FEEDBACK FORM CONTAINER ================= */}
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4 sm:pb-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-pink-200 bg-pink-50 text-pink-600">
              <MessageSquarePlus className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Direct Engineering & Product Feedback
              </h2>
              <p className="text-xs text-slate-500">
                Report scoring discrepancies, recommend heuristics, or request external integrations.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Category Selector Chips */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Feedback Category:
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      category === cat.id
                        ? 'border border-pink-500 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                        : `border border-slate-200 bg-slate-50/80 text-slate-700 ${cat.color}`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Input Area */}
            <div className="space-y-1.5">
              <label htmlFor="feedback-text" className="block text-xs font-semibold text-slate-700">
                Details & Steps to Reproduce:
              </label>
              <textarea
                id="feedback-text"
                rows={4}
                required
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe the heuristic discrepancy, feature suggestion, or platform issue in detail..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 sm:p-4 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-3 focus:ring-indigo-500/15 resize-none"
              />
            </div>

            {/* Submission Notification Toast */}
            {submitted && (
              <div className="flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 stroke-[2.2]" />
                <span>Feedback submitted successfully. Thank you for improving RankResume AI!</span>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
              <span className="text-[11px] font-medium text-slate-500">
                Workspace telemetry & Gemini build logs are securely attached.
              </span>

              <button
                type="submit"
                className="inline-flex h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-500/25 transition-all hover:brightness-105 active:scale-[0.98] cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 stroke-[2.2]" />
                <span>Submit Report</span>
              </button>
            </div>
          </form>
        </section>

      </main>
    </div>
  );
});

HelpFeedback.displayName = 'HelpFeedback';
export default HelpFeedback;