import React from 'react';
import { MapPin, Users, Compass, Clock } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const SEV_CONFIG = {
  critical: {
    stripe:  'stripe-critical',
    bg:      'bg-red-500/6 hover:bg-red-500/10',
    border:  'border-red-500/25 hover:border-red-500/45',
    glow:    'shadow-[0_0_20px_-6px_rgba(239,68,68,0.35)]',
    badge:   'badge-critical',
    label:   'CRITICAL',
    titleHover: 'group-hover:text-red-300',
  },
  high: {
    stripe:  'stripe-high',
    bg:      'bg-orange-500/5 hover:bg-orange-500/8',
    border:  'border-orange-500/20 hover:border-orange-500/40',
    glow:    'shadow-[0_0_16px_-6px_rgba(249,115,22,0.25)]',
    badge:   'badge-high',
    label:   'HIGH',
    titleHover: 'group-hover:text-orange-300',
  },
  moderate: {
    stripe:  'stripe-moderate',
    bg:      'bg-amber-500/4 hover:bg-amber-500/7',
    border:  'border-amber-500/18 hover:border-amber-500/35',
    glow:    '',
    badge:   'badge-moderate',
    label:   'MODERATE',
    titleHover: 'group-hover:text-amber-300',
  },
  safe: {
    stripe:  'stripe-safe',
    bg:      'bg-emerald-500/4 hover:bg-emerald-500/7',
    border:  'border-emerald-500/18 hover:border-emerald-500/35',
    glow:    '',
    badge:   'badge-safe',
    label:   'SAFE',
    titleHover: 'group-hover:text-emerald-300',
  },
  default: {
    stripe:  'stripe-cyan',
    bg:      'hover:bg-white/4',
    border:  'border-white/8 hover:border-white/16',
    glow:    '',
    badge:   'badge-cyan',
    label:   'INFO',
    titleHover: 'group-hover:text-cyan-300',
  },
};

const STATUS_BADGE = {
  active:      'badge badge-critical',
  in_progress: 'badge badge-high',
  contained:   'badge badge-moderate',
  resolved:    'badge badge-safe',
};

export function IncidentCard({ incident, onClick, onNavigateToMap, className = '' }) {
  const cfg = SEV_CONFIG[incident.severity] || SEV_CONFIG.default;

  return (
    <div
      onClick={() => {
        soundFx.playClick();
        if (onClick) onClick(incident);
      }}
      className={`
        relative overflow-hidden rounded-xl cursor-pointer
        bg-[#111820] ${cfg.bg}
        border ${cfg.border}
        ${cfg.glow}
        transition-all duration-200
        hover:-translate-y-px
        group pl-4 pr-4 pt-3.5 pb-3
        ${incident.severity === 'critical' ? 'incident-critical-pulse' : ''}
        ${className}
      `}
    >
      {/* Left severity stripe */}
      <span className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.stripe} transition-all duration-200 group-hover:w-1.5`} />

      {/* Top row: ID + severity badge + time */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-meta bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-cyan-300 font-semibold">
            {incident.id}
          </span>
          <span className={`badge ${cfg.badge}`}>
            {cfg.label}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
          <Clock className="w-3 h-3" />
          {incident.timeReported}
        </div>
      </div>

      {/* Title */}
      <h4 className={`font-semibold text-slate-100 text-sm leading-snug ${cfg.titleHover} transition-colors line-clamp-1`}>
        {incident.title}
      </h4>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
        <MapPin className="w-3 h-3 text-cyan-500/70 shrink-0" />
        <span className="truncate">{incident.location}</span>
      </div>

      {/* Bottom row: affected + status + map btn */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.05]">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <Users className="w-3 h-3 text-amber-400/80" />
          <span>{incident.affectedCount?.toLocaleString()} affected</span>
          {incident.trappedCount > 0 && (
            <span className="text-red-400 font-semibold ml-1">
              · {incident.trappedCount} trapped
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className={STATUS_BADGE[incident.status] || 'badge badge-neutral'}>
            {incident.status.replace('_', ' ')}
          </span>

          {onNavigateToMap && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToMap(incident.coordinates, incident);
              }}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-white/6 hover:bg-cyan-500/20 text-slate-500 hover:text-cyan-300 border border-white/8 hover:border-cyan-500/30 transition"
              title="Pinpoint on Map"
            >
              <Compass className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
