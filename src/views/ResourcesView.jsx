import React, { useState } from 'react';
import {
  Truck,
  Home,
  Shield,
  LifeBuoy,
  Users,
  BatteryCharging,
  Radio,
  Plus,
  CheckCircle,
  MapPin,
  Clock,
  ArrowRight,
  Zap,
  Activity,
  AlertCircle
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Card, Badge, Button } from '../components/ui/CommandComponents';

export default function ResourcesView({
  responseUnits = [],
  shelters = [],
  onUpdateUnitStatus = () => {},
  onUpdateShelterOccupancy = () => {}
}) {
  const [activeTab, setActiveTab] = useState('units');

  const totalPersonnel = responseUnits.reduce((acc, u) => acc + (u.personnel || 0), 0);
  const onSceneUnits = responseUnits.filter(u => u.status === 'On Scene').length;
  const availableUnits = responseUnits.filter(u => u.status === 'Available').length;

  const totalShelterCap = shelters.reduce((acc, s) => acc + (s.capacity || 0), 0);
  const totalShelterOccupants = shelters.reduce((acc, s) => acc + (s.currentOccupants || 0), 0);
  const shelterOverallPct = totalShelterCap ? Math.round((totalShelterOccupants / totalShelterCap) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in pb-12 max-w-[1720px] mx-auto">
      {/* Top Header */}
      <div className="panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Resource Logistics & First Responder Fleet
                </h2>
                <Badge variant="cyan" size="sm">
                  DISPATCH MATRIX
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time telematics for NDRF, SDRF, fire squadrons, medical transports, and municipal relief shelters.
              </p>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-mono">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('units');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'units'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Response Fleet ({responseUnits.length})</span>
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('shelters');
            }}
            className={`px-3.5 py-1.5 rounded-lg transition flex items-center gap-2 ${
              activeTab === 'shelters'
                ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Relief Shelters ({shelters.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Total Responders</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">{totalPersonnel}</div>
            <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">{responseUnits.length} tactical units</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Units On Scene</span>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-1">{onSceneUnits}</div>
            <span className="text-[11px] text-amber-400/80 font-mono mt-0.5 block">Deployed in hot zones</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Sheltered Citizens</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{totalShelterOccupants.toLocaleString()}</div>
            <span className="text-[11px] text-emerald-400/80 font-mono mt-0.5 block">{shelterOverallPct}% total capacity</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
            <Home className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Spare Shelter Beds</span>
            <div className="text-2xl font-bold font-mono text-cyan-300 mt-1">{(totalShelterCap - totalShelterOccupants).toLocaleString()}</div>
            <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">Ready across 4 facilities</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
            <Shield className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Response Units Grid */}
      {activeTab === 'units' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {responseUnits.map(unit => {
            const isAvailable = unit.status === 'Available';
            const isOnScene = unit.status === 'On Scene';

            return (
              <div
                key={unit.id}
                className={`panel p-5 flex flex-col justify-between hover:border-white/20 transition relative ${
                  isOnScene ? 'border-amber-500/25 bg-amber-500/[0.02]' : ''
                }`}
              >
                {/* Left Status Stripe */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                    isOnScene ? 'bg-amber-400' : isAvailable ? 'bg-emerald-400' : 'bg-cyan-400'
                  }`}
                />

                <div className="space-y-3 pl-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                      {unit.id}
                    </span>
                    <Badge variant={isOnScene ? 'amber' : isAvailable ? 'green' : 'neutral'} size="sm" pulse={isOnScene}>
                      {unit.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{unit.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Station: {unit.base || unit.baseLocation}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono py-2.5 border-y border-white/[0.06]">
                    <div className="text-slate-300">
                      <span className="text-slate-400">Personnel:</span> <strong className="text-white">{unit.personnel}</strong>
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-400">Radio:</span> <strong className="text-cyan-300">{unit.batteryRadio}</strong>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 font-mono">
                    <span className="text-slate-400">Assignment:</span>{' '}
                    <span className="text-slate-200">{unit.currentAssignment}</span>
                  </div>

                  {unit.vehicles && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {unit.vehicles.map(v => (
                        <span key={v} className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-slate-400">
                          {v}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 pl-1">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onUpdateUnitStatus(unit.id, isAvailable ? 'Dispatched' : 'Available');
                    }}
                    className={`w-full py-2 rounded-xl text-xs font-bold font-mono transition border ${
                      isAvailable
                        ? 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
                        : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {isAvailable ? 'DISPATCH TO SCENE' : 'MARK READY / AVAILABLE'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Shelters Grid */}
      {activeTab === 'shelters' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shelters.map(shelter => {
            const occupancyPct = Math.round((shelter.currentOccupants / shelter.capacity) * 100);
            const isNearFull = occupancyPct >= 80;

            return (
              <div
                key={shelter.id}
                className={`panel p-5 flex flex-col justify-between hover:border-white/20 transition relative ${
                  isNearFull ? 'border-amber-500/25 bg-amber-500/[0.02]' : ''
                }`}
              >
                {/* Left Accent Stripe */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                    isNearFull ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                />

                <div className="space-y-3 pl-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                      {shelter.id}
                    </span>
                    <Badge variant={isNearFull ? 'amber' : 'green'} size="sm">
                      {occupancyPct}% OCCUPIED
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{shelter.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{shelter.location || shelter.address}</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Occupancy:</span>
                      <span className="text-cyan-300 font-bold">
                        {shelter.currentOccupants.toLocaleString()} / {shelter.capacity.toLocaleString()} beds
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isNearFull ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${Math.min(occupancyPct, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-white/[0.06]">
                    <div className="text-slate-300">
                      <span className="text-slate-400">Medical:</span>{' '}
                      <span className="text-emerald-400">{shelter.medicalSupport || 'Doctor On Duty'}</span>
                    </div>
                    <div className="text-slate-300">
                      <span className="text-slate-400">Power:</span>{' '}
                      <span className="text-amber-300">{shelter.powerBackup || 'Generator DG Active'}</span>
                    </div>
                  </div>

                  {shelter.foodSupplies && (
                    <div className="text-xs text-slate-400 font-mono">
                      <span>Rations:</span> <strong className="text-slate-200">{shelter.foodSupplies}</strong>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2 pl-1">
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onUpdateShelterOccupancy(
                        shelter.id,
                        Math.min(shelter.currentOccupants + 25, shelter.capacity)
                      );
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono transition"
                  >
                    +25 Intake
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onUpdateShelterOccupancy(
                        shelter.id,
                        Math.max(shelter.currentOccupants - 25, 0)
                      );
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono transition"
                  >
                    -25 Relief
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
