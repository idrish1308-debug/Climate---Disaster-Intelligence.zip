import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

function useAnimatedCount(endValue, duration = 900) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = typeof endValue === 'number' ? endValue : parseInt(endValue, 10) || 0;
    if (end === 0) { setCount(0); return; }

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out quart
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [endValue, duration]);

  return count;
}

const SEVERITY_PALETTE = {
  critical: {
    border:  'border-red-500/25',
    glow:    'shadow-[0_0_24px_-4px_rgba(239,68,68,0.3),0_4px_24px_-2px_rgba(0,0,0,0.5)]',
    icon:    'bg-red-500/12 text-red-400 border border-red-500/25',
    text:    'text-grad-red',
    spark:   '#EF4444',
    trend:   'text-red-400',
  },
  high: {
    border:  'border-orange-500/25',
    glow:    'shadow-[0_0_20px_-4px_rgba(249,115,22,0.25),0_4px_24px_-2px_rgba(0,0,0,0.5)]',
    icon:    'bg-orange-500/12 text-orange-400 border border-orange-500/25',
    text:    'text-grad-orange',
    spark:   '#F97316',
    trend:   'text-orange-400',
  },
  amber: {
    border:  'border-amber-500/20',
    glow:    'shadow-[0_0_20px_-4px_rgba(234,179,8,0.2),0_4px_24px_-2px_rgba(0,0,0,0.5)]',
    icon:    'bg-amber-500/12 text-amber-400 border border-amber-500/20',
    text:    'text-grad-amber',
    spark:   '#EAB308',
    trend:   'text-amber-400',
  },
  green: {
    border:  'border-emerald-500/20',
    glow:    'shadow-[0_0_20px_-4px_rgba(16,185,129,0.2),0_4px_24px_-2px_rgba(0,0,0,0.5)]',
    icon:    'bg-emerald-500/12 text-emerald-400 border border-emerald-500/20',
    text:    'text-grad-green',
    spark:   '#10B981',
    trend:   'text-emerald-400',
  },
  cyan: {
    border:  'border-cyan-500/20',
    glow:    'shadow-[0_0_20px_-4px_rgba(34,211,238,0.2),0_4px_24px_-2px_rgba(0,0,0,0.5)]',
    icon:    'bg-cyan-500/12 text-cyan-400 border border-cyan-500/20',
    text:    'text-grad-cyan',
    spark:   '#22D3EE',
    trend:   'text-cyan-400',
  },
  default: {
    border:  'border-white/8',
    glow:    'shadow-[0_4px_24px_-2px_rgba(0,0,0,0.4)]',
    icon:    'bg-white/6 text-slate-300 border border-white/10',
    text:    'text-grad-white',
    spark:   '#94A3B8',
    trend:   'text-slate-400',
  },
};

export function StatCard({
  label,
  value,
  numericValue,
  unit = '',
  trend = null,
  trendType = 'neutral',
  icon: Icon,
  variant = 'default',
}) {
  const palette = SEVERITY_PALETTE[variant] || SEVERITY_PALETTE.default;
  const endNum = numericValue !== undefined ? numericValue : (typeof value === 'number' ? value : 0);
  const animCount = useAnimatedCount(endNum);

  let displayValue;
  if (numericValue !== undefined) {
    displayValue = `${animCount.toLocaleString()}${unit}`;
  } else if (typeof value === 'number') {
    displayValue = animCount.toLocaleString();
  } else {
    displayValue = value;
  }

  const TrendIcon =
    trendType === 'up'   ? TrendingUp :
    trendType === 'down' ? TrendingDown :
    Minus;

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl bg-[#111820]
        border ${palette.border}
        ${palette.glow}
        p-4 flex flex-col justify-between
        transition-all duration-300
        hover:-translate-y-0.5 hover:brightness-110
        group
      `}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <p className="text-label text-slate-500 leading-tight">{label}</p>
        {Icon && (
          <div className={`p-2 rounded-xl shrink-0 transition-transform group-hover:scale-110 ${palette.icon}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* KPI Value */}
      <div className="mt-2">
        <span className={`text-kpi ${palette.text}`}>
          {displayValue}
        </span>
      </div>

      {/* Bottom row: trend + sparkline */}
      <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between">
        {trend && (
          <div className={`flex items-center gap-1.5 text-[11px] font-mono ${palette.trend}`}>
            {trendType === 'critical' && (
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            )}
            {(trendType === 'up' || trendType === 'down') && (
              <TrendIcon className="w-3 h-3" />
            )}
            <span className="font-medium">{trend}</span>
          </div>
        )}

        {/* SVG Sparkline */}
        <svg
          className="w-14 h-5 ml-auto opacity-40 group-hover:opacity-80 transition-opacity overflow-visible"
          viewBox="0 0 56 20"
          fill="none"
        >
          <polyline
            points="0,16 8,13 16,15 24,8 32,10 40,5 48,7 56,4"
            stroke={palette.spark}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="0,16 8,13 16,15 24,8 32,10 40,5 48,7 56,4 56,20 0,20"
            fill={palette.spark}
            fillOpacity="0.08"
            stroke="none"
          />
        </svg>
      </div>
    </div>
  );
}
