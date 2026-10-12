// import React, { memo } from 'react';
// import { Sparkles, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

// export const ScoreBadge = memo(({
//   score = 0,
//   showIcon = true,
//   showLabel = true,
//   showPulse = false,
//   size = 'md',
//   variant = 'subtle', // 'subtle' | 'glow' | 'outline' | 'neon'
//   className = '',
// }) => {
//   // Clamp score between 0 and 100
//   const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

//   // Tier configuration with high contrast colors on light frosted surfaces
//   const getTier = (val) => {
//     if (val >= 80) {
//       return {
//         label: 'Optimal Fit',
//         icon: Sparkles,
//         text: 'text-emerald-800',
//         bg: 'bg-emerald-50/90',
//         border: 'border-emerald-300',
//         divider: 'border-emerald-300/80',
//         glow: 'shadow-[0_4px_16px_-2px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/30',
//         pulse: 'bg-emerald-500',
//       };
//     }
//     if (val >= 60) {
//       return {
//         label: 'Good Fit',
//         icon: TrendingUp,
//         text: 'text-amber-900',
//         bg: 'bg-amber-50/90',
//         border: 'border-amber-300',
//         divider: 'border-amber-300/80',
//         glow: 'shadow-[0_4px_16px_-2px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/30',
//         pulse: 'bg-amber-500',
//       };
//     }
//     return {
//       label: 'Low Match',
//       icon: AlertTriangle,
//       text: 'text-rose-800',
//       bg: 'bg-rose-50/90',
//       border: 'border-rose-300',
//       divider: 'border-rose-300/80',
//       glow: 'shadow-[0_4px_16px_-2px_rgba(244,63,94,0.25)] ring-1 ring-rose-400/30',
//       pulse: 'bg-rose-500',
//     };
//   };

//   const tier = getTier(normalizedScore);
//   const IconComponent = tier.icon;

//   const sizeClasses = {
//     xs: {
//       badge: 'px-2 py-0.5 text-[10px] gap-1',
//       icon: 'h-2.5 w-2.5',
//       pulse: 'h-1.5 w-1.5',
//     },
//     sm: {
//       badge: 'px-2.5 py-0.5 text-[11px] gap-1.5',
//       icon: 'h-3 w-3',
//       pulse: 'h-2 w-2',
//     },
//     md: {
//       badge: 'px-3 py-1 text-xs gap-2',
//       icon: 'h-3.5 w-3.5',
//       pulse: 'h-2 w-2',
//     },
//     lg: {
//       badge: 'px-4 py-1.5 text-sm gap-2.5 font-bold',
//       icon: 'h-4 w-4',
//       pulse: 'h-2.5 w-2.5',
//     },
//   };

//   const currentSize = sizeClasses[size] || sizeClasses.md;

//   const variantStyles = {
//     subtle: `${tier.bg} ${tier.border} ${tier.text} border backdrop-blur-md shadow-2xs`,
//     glow: `${tier.bg} ${tier.border} ${tier.text} ${tier.glow} border backdrop-blur-md`,
//     outline: `bg-white/95 ${tier.border} ${tier.text} border shadow-2xs`,
//     neon: 'bg-gradient-to-r from-blue-50 via-white to-pink-50 border-blue-300 text-blue-900 shadow-[0_4px_20px_-3px_rgba(37,99,235,0.2),0_2px_10px_-2px_rgba(236,72,153,0.15)] ring-1 ring-pink-300/40 border backdrop-blur-md',
//   };

//   return (
//     <div
//       className={`inline-flex items-center rounded-xl font-mono transition-all duration-200 select-none ${
//         variantStyles[variant] || variantStyles.subtle
//       } ${currentSize.badge} ${className}`}
//     >
//       {/* Live AI Pulse Beacon */}
//       {showPulse && (
//         <span className="relative flex items-center justify-center">
//           <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${tier.pulse}`} />
//           <span className={`relative inline-flex rounded-full ${tier.pulse} ${currentSize.pulse}`} />
//         </span>
//       )}

//       {/* Metric Status Icon */}
//       {showIcon && <IconComponent className={`${currentSize.icon} shrink-0 stroke-[2.5]`} />}

//       {/* Normalized Score Numeric */}
//       <span className="font-mono font-black tabular-nums tracking-tight">
//         {normalizedScore}%
//       </span>

//       {/* Tier Label */}
//       {showLabel && (
//         <span className={`font-mono text-[9px] uppercase font-extrabold tracking-wider border-l ${tier.divider} pl-1.5 ml-0.5`}>
//           {tier.label}
//         </span>
//       )}
//     </div>
//   );
// });

// ScoreBadge.displayName = 'ScoreBadge';

// export default ScoreBadge;





