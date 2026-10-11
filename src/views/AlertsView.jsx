import React, { useState } from 'react';
import {
  BellRing,
  Radio,
  Plus,
  AlertTriangle,
  Send,
  CheckCircle,
  Volume2,
  VolumeX,
  Smartphone,
  Wifi,
  Megaphone,
  RadioTower,
  ShieldCheck,
  Check,
  X,
  Flame,
  Waves,
  Mountain,
  Zap,
  Info
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Card, Badge, Button } from '../components/ui/CommandComponents';

const BROADCAST_PRESETS = [
  {
    title: 'RED ALERT: Immediate Evacuation of Begambur Lowlands',
    category: 'HYDROLOGICAL',
    severity: 'critical',
    audience: 'Begambur Lowlands & Riverfront',
    message: 'Water levels approaching critical crest (+2.4m). Immediate evacuation ordered to Municipal College Hall. Emergency NDRF units staging at Bypass Junction.',
    channels: ['Cell Broadcast', 'CAP SMS', 'Municipal Siren']
  },
  {
    title: 'AMBER WARNING: Sirumalai Ghat Mudslide Advisory',
    category: 'GEOTECHNICAL',
    severity: 'high',
    audience: 'Sirumalai Ghat Pass Hairpin 7-14',
    message: 'High slope saturation detected (88%). Debris flows reported near Hairpin 11. Vehicle transit restricted to emergency services only.',
    channels: ['Cell Broadcast', 'FM Radio Relay']
  },
  {
    title: 'DAM ADVISORY: Kamarajar Sagar Sluice Discharge Spiked',
    category: 'METEOROLOGICAL',
    severity: 'high',
    audience: 'Sanarpatti & Downstream Basin',
    message: 'Inflow at 12,400 cusecs. Sluice gate #3 opened to 85%. Downstream riverbed residents must move cattle and personnel to elevated ground.',
    channels: ['CAP SMS', 'Radio Tower Relay', 'Municipal Siren']
  },
  {
    title: 'ELECTRICAL HAZARD: High-Tension Grid De-energized',
    category: 'INFRASTRUCTURE',
    severity: 'moderate',
    audience: 'Anna Nagar Ward 4 & Market Area',
    message: 'Submerged transformer cluster isolated for citizen safety. Power grid offline until flood receding inspection confirms dry insulator status.',
    channels: ['CAP SMS', 'Push Notification']
  }
];

