import React, { useState } from 'react';
import {
  FileSpreadsheet, Plus, Search, Filter,
  AlertTriangle, Cpu, MapPin, Clock, Shield, Truck,
  Users, CheckCircle, Activity, Layers, X
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Badge, Button } from '../components/ui/CommandComponents';
import { IncidentCard } from '../components/ui/IncidentCard';

const SEV_PILL = {
  all:      { active: 'bg-white/10 text-white border-white/20', inactive: 'text-slate-500 border-transparent' },
  critical: { active: 'bg-red-500/15 text-red-300 border-red-500/30', inactive: 'text-slate-500 border-transparent' },
  high:     { active: 'bg-orange-500/15 text-orange-300 border-orange-500/30', inactive: 'text-slate-500 border-transparent' },
  moderate: { active: 'bg-amber-500/15 text-amber-300 border-amber-500/30', inactive: 'text-slate-500 border-transparent' },
};

export default function IncidentsView({
  incidents = [],
  onSelectIncident = () => {},
  onAddNewIncident = () => {},
  onUpdateStatus = () => {},
  onNavigateToMap = () => {}
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('Sanarpatti Sector, Dindigul');
  const [newSeverity, setNewSeverity] = useState('high');
  const [newType, setNewType] = useState('flood');
  const [newAffected, setNewAffected] = useState(1500);
  const [newTrapped, setNewTrapped] = useState(12);

  const filtered = incidents.filter(inc => {
    if (severityFilter !== 'all' && inc.severity !== severityFilter) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return inc.title.toLowerCase().includes(q) ||
             inc.location.toLowerCase().includes(q) ||
             inc.id.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newInc = {
      id: `INC-00${incidents.length + 1}`,
      title: newTitle, location: newLocation,
      coordinates: [10.36 + (Math.random() - 0.5) * 0.05, 77.97 + (Math.random() - 0.5) * 0.05],
      severity: newSeverity, type: newType,
      status: 'active',
      timeReported: 'Just now (Operator Logged)',
      affectedCount: Number(newAffected) || 500,
      trappedCount: Number(newTrapped) || 0,
      evacuatedCount: 0, rainfallRate: '75 mm/hr',
      aiConfidence: 94,
      aiDamageAssessment: `Rapid localized anomaly. Immediate containment protocol initiated for ${newLocation}.`,
      aiSuggestedAction: `Dispatch nearest SDRF first responder team. Establish 500m security perimeter.`,
      assignedUnits: ['TN Fire & Rescue Unit 1'],
      contactPerson: 'Command Duty Officer', lastUpdate: 'Just now'
    };
    onAddNewIncident(newInc);
    setShowCreateModal(false);
    setNewTitle('');
    soundFx.playCriticalAlert();
  };

  return (
    <div className="space-y-5 max-w-[1800px] mx-auto pb-10">

      {/* Header */}
      <div className="panel p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h2 className="text-[15px] font-bold text-white tracking-tight">
              Incident Intelligence & Operations Log
            </h2>
            <Badge variant="cyan" size="sm">{incidents.length} TOTAL</Badge>
          </div>
          <p className="text-[13px] text-slate-400">
            AI-enriched hazard dossiers with live casualty metrics, telemetry models and response units.
          </p>
        </div>
        <Button variant="danger" icon={Plus} onClick={() => { soundFx.playClick(); setShowCreateModal(true); }}>
          Log Incident
        </Button>
      </div>

      {/* Filter Ribbon */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, sector or hazard name…"
              className="field pl-9"
            />
          </div>

          {/* Severity filter pills */}
          <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-xl">
            {Object.entries(SEV_PILL).map(([key, styles]) => (
              <button
                key={key}
                onClick={() => { soundFx.playClick(); setSeverityFilter(key); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold uppercase border transition ${
                  severityFilter === key ? styles.active : styles.inactive + ' hover:text-slate-300'
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Status summary */}
        <div className="text-[11px] font-mono text-slate-500 flex items-center gap-3">
          <span>Active: <strong className="text-red-400">{incidents.filter(i => i.status === 'active').length}</strong></span>
          <span className="text-white/20">|</span>
          <span>In Progress: <strong className="text-orange-400">{incidents.filter(i => i.status === 'in_progress').length}</strong></span>
          <span className="text-white/20">|</span>
          <span>Resolved: <strong className="text-emerald-400">{incidents.filter(i => i.status === 'resolved').length}</strong></span>
        </div>
      </div>

      {/* Incidents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.length > 0 ? (
          filtered.map(inc => (
            <IncidentCard
              key={inc.id}
              incident={inc}
              onClick={onSelectIncident}
              onNavigateToMap={onNavigateToMap}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 py-20 text-center">
            <Filter className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">No incidents match your filters</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="panel p-6 max-w-lg w-full shadow-2xl border-white/12"
               style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
              <div>
                <h3 className="text-[15px] font-bold text-white">Log Urgent Incident Dossier</h3>
                <p className="text-[12px] text-slate-400 mt-0.5">Enter primary hazard details for command broadcast</p>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="text-label text-slate-400 block mb-1.5">Incident Headline</label>
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Flash Flood Breach at Sirumalai Foothills" className="field" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label text-slate-400 block mb-1.5">Severity</label>
                  <select value={newSeverity} onChange={(e) => setNewSeverity(e.target.value)} className="field">
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="moderate">Moderate</option>
                  </select>
                </div>
                <div>
                  <label className="text-label text-slate-400 block mb-1.5">Hazard Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} className="field">
                    <option value="flood">Flash Flood</option>
                    <option value="landslide">Landslide</option>
                    <option value="gale">Gale / Storm</option>
                    <option value="infrastructure">Infrastructure</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-label text-slate-400 block mb-1.5">Sector Location</label>
                <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="field" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label text-slate-400 block mb-1.5">Estimated Affected</label>
                  <input type="number" value={newAffected} onChange={(e) => setNewAffected(e.target.value)} className="field" />
                </div>
                <div>
                  <label className="text-label text-slate-400 block mb-1.5">Trapped / Urgent</label>
                  <input type="number" value={newTrapped} onChange={(e) => setNewTrapped(e.target.value)} className="field" />
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>Cancel</Button>
                <Button type="submit" variant="danger" icon={Plus}>Commit Incident</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