// frontend/src/components/common/ScoreBadge.jsx
import React, { memo } from 'react';
import { Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

export const ScoreBadge = memo(({
  score = 0,
  showIcon = true,
  showLabel = true,
  showPulse = false,
  size = 'md',
  variant = 'subtle', // 'subtle' | 'outline' | 'multi' | 'glow'
  className = '',
}) => {
  // Clamp score between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Tier configuration with high contrast on clean light backgrounds
  const getTier = (val) => {
    if (val >= 80) {
      return {
        label: 'Optimal Fit',
        shortLabel: 'Optimal',
        icon: Sparkles,
        text: 'text-emerald-700',
        bg: 'bg-emerald-50/80',
        border: 'border-emerald-200/90',
        divider: 'border-emerald-200',
        pulse: 'bg-emerald-500',
        glowRing: 'ring-1 ring-emerald-500/20 shadow-xs shadow-emerald-500/10',
      };
    }
    if (val >= 60) {
      return {
        label: 'Good Fit',
        shortLabel: 'Good',
        icon: TrendingUp,
        text: 'text-blue-700',
        bg: 'bg-blue-50/80',
        border: 'border-blue-200/90',
        divider: 'border-blue-200',
        pulse: 'bg-blue-500',
        glowRing: 'ring-1 ring-blue-500/20 shadow-xs shadow-blue-500/10',
      };
    }
    return {
      label: 'Low Match',
      shortLabel: 'Low',
      icon: AlertTriangle,
      text: 'text-rose-700',
      bg: 'bg-rose-50/80',
      border: 'border-rose-200/90',
      divider: 'border-rose-200',
      pulse: 'bg-rose-500',
      glowRing: 'ring-1 ring-rose-500/20 shadow-xs shadow-rose-500/10',
    };
  };

  const tier = getTier(normalizedScore);
  const IconComponent = tier.icon;

  const sizeClasses = {
    xs: {
      badge: 'px-1.5 py-0.5 text-[10px] gap-1 rounded-md',
      icon: 'h-2.5 w-2.5',
      pulse: 'h-1.5 w-1.5',
      divider: 'pl-1 ml-0.5 text-[8.5px]',
    },
    sm: {
      badge: 'px-2 py-0.5 text-[11px] gap-1.5 rounded-lg',
      icon: 'h-3 w-3',
      pulse: 'h-1.5 w-1.5',
      divider: 'pl-1.5 ml-0.5 text-[9px]',
    },
    md: {
      badge: 'px-2.5 py-1 text-xs gap-1.5 sm:gap-2 rounded-xl',
      icon: 'h-3.5 w-3.5',
      pulse: 'h-2 w-2',
      divider: 'pl-1.5 sm:pl-2 ml-0.5 text-[10px]',
    },
    lg: {
      badge: 'px-3.5 py-1.5 text-xs sm:text-sm gap-2 sm:gap-2.5 rounded-xl font-bold',
      icon: 'h-4 w-4',
      pulse: 'h-2.5 w-2.5',
      divider: 'pl-2 sm:pl-2.5 ml-1 text-[11px]',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const variantStyles = {
    subtle: `${tier.bg} ${tier.border} ${tier.text} border shadow-2xs`,
    outline: `bg-white/95 ${tier.border} ${tier.text} border shadow-2xs`,
    glow: `${tier.bg} ${tier.border} ${tier.text} ${tier.glowRing} border`,
    // Brand Multi-Color variant (Cyan -> Blue -> Violet -> Pink accents)
    multi:
      'bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-pink-50/70 border-indigo-200/90 text-indigo-950 border shadow-2xs ring-1 ring-indigo-500/10',
  };

  return (
    <div
      className={`inline-flex shrink-0 items-center font-sans font-semibold tracking-tight transition-all duration-150 select-none ${
        variantStyles[variant] || variantStyles.subtle
      } ${currentSize.badge} ${className}`}
    >
      {/* Live AI Pulse Indicator */}
      {showPulse && (
        <span className="relative flex items-center justify-center shrink-0">
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${tier.pulse}`}
          />
          <span
            className={`relative inline-flex rounded-full ${tier.pulse} ${currentSize.pulse}`}
          />
        </span>
      )}

      {/* Metric Status Icon */}
      {showIcon && (
        <IconComponent
          className={`${currentSize.icon} shrink-0 stroke-[2.2] ${
            variant === 'multi' ? 'text-indigo-600' : ''
          }`}
        />
      )}

      {/* Normalized Score Numeric */}
      <span className="font-mono font-black tabular-nums tracking-tight">
        {normalizedScore}%
      </span>

      {/* Responsive Tier Label: short text on mobile, full label on sm+ screens */}
      {showLabel && (
        <span
          className={`font-mono font-bold uppercase tracking-wider border-l ${
            variant === 'multi' ? 'border-indigo-200 text-indigo-700' : `${tier.divider}${tier.text}`
          } ${currentSize.divider}`}
        >
          <span className="inline sm:hidden">{tier.shortLabel}</span>
          <span className="hidden sm:inline">{tier.label}</span>
        </span>
      )}
    </div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';

export default ScoreBadge;