export default function AlertsView({
  alerts = [],
  onAddNewAlert = () => {},
  onToggleAcknowledge = () => {}
}) {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newSeverity, setNewSeverity] = useState('critical');
  const [newCategory, setNewCategory] = useState('METEOROLOGICAL');
  const [newAudience, setNewAudience] = useState('Dindigul Urban Taluk');
  const [selectedChannels, setSelectedChannels] = useState(['Cell Broadcast', 'CAP SMS']);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const toggleChannel = (ch) => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter(c => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleApplyPreset = (preset) => {
    soundFx.playClick();
    setNewTitle(preset.title);
    setNewMessage(preset.message);
    setNewSeverity(preset.severity);
    setNewCategory(preset.category);
    setNewAudience(preset.audience);
    setSelectedChannels(preset.channels);
  };

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    soundFx.playCriticalAlert();

    const createdAlert = {
      id: `ALT-90${alerts.length + 1}`,
      severity: newSeverity,
      category: newCategory,
      title: newTitle,
      message: newMessage || 'Immediate protective action advisory issued by District Disaster Command.',
      issuedAt: 'Just now (Simulated Broadcast)',
      targetAudience: newAudience,
      channels: selectedChannels,
      status: 'Broadcasting',
      acknowledgedByOperator: true
    };

    onAddNewAlert(createdAlert);
    setBroadcastSuccess(true);

    setTimeout(() => {
      setBroadcastSuccess(false);
      setShowBroadcastModal(false);
      setNewTitle('');
      setNewMessage('');
    }, 1400);
  };

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'all') return true;
    return a.severity === filterSeverity;
  });

  const criticalCount = alerts.filter(a => a.severity === 'critical').length;
  const acknowledgedCount = alerts.filter(a => a.acknowledgedByOperator).length;
  const ackRate = alerts.length ? Math.round((acknowledgedCount / alerts.length) * 100) : 100;

  return (
    <div className="space-y-6 animate-in fade-in pb-12 max-w-[1720px] mx-auto">
      {/* Header Banner */}
      <div className="panel p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Common Alerting Protocol (CAP) Broadcast Matrix
                </h2>
                <Badge variant="red" size="sm" pulse={true}>
                  SIREN CHANNELS LIVE
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-channel emergency broadcast system: Cell Broadcast (WEA), CAP SMS, Radio FM relays & Municipal acoustic sirens.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            icon={Volume2}
            onClick={() => {
              soundFx.playCriticalAlert();
            }}
            title="Test alert tone"
          >
            Auditory Test
          </Button>
          <Button
            variant="primary"
            icon={RadioTower}
            onClick={() => {
              soundFx.playClick();
              setShowBroadcastModal(true);
            }}
          >
            Issue Emergency Broadcast
          </Button>
        </div>
      </div>

      {/* KPI Telemetry Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Active Broadcasts</span>
            <div className="text-2xl font-bold font-mono text-white mt-1">{alerts.length}</div>
            <span className="text-[11px] text-cyan-400 font-mono mt-0.5 block">14 Cell Towers Active</span>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400">
            <RadioTower className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Critical Sirens</span>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1">{criticalCount}</div>
            <span className="text-[11px] text-rose-400/80 font-mono mt-0.5 block">High urgency alerts</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400">
            <BellRing className="w-5 h-5 animate-bounce" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Target Population</span>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-1">142,800</div>
            <span className="text-[11px] text-amber-400/80 font-mono mt-0.5 block">Across 6 sub-taluks</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
            <Megaphone className="w-5 h-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Acknowledge Rate</span>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">{ackRate}%</div>
            <span className="text-[11px] text-emerald-400/80 font-mono mt-0.5 block">{acknowledgedCount} of {alerts.length} verified</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs font-mono">
          {[
            { id: 'all', label: 'All Feeds' },
            { id: 'critical', label: 'Critical Red' },
            { id: 'high', label: 'High Amber' },
            { id: 'moderate', label: 'Advisories' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                soundFx.playClick();
                setFilterSeverity(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterSeverity === tab.id
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CAP 1.2 OASIS Standard Gateway Synchronized</span>
        </div>
      </div>

      {/* Broadcast Stream Cards */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => {
          const isCritical = alert.severity === 'critical';
          const isHigh = alert.severity === 'high';

          return (
            <div
              key={alert.id}
              className={`panel relative p-5 transition-all duration-200 hover:border-white/20 ${
                isCritical
                  ? 'border-rose-500/30 bg-rose-500/[0.03]'
                  : isHigh
                  ? 'border-amber-500/30 bg-amber-500/[0.02]'
                  : ''
              }`}
            >
              {/* Left Color Stripe */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${
                  isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-400' : 'bg-cyan-400'
                }`}
              />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pl-1">
                <div className="space-y-2.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                      {alert.id}
                    </span>
                    <Badge variant={isCritical ? 'red' : isHigh ? 'amber' : 'neutral'} size="sm" pulse={isCritical}>
                      {alert.category || 'CIVIL PROTECTION'}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">Issued: {alert.issuedAt}</span>
                    <span className="text-xs text-slate-400">
                      • Target: <strong className="text-slate-200">{alert.targetAudience}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight flex items-center gap-2">
                    {isCritical && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
                    {alert.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{alert.message}</p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {alert.channels?.map(ch => (
                      <span
                        key={ch}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
                      >
                        <Radio className="w-3 h-3 text-cyan-400" />
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 pt-2 md:pt-0">
                  <button
                    onClick={() => {
                      if (isCritical) soundFx.playCriticalAlert();
                      else soundFx.playRadarBeep();
                    }}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition"
                    title="Play Siren Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  <Button
                    variant={alert.acknowledgedByOperator ? 'ghost' : 'cyan'}
                    size="sm"
                    onClick={() => {
                      soundFx.playClick();
                      onToggleAcknowledge(alert.id);
                    }}
                  >
                    {alert.acknowledgedByOperator ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Acknowledged</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Acknowledge Alert</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Broadcast Creation Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="panel max-w-xl w-full p-6 shadow-2xl relative border-white/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                  <RadioTower className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">CAP Siren & Cell Broadcast</h3>
                  <p className="text-xs text-slate-400 mt-0.5">High-priority emergency warning transmission</p>
                </div>
              </div>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {broadcastSuccess ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-base font-bold text-white">Broadcast Successfully Dispatched</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Signal relay transmitted to 14 cell towers and 6 municipal outdoor acoustic sirens.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBroadcastSubmit} className="space-y-4 mt-4">
                {/* Quick Presets */}
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                    Quick Scenario Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {BROADCAST_PRESETS.map(p => (
                      <button
                        type="button"
                        key={p.title}
                        onClick={() => handleApplyPreset(p)}
                        className="p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-left transition text-xs"
                      >
                        <div className="font-semibold text-slate-200 truncate">{p.category}</div>
                        <div className="text-[11px] text-slate-400 truncate">{p.title}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Alert Headline</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. FLASH FLOOD RED ALERT: Immediate Evacuation of Begambur Lowlands"
                    className="w-full h-10 field px-3 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Directive Message</label>
                  <textarea
                    rows={3}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Provide specific instructions, safe assembly shelters and emergency helpline..."
                    className="w-full field p-3 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Severity Tier</label>
                    <select
                      value={newSeverity}
                      onChange={(e) => setNewSeverity(e.target.value)}
                      className="w-full h-10 field px-3 text-xs text-white bg-[#0B0F14]"
                    >
                      <option value="critical">Critical (Red Siren)</option>
                      <option value="high">High (Amber Warning)</option>
                      <option value="moderate">Advisory (Notice)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Target Sector</label>
                    <input
                      type="text"
                      value={newAudience}
                      onChange={(e) => setNewAudience(e.target.value)}
                      className="w-full h-10 field px-3 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Delivery Channels</label>
                  <div className="flex flex-wrap gap-2">
                    {['Cell Broadcast', 'CAP SMS', 'Radio FM Relay', 'Municipal Siren'].map(ch => (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition border ${
                          selectedChannels.includes(ch)
                            ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(34,211,238,0.2)]'
                            : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowBroadcastModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    icon={Send}
                  >
                    Transmit Emergency Broadcast
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
