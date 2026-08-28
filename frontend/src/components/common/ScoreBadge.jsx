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

  // Tier configuration: Emerald/Cyan (High) | Amber/Indigo (Moderate) | Rose/Pink (Low)
  const getTier = (val) => {
    if (val >= 80) {
      return {
        label: 'Optimal Fit',
        icon: Sparkles,
        text: 'text-emerald-300',
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/35',
        glow: 'shadow-[0_0_15px_-3px_rgba(16,185,129,0.35)]',
        pulse: 'bg-emerald-400',
      };
    }
    if (val >= 60) {
      return {
        label: 'Good Fit',
        icon: TrendingUp,
        text: 'text-amber-300',
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/35',
        glow: 'shadow-[0_0_15px_-3px_rgba(245,158,11,0.35)]',
        pulse: 'bg-amber-400',
      };
    }
    return {
      label: 'Low Match',
      icon: AlertTriangle,
      text: 'text-rose-300',
      bg: 'bg-rose-950/40',
      border: 'border-rose-500/35',
      glow: 'shadow-[0_0_15px_-3px_rgba(244,63,94,0.35)]',
      pulse: 'bg-rose-400',
    };
  };

  const tier = getTier(normalizedScore);
  const IconComponent = tier.icon;

  const sizeClasses = {
    xs: {
      badge: 'px-2 py-0.5 text-[9px] gap-1',
      icon: 'h-2.5 w-2.5',
      pulse: 'h-1 w-1',
    },
    sm: {
      badge: 'px-2.5 py-0.5 text-[10px] gap-1.5',
      icon: 'h-3 w-3',
      pulse: 'h-1.5 w-1.5',
    },
    md: {
      badge: 'px-3 py-1 text-xs gap-2',
      icon: 'h-3.5 w-3.5',
      pulse: 'h-1.5 w-1.5',
    },
    lg: {
      badge: 'px-4 py-1.5 text-sm gap-2.5 font-bold',
      icon: 'h-4 w-4',
      pulse: 'h-2 w-2',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const variantStyles = {
    subtle: `${tier.bg} ${tier.border} ${tier.text} border backdrop-blur-md`,
    glow: `${tier.bg} ${tier.border} ${tier.text} ${tier.glow} border backdrop-blur-md`,
    outline: `bg-slate-950/70 ${tier.border} ${tier.text} border`,
    neon: `bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-pink-500/20 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.3)] border backdrop-blur-md`,
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
      {showIcon && <IconComponent className={`${currentSize.icon} shrink-0 opacity-90`} />}

      {/* Normalized Score Numeric */}
      <span className="font-mono font-black tabular-nums tracking-tight">
        {normalizedScore}%
      </span>

      {/* Tier Label */}
      {showLabel && (
        <span className="font-mono text-[9px] uppercase font-bold tracking-widest opacity-80 border-l border-white/10 pl-1.5 ml-0.5">
          {tier.label}
        </span>
      )}
    </div>
  );
});

ScoreBadge.displayName = 'ScoreBadge';

export default ScoreBadge;