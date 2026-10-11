import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Search,
  Bell,
  MapPin,
  Clock,
  Volume2,
  VolumeX,
  Menu,
  X,
  AlertCircle,
  ChevronDown,
  CheckCircle2,
  Radio,
  Wifi,
  Sun,
  Moon
} from 'lucide-react';
import { soundFx } from '../utils/audio';
import { Badge } from './ui/CommandComponents';

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  selectedLocation,
  setSelectedLocation,
  alerts = [],
  onSearch = () => {},
  searchQuery = '',
  soundEnabled = true,
  setSoundEnabled = () => {},
  operatorRole = 'Incident Commander',
  setOperatorRole = () => {},
  onSelectAlert = () => {},
  theme = 'dark',
  toggleTheme = () => {}
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unacknowledgedCount = alerts.filter(a => !a.acknowledgedByOperator).length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const formatTime = (date) => date.toLocaleTimeString('en-US', {
    hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
  });

  return (
    <header
      style={{ height: '58px' }}
      className="sticky top-0 z-40 flex items-center justify-between gap-4 px-4 sm:px-6
                 bg-[#0B0F14]/92 backdrop-blur-xl border-b border-white/[0.07]
                 shadow-[0_1px_0_rgba(255,255,255,0.04),0_4px_30px_rgba(0,0,0,0.5)]"
    >
      {/* ─── LEFT: Hamburger + Brand ────────────────────── */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Mobile hamburger */}
        <button
          onClick={() => { soundFx.playClick(); setSidebarOpen(!sidebarOpen); }}
          className="header-btn lg:hidden"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2.5">
          {/* Logo icon */}
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl
                          bg-gradient-to-br from-red-600 via-red-500 to-orange-500
                          border border-white/15 shadow-[0_0_16px_rgba(239,68,68,0.4)]
                          shrink-0">
            <ShieldAlert className="w-4.5 h-4.5 text-white" style={{ width: '18px', height: '18px' }} />
            {/* Live indicator */}
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
          </div>

          <div className="hidden sm:block">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[15px] font-bold tracking-tight text-white leading-none font-sans">
                DISASTER INTELLIGENCE
              </h1>
            </div>
            <p className="text-[10px] font-mono tracking-[0.12em] text-cyan-400/80 mt-0.5">
              AI COMMAND CENTER · DDMA HQ
            </p>
          </div>

          {/* Mobile title */}
          <h1 className="sm:hidden text-sm font-bold text-white">DI</h1>
        </div>

        {/* Level 3 Emergency badge - desktop */}
        <Badge variant="red" size="sm" pulse className="hidden lg:inline-flex">
          LEVEL 3 EMERGENCY
        </Badge>
      </div>

      {/* ─── CENTER: Global Search ──────────────────────── */}
      <div className="hidden md:flex flex-1 max-w-md mx-2">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search incidents, sectors, units, alerts…"
            className="field pl-9 pr-8 h-9 text-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ─── RIGHT: Controls cluster ─────────────────────── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Location selector */}
        <div className="hidden xl:flex items-center header-control gap-2">
          <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <select
            value={selectedLocation}
            onChange={(e) => { soundFx.playClick(); setSelectedLocation(e.target.value); }}
            className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer pr-1 font-sans"
          >
            <option value="Dindigul" className="bg-[#0B0F14]">Dindigul (Core)</option>
            <option value="Anna Nagar" className="bg-[#0B0F14]">Anna Nagar (Flood)</option>
            <option value="Sirumalai" className="bg-[#0B0F14]">Sirumalai (Landslide)</option>
            <option value="Kamarajar Dam" className="bg-[#0B0F14]">Kamarajar Dam</option>
            <option value="Madurai" className="bg-[#0B0F14]">Madurai Corridor</option>
          </select>
        </div>

        {/* Sound toggle */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            soundFx.toggleSound(next);
            if (next) soundFx.playRadarBeep();
          }}
          className={`header-btn ${soundEnabled
            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 shadow-[0_0_12px_-2px_rgba(34,211,238,0.3)]'
            : ''
          }`}
          title={soundEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Theme toggle */}
        <button
          onClick={() => {
            soundFx.playClick();
            toggleTheme();
          }}
          className={`header-btn transition-colors ${
            theme === 'light'
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-500 shadow-[0_0_12px_-2px_rgba(245,158,11,0.3)]'
              : 'hover:text-amber-400'
          }`}
          title={theme === 'dark' ? 'Switch to Light Mode (T)' : 'Switch to Dark Mode (T)'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { soundFx.playClick(); setShowNotifications(!showNotifications); }}
            className="header-btn relative"
            aria-label="Alerts"
          >
            <Bell className="w-4 h-4" />
            {unacknowledgedCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-0.5 items-center justify-center
                               rounded-full bg-red-500 text-[9px] font-mono font-bold text-white
                               shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse">
                {unacknowledgedCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 glass border border-white/10
                            p-3 z-50 shadow-2xl animate-fade-in"
                 style={{ animation: 'fadeIn 0.15s ease-out' }}>
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold text-white">Broadcast Alerts</span>
                </div>
                <span className="badge badge-critical text-[10px] px-2 py-0.5">
                  {unacknowledgedCount} PENDING
                </span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    onClick={() => { onSelectAlert(alert); setShowNotifications(false); }}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                      alert.severity === 'critical'
                        ? 'bg-red-500/8 border-red-500/25 hover:bg-red-500/12'
                        : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`badge text-[9px] px-1.5 py-0.5 ${
                        alert.severity === 'critical' ? 'badge-critical' : 'badge-moderate'
                      }`}>{alert.category}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{alert.issuedAt}</span>
                    </div>
                    <div className="font-semibold text-slate-200 text-xs leading-snug">{alert.title}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{alert.message}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2.5 mt-2 border-t border-white/[0.08] flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                  <Wifi className="w-3 h-3 text-emerald-400" />
                  All nodes synced
                </div>
                <span className="text-cyan-400 font-mono font-semibold">CAP 1.2</span>
              </div>
            </div>
          )}
        </div>

        {/* Clock */}
        <div className="hidden lg:flex items-center header-control gap-2 font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-cyan-300 font-semibold tabular-nums">{formatTime(currentTime)}</span>
          <span className="text-slate-600 text-[10px]">IST</span>
        </div>

        {/* Operator profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { soundFx.playClick(); setShowProfileMenu(!showProfileMenu); }}
            className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-lg
                       bg-white/[0.04] border border-white/[0.08]
                       hover:border-cyan-500/25 hover:bg-white/[0.07]
                       transition text-left"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500
                            flex items-center justify-center font-bold text-white text-[11px]">
              OP
            </div>
            <div className="hidden sm:block">
              <div className="text-[11px] font-semibold text-slate-200 leading-tight">DEMO OPS</div>
              <div className="text-[9px] font-mono text-cyan-400 leading-tight">{operatorRole}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-500 ml-0.5" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 glass border border-white/10 p-2 z-50
                            shadow-2xl"
                 style={{ animation: 'fadeIn 0.15s ease-out' }}>
              <div className="px-2 py-1.5 border-b border-white/[0.08] mb-2">
                <div className="text-xs font-bold text-white">DDMA Command HQ</div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  AUTH LEVEL 4 · SECURE
                </div>
              </div>

              <div className="text-[9px] font-mono text-slate-500 uppercase px-2 mb-1.5 tracking-wider">
                Switch role
              </div>

              {['Incident Commander', 'GIS Specialist', 'NDRF Coordinator'].map((role) => (
                <button
                  key={role}
                  onClick={() => { soundFx.playClick(); setOperatorRole(role); setShowProfileMenu(false); }}
                  className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs
                              transition ${
                    operatorRole === role
                      ? 'bg-cyan-500/12 text-cyan-300 font-semibold border border-cyan-500/25'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {role}
                  {operatorRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
