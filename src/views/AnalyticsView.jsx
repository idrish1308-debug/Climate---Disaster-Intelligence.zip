import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  ShieldAlert,
  Users,
  Activity,
  Award,
  Zap,
  Waves,
  Download,
  Calendar,
  Layers,
  Cpu,
  ArrowUpRight,
  CheckCircle,
  FileSpreadsheet,
  Gauge
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  HOURLY_TIMELINE_DATA,
  SHELTERS
} from '../data/mockData';
import { Card, Badge, Button } from '../components/ui/CommandComponents';
import { soundFx } from '../utils/audio';

const HAZARDS_PIE = [
  { name: 'Flash Flood', value: 42, color: '#22D3EE' },
  { name: 'Landslide', value: 24, color: '#F59E0B' },
  { name: 'Severe Gale', value: 16, color: '#F43F5E' },
  { name: 'Power Grid', value: 12, color: '#EAB308' },
  { name: 'Dam Runoff', value: 6, color: '#10B981' }
];

const SECTOR_RESPONSE_TIMES = [
  { sector: 'Anna Nagar (Urban)', avgMinutes: 8.4, target: 10.0, rating: 'Optimal' },
  { sector: 'Sirumalai Ghat (Hills)', avgMinutes: 24.2, target: 30.0, rating: 'Normal' },
  { sector: 'Kamarajar Dam (Basin)', avgMinutes: 14.8, target: 15.0, rating: 'Optimal' },
  { sector: 'Begambur (Substation)', avgMinutes: 11.2, target: 12.0, rating: 'Optimal' },
  { sector: 'Palani Corridor (Hwy)', avgMinutes: 7.5, target: 10.0, rating: 'Optimal' }
];

const SHELTER_OCCUPANCY_DATA = SHELTERS.map(s => ({
  name: s.name.split(' ')[0] + ' ' + (s.name.split(' ')[1] || ''),
  occupied: s.currentOccupants,
  available: Math.max(s.capacity - s.currentOccupants, 0),
  capacity: s.capacity
}));

