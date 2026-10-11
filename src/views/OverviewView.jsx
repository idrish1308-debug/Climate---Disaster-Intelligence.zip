import React from 'react';
import {
  ShieldAlert, AlertOctagon, FileCheck2, Users, Truck,
  Activity, AlertTriangle, Radio, Clock, ArrowUpRight,
  Zap, LifeBuoy, TrendingUp, MapPin
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import DisasterMap from '../components/map/DisasterMap';
import { soundFx } from '../utils/audio';
import { Card, Badge, Button } from '../components/ui/CommandComponents';
import { StatCard } from '../components/ui/StatCard';
import { IncidentCard } from '../components/ui/IncidentCard';

/* Shared chart tooltip style */
const TOOLTIP_STYLE = {
  backgroundColor: 'rgba(11,15,20,0.96)',
  borderColor: 'rgba(255,255,255,0.10)',
  borderRadius: '10px',
  color: '#F1F5F9',
  fontSize: '12px',
  fontFamily: 'JetBrains Mono',
  boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
};

/* Activity feed entry type config */
const ACTIVITY_CFG = {
  ai:       { dot: 'bg-violet-400', label: 'AI' },
  unit:     { dot: 'bg-cyan-400',   label: 'UNIT' },
  report:   { dot: 'bg-amber-400',  label: 'RPT' },
  alert:    { dot: 'bg-red-400',    label: 'ALRT' },
  shelter:  { dot: 'bg-emerald-400',label: 'SHL' },
  incident: { dot: 'bg-orange-400', label: 'INC' },
  system:   { dot: 'bg-slate-400',  label: 'SYS' },
};

export default function OverviewView({
  incidents = [],
  riskZones = [],
  responseUnits = [],
  alerts = [],
  reports = [],
  timelineData = [],
  recentActivities = [],
  onSelectIncident = () => {},
  onSelectAlert = () => {},
  onNavigateTab = () => {},
  mapCenter = [10.3673, 77.9803],
  theme = 'dark'
}) {
  const activeIncidents   = incidents.filter(i => i.status === 'active' || i.status === 'in_progress').length;
  const criticalIncidents = incidents.filter(i => i.severity === 'critical').length;
  const reportsTotal      = reports.length;
  const reportsVerified   = reports.filter(r => r.status === 'Verified').length;
  const totalAffected     = incidents.reduce((s, i) => s + (i.affectedCount || 0), 0);
  const totalEvacuated    = incidents.reduce((s, i) => s + (i.evacuatedCount || 0), 0);
  const availableUnits    = responseUnits.filter(u => u.status === 'Available').length;
  const totalUnits        = responseUnits.length;

  return (
    <div className="space-y-5 max-w-[1800px] mx-auto pb-10">

      {/* ─── 1. SITREP Banner ─────────────────────────── */}
      <div
        className="rounded-xl border border-red-500/25 bg-[#111820]
                   overflow-hidden relative
                   shadow-[0_0_32px_-8px_rgba(239,68,68,0.25),0_4px_24px_-2px_rgba(0,0,0,0.5)]"
      >
        {/* Gradient tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400
                            shadow-[0_0_20px_rgba(239,68,68,0.3)] shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-[15px] font-bold text-white tracking-tight">
                  Operational SITREP — Dindigul Disaster Sector
                </h2>
                <Badge variant="red" size="sm" pulse>LEVEL 3 EMERGENCY</Badge>
              </div>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                AI-coordinated multi-hazard response: cloudburst flooding · Sirumalai landslide · dam overflow surge · substation waterlogging
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Button variant="danger" icon={Radio}
              onClick={() => { soundFx.playCriticalAlert(); onNavigateTab('alerts'); }}>
              Broadcast Alert
            </Button>
            <Button variant="ghost" onClick={() => onNavigateTab('reports')}>
              Verify Reports
            </Button>
          </div>
        </div>
      </div>

      {/* ─── 2. KPI Row ──────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <StatCard label="Active Incidents"  value={activeIncidents}   numericValue={activeIncidents}  icon={Activity}     variant="cyan"     trend="+2 in 2 hrs"           trendType="neutral" />
        <StatCard label="Critical Danger"   value={criticalIncidents} numericValue={criticalIncidents} icon={AlertOctagon} variant="critical"  trend="Immediate response"    trendType="critical"/>
        <StatCard label="Reports Received"  value={reportsTotal}      numericValue={reportsTotal}      icon={Radio}        variant="default"  trend="+14 incoming/hr"      trendType="up"      />
        <StatCard label="AI-Verified"       value={reportsVerified}   numericValue={reportsVerified}   icon={FileCheck2}   variant="green"    trend={`${Math.round(reportsVerified/Math.max(reportsTotal,1)*100)}% accuracy`} trendType="up" />
        <StatCard label="Citizens Affected" value={totalAffected}     numericValue={totalAffected}     icon={Users}        variant="amber"    trend={`${totalEvacuated.toLocaleString()} evacuated`} trendType="down" />
        <StatCard label="Response Fleet"    value={`${availableUnits}/${totalUnits}`} numericValue={availableUnits} icon={Truck} variant="cyan" trend={`${totalUnits - availableUnits} teams active`} trendType="neutral" />
      </div>

      {/* ─── 3. Main Grid: Map (8) + Incident Feed (4) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* MAP column */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3">
          {/* Map header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22D3EE] animate-pulse" />
              <h3 className="text-[13px] font-semibold text-white">Tactical Geospatial Grid</h3>
              <span className="text-meta text-slate-500 hidden sm:inline">(Dindigul & Sirumalai)</span>
            </div>
            <button
              onClick={() => onNavigateTab('map')}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Full Screen GIS <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <DisasterMap
            incidents={incidents}
            riskZones={riskZones}
            responseUnits={responseUnits}
            onSelectIncident={onSelectIncident}
            mapCenter={mapCenter}
            theme={theme}
            className="h-[460px] sm:h-[500px]"
          />

          {/* Telemetry strip */}
          <div className="grid grid-cols-3 gap-3 bg-white/[0.025] p-3 rounded-xl border border-white/[0.07] text-[11px] font-mono">
            <div className="text-slate-500">
              Danger Zones: <span className="text-red-400 font-semibold">2 Active</span>
            </div>
            <div className="text-slate-500 text-center">
              Rainfall: <span className="text-cyan-300 font-semibold">88 mm/hr</span>
            </div>
            <div className="text-slate-500 text-right">
              Mesh Comms: <span className="text-emerald-400 font-semibold">ONLINE</span>
            </div>
          </div>
        </div>

        {/* LIVE INCIDENT FEED column */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#EF4444] animate-ping" />
              <h3 className="text-[13px] font-semibold text-white">Live Incident Feed</h3>
            </div>
            <button
              onClick={() => onNavigateTab('incidents')}
              className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              Manage all ({incidents.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="panel p-0 flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 max-h-[520px]">
              {incidents.slice(0, 5).map(inc => (
                <IncidentCard
                  key={inc.id}
                  incident={inc}
                  onClick={onSelectIncident}
                  onNavigateToMap={(coords) => {
                    onSelectIncident(inc);
                    onNavigateTab('map');
                  }}
                />
              ))}
            </div>

            <div className="p-3 border-t border-white/[0.07]">
              <Button variant="ghost" className="w-full text-xs" onClick={() => onNavigateTab('incidents')}>
                Open Full Incident Intelligence
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. Secondary Row: Alerts Stream + Timeline ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Alerts Stream */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-[13px] font-semibold text-white">Critical Alerts Stream</h3>
            </div>
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition"
            >
              All Alerts
            </button>
          </div>

          <div className="panel p-3.5 space-y-2.5 flex-1">
            {alerts.slice(0, 3).map(alt => (
              <div
                key={alt.id}
                onClick={() => { soundFx.playClick(); onSelectAlert(alt); }}
                className={`p-3.5 rounded-xl border text-xs cursor-pointer transition ${
                  alt.severity === 'critical'
                    ? 'bg-red-500/8 border-red-500/25 hover:bg-red-500/12'
                    : 'bg-white/[0.025] border-white/[0.07] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className={`badge text-[10px] px-2 py-0.5 ${
                    alt.severity === 'critical' ? 'badge-critical' : 'badge-moderate'
                  }`}>{alt.category}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{alt.issuedAt}</span>
                </div>
                <h4 className="font-semibold text-slate-100 text-xs leading-snug">{alt.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">{alt.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hazard Timeline Chart */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-[13px] font-semibold text-white">Hazard Timeline & Runoff Progression</h3>
            </div>
            <span className="text-meta text-slate-500 tracking-wider">24-HR FORECAST</span>
          </div>

          <div className="panel p-4 sm:p-5 flex-1">
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                  <defs>
                    <linearGradient id="grCyan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#22D3EE" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="grRed" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#334155" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#334155" tick={{ fill: '#64748B', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="rainfall"  name="Rainfall (mm/hr)" stroke="#22D3EE" strokeWidth={2} fillOpacity={1} fill="url(#grCyan)" dot={false} />
                  <Area type="monotone" dataKey="incidents" name="Active Hazards"    stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#grRed)"  dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Precipitation Inflow
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Incident Frequency
                </span>
              </div>
              <span className="text-cyan-300 font-semibold">Peak at 19:30 IST</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 5. Activity Feed ─────────────────────────── */}
      <div className="panel p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="text-[13px] font-semibold text-white">Live Activity Feed</h3>
          </div>
          <span className="text-meta text-slate-500">Real-time operations log</span>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.05]">
          {recentActivities.slice(0, 6).map((activity, i) => {
            const cfg = ACTIVITY_CFG[activity.type] || ACTIVITY_CFG.system;
            return (
              <div key={activity.id} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${cfg.dot}`} />
                <span className={`badge text-[9px] px-1.5 py-0.5 shrink-0 mt-0.5 ${
                  activity.type === 'alert' ? 'badge-critical' :
                  activity.type === 'ai'    ? 'badge-violet' :
                  activity.type === 'unit'  ? 'badge-cyan' :
                  'badge-neutral'
                }`}>{cfg.label}</span>
                <p className="text-[12px] text-slate-300 flex-1 leading-relaxed">{activity.text}</p>
                <span className="text-meta text-slate-600 shrink-0">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
