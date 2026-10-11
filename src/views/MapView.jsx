import React, { useState } from 'react';
import {
  Compass,
  Filter,
  Search,
  AlertTriangle,
  Waves,
  Mountain,
  Wind,
  Zap,
  MapPin,
  ChevronRight,
  Crosshair,
  ShieldAlert,
  Layers,
  Radio,
  Truck
} from 'lucide-react';
import DisasterMap from '../components/map/DisasterMap';
import { soundFx } from '../utils/audio';
import { Card, Badge, Button } from '../components/ui/CommandComponents';

const SECTOR_SHORTCUTS = [
  { name: 'Anna Nagar (Urban)', coords: [10.3690, 77.9780], type: 'Flood Crest' },
  { name: 'Sirumalai Ghat (Hills)', coords: [10.2200, 77.9950], type: 'Landslide' },
  { name: 'Kamarajar Sagar (Dam)', coords: [10.2800, 77.8900], type: 'Reservoir' },
  { name: 'Begambur Grid', coords: [10.3605, 77.9650], type: 'Substation' },
  { name: 'Dindigul Core', coords: [10.3673, 77.9803], type: 'HQ Command' }
];

export default function MapView({
  incidents = [],
  riskZones = [],
  responseUnits = [],
  onSelectIncident = () => {},
  selectedIncident = null,
  mapCenter = [10.3673, 77.9803],
  setMapCenter = () => {},
  theme = 'dark'
}) {
  const [searchFilter, setSearchFilter] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredIncidents = incidents.filter(inc => {
    if (severityFilter !== 'all' && inc.severity !== severityFilter) return false;
    if (typeFilter !== 'all' && inc.type !== typeFilter) return false;
    if (searchFilter.trim() !== '') {
      const q = searchFilter.toLowerCase();
      return (
        inc.title.toLowerCase().includes(q) ||
        inc.location.toLowerCase().includes(q) ||
        inc.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const jumpToLocation = (coords, inc = null) => {
    soundFx.playClick();
    setMapCenter(coords);
    if (inc) {
      onSelectIncident(inc);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in pb-10 max-w-[1720px] mx-auto">
      {/* Top Tactical Controls Bar */}
      <div className="panel p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Geospatial Tactical GIS Command
              </h2>
              <Badge variant="cyan" size="sm">
                WGS84 EPSG:4326
              </Badge>
              <Badge variant="green" size="sm">
                CARTO DARK TEL
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time multi-spectral satellite radar, drone telemetry feeds and mobile response unit tracking.
            </p>
          </div>
        </div>

        {/* Quick Sector Jump Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
            SECTORS:
          </span>
          {SECTOR_SHORTCUTS.map(sec => {
            const isNear =
              Math.abs(mapCenter[0] - sec.coords[0]) < 0.005 &&
              Math.abs(mapCenter[1] - sec.coords[1]) < 0.005;

            return (
              <button
                key={sec.name}
                onClick={() => jumpToLocation(sec.coords)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition flex items-center gap-1.5 ${
                  isNear
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white border-white/[0.08] hover:border-cyan-400/30'
                }`}
              >
                <span>{sec.name}</span>
                <span className="text-[10px] text-slate-400">({sec.type})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Ribbon & Counters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Search bar */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search hazards or coords..."
              className="w-full field pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500"
            />
          </div>

          {/* Severity filter pills */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
            {['all', 'critical', 'high', 'moderate'].map(sev => (
              <button
                key={sev}
                onClick={() => {
                  soundFx.playClick();
                  setSeverityFilter(sev);
                }}
                className={`px-2.5 py-1 rounded-lg uppercase text-[11px] transition ${
                  severityFilter === sev
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          {/* Type filter pills */}
          <div className="hidden lg:flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
            {[
              { id: 'all', label: 'All Types' },
              { id: 'flood', label: '🌊 Flood' },
              { id: 'landslide', label: '⛰️ Landslide' },
              { id: 'gale', label: '🌪️ Gale' }
            ].map(tf => (
              <button
                key={tf.id}
                onClick={() => {
                  soundFx.playClick();
                  setTypeFilter(tf.id);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                  typeFilter === tf.id
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live Counters */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Pinpointed Hazards: <strong className="text-white">{filteredIncidents.length}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            Field Units: <strong className="text-emerald-400">{responseUnits.length}</strong>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            Zones: <strong className="text-cyan-300">{riskZones.length}</strong>
          </span>
        </div>
      </div>

      {/* Full-width Map Display Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl bg-[#070B14]">
        <DisasterMap
          incidents={filteredIncidents}
          riskZones={riskZones}
          responseUnits={responseUnits}
          onSelectIncident={onSelectIncident}
          selectedIncident={selectedIncident}
          mapCenter={mapCenter}
          theme={theme}
          className="h-[640px] w-full"
        />
      </div>
    </div>
  );
}
