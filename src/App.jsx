import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import OverviewView from './views/OverviewView';
import MapView from './views/MapView';
import IncidentsView from './views/IncidentsView';
import AlertsView from './views/AlertsView';
import ReportsView from './views/ReportsView';
import ResourcesView from './views/ResourcesView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import IncidentDetailModal from './components/modals/IncidentDetailModal';
import { Keyboard, X } from 'lucide-react';
import {
  INITIAL_INCIDENTS,
  RISK_ZONES,
  INITIAL_ALERTS,
  INITIAL_REPORTS,
  RESPONSE_UNITS,
  SHELTERS,
  HOURLY_TIMELINE_DATA,
  RECENT_ACTIVITY_FEED,
  DINDIGUL_CENTER
} from './data/mockData';
import { soundFx } from './utils/audio';

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Dindigul');
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [operatorRole, setOperatorRole] = useState('Incident Commander');
  const [mapCenter, setMapCenter] = useState(DINDIGUL_CENTER);

  // Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('disaster_theme');
      return saved ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('disaster_theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'light') {
        document.documentElement.classList.add('theme-light');
        document.documentElement.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      } else {
        document.documentElement.classList.add('theme-dark');
        document.documentElement.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Modal State
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);

  // Operational State with localStorage persistence
  const [incidents, setIncidents] = useState(() => {
    try {
      const saved = localStorage.getItem('disaster_incidents');
      return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
    } catch {
      return INITIAL_INCIDENTS;
    }
  });

  const [alerts, setAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('disaster_alerts');
      return saved ? JSON.parse(saved) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  });

  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('disaster_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [responseUnits, setResponseUnits] = useState(() => {
    try {
      const saved = localStorage.getItem('disaster_units');
      return saved ? JSON.parse(saved) : RESPONSE_UNITS;
    } catch {
      return RESPONSE_UNITS;
    }
  });

  const [shelters, setShelters] = useState(() => {
    try {
      const saved = localStorage.getItem('disaster_shelters');
      return saved ? JSON.parse(saved) : SHELTERS;
    } catch {
      return SHELTERS;
    }
  });

  const [recentActivities, setRecentActivities] = useState(RECENT_ACTIVITY_FEED);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('disaster_incidents', JSON.stringify(incidents));
    } catch (e) {
      console.error(e);
    }
  }, [incidents]);

  useEffect(() => {
    try {
      localStorage.setItem('disaster_alerts', JSON.stringify(alerts));
    } catch (e) {
      console.error(e);
    }
  }, [alerts]);

  useEffect(() => {
    try {
      localStorage.setItem('disaster_reports', JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem('disaster_units', JSON.stringify(responseUnits));
    } catch (e) {
      console.error(e);
    }
  }, [responseUnits]);

  useEffect(() => {
    try {
      localStorage.setItem('disaster_shelters', JSON.stringify(shelters));
    } catch (e) {
      console.error(e);
    }
  }, [shelters]);

  // Adjust center when location selector changes
  useEffect(() => {
    if (selectedLocation === 'Dindigul') setMapCenter(DINDIGUL_CENTER);
    else if (selectedLocation === 'Anna Nagar') setMapCenter([10.3690, 77.9780]);
    else if (selectedLocation === 'Sirumalai') setMapCenter([10.2200, 77.9950]);
    else if (selectedLocation === 'Kamarajar Dam') setMapCenter([10.2800, 77.8900]);
    else if (selectedLocation === 'Madurai') setMapCenter([9.9252, 78.1198]);
  }, [selectedLocation]);

  // Global Keyboard Navigation (1-8 for tabs, M for mute, ? for hotkeys helper, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        soundFx.playClick();
        setShowShortcutsModal(prev => !prev);
      } else if (e.key === 'Escape') {
        setSelectedIncident(null);
        setShowShortcutsModal(false);
      } else if (e.key === '1') {
        soundFx.playClick();
        setActiveTab('overview');
      } else if (e.key === '2') {
        soundFx.playClick();
        setActiveTab('map');
      } else if (e.key === '3') {
        soundFx.playClick();
        setActiveTab('incidents');
      } else if (e.key === '4') {
        soundFx.playClick();
        setActiveTab('alerts');
      } else if (e.key === '5') {
        soundFx.playClick();
        setActiveTab('reports');
      } else if (e.key === '6') {
        soundFx.playClick();
        setActiveTab('resources');
      } else if (e.key === '7') {
        soundFx.playClick();
        setActiveTab('analytics');
      } else if (e.key === '8') {
        soundFx.playClick();
        setActiveTab('settings');
      } else if (e.key === 'm' || e.key === 'M') {
        setSoundEnabled(prev => {
          const next = !prev;
          soundFx.toggleSound(next);
          if (next) soundFx.playRadarBeep();
          return next;
        });
      } else if (e.key === 't' || e.key === 'T') {
        soundFx.playClick();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action Handlers
  const addActivity = (text, type = 'ai') => {
    setRecentActivities(prev => [
      { id: Date.now(), time: 'Just now', type, text },
      ...prev.slice(0, 15)
    ]);
  };

  const handleAddNewIncident = (newInc) => {
    setIncidents(prev => [newInc, ...prev]);
    addActivity(`New incident logged: ${newInc.id} (${newInc.title})`, 'incident');
  };

  const handleUpdateIncidentStatus = (id, newStatus) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc));
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident(prev => ({ ...prev, status: newStatus }));
    }
    addActivity(`Incident ${id} status updated to ${newStatus.toUpperCase()}`, 'incident');
  };

  const handleDispatchUnitToIncident = (incidentId, unitName) => {
    setIncidents(prev => prev.map(inc => {
      if (inc.id === incidentId && !inc.assignedUnits.includes(unitName)) {
        return { ...inc, assignedUnits: [...inc.assignedUnits, unitName] };
      }
      return inc;
    }));

    setResponseUnits(prev => prev.map(u => {
      if (u.name === unitName) {
        return { ...u, status: 'On Scene', currentAssignment: `${incidentId}: Active Mission` };
      }
      return u;
    }));

    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => ({
        ...prev,
        assignedUnits: prev.assignedUnits.includes(unitName) ? prev.assignedUnits : [...prev.assignedUnits, unitName]
      }));
    }

    addActivity(`Unit '${unitName}' dispatched to incident ${incidentId}`, 'unit');
  };

  const handleAddNewAlert = (newAlert) => {
    setAlerts(prev => [newAlert, ...prev]);
    addActivity(`CAP broadcast alert issued: ${newAlert.title}`, 'alert');
  };

  const handleToggleAcknowledgeAlert = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledgedByOperator: !a.acknowledgedByOperator } : a));
  };

  const handleVerifyReport = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Verified' } : r));
    addActivity(`Citizen report ${id} verified by operator`, 'report');
  };

  const handleRejectReport = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'Flagged' } : r));
    addActivity(`Citizen report ${id} flagged as false alarm`, 'report');
  };

  const handleEscalateReport = (rep) => {
    const newInc = {
      id: `INC-00${incidents.length + 1}`,
      title: `${rep.category} Escalation (${rep.location})`,
      location: rep.location,
      coordinates: rep.coordinates || [10.368, 77.978],
      severity: 'high',
      type: rep.category.toLowerCase().includes('flood') ? 'flood' :
            rep.category.toLowerCase().includes('landslide') ? 'landslide' : 'infrastructure',
      status: 'active',
      timeReported: 'Escalated just now',
      affectedCount: 800,
      trappedCount: 6,
      evacuatedCount: 0,
      rainfallRate: '60 mm/hr',
      aiConfidence: 92,
      aiDamageAssessment: `Rapid escalation from crowdsourced verification #${rep.id}. High hazard profile indicated.`,
      aiSuggestedAction: 'Deploy nearest quick response detachment and confirm perimeter.',
      assignedUnits: ['TN Fire & Rescue Unit 1'],
      contactPerson: rep.author,
      lastUpdate: 'Just now'
    };

    setIncidents(prev => [newInc, ...prev]);
    setReports(prev => prev.map(r => r.id === rep.id ? { ...r, assignedIncident: newInc.id } : r));
    addActivity(`Report ${rep.id} escalated to active incident ${newInc.id}`, 'incident');
    setActiveTab('incidents');
  };

  const handleSubmitReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);
    addActivity(`Incoming citizen report received from ${newReport.author}`, 'report');
  };

  const handleUpdateUnitStatus = (unitId, status) => {
    setResponseUnits(prev => prev.map(u => u.id === unitId ? { ...u, status } : u));
    addActivity(`Unit ${unitId} status updated to ${status}`, 'unit');
  };

  const handleUpdateShelterOccupancy = (shelterId, occupants) => {
    setShelters(prev => prev.map(s => s.id === shelterId ? { ...s, currentOccupants: occupants } : s));
  };

  const handleResetData = () => {
    setIncidents(INITIAL_INCIDENTS);
    setAlerts(INITIAL_ALERTS);
    setReports(INITIAL_REPORTS);
    setResponseUnits(RESPONSE_UNITS);
    setShelters(SHELTERS);
    localStorage.clear();
    addActivity('Simulation dataset reset to default baseline', 'system');
  };

  const handleInjectScenario = (scenarioType) => {
    if (scenarioType === 'flood_surge') {
      soundFx.playCriticalAlert();
      setIncidents(prev => prev.map(inc => {
        if (inc.id === 'INC-001') {
          return {
            ...inc,
            affectedCount: inc.affectedCount + 850,
            trappedCount: inc.trappedCount + 18,
            waterLevel: '2.10m (SURGING)',
            aiDamageAssessment: 'CRITICAL RUNOFF SPIKE: Upstream irrigation tank breached. Residential ground floors submerged > 2.0m.'
          };
        }
        return inc;
      }));
      addActivity('SIMULATION SCENARIO: Flash flood surge triggered in Anna Nagar basin', 'ai');
      setActiveTab('overview');
    } else if (scenarioType === 'landslide_block') {
      soundFx.playCriticalAlert();
      setIncidents(prev => prev.map(inc => {
        if (inc.id === 'INC-003') {
          return {
            ...inc,
            trappedCount: inc.trappedCount + 14,
            soilSaturation: '99% (LIQUEFACTION REACHED)',
            aiDamageAssessment: 'SECONDARY SLOPE FAILURE: 140m road section blocked at Hairpin 13. Heavy earthmovers urgently required.'
          };
        }
        return inc;
      }));
      addActivity('SIMULATION SCENARIO: Secondary landslide triggered on Sirumalai Ghat Road', 'ai');
      setActiveTab('overview');
    }
  };

  const handleNavigateToMapWithIncident = (coords, inc) => {
    setMapCenter(coords);
    setSelectedIncident(inc);
    setActiveTab('map');
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-200 ${theme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#0B0F14] text-slate-100'}`}>
      {/* 58px Sticky Command Header */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        alerts={alerts}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        operatorRole={operatorRole}
        setOperatorRole={setOperatorRole}
        onSelectAlert={(alt) => {
          setActiveTab('alerts');
        }}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Workspace Layout with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          counts={{
            incidentsCount: incidents.length,
            alertsCount: alerts.filter(a => !a.acknowledgedByOperator).length,
            reportsCount: reports.length,
            unitsCount: responseUnits.length
          }}
        />

        {/* View Content Canvas */}
        <main className="flex-1 overflow-y-auto px-5 sm:px-6 lg:px-8 py-5">
          {activeTab === 'overview' && (
            <OverviewView
              incidents={incidents}
              riskZones={RISK_ZONES}
              responseUnits={responseUnits}
              alerts={alerts}
              reports={reports}
              timelineData={HOURLY_TIMELINE_DATA}
              recentActivities={recentActivities}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
              onSelectAlert={() => setActiveTab('alerts')}
              onNavigateTab={setActiveTab}
              mapCenter={mapCenter}
              theme={theme}
            />
          )}

          {activeTab === 'map' && (
            <MapView
              incidents={incidents}
              riskZones={RISK_ZONES}
              responseUnits={responseUnits}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
              selectedIncident={selectedIncident}
              mapCenter={mapCenter}
              setMapCenter={setMapCenter}
              theme={theme}
            />
          )}

          {activeTab === 'incidents' && (
            <IncidentsView
              incidents={incidents}
              onSelectIncident={(inc) => setSelectedIncident(inc)}
              onAddNewIncident={handleAddNewIncident}
              onUpdateStatus={handleUpdateIncidentStatus}
              onNavigateToMap={handleNavigateToMapWithIncident}
            />
          )}

          {activeTab === 'alerts' && (
            <AlertsView
              alerts={alerts}
              onAddNewAlert={handleAddNewAlert}
              onToggleAcknowledge={handleToggleAcknowledgeAlert}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsView
              reports={reports}
              onVerifyReport={handleVerifyReport}
              onRejectReport={handleRejectReport}
              onEscalateReport={handleEscalateReport}
              onSubmitReport={handleSubmitReport}
            />
          )}

          {activeTab === 'resources' && (
            <ResourcesView
              responseUnits={responseUnits}
              shelters={shelters}
              onUpdateUnitStatus={handleUpdateUnitStatus}
              onUpdateShelterOccupancy={handleUpdateShelterOccupancy}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              incidents={incidents}
              reports={reports}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              soundEnabled={soundEnabled}
              setSoundEnabled={setSoundEnabled}
              onResetData={handleResetData}
              onInjectScenario={handleInjectScenario}
              operatorRole={operatorRole}
              setOperatorRole={setOperatorRole}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </main>
      </div>

      {/* Global Incident Dossier Modal */}
      {selectedIncident && (
        <IncidentDetailModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
          onUpdateStatus={handleUpdateIncidentStatus}
          onDispatchUnit={handleDispatchUnitToIncident}
          availableUnits={responseUnits}
        />
      )}

      {/* Floating Hotkeys Trigger Button */}
      <button
        onClick={() => {
          soundFx.playClick();
          setShowShortcutsModal(true);
        }}
        className="fixed bottom-4 right-4 z-40 px-3 py-1.5 rounded-full bg-[#0B0F14]/90 hover:bg-[#0B0F14] border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-white backdrop-blur-md shadow-xl text-xs font-mono flex items-center gap-2 transition"
        title="Keyboard Shortcuts (?)"
      >
        <span className="w-4 h-4 rounded bg-white/10 border border-white/15 text-[10px] flex items-center justify-center font-bold text-cyan-300">
          ?
        </span>
        <span className="hidden sm:inline">Hotkeys</span>
      </button>

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="panel max-w-md w-full p-6 shadow-2xl relative border-white/20">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <Keyboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Tactical Hotkeys</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Rapid command-center keyboard navigation</p>
                </div>
              </div>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mt-4 text-xs">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  View Navigation
                </span>
                <div className="grid grid-cols-2 gap-2 font-mono">
                  {[
                    { key: '1', label: 'Overview' },
                    { key: '2', label: 'Disaster Map' },
                    { key: '3', label: 'Incidents' },
                    { key: '4', label: 'Alerts (CAP)' },
                    { key: '5', label: 'Reports' },
                    { key: '6', label: 'Resources' },
                    { key: '7', label: 'Analytics' },
                    { key: '8', label: 'Settings' }
                  ].map(s => (
                    <div
                      key={s.key}
                      className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between"
                    >
                      <span className="text-slate-300 font-sans">{s.label}</span>
                      <kbd className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px] font-bold">
                        {s.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  System Controls
                </span>
                <div className="space-y-2 font-mono">
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-300 font-sans">Toggle Audio Telemetry</span>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px] font-bold">
                      M
                    </kbd>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-300 font-sans">Toggle Light / Dark Theme</span>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px] font-bold">
                      T
                    </kbd>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-300 font-sans">Toggle Hotkeys Helper</span>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px] font-bold">
                      ?
                    </kbd>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                    <span className="text-slate-300 font-sans">Dismiss Open Modal</span>
                    <kbd className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-white/15 text-[11px] font-bold">
                      ESC
                    </kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
