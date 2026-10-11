import React, { useState } from 'react';
import {
  Settings,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Shield,
  Radio,
  Sliders,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
  UserCheck,
  Cpu,
  RefreshCw,
  Bell,
  Activity,
  Sun,
  Moon
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Card, Badge, Button } from '../components/ui/CommandComponents';

export default function SettingsView({
  soundEnabled = true,
  setSoundEnabled = () => {},
  onResetData = () => {},
  onInjectScenario = () => {},
  operatorRole = 'Incident Commander',
  setOperatorRole = () => {},
  theme = 'dark',
  setTheme = () => {}
}) {
  const [successMsg, setSuccessMsg] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState('15s');

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleTestRadarBeep = () => {
    soundFx.playRadarBeep();
    showNotification('Synthetic Radar Ping Triggered (880Hz-1760Hz)');
  };

  const handleTestSiren = () => {
    soundFx.playCriticalAlert();
    showNotification('Critical Alert Siren Triggered (620Hz Dual Oscillator)');
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12 max-w-[1720px] mx-auto">
      {/* Header */}
      <div className="panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  System Settings & Simulation Engine
                </h2>
                <Badge variant="cyan" size="sm">
                  STAGING SIMULATION
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure synthetic telemetry feeds, audio synthesis, operator roles, and live hackathon drill scenarios.
              </p>
            </div>
          </div>
        </div>

        {successMsg && (
          <div className="text-xs font-mono text-emerald-300 bg-emerald-500/15 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tactical Sound FX Controls */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Tactical Web Audio Synthesizer</h3>
            </div>
            <Badge variant={soundEnabled ? 'green' : 'neutral'} size="sm">
              {soundEnabled ? 'AUDIO ONLINE' : 'MUTED'}
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            Zero-asset procedural Web Audio API oscillator synthesis for realistic command center telemetry pings, siren alerts, and clicks.
          </p>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <div>
              <div className="text-xs font-semibold text-white">Acoustic Sirens & Audio Feedback</div>
              <p className="text-[11px] text-slate-400 mt-0.5">Play synthetic acoustic warnings for critical incidents</p>
            </div>
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                soundFx.toggleSound(next);
                if (next) soundFx.playRadarBeep();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition border ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                  : 'bg-white/[0.04] text-slate-500 border-white/[0.08]'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleTestRadarBeep}
              className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] text-xs font-mono transition"
            >
              Ping Radar (880Hz)
            </button>
            <button
              onClick={handleTestSiren}
              className="flex-1 py-2 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold transition"
            >
              Test Siren (620Hz)
            </button>
          </div>
        </div>

        {/* Appearance & Interface Theme */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'light' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-cyan-400" />}
              <h3 className="text-base font-bold text-white">Appearance & Interface Theme</h3>
            </div>
            <Badge variant={theme === 'light' ? 'amber' : 'cyan'} size="sm">
              {theme === 'light' ? 'LIGHT MODE' : 'DARK MODE'}
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            Switch between tactical high-contrast dark command mode and daylight field-ready light mode. Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px] text-cyan-300">T</kbd>.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => {
                soundFx.playClick();
                setTheme('dark');
                showNotification('Switched to Dark Command Center Theme');
              }}
              className={`p-3.5 rounded-xl border text-left transition ${
                theme === 'dark'
                  ? 'bg-cyan-500/15 border-cyan-400/50 text-white shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Moon className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-xs">Dark Command</span>
              </div>
              <p className="text-[11px] text-slate-400">Low-glare deep navy for operations rooms</p>
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                setTheme('light');
                showNotification('Switched to Light High-Visibility Theme');
              }}
              className={`p-3.5 rounded-xl border text-left transition ${
                theme === 'light'
                  ? 'bg-amber-500/15 border-amber-500/50 text-slate-900 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                <span className="font-bold text-xs text-slate-800">Light Visibility</span>
              </div>
              <p className="text-[11px] text-slate-500">High ambient daylight outdoor field view</p>
            </button>
          </div>
        </div>

        {/* Hackathon Simulation Scenarios */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">Scenario Injection Engine</h3>
            </div>
            <Badge variant="amber" size="sm">
              DRILL DRILLS
            </Badge>
          </div>
          <p className="text-xs text-slate-400">
            Rapidly simulate disaster escalations and multi-hazard cascading crises during demonstration drills.
          </p>

          <div className="space-y-2.5">
            <button
              onClick={() => {
                onInjectScenario('flood_surge');
                soundFx.playCriticalAlert();
                showNotification('Scenario Alpha injected: Anna Nagar water level spiked to 2.10m');
              }}
              className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-cyan-400/40 text-left transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                  Scenario Alpha: Cloudburst Surge (Anna Nagar)
                </span>
                <span className="text-[10px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  INJECT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Spikes flood water level to 2.10m, triggers red siren alert and flags 90 trapped citizens.
              </p>
            </button>

            <button
              onClick={() => {
                onInjectScenario('landslide_block');
                soundFx.playCriticalAlert();
                showNotification('Scenario Beta injected: Sirumalai Hairpin 13 mudslide blocked');
              }}
              className="w-full p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-amber-400/40 text-left transition group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-amber-300 transition">
                  Scenario Beta: Sirumalai Ghat Roadblock
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  INJECT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Triggers secondary slope mudslide on Hairpin 13, trapping 2 tourist passenger vans.
              </p>
            </button>
          </div>

          <div className="pt-2 border-t border-white/[0.08]">
            <Button
              variant="ghost"
              className="w-full text-xs text-rose-300 hover:text-rose-200 hover:border-rose-500/40"
              icon={RotateCcw}
              onClick={() => {
                soundFx.playClick();
                onResetData();
                showNotification('Emergency dataset reset to baseline mock records.');
              }}
            >
              Reset All Datasets to Baseline
            </Button>
          </div>
        </div>

        {/* Operator Profile & Credentials */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Active Operator Authority</h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">SESSION AUTHENTICATED</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Command Role</label>
              <select
                value={operatorRole}
                onChange={(e) => {
                  soundFx.playClick();
                  setOperatorRole(e.target.value);
                  showNotification(`Role changed to ${e.target.value}`);
                }}
                className="w-full h-10 field px-3 text-xs text-white bg-[#0B0F14]"
              >
                <option value="Incident Commander">Incident Commander (Full Override)</option>
                <option value="District Magistrate">District Magistrate (CAP Broadcast Authorizer)</option>
                <option value="NDRF Battalion Chief">NDRF Battalion Chief (Fleet Logistics)</option>
                <option value="Hydrology Specialist">Hydrology Specialist (Sensor Telemetry)</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Station:</span>
                <span className="text-slate-200">Dindigul EOC Room 01</span>
              </div>
              <div className="flex justify-between">
                <span>Digital Signature:</span>
                <span className="text-cyan-400">RSA-4096 VALID</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry Polling Rate & System Telemetry */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Telemetry Sync Cadence</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">STREAM ACTIVE</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Polling Interval</label>
              <select
                value={refreshInterval}
                onChange={(e) => {
                  soundFx.playClick();
                  setRefreshInterval(e.target.value);
                  showNotification(`Telemetry polling set to ${e.target.value}`);
                }}
                className="w-full h-10 field px-3 text-xs text-white bg-[#0B0F14]"
              >
                <option value="5s">Every 5 Seconds (Real-time Drill)</option>
                <option value="15s">Every 15 Seconds (Standard Operations)</option>
                <option value="60s">Every 60 Seconds (Low Bandwidth)</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Frontend Engine:</span>
                <span className="text-cyan-400">React 18 + Vite 5 HMR</span>
              </div>
              <div className="flex justify-between">
                <span>Map Provider:</span>
                <span className="text-emerald-400">CARTO Dark Tiles + Leaflet</span>
              </div>
              <div className="flex justify-between">
                <span>Audio Engine:</span>
                <span className="text-amber-300">Web Audio API Dual Synth</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
