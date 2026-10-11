import React from 'react';
import {
  LayoutDashboard, Map, FileSpreadsheet, BellRing,
  CheckCircle, Truck, BarChart3, Settings,
  ChevronLeft, ChevronRight, Cpu, X,
  AlertOctagon, Radio
} from 'lucide-react';
import { soundFx } from '../utils/audio';

const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',              icon: LayoutDashboard, badge: null },
  { id: 'map',        label: 'Live Disaster Map',      icon: Map,             badge: 'LIVE' },
  { id: 'incidents',  label: 'Incident Intelligence',  icon: FileSpreadsheet, badgeKey: 'incidentsCount' },
  { id: 'alerts',     label: 'Alerts & Broadcasts',    icon: BellRing,        badgeKey: 'alertsCount' },
  { id: 'reports',    label: 'Reports & Verification', icon: CheckCircle,     badgeKey: 'reportsCount' },
  { id: 'resources',  label: 'Resource Coordination',  icon: Truck,           badgeKey: 'unitsCount' },
  { id: 'analytics',  label: 'Analytics',              icon: BarChart3,       badge: null },
  { id: 'settings',   label: 'Settings',               icon: Settings,        badge: null },
];

export default function Sidebar({
  activeTab, setActiveTab,
  sidebarOpen, setSidebarOpen,
  isCollapsed, setIsCollapsed,
  counts = {}
}) {
  const handleNav = (id) => {
    soundFx.playClick();
    setActiveTab(id);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  };

  const SIDEBAR_W = isCollapsed ? '72px' : '240px';

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        style={{ width: SIDEBAR_W }}
        className={`
          fixed lg:sticky top-0 lg:top-[58px]
          left-0 h-full lg:h-[calc(100vh-58px)]
          bg-[#0B0F14]/94 backdrop-blur-2xl
          border-r border-white/[0.07]
          z-50 lg:z-20
          flex flex-col justify-between
          transition-all duration-300 ease-spring shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Top Nav Section */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Mobile header row */}
          <div className="flex items-center justify-between lg:hidden px-3.5 pt-4 pb-3 border-b border-white/[0.07]">
            <span className="text-[10px] font-mono font-semibold text-cyan-400 tracking-widest uppercase">
              Navigation
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Desktop collapse control */}
          <div className="hidden lg:flex justify-end px-3 pt-3">
            <button
              onClick={() => { soundFx.playClick(); setIsCollapsed(!isCollapsed); }}
              title={isCollapsed ? 'Expand' : 'Collapse'}
              className="w-7 h-7 flex items-center justify-center rounded-lg
                         bg-white/[0.04] border border-white/[0.08]
                         text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30
                         transition"
            >
              {isCollapsed
                ? <ChevronRight className="w-3.5 h-3.5" />
                : <ChevronLeft  className="w-3.5 h-3.5" />
              }
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-2.5 mt-2 pb-4 space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const badge = item.badge || (item.badgeKey && counts[item.badgeKey]) || null;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`
                    w-full flex items-center gap-3
                    px-3 py-2.5 rounded-xl
                    text-[13px] font-medium
                    border transition-all duration-150
                    relative group
                    ${isActive
                      ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25 shadow-[0_0_16px_-4px_rgba(34,211,238,0.2)]'
                      : 'text-slate-400 border-transparent hover:bg-white/[0.04] hover:text-slate-200 hover:border-white/[0.06]'
                    }
                  `}
                >
                  {/* Active left indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full
                                     bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  )}

                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500 group-hover:text-slate-300'} transition`} />

                  {!isCollapsed && (
                    <span className="flex-1 text-left truncate font-sans">
                      {item.label}
                    </span>
                  )}

                  {/* Badge */}
                  {!isCollapsed && badge && (
                    <span className={`shrink-0 min-w-[20px] text-center text-[10px] font-mono font-bold
                                     px-1.5 py-0.5 rounded-full border ${
                      item.id === 'alerts'
                        ? 'bg-red-500/15 text-red-300 border-red-500/25'
                        : item.id === 'map'
                        ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25'
                        : 'bg-white/6 text-slate-400 border-white/10'
                    }`}>
                      {badge}
                    </span>
                  )}

                  {/* Collapsed dot indicator */}
                  {isCollapsed && badge && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full
                                     bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom AI Status Panel */}
        <div className="p-3 border-t border-white/[0.07] shrink-0">
          {!isCollapsed ? (
            <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.07]
                            hover:border-violet-500/25 transition space-y-2.5 group cursor-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-violet-500/12 text-violet-400 border border-violet-500/25">
                    <Cpu className="w-3 h-3" />
                  </div>
                  <span className="text-xs font-semibold text-slate-200">AI Sentinel</span>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Synthesizing satellite SAR passes & SCADA telemetry feeds.
              </p>

              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06] text-[11px] font-mono">
                <span className="text-slate-500">Confidence</span>
                <span className="text-emerald-400 font-bold">96.8%</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-2" title="AI Sentinel Active">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
