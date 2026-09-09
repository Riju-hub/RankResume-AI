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

//   // Tier configuration: Emerald/Cyan (High) | Amber/Indigo (Moderate) | Rose/Pink (Low)
//   const getTier = (val) => {
//     if (val >= 80) {
//       return {
//         label: 'Optimal Fit',
//         icon: Sparkles,
//         text: 'text-emerald-300',
//         bg: 'bg-emerald-950/40',
//         border: 'border-emerald-500/35',
//         glow: 'shadow-[0_0_15px_-3px_rgba(16,185,129,0.35)]',
//         pulse: 'bg-emerald-400',
//       };
//     }
//     if (val >= 60) {
//       return {
//         label: 'Good Fit',
//         icon: TrendingUp,
//         text: 'text-amber-300',
//         bg: 'bg-amber-950/40',
//         border: 'border-amber-500/35',
//         glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.35)]',
//         pulse: 'bg-amber-400',
//       };
//     }
//     return {
//       label: 'Low Match',
//       icon: AlertTriangle,
//       text: 'text-rose-300',
//       bg: 'bg-rose-950/40',
//       border: 'border-rose-500/35',
//       glow: 'shadow-[0_0_15px_-3px_rgba(244,63,94,0.35)]',
//       pulse: 'bg-rose-400',
//     };
//   };

//   const tier = getTier(normalizedScore);
//   const IconComponent = tier.icon;

//   const sizeClasses = {
//     xs: {
//       badge: 'px-2 py-0.5 text-[9px] gap-1',
//       icon: 'h-2.5 w-2.5',
//       pulse: 'h-1 w-1',
//     },
//     sm: {
//       badge: 'px-2.5 py-0.5 text-[10px] gap-1.5',
//       icon: 'h-3 w-3',
//       pulse: 'h-1.5 w-1.5',
//     },
//     md: {
//       badge: 'px-3 py-1 text-xs gap-2',
//       icon: 'h-3.5 w-3.5',
//       pulse: 'h-1.5 w-1.5',
//     },
//     lg: {
//       badge: 'px-4 py-1.5 text-sm gap-2.5 font-bold',
//       icon: 'h-4 w-4',
//       pulse: 'h-2 w-2',
//     },
//   };

//   const currentSize = sizeClasses[size] || sizeClasses.md;

//   const variantStyles = {
//     subtle: `${tier.bg} ${tier.border} ${tier.text} border backdrop-blur-md`,
//     glow: `${tier.bg} ${tier.border} ${tier.text} ${tier.glow} border backdrop-blur-md`,
//     outline: `bg-slate-950/70 ${tier.border} ${tier.text} border`,
//     neon: `bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-pink-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] border backdrop-blur-md`,
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
//       {showIcon && <IconComponent className={`${currentSize.icon} shrink-0 opacity-90`} />}

//       {/* Normalized Score Numeric */}
//       <span className="font-mono font-black tabular-nums tracking-tight">
//         {normalizedScore}%
//       </span>

//       {/* Tier Label */}
//       {showLabel && (
//         <span className="font-mono text-[9px] uppercase font-bold tracking-widest opacity-80 border-l border-white/10 pl-1.5 ml-0.5">
//           {tier.label}
//         </span>
//       )}
//     </div>
//   );
// });

// ScoreBadge.displayName = 'ScoreBadge';

// export default ScoreBadge;










import React, { memo } from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

export const ScoreBadge = memo(({
  score = 0,
  showIcon = true,
  showLabel = true,
  showPulse = false,
  size = 'md',
  variant = 'subtle', // 'subtle' | 'glow' | 'outline' | 'neon'
  className = '',
}) => {
  // Clamp score between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Tier configuration with high contrast colors on light frosted surfaces
  const getTier = (val) => {
    if (val >= 80) {
      return {
        label: 'Optimal Fit',
        icon: Sparkles,
        text: 'text-emerald-800',
        bg: 'bg-emerald-50/90',
        border: 'border-emerald-300',
        divider: 'border-emerald-300/80',
        glow: 'shadow-[0_4px_16px_-2px_rgba(16,185,129,0.25)] ring-1 ring-emerald-400/30',
        pulse: 'bg-emerald-500',
      };
    }
    if (val >= 60) {
      return {
        label: 'Good Fit',
        icon: TrendingUp,
        text: 'text-amber-900',
        bg: 'bg-amber-50/90',
        border: 'border-amber-300',
        divider: 'border-amber-300/80',
        glow: 'shadow-[0_4px_16px_-2px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/30',
        pulse: 'bg-amber-500',
      };
    }
    return {
      label: 'Low Match',
      icon: AlertTriangle,
      text: 'text-rose-800',
      bg: 'bg-rose-50/90',
      border: 'border-rose-300',
      divider: 'border-rose-300/80',
      glow: 'shadow-[0_4px_16px_-2px_rgba(244,63,94,0.25)] ring-1 ring-rose-400/30',
      pulse: 'bg-rose-500',
    };
  };

  const tier = getTier(normalizedScore);
  const IconComponent = tier.icon;

  const sizeClasses = {
    xs: {
      badge: 'px-2 py-0.5 text-[10px] gap-1',
      icon: 'h-2.5 w-2.5',
      pulse: 'h-1.5 w-1.5',
    },
    sm: {
      badge: 'px-2.5 py-0.5 text-[11px] gap-1.5',
      icon: 'h-3 w-3',
      pulse: 'h-2 w-2',
    },
    md: {
      badge: 'px-3 py-1 text-xs gap-2',
      icon: 'h-3.5 w-3.5',
      pulse: 'h-2 w-2',
    },
    lg: {
      badge: 'px-4 py-1.5 text-sm gap-2.5 font-bold',
      icon: 'h-4 w-4',
      pulse: 'h-2.5 w-2.5',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const variantStyles = {
    subtle: `${tier.bg} ${tier.border} ${tier.text} border backdrop-blur-md shadow-2xs`,
    glow: `${tier.bg} ${tier.border} ${tier.text} ${tier.glow} border backdrop-blur-md`,
    outline: `bg-white/95 ${tier.border} ${tier.text} border shadow-2xs`,
    neon: 'bg-gradient-to-r from-blue-50 via-white to-pink-50 border-blue-300 text-blue-900 shadow-[0_4px_20px_-3px_rgba(37,99,235,0.2),0_2px_10px_-2px_rgba(236,72,153,0.15)] ring-1 ring-pink-300/40 border backdrop-blur-md',
  };

  return (
    <div
      className={`inline-flex items-center rounded-xl font-mono transition-all duration-200 select-none ${
        variantStyles[variant] || variantStyles.subtle
      } ${currentSize.badge} ${className}`}
    >
      {/* Live AI Pulse Beacon */}
      {showPulse && (
        <span className="relative flex items-center justify-center">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${tier.pulse}`} />
          <span className={`relative inline-flex rounded-full ${tier.pulse} ${currentSize.pulse}`} />
        </span>
      )}

      {/* Metric Status Icon */}
      {showIcon && <IconComponent className={`${currentSize.icon} shrink-0 stroke-[2.5]`} />}

      {/* Normalized Score Numeric */}
      <span className="font-mono font-black tabular-nums tracking-tight">
        {normalizedScore}%
      </span>

      {/* Tier Label */}
      {showLabel && (
        <span className={`font-mono text-[9px] uppercase font-extrabold tracking-wider border-l ${tier.divider} pl-1.5 ml-0.5`}>
          {tier.label}
        </span>
      )}
    </div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';

export default ScoreBadge;