export default function AnalyticsView({
  incidents = [],
  reports = []
}) {
  const [timeRange, setTimeRange] = useState('24h');
  const [exportNotice, setExportNotice] = useState(false);

  const totalEvacuated = incidents.reduce((acc, curr) => acc + (curr.evacuatedCount || 0), 0) || 2310;
  const totalAffected = incidents.reduce((acc, curr) => acc + (curr.affectedCount || 0), 0) || 8420;
  const criticalCount = incidents.filter(i => i.severity === 'critical').length;

  const handleExportData = () => {
    soundFx.playClick();
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12 max-w-[1720px] mx-auto">
      {/* Header Banner */}
      <div className="panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Mission Analytics & AI Decision Telemetry
                </h2>
                <Badge variant="cyan" size="sm">
                  LIVE TELEMETRY
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Post-incident response evaluations, NDRF dispatch latency, and predictive hydrological crest models.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Filter */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
            {['6h', '24h', '7d'].map(t => (
              <button
                key={t}
                onClick={() => {
                  soundFx.playClick();
                  setTimeRange(t);
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  timeRange === t
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            icon={Download}
            onClick={handleExportData}
          >
            Export Dossier
          </Button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Mission Telemetry & After-Action Report PDF successfully compiled and staged for download.</span>
          </div>
          <span className="text-[10px] text-emerald-400/80">SHA-256: 8f2a1b...</span>
        </div>
      )}

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="panel p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Evacuated</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mt-2">
            {totalEvacuated.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400/90 font-mono mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+380 citizens in last 60m</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: '74%' }} />
          </div>
        </div>

        <div className="panel p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Mean Evac Lead Time</span>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 mt-2">
            38.4 <span className="text-sm font-sans font-normal text-slate-400">min</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-cyan-400/90 font-mono mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14m buffer ahead of crest</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-cyan-400 h-full rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="panel p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">NDRF Dispatch Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-300 mt-2">
            8.4 <span className="text-sm font-sans font-normal text-slate-400">min</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono mt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>1.6 min faster than 10m SOP</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: '84%' }} />
          </div>
        </div>

        <div className="panel p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">AI Classification Conf.</span>
            <Cpu className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-violet-400 mt-2">
            98.4%
          </div>
          <div className="flex items-center gap-1 text-[11px] text-violet-400/90 font-mono mt-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Zero false-negative red alerts</span>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-violet-400 h-full rounded-full" style={{ width: '98%' }} />
          </div>
        </div>
      </div>

      {/* Row 1: Dispatch Latency & Hazard Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Response Latency By Sector Bar Chart */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">First Responder Dispatch Latency</h3>
              <p className="text-xs text-slate-400 mt-0.5">Average dispatch speed vs SOP standard threshold by sector (minutes)</p>
            </div>
            <Clock className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SECTOR_RESPONSE_TIMES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="sector"
                  stroke="#475569"
                  tick={{ fill: '#94A3B8', fontSize: 10 }}
                />
                <YAxis
                  stroke="#475569"
                  tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 20, 0.95)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: '#F1F5F9',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="avgMinutes" name="Actual (mins)" fill="#22D3EE" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" name="SOP Threshold (mins)" fill="#334155" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hazard Types Distribution */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">District Hazard Profile Breakdown</h3>
              <p className="text-xs text-slate-400 mt-0.5">Distribution of verified natural and infrastructure threats</p>
            </div>
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={HAZARDS_PIE}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {HAZARDS_PIE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 20, 0.95)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: '#F1F5F9',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs font-mono text-slate-300">
            {HAZARDS_PIE.map(item => (
              <span key={item.name} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}:</span>
                <strong className="text-white">{item.value}%</strong>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Inflow Hydrograph & Shelter Capacity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Precipitation vs Evacuations Area Chart */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Precipitation & Evacuation Hydrograph</h3>
              <p className="text-xs text-slate-400 mt-0.5">Hourly rainfall rate (mm/hr) vs cumulative citizens safely evacuated</p>
            </div>
            <Waves className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HOURLY_TIMELINE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#22D3EE" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="evacGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <YAxis stroke="#475569" tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 20, 0.95)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: '#F1F5F9',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="rainfall" name="Rainfall (mm/hr)" stroke="#22D3EE" strokeWidth={2} fillOpacity={1} fill="url(#rainGrad)" />
                <Area type="monotone" dataKey="evacuated" name="Evacuated (Persons)" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#evacGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Shelter Capacity Distribution Bar Chart */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Relief Shelter Staging Load Matrix</h3>
              <p className="text-xs text-slate-400 mt-0.5">Current occupied beds vs spare capacity across designated camps</p>
            </div>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SHELTER_OCCUPANCY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                <YAxis stroke="#475569" tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(11, 15, 20, 0.95)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: '#F1F5F9',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="occupied" name="Occupied Beds" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                <Bar dataKey="available" name="Available Beds" stackId="a" fill="#10B981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: AI Model Telemetry & Accuracy Audit Table */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">AI Model Performance & Watershed Predictor Telemetry</h3>
            <p className="text-xs text-slate-400 mt-0.5">Real-time model inferences across hydrological sensors and satellite radar telemetry</p>
          </div>
          <Badge variant="cyan" size="sm">
            TENSORRT INF 14ms
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/[0.08] text-slate-400 font-mono uppercase text-[11px]">
                <th className="pb-3 font-semibold">Predictive Pipeline</th>
                <th className="pb-3 font-semibold">Sensor Input</th>
                <th className="pb-3 font-semibold">Inference Horizon</th>
                <th className="pb-3 font-semibold">Confidence</th>
                <th className="pb-3 font-semibold">Forecast Verdict</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] font-sans">
              <tr>
                <td className="py-3 font-medium text-white flex items-center gap-2">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  Sanarpatti Hydrological Runoff
                </td>
                <td className="py-3 text-slate-300 font-mono">Radar SAR-1 + 4 Stream Gauges</td>
                <td className="py-3 text-slate-300 font-mono">T+45 mins</td>
                <td className="py-3 text-emerald-400 font-mono font-bold">98.2%</td>
                <td className="py-3 text-slate-300">Peak crest at +2.35m in Anna Nagar; receding after 19:30</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono text-[10px]">
                    NOMINAL
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-amber-400" />
                  Sirumalai Slope Shear Strain
                </td>
                <td className="py-3 text-slate-300 font-mono">Piezometer + Soil Saturation Probe</td>
                <td className="py-3 text-slate-300 font-mono">T+2 hours</td>
                <td className="py-3 text-amber-400 font-mono font-bold">91.6%</td>
                <td className="py-3 text-slate-300">Soil moisture at 94%; secondary slip probable between Hairpin 11-14</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 font-mono text-[10px]">
                    ELEVATED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                  Kamarajar Dam Discharge Propagation
                </td>
                <td className="py-3 text-slate-300 font-mono">Sluice Telemetry & Kodaganar Riverbed LIDAR</td>
                <td className="py-3 text-slate-300 font-mono">T+15 mins</td>
                <td className="py-3 text-emerald-400 font-mono font-bold">99.1%</td>
                <td className="py-3 text-slate-300">8,500 cusecs downstream buffer stable; Athoor bridge clearing maintained</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono text-[10px]">
                    CONTROLLED
                  </span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Begambur Islanding Grid Protection
                </td>
                <td className="py-3 text-slate-300 font-mono">SCADA Feeder Relays</td>
                <td className="py-3 text-slate-300 font-mono">Real-time</td>
                <td className="py-3 text-emerald-400 font-mono font-bold">100.0%</td>
                <td className="py-3 text-slate-300">11kV feeders safely trip-isolated without residential arc danger</td>
                <td className="py-3 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-mono text-[10px]">
                    PROTECTED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
