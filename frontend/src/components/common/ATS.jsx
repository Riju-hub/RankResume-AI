import React from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  FileSearch,
  Gauge,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

const ATS_URL =
  'https://resumeiq-jxzub6fh22sedvgffpftsr.streamlit.app/';

const ATS = () => {
  const openATS = () => {
    window.open(ATS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <style>{`
        .resumeiq-ats-page {
          min-height: calc(100vh - 64px);
          position: relative;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(circle at 8% 8%, rgba(37,99,235,.13), transparent 25%),
            radial-gradient(circle at 92% 12%, rgba(236,72,153,.13), transparent 27%),
            radial-gradient(circle at 48% 96%, rgba(59,130,246,.08), transparent 30%),
            linear-gradient(135deg, #f6faff 0%, #ffffff 45%, #fff8fc 100%);
        }

        .resumeiq-ats-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          opacity: .25;
          background-image:
            linear-gradient(rgba(37,99,235,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236,72,153,.035) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black 0%, transparent 82%);
          -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 82%);
        }

        .resumeiq-orb {
          position: absolute;
          pointer-events: none;
          z-index: -1;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: .42;
          will-change: transform;
          transform: translate3d(0,0,0);
          animation: resumeiqFloat 18s ease-in-out infinite;
        }

        .resumeiq-orb-one {
          width: 300px;
          height: 300px;
          left: -155px;
          top: 13%;
          background: rgba(59,130,246,.13);
        }

        .resumeiq-orb-two {
          width: 330px;
          height: 330px;
          right: -175px;
          top: 27%;
          background: rgba(236,72,153,.12);
          animation-delay: -6s;
        }

        .resumeiq-orb-three {
          width: 250px;
          height: 250px;
          left: 40%;
          bottom: -155px;
          background: rgba(37,99,235,.09);
          animation-delay: -11s;
        }

        @keyframes resumeiqFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, -16px, 0) scale(1.045);
          }
        }

        .resumeiq-reveal {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          animation: resumeiqReveal .75s cubic-bezier(.22,1,.36,1) forwards;
        }

        .resumeiq-reveal-delay-1 {
          animation-delay: .08s;
        }

        .resumeiq-reveal-delay-2 {
          animation-delay: .16s;
        }

        .resumeiq-reveal-delay-3 {
          animation-delay: .24s;
        }

        @keyframes resumeiqReveal {
          to {
            opacity: 1;
            transform: translate3d(0,0,0);
          }
        }

        .resumeiq-cta {
          position: relative;
          overflow: hidden;
          transform: translate3d(0,0,0);
          transition:
            transform 220ms cubic-bezier(.22,1,.36,1),
            box-shadow 220ms ease,
            filter 220ms ease;
          will-change: transform;
        }

        .resumeiq-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translate3d(-110%,0,0);
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255,255,255,.08) 35%,
            rgba(255,255,255,.34) 50%,
            rgba(255,255,255,.08) 65%,
            transparent 100%
          );
          transition: transform 650ms cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }

        .resumeiq-cta:hover {
          transform: translate3d(0,-3px,0);
          filter: brightness(1.04);
        }

        .resumeiq-cta:hover::before {
          transform: translate3d(110%,0,0);
        }

        .resumeiq-cta:active {
          transform: translate3d(0,1px,0) scale(.985);
        }

        .resumeiq-feature {
          transform: translate3d(0,0,0);
          transition:
            transform 220ms cubic-bezier(.22,1,.36,1),
            border-color 220ms ease,
            box-shadow 220ms ease;
          will-change: transform;
        }

        .resumeiq-feature:hover {
          transform: translate3d(0,-4px,0);
          border-color: rgba(96,165,250,.28);
          box-shadow: 0 18px 45px rgba(15,23,42,.07);
        }

        .resumeiq-icon {
          transition: transform 220ms cubic-bezier(.22,1,.36,1);
        }

        .resumeiq-feature:hover .resumeiq-icon {
          transform: translate3d(0,-2px,0) scale(1.04);
        }

        @media (prefers-reduced-motion: reduce) {
          .resumeiq-orb,
          .resumeiq-reveal {
            animation: none !important;
          }

          .resumeiq-reveal {
            opacity: 1;
            transform: none;
          }

          .resumeiq-cta,
          .resumeiq-feature,
          .resumeiq-icon {
            transition: none !important;
          }
        }
      `}</style>

      <main className="resumeiq-ats-page">
        <span className="resumeiq-orb resumeiq-orb-one" />
        <span className="resumeiq-orb resumeiq-orb-two" />
        <span className="resumeiq-orb resumeiq-orb-three" />

        <div className="relative z-10 mx-auto min-h-[calc(100vh-64px)] max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="w-full">

            {/* Hero */}
            <section className="mx-auto max-w-5xl text-center">
              <div className="resumeiq-reveal inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>

                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">
                  ResumeIQ ATS Intelligence
                </span>
              </div>

              <h1 className="resumeiq-reveal resumeiq-reveal-delay-1 mt-5 text-4xl font-black leading-[1.04] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
                Make your resume
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
                  ready for ATS screening.
                </span>
              </h1>

              <p className="resumeiq-reveal resumeiq-reveal-delay-2 mx-auto mt-6 max-w-3xl text-sm font-medium leading-7 text-slate-500 sm:text-base lg:text-lg">
                ResumeIQ ATS helps you understand how your resume performs
                against Applicant Tracking Systems. Discover important
                keywords, identify optimization opportunities, and improve
                your chances of getting noticed.
              </p>

              <div className="resumeiq-reveal resumeiq-reveal-delay-3 mt-8 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={openATS}
                  className="resumeiq-cta group inline-flex min-h-14 min-w-[300px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 px-7 py-4 text-sm font-black text-white shadow-[0_18px_50px_rgba(99,102,241,.25)] sm:text-base"
                >
                  <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                    <BrainCircuit className="h-4 w-4" />
                  </span>

                  <span className="relative z-10">
                    Open ATS Analyzer
                  </span>

                  <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>

                <p className="text-[10px] font-bold text-slate-400">
                  Opens the ResumeIQ ATS Analyzer in a new tab
                </p>
              </div>
            </section>

            {/* Features */}
            <section className="mx-auto mt-14 max-w-6xl">
              <div className="mb-6 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  What ResumeIQ ATS does
                </p>

                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
                  Understand your resume before you apply
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="resumeiq-feature rounded-3xl border border-blue-100 bg-white/75 p-5 shadow-[0_12px_35px_rgba(15,23,42,.035)] backdrop-blur-xl">
                  <div className="resumeiq-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                    <Gauge className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-slate-900">
                    ATS Score
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                    See how optimized your resume is for automated screening
                    systems.
                  </p>
                </div>

                <div className="resumeiq-feature rounded-3xl border border-violet-100 bg-white/75 p-5 shadow-[0_12px_35px_rgba(15,23,42,.035)] backdrop-blur-xl">
                  <div className="resumeiq-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                    <ScanSearch className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-slate-900">
                    Keyword Analysis
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                    Find relevant keywords and identify important terms that
                    may be missing.
                  </p>
                </div>

                <div className="resumeiq-feature rounded-3xl border border-pink-100 bg-white/75 p-5 shadow-[0_12px_35px_rgba(15,23,42,.035)] backdrop-blur-xl">
                  <div className="resumeiq-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                    <Target className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-slate-900">
                    Resume Matching
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                    Understand how closely your resume aligns with a target
                    role.
                  </p>
                </div>

                <div className="resumeiq-feature rounded-3xl border border-sky-100 bg-white/75 p-5 shadow-[0_12px_35px_rgba(15,23,42,.035)] backdrop-blur-xl">
                  <div className="resumeiq-icon flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                    <TrendingUp className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-sm font-black text-slate-900">
                    Optimization Insights
                  </h3>

                  <p className="mt-2 text-xs font-medium leading-5 text-slate-500">
                    Discover practical areas where your resume can become
                    stronger.
                  </p>
                </div>
              </div>
            </section>

            {/* Workflow */}
            <section className="mx-auto mt-8 max-w-6xl">
              <div className="rounded-[30px] border border-blue-100/70 bg-white/70 p-6 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur-2xl sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-pink-100 bg-pink-50/70 px-3 py-1.5">
                      <Zap className="h-3.5 w-3.5 text-pink-500" />
                      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-pink-600">
                        Simple workflow
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                      Upload. Analyze. Optimize.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
                      Open the dedicated ResumeIQ ATS application to upload
                      your resume and begin your complete ATS analysis.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                        <FileSearch className="h-5 w-5" />
                      </div>
                      <p className="mt-2 text-[10px] font-black text-slate-700">
                        Upload
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                        <BrainCircuit className="h-5 w-5" />
                      </div>
                      <p className="mt-2 text-[10px] font-black text-slate-700">
                        Analyze
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <p className="mt-2 text-[10px] font-black text-slate-700">
                        Improve
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="mx-auto mt-8 max-w-6xl">
              <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-950 via-[#111a38] to-[#17112a] px-6 py-10 text-center shadow-[0_25px_80px_rgba(15,23,42,.18)] sm:px-10">
                <div className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-24 -bottom-28 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative z-10">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                    <ShieldCheck className="h-6 w-6" />
                  </div>

                  <h2 className="mt-5 text-2xl font-black tracking-tight text-white sm:text-3xl">
                    Ready to check your resume?
                  </h2>

                  <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-400">
                    Open ResumeIQ ATS and get started with your resume
                    screening and optimization analysis.
                  </p>

                  <button
                    type="button"
                    onClick={openATS}
                    className="resumeiq-cta group mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 px-7 py-3.5 text-xs font-black text-white shadow-xl shadow-violet-500/20"
                  >
                    <span className="relative z-10">
                      Start ATS Analysis
                    </span>
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </section>

            <p className="mt-6 text-center text-[10px] font-semibold text-slate-400">
              ResumeIQ ATS • Resume screening and optimization intelligence
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default ATS;
