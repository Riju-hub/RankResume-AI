import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';

export const ScoreBadge = ({
  score = 0,
  showIcon = true,
  showLabel = true,
  showPulse = false,
  size = 'md',
  variant = 'subtle', // 'subtle' | 'glow' | 'outline'
  className = '',
}) => {
  // Clamp score between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Tier configuration: Emerald (High) | Amber (Moderate) | Rose (Low)
  const getTier = (val) => {
    if (val >= 80) {
      return {
        label: 'Strong Match',
        icon: Sparkles,
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/25',
        glow: 'shadow-[0_0_12px_-2px_rgba(16,185,129,0.3)]',
        pulse: 'bg-emerald-400',
      };
    }
    if (val >= 60) {
      return {
        label: 'Good Match',
        icon: TrendingUp,
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/25',
        glow: 'shadow-[0_0_12px_-2px_rgba(245,158,11,0.3)]',
        pulse: 'bg-amber-400',
      };
    }
    return {
      label: 'Low Match',
      icon: AlertTriangle,
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/25',
      glow: 'shadow-[0_0_12px_-2px_rgba(244,63,94,0.3)]',
      pulse: 'bg-rose-400',
    };
  };

  const tier = getTier(normalizedScore);
  const IconComponent = tier.icon;

  const sizeClasses = {
    xs: {
      badge: 'px-1.5 py-0.5 text-[10px] gap-1',
      icon: 'h-2.5 w-2.5',
      pulse: 'h-1 w-1',
    },
    sm: {
      badge: 'px-2 py-0.5 text-xs gap-1.5',
      icon: 'h-3 w-3',
      pulse: 'h-1.5 w-1.5',
    },
    md: {
      badge: 'px-2.5 py-1 text-xs gap-1.5 font-medium',
      icon: 'h-3.5 w-3.5',
      pulse: 'h-1.5 w-1.5',
    },
    lg: {
      badge: 'px-3.5 py-1.5 text-sm gap-2 font-semibold',
      icon: 'h-4 w-4',
      pulse: 'h-2 w-2',
    },
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  const variantStyles = {
    subtle: `${tier.bg} ${tier.border} ${tier.text} border backdrop-blur-md`,
    glow: `${tier.bg} ${tier.border} ${tier.text} ${tier.glow} border backdrop-blur-md`,
    outline: `bg-transparent ${tier.border} ${tier.text} border`,
  };

  return (
    <div
      className={`inline-flex items-center rounded-full transition-all duration-200 select-none ${
        variantStyles[variant] || variantStyles.subtle
      } ${currentSize.badge} ${className}`}
    >
      {/* Live Status Pulse Dot */}
      {showPulse && (
        <span className="relative flex items-center justify-center">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${tier.pulse}`} />
          <span className={`relative inline-flex rounded-full ${tier.pulse} ${currentSize.pulse}`} />
        </span>
      )}

      {/* AI Metric Icon */}
      {showIcon && <IconComponent className={`${currentSize.icon} shrink-0 opacity-90`} />}

      {/* Score Value */}
      <span className="font-mono font-semibold tabular-nums tracking-tight">
        {normalizedScore}%
      </span>

      {/* Optional Qualifier Label */}
      {showLabel && (
        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">
          {tier.label}
        </span>
      )}
    </div>
  );
};

export default ScoreBadge;