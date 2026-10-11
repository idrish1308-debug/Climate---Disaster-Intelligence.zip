import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  MapPin,
  Clock,
  Shield,
  Truck,
  Users,
  Activity,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Compass,
  ArrowRight,
  ExternalLink,
  LifeBuoy,
  Send,
  Zap,
  Waves,
  Mountain,
  Wind
} from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { Card, Badge, Button } from '../ui/CommandComponents';

export default function IncidentDetailModal({
  incident,
  onClose,
  onUpdateStatus,
  onDispatchUnit,
  availableUnits = []
}) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState(null);
  const [selectedUnitToAssign, setSelectedUnitToAssign] = useState('');
  const [dispatchSuccess, setDispatchSuccess] = useState(false);

  if (!incident) return null;

  const isCritical = incident.severity === 'critical';
  const isHigh = incident.severity === 'high';

  const handleRunAISimulation = () => {
    soundFx.playClick();
    setIsSimulating(true);
    setSimulationLogs('Querying satellite synthetic-aperture radar (SAR-1) and drone multispectral feed...');
    setTimeout(() => {
      setSimulationLogs('Evaluating topography hydrological runoff model (Sanarpatti Basin Watershed)...');
    }, 700);
    setTimeout(() => {
      setSimulationLogs('Simulated AI confidence recalculated: 98.4%. Peak water crest expected in 38 mins. Primary evacuation corridor verified safe.');
      setIsSimulating(false);
      soundFx.playRadarBeep();
    }, 1600);
  };

  const handleAssignUnit = (e) => {
    e.preventDefault();
    if (!selectedUnitToAssign) return;
    onDispatchUnit(incident.id, selectedUnitToAssign);
    setDispatchSuccess(true);
    soundFx.playClick();
    setTimeout(() => {
      setDispatchSuccess(false);
      setSelectedUnitToAssign('');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in">
      <div className="panel max-w-2xl w-full shadow-2xl relative my-auto border-white/20 overflow-hidden">
        {/* Top Severity Glow Header */}
        <div
          className={`p-5 border-b border-white/[0.08] flex items-start justify-between gap-4 ${
            isCritical
              ? 'bg-rose-500/[0.06]'
              : isHigh
              ? 'bg-amber-500/[0.06]'
              : 'bg-cyan-500/[0.04]'
          }`}
        >
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                {incident.id}
              </span>
              <Badge variant={isCritical ? 'red' : isHigh ? 'amber' : 'neutral'} size="sm" pulse={isCritical}>
                {incident.severity.toUpperCase()} PRIORITY
              </Badge>
              <Badge variant="cyan" size="sm">
                {incident.type?.toUpperCase()}
              </Badge>
              <span className="text-[11px] font-mono text-slate-400">
                Reported {incident.timeReported}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
              {incident.title}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>{incident.location}</span>
              {incident.coordinates && (
                <span className="font-mono text-[11px] text-slate-400 ml-1">
                  [{incident.coordinates[0].toFixed(4)}, {incident.coordinates[1].toFixed(4)}]
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/[0.08] transition"
            aria-label="Close Dossier"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Affected Count</div>
              <div className="text-xl font-bold font-mono text-amber-300 mt-1">
                {incident.affectedCount?.toLocaleString() || '1,200'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Trapped Citizens</div>
              <div className="text-xl font-bold font-mono text-rose-400 mt-1">
                {incident.trappedCount || 0}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Telemetry Reading</div>
              <div className="text-xl font-bold font-mono text-cyan-300 mt-1 truncate">
                {incident.rainfallRate || incident.windSpeed || incident.soilSaturation || 'Active'}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">AI Confidence</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                {incident.aiConfidence}%
              </div>
            </div>
          </div>

          {/* AI Assessment Box */}
          <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/25 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold text-white">AI Damage Assessment & Predictive Impact</span>
              </div>
              <button
                onClick={handleRunAISimulation}
                disabled={isSimulating}
                className="text-[11px] font-mono text-violet-300 hover:text-white flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>Re-run Simulation</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {incident.aiDamageAssessment}
            </p>

            {simulationLogs && (
              <div className="p-3 rounded-lg bg-black/60 border border-violet-500/30 text-[11px] font-mono text-violet-200 mt-2">
                {simulationLogs}
              </div>
            )}
          </div>

          {/* AI Suggested SOP Action */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Suggested SOP Directive:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-white/[0.03] p-3.5 rounded-xl border border-white/[0.06]">
              {incident.aiSuggestedAction}
            </p>
          </div>

          {/* Assigned Units */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
              Deployed Response Teams:
            </span>
            <div className="flex flex-wrap gap-2">
              {incident.assignedUnits?.length > 0 ? (
                incident.assignedUnits.map(unitName => (
                  <span
                    key={unitName}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    {unitName}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">No teams dispatched yet</span>
              )}
            </div>

            {/* Quick Dispatch Form */}
            <form onSubmit={handleAssignUnit} className="flex gap-2 pt-2">
              <select
                value={selectedUnitToAssign}
                onChange={(e) => setSelectedUnitToAssign(e.target.value)}
                className="flex-1 h-10 field px-3 text-xs text-white bg-[#0B0F14]"
              >
                <option value="">Select available NDRF/SDRF unit to deploy...</option>
                {availableUnits.map(u => (
                  <option key={u.id} value={u.name}>
                    {u.name} ({u.status})
                  </option>
                ))}
              </select>
              <Button
                type="submit"
                variant="cyan"
                size="sm"
                icon={Send}
                disabled={!selectedUnitToAssign}
              >
                {dispatchSuccess ? 'Dispatched!' : 'Deploy'}
              </Button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-white/[0.02] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">STATUS:</span>
            {['active', 'in_progress', 'resolved'].map(statusVal => (
              <button
                key={statusVal}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateStatus(incident.id, statusVal);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition ${
                  incident.status === statusVal
                    ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
              >
                {statusVal.replace('_', ' ')}
              </button>
            ))}
          </div>

          <Button variant="ghost" onClick={onClose}>
            Close Dossier
          </Button>
        </div>
      </div>
    </div>
  );
}
