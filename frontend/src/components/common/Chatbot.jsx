import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import chatbotImage from '../../assets/robot.png';

import {
  X,
  Send,
  User,
  Sparkles,
  Code2,
  FolderGit2,
  FileSearch,
  Layers,
  Cpu,
  ChevronRight,
  Mic,
  MicOff
} from 'lucide-react';

/* =========================================================
   AI LOGO
========================================================= */

const AiMachineLogo = ({ className }) => (
  <span className={`ai-logo-bonfire ${className || ''}`}>
    <img
      src={chatbotImage}
      alt="RANKRESUME AI"
      className="ai-logo-image rounded-full object-cover border border-amber-300/45"
    />
  </span>
);

/* =========================================================
   CHATGPT-STYLE WAVEFORM PILL ICON
========================================================= */

const VoicePillIcon = ({ isActive, className = '' }) => (
  <div className={`flex items-center justify-center gap-[2.5px] h-4 ${className}`}>
    <span
      className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
        isActive ? 'h-3 animate-[pulse_0.7s_infinite]' : 'h-2'
      }`}
    />
    <span
      className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
        isActive ? 'h-4 animate-[pulse_1s_infinite]' : 'h-3.5'
      }`}
    />
    <span
      className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
        isActive ? 'h-5 animate-[pulse_0.5s_infinite]' : 'h-2.5'
      }`}
    />
    <span
      className={`w-[2.5px] bg-white rounded-full transition-all duration-300 ${
        isActive ? 'h-3 animate-[pulse_0.9s_infinite]' : 'h-2'
      }`}
    />
  </div>
);

/* =========================================================
   MESSAGE FORMATTER
========================================================= */

const FormattedMessage = ({ content }) => {
  if (!content) return null;

  return (
    <div className="space-y-2 leading-relaxed">
      {content.split('\n').map((line, lineIdx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        const isBullet = trimmed.startsWith('→') || trimmed.startsWith('•') || trimmed.startsWith('-');
        const rawContent = isBullet ? trimmed.replace(/^[→•\-]\s*/, '') : trimmed;
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

/* =========================================================
   CHIP VISUALS
========================================================= */

const getChipVisuals = (text) => {
  const lower = text.toLowerCase();

  if (
    lower.includes('rankresume') ||
    lower.includes('candidate') ||
    lower.includes('kanban') ||
    lower.includes('recruiter') ||
    lower.includes('ats feature')
  ) {
    return {
      icon: <FolderGit2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />,
      emoji: '🚀',
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
      emoji: '📄',
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
      emoji: '⚡',
    };
  }

  if (
    lower.includes('compare') ||
    lower.includes('difference') ||
    lower.includes('both')
  ) {
    return {
      icon: <Layers className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />,
      emoji: '🔄',
    };
  }

  return {
    icon: <Cpu className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" />,
    emoji: '✨',
  };
};

/* =========================================================
   INITIAL SUGGESTIONS
========================================================= */

const INITIAL_SUGGESTIONS = [
  '🚀 RankResume AI Features',
  '📄 ResumeIQ Features',
  '⚡ RankResume AI Tech Stack',
  '🔄 Compare RankResume AI & ResumeIQ',
];

/* =========================================================
   AI RESPONSE PARSER
========================================================= */

const parseAiResponse = (rawText) => {
  const match = rawText.match(/\[SUGGESTIONS:\s*(.*?)\]/i);

  if (match) {
    const suggestions = match[1]
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);

    const cleanText = rawText.replace(/\[SUGGESTIONS:\s*(.*?)\]/i, '').trim();

    return {
      cleanText,
      suggestions,
    };
  }

  return {
    cleanText: rawText,
    suggestions: [],
  };
};

/* =========================================================
   PHONETIC CORRECTION DICTIONARY
========================================================= */

const PHONETIC_MAP = {
  '6:30': 'work experience',
  '6 30': 'work experience',
  'six thirty': 'work experience',
  '80s': 'ATS',
  '80 s': 'ATS',
  'at s': 'ATS',
  'eighty s': 'ATS',
  'rank resume': 'RankResume AI',
  'resume iq': 'ResumeIQ',
  'resume queue': 'ResumeIQ',
  'tag stack': 'tech stack',
  'text stack': 'tech stack',
  'can ban': 'Kanban',
  'con ban': 'Kanban'
};

const correctPhonetics = (text) => {
  let output = text.toLowerCase();
  Object.keys(PHONETIC_MAP).forEach((key) => {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    output = output.replace(regex, PHONETIC_MAP[key]);
  });
  return output.charAt(0).toUpperCase() + output.slice(1);
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100dvh');
  const [currentSuggestions, setCurrentSuggestions] = useState(INITIAL_SUGGESTIONS);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'System initialized. I am **RANKRESUME AI**.\n→ Ask me about **RankResume AI**, **ResumeIQ**, their features, ATS workflows, technology, or differences.',
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Voice & Live Call States
  const [isLiveCall, setIsLiveCall] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState('');

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const isLiveCallRef = useRef(false);
  const isSpeakingRef = useRef(false);

  useEffect(() => {
    isLiveCallRef.current = isLiveCall;
  }, [isLiveCall]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  /* =========================================================
     VIEWPORT & MOBILE LOCK
  ========================================================= */

  useEffect(() => {
    if (!isOpen || !window.visualViewport) return;

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewportHeight(`${window.visualViewport.height}px`);
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

  /* =========================================================
     STOP LISTENING CLEANUP
  ========================================================= */

  const stopListeningSession = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  /* =========================================================
     TEXT-TO-SPEECH (SPEECH SYNTHESIS)
  ========================================================= */

  const speakText = useCallback((text, onFinish) => {
    if (!window.speechSynthesis) {
      if (onFinish) onFinish();
      return;
    }

    stopListeningSession();
    window.speechSynthesis.cancel();

    const cleanToSpeak = text
      .replace(/[*#`_~•→\-]/g, '')
      .replace(/\[SUGGESTIONS:.*?\]/gi, '')
      .trim();

    if (!cleanToSpeak) {
      if (onFinish) onFinish();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanToSpeak);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) =>
        v.lang.includes('en') &&
        (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    );
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      setCallStatus('RANKRESUME AI is speaking...');
    };

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      if (onFinish) onFinish();
    };

    utterance.onend = handleSpeechEnd;
    utterance.onerror = handleSpeechEnd;

    window.speechSynthesis.speak(utterance);
  }, [stopListeningSession]);

  /* =========================================================
     SPEECH RECOGNITION (ACCENT & PHONETICS OPTIMIZED)
  ========================================================= */

  const startListeningSession = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isSpeakingRef.current) return;

    stopListeningSession();

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Optimized for Indian English
    recognition.continuous = false;
    recognition.interimResults = true;

    let recognizedText = '';
    let hasTransmitted = false;

    recognition.onstart = () => {
      setIsListening(true);
      setCallStatus('Listening... Speak now');
    };

    recognition.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          recognizedText += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      const raw = (recognizedText || interim).trim();
      const corrected = correctPhonetics(raw);

      if (corrected) {
        setCallStatus(`"${corrected}"`);
      }
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setCallStatus('Microphone blocked. Allow access in browser bar.');
      } else if (isLiveCallRef.current) {
        setCallStatus('Tap mic below to speak');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      const clean = correctPhonetics(recognizedText.trim());

      if (clean.length > 0 && !hasTransmitted) {
        hasTransmitted = true;
        if (isLiveCallRef.current) {
          handleSendMessage(clean, true);
        } else {
          setInput(clean);
        }
      } else if (isLiveCallRef.current && !isSpeakingRef.current) {
        setCallStatus('Tap mic below to speak');
      }
    };

    recognitionRef.current = recognition;

    setTimeout(() => {
      if (isLiveCallRef.current || !isSpeakingRef.current) {
        try {
          recognition.start();
        } catch (err) {
          console.warn('Recognition start suppressed:', err);
        }
      }
    }, 200);
  }, [stopListeningSession]);

  /* =========================================================
     API DISPATCHER
  ========================================================= */

  const handleSendMessage = useCallback(
    async (queryText, isVoice = false) => {
      const userMessage = (queryText || input).trim();
      if (!userMessage || loading) return;

      setInput('');
      setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
      setLoading(true);

      if (isVoice) {
        setCallStatus('Processing your inquiry...');
      }

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage, isVoiceMode: isVoice }),
        });

        const data = await response.json();
        const { cleanText, suggestions } = parseAiResponse(data.reply || '');

        setMessages((prev) => [...prev, { role: 'assistant', content: cleanText }]);

        if (suggestions && suggestions.length > 0) {
          setCurrentSuggestions(suggestions);
        }

        if (isVoice) {
          speakText(cleanText, () => {
            setTimeout(() => {
              if (isLiveCallRef.current) {
                startListeningSession();
              }
            }, 400);
          });
        }
      } catch (err) {
        console.error('Chat API error:', err);
        const fallback = '→ Connection timed out.\n→ Please try again.';
        setMessages((prev) => [...prev, { role: 'assistant', content: fallback }]);

        if (isVoice) {
          speakText("I'm having trouble connecting. Tap the mic below to try again.", () => {
            if (isLiveCallRef.current) startListeningSession();
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [input, loading, speakText, startListeningSession]
  );

  /* =========================================================
     LIVE CALL HANDLERS
  ========================================================= */

  const handleStartLiveCall = () => {
    setIsLiveCall(true);
    isLiveCallRef.current = true;
    setCallStatus('Connecting...');

    const greeting = "Hello! I am RANKRESUME AI. Ask me anything about RankResume AI features, ResumeIQ, or ATS workflows.";
    speakText(greeting, () => {
      setTimeout(() => {
        if (isLiveCallRef.current) {
          startListeningSession();
        }
      }, 400);
    });
  };

  const handleEndLiveCall = () => {
    setIsLiveCall(false);
    isLiveCallRef.current = false;
    stopListeningSession();
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    isSpeakingRef.current = false;
    setCallStatus('');
  };

  const handleOpenChat = () => {
    setShowPopup(false);
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(input, false);
  };

  return (
    <div className="font-sans select-none">
      <style>{`
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
          background: radial-gradient(
            circle,
            rgba(255,237,120,0.72) 0%,
            rgba(250,204,21,0.48) 28%,
            rgba(245,158,11,0.30) 48%,
            rgba(236,72,153,0.16) 66%,
            transparent 78%
          );
          filter: blur(6px);
          opacity: 0.72;
          transform: translate3d(0,2px,0) scale(0.92);
          animation: aiLogoBonfire 2.6s ease-in-out infinite;
          pointer-events: none;
        }

        .ai-logo-bonfire::after {
          content: "";
          position: absolute;
          inset: -3px;
          z-index: -1;
          border-radius: 999px;
          box-shadow: 0 0 10px rgba(255,214,64,0.42);
          opacity: 0.55;
          animation: aiLogoRing 2.6s ease-in-out infinite;
          pointer-events: none;
        }

        .ai-logo-image {
          position: relative;
          z-index: 1;
          box-shadow:
            0 0 8px rgba(255,225,90,0.38),
            0 0 18px rgba(250,204,21,0.24),
            0 0 30px rgba(236,72,153,0.14);
        }

        @keyframes aiLogoBonfire {
          0%, 100% { opacity: 0.58; transform: translate3d(0,2px,0) scale(0.92); }
          50% { opacity: 1; transform: translate3d(0,-1px,0) scale(1.06); }
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
          background: radial-gradient(
            circle at 50% 100%,
            rgba(250,204,21,0.58) 0%,
            rgba(245,158,11,0.30) 28%,
            rgba(236,72,153,0.16) 48%,
            transparent 72%
          );
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
          border: 1px solid rgba(250,204,21,0.34);
          opacity: 0.65;
          animation: bonfireRing 3.4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes bonfirePulse {
          0%, 100% { opacity: 0.52; transform: translate3d(0,1px,0) scale(0.96); }
          50% { opacity: 0.90; transform: translate3d(0,-1px,0) scale(1.02); }
        }

        @keyframes bonfireRing {
          0%, 100% { opacity: 0.38; transform: scale(0.99); }
          50% { opacity: 0.78; transform: scale(1.012); }
        }

        @keyframes smoothWatermarkLoop {
          0% { transform: translate3d(0,0,0) rotate(-16deg); }
          100% { transform: translate3d(-180px,-240px,0) rotate(-16deg); }
        }

        .animate-watermark-smooth {
          will-change: transform;
          animation: smoothWatermarkLoop 18s linear infinite;
        }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @media (prefers-reduced-motion: reduce) {
          .bonfire-shell::before,
          .bonfire-shell::after,
          .ai-logo-bonfire::before,
          .ai-logo-bonfire::after {
            animation: none !important;
          }
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
                {/* Welcome Popup Bubble */}
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.985 }}
                      transition={{ duration: 0.18 }}
                      className="mb-3 w-[calc(100vw-2.5rem)] sm:w-80 max-w-[320px] p-3 sm:p-3.5 bg-[#0b1020]/90 sm:bg-[#0b1020]/55 border border-pink-400/35 rounded-2xl backdrop-blur-md relative cursor-pointer group shadow-[0_0_24px_rgba(236,72,153,0.18),0_0_45px_rgba(99,102,241,0.10)]"
                      onClick={handleOpenChat}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowPopup(false);
                        }}
                        className="absolute top-2 right-2 text-rose-400/80 hover:text-rose-200 p-1 rounded-md"
                        aria-label="Dismiss message"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-start gap-3">
                        <AiMachineLogo className="w-7 h-7" />
                        <div className="flex-1 pr-3">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-semibold text-xs text-pink-100 font-mono">
                              RANKRESUME AI
                            </span>
                            <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                          </div>
                          <p className="text-[12px] text-slate-100 leading-snug">
                            Ask about RankResume AI or ResumeIQ.{' '}
                            <span className="text-pink-400 font-medium group-hover:underline">
                              Ask me here →
                            </span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Floating Trigger Button */}
                <button
                  onClick={handleOpenChat}
                  className="relative bg-slate-950/80 border border-sky-400/60 text-pink-400 w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-md group cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                  aria-label="Open RANKRESUME AI"
                >
                  <span className="absolute inset-0 rounded-full border border-amber-300/45 animate-ping pointer-events-none opacity-20" />
                  <AiMachineLogo className="w-9 h-9 sm:w-10 sm:h-10 relative z-10" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2 }}
            style={{ height: viewportHeight }}
            className="fixed inset-x-0 top-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[385px] sm:max-w-[420px] flex flex-col pointer-events-auto z-[9999]"
          >
            <div className="bonfire-shell w-full h-full bg-[#070b16]/96 sm:bg-[#070b16]/48 border-0 sm:border border-sky-400/30 text-slate-100 rounded-none sm:rounded-3xl flex flex-col overflow-hidden backdrop-blur-2xl relative overscroll-contain">
              
              {/* Background Watermark */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 flex items-center justify-center">
                <div className="animate-watermark-smooth flex flex-col gap-6 whitespace-nowrap opacity-15 text-pink-300">
                  {Array.from({ length: 14 }).map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className={`flex items-center gap-6 font-black tracking-widest text-base uppercase ${
                        rowIndex % 2 === 0 ? 'ml-12' : '-ml-12'
                      }`}
                    >
                      <span>RANKRESUME AI</span>
                      <span className="text-red-500 font-normal drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] text-sm">❤️</span>
                      <span>RANKRESUME AI</span>
                      <span className="text-red-500 font-normal drop-shadow-[0_0_6px_rgba(239,68,68,0.8)] text-sm">❤️</span>
                      <span>RANKRESUME AI</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Header with ChatGPT Voice Mode Button */}
              <div className="relative z-20 bg-slate-900/90 sm:bg-slate-900/30 px-4 py-3 flex items-center justify-between border-b border-pink-500/20 backdrop-blur-md flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <div className="p-0.5 rounded-full bg-[#160d2b]/70 border border-pink-500/35">
                    <AiMachineLogo className="w-7 h-7" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-sm tracking-wide text-slate-100 flex items-center gap-1.5">
                      RANKRESUME AI
                      <span className="text-[10px] px-1.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-400/35 font-mono">
                        CORE
                      </span>
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-400 shadow-[0_0_8px_#ec4899]" />
                      </span>
                      <span className="text-[11px] text-pink-200/80 font-mono">
                        {isLiveCall ? 'VOICE CONNECTED' : 'NEURAL ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Action Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={isLiveCall ? handleEndLiveCall : handleStartLiveCall}
                    title={isLiveCall ? 'End Call' : 'Start Voice Mode'}
                    className={`group relative p-1.5 px-2.5 rounded-full flex items-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer ${
                      isLiveCall
                        ? 'bg-rose-500/20 border border-rose-400/60 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white shadow-[0_0_12px_rgba(244,63,94,0.35)]'
                    }`}
                  >
                    <VoicePillIcon isActive={isLiveCall} />
                    <span className="text-[11px] font-mono font-medium tracking-tight">
                      {isLiveCall ? 'End' : 'Voice'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (isLiveCall) handleEndLiveCall();
                      setIsOpen(false);
                    }}
                    className="p-1.5 rounded-xl bg-gradient-to-tr from-pink-500/20 via-fuchsia-500/20 to-blue-500/20 border border-pink-400/35 text-pink-300 hover:text-white transition-all cursor-pointer"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
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
                          : 'bg-white/[0.07] text-slate-100 rounded-tl-none border border-white/10 shadow-[0_0_16px_rgba(99,102,241,0.08)]'
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
              <div className="relative z-10 bg-[#0b1020]/90 border-t border-pink-500/15 px-3 py-2 flex items-center gap-2 overflow-x-auto hide-scrollbar flex-shrink-0">
                <div className="flex items-center gap-1 text-[11px] text-pink-300/70 font-mono pl-1 flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
                  <span>Suggestions:</span>
                </div>
                {currentSuggestions.map((suggestion, idx) => {
                  const { icon, emoji } = getChipVisuals(suggestion);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(suggestion, false)}
                      disabled={loading || isLiveCall}
                      className="group flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#160d2b]/70 hover:bg-fuchsia-900/45 border border-pink-400/25 hover:border-pink-400/55 text-slate-100 hover:text-white transition-all disabled:opacity-40 flex-shrink-0 cursor-pointer"
                    >
                      <span>{emoji}</span>
                      <span>{suggestion.replace(/^[^\w\s]+/, '').trim()}</span>
                      {icon}
                      <ChevronRight className="w-3 h-3 text-pink-400/50" />
                    </button>
                  );
                })}
              </div>

              {/* Input Form with Waveform Launcher */}
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="relative z-20 p-2.5 sm:p-3 bg-[#070b16]/96 border-t border-pink-500/20 flex items-center space-x-2 flex-shrink-0"
              >
                <div className="relative flex-1 group">
                  <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-blue-500 opacity-25 group-focus-within:opacity-100 transition-all blur-[2px]" />

                  <div className="relative flex items-center bg-[#080b17]/92 rounded-xl border border-pink-400/25 group-focus-within:border-pink-300 transition-all duration-300">
                    <Sparkles className="ml-3 w-4 h-4 text-pink-300/70 flex-shrink-0" />

                    <input
                      type="text"
                      name="chat_query_field"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isListening ? 'Listening...' : 'Ask about RankResume AI or ResumeIQ...'}
                      className="w-full bg-transparent px-3 py-2.5 text-[16px] sm:text-sm text-slate-100 placeholder-sky-300/40 focus:outline-none font-mono"
                    />

                    {/* Single-Turn Dictation Mic */}
                    <button
                      type="button"
                      onClick={isListening ? stopListeningSession : startListeningSession}
                      className={`mr-1.5 p-1.5 rounded-lg border transition-all ${
                        isListening
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                          : 'bg-[#160d2b]/70 border-pink-400/30 text-pink-300 hover:text-white hover:border-pink-300'
                      }`}
                      title={isListening ? 'Stop listening' : 'Dictate with Voice'}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>

                    {/* Pink ChatGPT Voice Mode Pill Launcher */}
                    <button
                      type="button"
                      onClick={handleStartLiveCall}
                      className="mr-2 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 flex items-center justify-center shadow-[0_0_10px_rgba(244,63,94,0.4)] transition-transform hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
                      title="Start Real-Time Voice Mode"
                    >
                      <VoicePillIcon isActive={false} />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !input.trim() || isLiveCall}
                  className="relative group w-11 h-11 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-90 disabled:opacity-30 disabled:pointer-events-none flex-shrink-0 overflow-hidden cursor-pointer"
                  aria-label="Transmit message"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-blue-500 rounded-xl blur-[3px] opacity-80" />
                  <span className="relative z-10 w-full h-full flex items-center justify-center bg-gradient-to-tr from-pink-400 via-fuchsia-400 to-blue-500 text-slate-950 rounded-lg">
                    <Send className="w-4 h-4" />
                  </span>
                </button>
              </form>

              {/* Full-Screen ChatGPT Voice Overlay */}
              <AnimatePresence>
                {isLiveCall && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 z-50 bg-[#070b16]/98 backdrop-blur-3xl flex flex-col items-center justify-between p-6 text-center"
                  >
                    {/* Top Status */}
                    <div className="pt-2 flex flex-col items-center">
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300 text-xs font-mono">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isSpeaking
                              ? 'bg-emerald-400 animate-ping'
                              : isListening
                              ? 'bg-pink-400 animate-pulse'
                              : 'bg-sky-400'
                          }`}
                        />
                        <span>VOICE MODE</span>
                      </div>
                      <h3 className="mt-3 text-lg font-bold text-slate-100 tracking-wide">
                        RANKRESUME AI
                      </h3>
                      <p className="text-xs text-pink-300/70 font-mono mt-0.5 max-w-[260px] truncate">
                        {callStatus || 'Listening...'}
                      </p>
                    </div>

                    {/* Liquid Orb Visualizer */}
                    <div className="relative flex items-center justify-center my-auto">
                      <div
                        className={`absolute w-48 h-48 rounded-full blur-3xl transition-all duration-700 ${
                          isSpeaking
                            ? 'bg-gradient-to-r from-emerald-500/30 via-teal-500/30 to-sky-500/30 scale-125 opacity-100'
                            : isListening
                            ? 'bg-gradient-to-r from-pink-500/30 via-rose-500/30 to-purple-500/30 scale-110 opacity-80 animate-pulse'
                            : 'bg-pink-500/20 scale-95 opacity-50'
                        }`}
                      />

                      <div
                        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                          isSpeaking
                            ? 'bg-gradient-to-tr from-teal-400 via-sky-500 to-indigo-500 shadow-[0_0_35px_rgba(20,184,166,0.6)] scale-105'
                            : isListening
                            ? 'bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-600 shadow-[0_0_35px_rgba(244,63,94,0.6)] scale-100'
                            : 'bg-[#0b1020] border border-pink-400/40 shadow-[0_0_20px_rgba(236,72,153,0.3)]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 h-10">
                          <span
                            className={`w-1.5 bg-white/90 rounded-full transition-all duration-200 ${
                              isSpeaking
                                ? 'h-8 animate-[pulse_0.4s_infinite]'
                                : isListening
                                ? 'h-6 animate-[pulse_0.8s_infinite]'
                                : 'h-2'
                            }`}
                          />
                          <span
                            className={`w-1.5 bg-white/90 rounded-full transition-all duration-200 ${
                              isSpeaking
                                ? 'h-10 animate-[pulse_0.6s_infinite]'
                                : isListening
                                ? 'h-8 animate-[pulse_0.5s_infinite]'
                                : 'h-3'
                            }`}
                          />
                          <span
                            className={`w-1.5 bg-white/90 rounded-full transition-all duration-200 ${
                              isSpeaking
                                ? 'h-6 animate-[pulse_0.3s_infinite]'
                                : isListening
                                ? 'h-10 animate-[pulse_0.7s_infinite]'
                                : 'h-2'
                            }`}
                          />
                          <span
                            className={`w-1.5 bg-white/90 rounded-full transition-all duration-200 ${
                              isSpeaking
                                ? 'h-9 animate-[pulse_0.5s_infinite]'
                                : isListening
                                ? 'h-5 animate-[pulse_0.6s_infinite]'
                                : 'h-2.5'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bottom Voice Controls */}
                    <div className="w-full flex items-center justify-center gap-5 pb-4">
                      <button
                        type="button"
                        onClick={isListening ? stopListeningSession : startListeningSession}
                        className={`p-4 rounded-full border transition-all duration-300 active:scale-95 cursor-pointer ${
                          isListening
                            ? 'bg-pink-500/20 border-pink-400 text-pink-200 shadow-[0_0_16px_rgba(236,72,153,0.4)]'
                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                        title={isListening ? 'Mute' : 'Unmute'}
                      >
                        {isListening ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5 text-rose-400" />}
                      </button>

                      <button
                        type="button"
                        onClick={handleEndLiveCall}
                        className="p-4 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
                        title="Close Voice Mode"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}