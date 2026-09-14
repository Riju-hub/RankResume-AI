import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import chatbotImage from '../../assets/robot.png';
import { X, Send, User, Sparkles, Code2, FolderGit2, FileSearch, Layers, Cpu, ChevronRight } from 'lucide-react';

const AiMachineLogo = ({ className }) => (
  <span className={`ai-logo-bonfire ${className || ''}`}>
    <img
      src={chatbotImage}
      alt="RANKRESUME AI"
      className="ai-logo-image rounded-full object-cover border border-amber-300/45"
    />
  </span>
);

const FormattedMessage = ({ content }) => {
  if (!content) return null;

  return (
    <div className="space-y-2 leading-relaxed">
      {content.split('\n').map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('-');
        const rawContent = isBullet ? trimmed.replace(/^[•\-]\s*/, '') : trimmed;
        const parts = rawContent.split(/(\*\*.*?\*\*)/g);

        return (
          <div
            key={lineIdx}
            className={`flex items-start ${isBullet ? 'gap-2 pl-0.5' : ''}`}
          >
            {isBullet && (
              <span className="mt-1 flex-shrink-0 flex items-center justify-center w-4 h-4 rounded-md bg-pink-500/15 border border-pink-400/40 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.4)]">
                <ChevronRight className="w-2.5 h-2.5 stroke-[2.5]" />
              </span>
            )}

            <div className="flex-1">
              {parts.map((part, partIdx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const keyword = part.slice(2, -2);
                  return (
                    <strong
                      key={partIdx}
                      className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-fuchsia-300 to-blue-300"
                    >
                      {keyword}
                    </strong>
                  );
                }
                return <span key={partIdx}>{part}</span>;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const getChipVisuals = (text) => {
  const lower = text.toLowerCase();

  if (
    lower.includes('rankresume') ||
    lower.includes('rankresume ai') ||
    lower.includes('candidate') ||
    lower.includes('kanban') ||
    lower.includes('recruiter') ||
    lower.includes('ats feature')
  ) {
    return {
      icon: <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />,
      emoji: '🚀'
    };
  }

  if (
    lower.includes('resumeiq') ||
    lower.includes('resume') ||
    lower.includes('ats analysis') ||
    lower.includes('resume scoring') ||
    lower.includes('report')
  ) {
    return {
      icon: <FileSearch className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />,
      emoji: '📄'
    };
  }

  if (
    lower.includes('technology') ||
    lower.includes('tech stack') ||
    lower.includes('tech') ||
    lower.includes('gemini') ||
    lower.includes('react') ||
    lower.includes('node')
  ) {
    return {
      icon: <Code2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />,
      emoji: '⚡'
    };
  }

  if (
    lower.includes('compare') ||
    lower.includes('difference') ||
    lower.includes('both')
  ) {
    return {
      icon: <Layers className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />,
      emoji: '🔄'
    };
  }

  return {
    icon: <Cpu className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />,
    emoji: '✨'
  };
};

const INITIAL_SUGGESTIONS = [
  '🚀 RankResume AI Features',
  '📄 ResumeIQ Features',
  '⚡ RankResume AI Tech Stack',
  '🔄 Compare RankResume AI & ResumeIQ'
];

const parseAiResponse = (rawText) => {
  const match = rawText.match(/\[SUGGESTIONS:\s*(.*?)\]/i);
  if (match) {
    const suggestions = match[1]
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);
    const cleanText = rawText.replace(/\[SUGGESTIONS:\s*(.*?)\]/i, '').trim();
    return { cleanText, suggestions };
  }
  return { cleanText: rawText, suggestions: [] };
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100dvh');
  const [currentSuggestions, setCurrentSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'System initialized. I am **RANKRESUME AI**.\n• Ask me about **RankResume AI**, **ResumeIQ**, their features, ATS workflows, technology, or differences.'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 1. Only listen to viewport resize when the chatbot is actively OPEN
  useEffect(() => {
    if (!isOpen || !window.visualViewport) return;

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewportHeight(`${window.visualViewport.height}px`);
        // Removed window.scrollTo(0, 0)
      } else {
        setViewportHeight('min(550px, calc(100dvh - 5.5rem))');
      }
    };

    window.visualViewport.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.visualViewport.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // 2. Safely lock body scroll when open on mobile without position: 'fixed'
  useEffect(() => {
    if (isOpen && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 900);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleOpenChat = () => {
    setShowPopup(false);
    setIsOpen(true);
  };

  const handleSendMessage = async (queryText) => {
    const userMessage = (queryText || input).trim();
    if (!userMessage || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      const { cleanText, suggestions } = parseAiResponse(data.reply || '');

      setMessages((prev) => [...prev, { role: 'assistant', content: cleanText }]);

      if (suggestions && suggestions.length > 0) {
        setCurrentSuggestions(suggestions);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '• Connection timed out.\n• Direct queries can be submitted via the **Contact Form**.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="font-sans select-none">
      <style>{`
        /* Low-cost bonfire effect: animate opacity/transform only.
           Avoid animating box-shadow on large elements because it can trigger
           expensive repaints and make the popup feel laggy. */
        /* Warm bonfire glow directly around the AI logo.
           Only opacity/transform animate so the logo stays smooth. */
        .ai-logo-bonfire {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
          transform: translateZ(0);
          will-change: transform;
        }

        .ai-logo-bonfire::before {
          content: "";
          position: absolute;
          inset: -7px;
          z-index: -1;
          border-radius: 999px;
          background: radial-gradient(circle,
            rgba(255, 237, 120, 0.72) 0%,
            rgba(250, 204, 21, 0.48) 28%,
            rgba(245, 158, 11, 0.30) 48%,
            rgba(236, 72, 153, 0.16) 66%,
            transparent 78%);
          filter: blur(6px);
          opacity: 0.72;
          transform: translate3d(0, 2px, 0) scale(0.92);
          animation: aiLogoBonfire 2.6s ease-in-out infinite;
          pointer-events: none;
        }

        .ai-logo-bonfire::after {
          content: "";
          position: absolute;
          inset: -3px;
          z-index: -1;
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(255, 214, 64, 0.42);
          opacity: 0.55;
          animation: aiLogoRing 2.6s ease-in-out infinite;
          pointer-events: none;
        }

        .ai-logo-image {
          position: relative;
          z-index: 1;
          box-shadow:
            0 0 8px rgba(255, 225, 90, 0.38),
            0 0 18px rgba(250, 204, 21, 0.24),
            0 0 30px rgba(236, 72, 153, 0.14);
        }

        @keyframes aiLogoBonfire {
          0%, 100% {
            opacity: 0.58;
            transform: translate3d(0, 2px, 0) scale(0.92);
          }
          50% {
            opacity: 1;
            transform: translate3d(0, -1px, 0) scale(1.06);
          }
        }

        @keyframes aiLogoRing {
          0%, 100% { opacity: 0.42; transform: scale(0.98); }
          50% { opacity: 0.82; transform: scale(1.035); }
        }

        .bonfire-shell {
          position: relative;
          isolation: isolate;
          transform: translateZ(0);
          will-change: transform;
        }

        .bonfire-shell::before {
          content: "";
          position: absolute;
          inset: -8px;
          z-index: -1;
          border-radius: inherit;
          background:
            radial-gradient(circle at 50% 100%,
              rgba(250, 204, 21, 0.58) 0%,
              rgba(245, 158, 11, 0.30) 28%,
              rgba(236, 72, 153, 0.16) 48%,
              transparent 72%);
          filter: blur(10px);
          opacity: 0.72;
          transform: translateZ(0) scale(0.96);
          animation: bonfirePulse 3.4s ease-in-out infinite;
          pointer-events: none;
        }

        .bonfire-shell::after {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          border: 1px solid rgba(250, 204, 21, 0.34);
          opacity: 0.65;
          animation: bonfireRing 3.4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes bonfirePulse {
          0%, 100% {
            opacity: 0.52;
            transform: translate3d(0, 1px, 0) scale(0.96);
          }
          50% {
            opacity: 0.90;
            transform: translate3d(0, -1px, 0) scale(1.02);
          }
        }

        @keyframes bonfireRing {
          0%, 100% {
            opacity: 0.38;
            transform: scale(0.99);
          }
          50% {
            opacity: 0.78;
            transform: scale(1.012);
          }
        }

        .bonfire-button {
          position: relative;
          transform: translateZ(0);
          will-change: transform;
        }

        .bonfire-button::before {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: inherit;
          background: radial-gradient(circle,
            rgba(250, 204, 21, 0.34),
            rgba(245, 158, 11, 0.16) 42%,
            transparent 72%);
          filter: blur(7px);
          animation: bonfireButtonGlow 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes bonfireButtonGlow {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bonfire-shell::before,
          .bonfire-shell::after,
          .bonfire-button::before,
          .ai-logo-bonfire::before,
          .ai-logo-bonfire::after {
            animation: none !important;
          }
        }

        @keyframes smoothWatermarkLoop {
          0% { transform: translate3d(0, 0, 0) rotate(-16deg); }
          100% { transform: translate3d(-180px, -240px, 0) rotate(-16deg); }
        }

        .animate-watermark-smooth {
          will-change: transform;
          animation: smoothWatermarkLoop 18s linear infinite;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-none">
        <div className="relative w-0 h-0 flex items-end justify-end">
          <AnimatePresence mode="wait">
            {!isOpen && (
              <motion.div
                key="trigger-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute bottom-0 right-0 flex flex-col items-end pointer-events-auto"
              >
                {/* Floating Welcome Bubble */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      key="popup-bubble"
                      initial={{ opacity: 0, y: 4, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.985 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-3 w-[calc(100vw-2.5rem)] sm:w-80 max-w-[320px] p-3 sm:p-3.5 bg-[#0b1020]/90 sm:bg-[#0b1020]/55 border border-pink-400/35 rounded-2xl backdrop-blur-md relative cursor-pointer group shadow-[0_0_24px_rgba(236,72,153,0.18),0_0_45px_rgba(99,102,241,0.10)] flex-shrink-0"
                      onClick={handleOpenChat}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPopup(false);
                        }}
                        className="absolute top-2 right-2 text-rose-400/80 hover:text-rose-200 p-1 rounded-md hover:bg-rose-950/40 transition-colors"
                        aria-label="Dismiss message"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <div className="p-0.5 rounded-full bg-[#160d2b]/70 border border-pink-500/35 flex-shrink-0 mt-0.5">
                          <AiMachineLogo className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div className="flex-1 pr-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-semibold text-xs text-pink-100 font-mono">RANKRESUME AI</span>
                            <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                          </div>
                          <p className="text-[12px] sm:text-[12.5px] text-slate-100 leading-snug">
                            Looking for a quick technical summary or project breakdown?{' '}
                            <span className="text-pink-400 font-medium group-hover:underline">Ask me here →</span>
                          </p>
                        </div>
                      </div>

                      <div className="absolute -bottom-2 right-5 sm:right-6 w-3.5 h-3.5 bg-[#0b1020]/90 sm:bg-[#0b1020]/55 border-r border-b border-pink-400/35 transform rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Floating Trigger Button */}
                <button
                  onClick={handleOpenChat}
                  className="relative bonfire-shadow-layer bg-slate-950/80 sm:bg-slate-950/50 border border-sky-400/60 text-pink-400 w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-md group cursor-pointer transition-transform hover:scale-105 active:scale-95 flex-shrink-0"
                  aria-label="Open Bhabasindhu AI"
                >
                  <span className="absolute inset-0 rounded-full border border-amber-300/45 animate-ping pointer-events-none opacity-20" />
                  <AiMachineLogo className="w-9 h-9 sm:w-10 sm:h-10 relative z-10" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modern Screen-Bounded Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.20, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: viewportHeight }}
            className="fixed inset-x-0 top-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[385px] sm:max-w-[420px] flex flex-col pointer-events-auto z-[9999]"
          >
            <div className="bonfire-shell w-full h-full bg-[#070b16]/96 sm:bg-[#070b16]/48 border-0 sm:border border-sky-400/30 text-slate-100 rounded-none sm:rounded-3xl flex flex-col overflow-hidden backdrop-blur-2xl relative overscroll-contain">
              
              {/* Animated Background Watermark */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
                <div className="animate-watermark-smooth flex flex-col gap-6 whitespace-nowrap opacity-15 sm:opacity-20 text-pink-300">
                  {Array.from({ length: 14 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`flex items-center gap-6 font-black tracking-widest text-base sm:text-lg uppercase transition-opacity ${
                        rowIndex % 2 === 0 ? 'ml-12' : '-ml-12'
                      }`}
                    >
                      <span>RANKRESUME AI</span>
                      <span className="text-red-500 font-normal drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] text-sm">❤️</span>
                      <span>RANKRESUME AI</span>
                      <span className="text-red-500 font-normal drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] text-sm">❤️</span>
                      <span>RANKRESUME AI</span>
                      <span className="text-red-500 font-normal drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] text-sm">❤️</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixed Pinned Header */}
              <div className="relative z-20 bg-slate-900/90 sm:bg-slate-900/30 px-4 py-3 sm:py-3.5 flex items-center justify-between border-b border-pink-500/20 backdrop-blur-md flex-shrink-0">
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <div className="p-0.5 rounded-full bg-[#160d2b]/70 border border-pink-500/35">
                    <AiMachineLogo className="w-7 h-7 sm:w-7 sm:h-7" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-wide text-slate-100 flex items-center gap-1.5">
                      RANKRESUME AI
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-pink-500/15 text-pink-300 border border-pink-400/35 font-mono">
                        CORE
                      </span>
                    </span>
                    <div className="flex items-center space-x-1.5">
                      <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-pink-400 shadow-[0_0_8px_#ec4899]" />
                      </span>
                      <span className="text-[11px] text-pink-200/80 font-mono">NEURAL ACTIVE</span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="relative group p-1.5 rounded-xl bg-gradient-to-tr from-pink-500/20 via-fuchsia-500/20 to-blue-500/20 hover:from-pink-500/35 hover:to-fuchsia-500/35 border border-pink-400/35 hover:border-pink-400 text-pink-300 hover:text-white transition-all duration-300 active:scale-90 shadow-[0_0_14px_rgba(236,72,153,0.25)] hover:shadow-[0_0_22px_rgba(236,72,153,0.45)] cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90 text-pink-300 group-hover:text-white" />
                </button>
              </div>

              {/* Scrollable Message Feed */}
              <div className="relative z-10 flex-1 p-4 overflow-y-auto overflow-x-hidden space-y-3.5 text-sm hide-scrollbar overscroll-contain">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-2.5 ${
                      msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {msg.role !== 'user' ? (
                      <div className="p-0.5 rounded-full bg-[#160d2b]/70 border border-sky-500/30 mt-0.5 flex-shrink-0">
                        <AiMachineLogo className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-lg bg-pink-600/20 border border-pink-400/35 mt-0.5 flex-shrink-0">
                        <User className="w-3.5 h-3.5 text-pink-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13.5px] backdrop-blur-sm ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-pink-600/80 via-fuchsia-600/70 to-blue-600/70 text-white rounded-tr-none border border-pink-400/35 shadow-[0_0_12px_rgba(99,102,241,0.25)]'
                          : 'bg-white/[0.07] sm:bg-white/[0.045] text-slate-100 rounded-tl-none border border-white/10 shadow-[0_0_16px_rgba(99,102,241,0.08)]'
                      }`}
                    >
                      <FormattedMessage content={msg.content} />
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center space-x-2 text-pink-200/80 text-xs italic ml-1 font-mono">
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    <span>Computing neural weights...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Strip */}
              <div className="relative z-10 bg-[#0b1020]/90 sm:bg-[#0b1020]/35 border-t border-pink-500/15 px-3 py-2 flex items-center gap-2 overflow-x-auto hide-scrollbar flex-shrink-0">
                <div className="flex items-center gap-1 text-[11px] text-pink-300/70 font-mono pl-1 flex-shrink-0 select-none">
                  <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                  <span className="hidden xs:inline">Suggestions:</span>
                </div>
                {currentSuggestions.map((suggestion, idx) => {
                  const { icon, emoji } = getChipVisuals(suggestion);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(suggestion)}
                      disabled={loading}
                      className="group flex items-center gap-1.5 text-[12px] sm:text-[11.5px] font-medium whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#160d2b]/70 sm:bg-sky-950/30 hover:bg-fuchsia-900/45 border border-pink-400/25 hover:border-pink-400/55 text-slate-100 hover:text-white transition-all active:scale-95 disabled:opacity-40 cursor-pointer shadow-[0_2px_8px_rgba(99,102,241,0.1)] flex-shrink-0"
                    >
                      <span className="text-xs group-hover:scale-110 transition-transform">{emoji}</span>
                      <span>{suggestion.replace(/^[^\w\s]+/, '').trim()}</span>
                      {icon}
                      <ChevronRight className="w-3 h-3 text-pink-400/50 group-hover:translate-x-0.5 group-hover:text-pink-300 transition-all" />
                    </button>
                  );
                })}
              </div>

              {/* Pinned Input Form with Disabled Chrome Autofill */}
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="relative z-20 p-2.5 sm:p-3 pb-3 sm:pb-3 bg-[#070b16]/96 sm:bg-gradient-to-t sm:from-[#070b16]/80 sm:via-[#11162b]/45 sm:to-transparent border-t border-pink-500/20 flex items-center space-x-2 flex-shrink-0"
              >
                <div className="relative flex-1 group">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 opacity-25 group-hover:opacity-60 group-focus-within:opacity-100 transition-all duration-300 blur-[2px]" />

                  <div className="relative flex items-center bg-[#080b17]/92 sm:bg-[#080b17]/72 backdrop-blur-md rounded-xl border border-pink-400/25 group-focus-within:border-pink-300 transition-all duration-300 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
                    <span className="pl-3.5 flex items-center justify-center select-none">
                      <Sparkles className="w-4 h-4 text-pink-300/70 group-focus-within:text-cyan-300 group-focus-within:scale-110 group-focus-within:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-all duration-300" />
                    </span>

                    <input
                      type="text"
                      name="chat_query_field"
                      id="chat_query_field"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about RankResume AI or ResumeIQ..."
                      className="w-full bg-transparent px-3 py-2.5 sm:py-2.5 text-[16px] sm:text-sm text-slate-100 placeholder-sky-300/40 focus:outline-none font-mono selection:bg-cyan-500/30 selection:text-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="relative group w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:pointer-events-none cursor-pointer overflow-hidden flex-shrink-0"
                  aria-label="Transmit message"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-blue-500 rounded-xl blur-[3px] group-hover:blur-md opacity-80 group-hover:opacity-100 transition-all duration-300" />
                  <span className="relative z-10 w-full h-full flex items-center justify-center bg-gradient-to-tr from-pink-400 via-fuchsia-400 to-blue-500 text-slate-950 font-bold rounded-lg shadow-sm">
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </form>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}