import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  Layers,
  Eye,
  EyeOff,
  AlertTriangle,
  Waves,
  Wind,
  Mountain,
  Compass,
  Zap,
  Truck,
  Plus,
  Minus,
  Maximize2
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

// Pan & Zoom Map Helper
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 13, {
        duration: 1.2,
        easeLinearity: 0.25
      });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom Glass Floating Zoom Controls
function MapZoomControls() {
  const map = useMap();
  return (
    <div className="absolute bottom-6 left-4 z-[1000] flex flex-col gap-1.5">
      <button
        onClick={() => {
          soundFx.playClick();
          map.zoomIn();
        }}
        className="w-9 h-9 rounded-xl bg-[#070B14]/80 hover:bg-[#070B14] backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition shadow-lg hover:border-cyan-400/50"
        title="Zoom In"
        aria-label="Zoom In"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={() => {
          soundFx.playClick();
          map.zoomOut();
        }}
        className="w-9 h-9 rounded-xl bg-[#070B14]/80 hover:bg-[#070B14] backdrop-blur-md border border-white/10 text-white flex items-center justify-center transition shadow-lg hover:border-cyan-400/50"
        title="Zoom Out"
        aria-label="Zoom Out"
      >
        <Minus className="w-4 h-4" />
      </button>
    </div>
  );
}

// Custom SVG DivIcon for Leaflet markers: glowing circular pins with severity colors and pulsing rings
const createCustomMarkerIcon = (severity, type, isSelected = false) => {
  let color = '#F43F5E'; // Red default
  let glowColor = 'rgba(244, 63, 94, 0.7)';
  let iconSvg = '🚨';

  if (severity === 'critical') {
    color = '#F43F5E';
    glowColor = 'rgba(244, 63, 94, 0.9)';
  } else if (severity === 'high') {
    color = '#F59E0B';
    glowColor = 'rgba(245, 158, 11, 0.8)';
  } else if (severity === 'moderate') {
    color = '#FBBF24';
    glowColor = 'rgba(251, 191, 36, 0.7)';
  } else if (severity === 'safe') {
    color = '#10B981';
    glowColor = 'rgba(16, 185, 129, 0.8)';
  }

  if (type === 'flood') iconSvg = '🌊';
  else if (type === 'landslide') iconSvg = '⛰️';
  else if (type === 'gale') iconSvg = '🌪️';
  else if (type === 'infrastructure') iconSvg = '⚡';
  else if (type === 'unit') iconSvg = '🚒';

  const size = isSelected ? 42 : 34;

  const html = `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${size}px;
      height: ${size}px;
      transform: translate(-50%, -50%);
    ">
      <!-- Pulsing Outer Ring -->
      <div style="
        position: absolute;
        inset: -4px;
        border-radius: 9999px;
        border: 2px solid ${color};
        opacity: ${isSelected ? '0.85' : '0.4'};
        animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
      "></div>
      
      <!-- Center Glowing Pin -->
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 9999px;
        background: #070B14;
        border: 2px solid ${color};
        box-shadow: 0 0 20px ${glowColor}, inset 0 0 10px rgba(0,0,0,0.8);
        font-size: ${isSelected ? '16px' : '13px'};
        cursor: pointer;
        transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      ">
        ${iconSvg}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

// Response Unit Marker
const createUnitIcon = (status) => {
  const isBusy = status === 'On Scene';
  const color = isBusy ? '#22D3EE' : '#10B981';
  const html = `
    <div style="
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      transform: translate(-50%, -50%);
    ">
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        background: #070B14;
        border: 1.5px solid ${color};
        box-shadow: 0 0 14px rgba(34, 211, 238, 0.45);
        font-size: 13px;
      ">
        🚑
      </div>
    </div>
  `;
  return L.divIcon({
    className: 'custom-unit-marker',
    html: html,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

export default function DisasterMap({
  incidents = [],
  riskZones = [],
  responseUnits = [],
  selectedIncident = null,
  onSelectIncident = () => {},
  mapCenter = [10.3673, 77.9803],
  zoom = 13,
  className = "h-[500px]",
  theme = 'dark'
}) {
  // Layer Toggles
  const [showFloods, setShowFloods] = useState(true);
  const [showLandslides, setShowLandslides] = useState(true);
  const [showGales, setShowGales] = useState(true);
  const [showInfra, setShowInfra] = useState(true);
  const [showRiskZones, setShowRiskZones] = useState(true);
  const [showUnits, setShowUnits] = useState(true);
  const [activeLayerPanel, setActiveLayerPanel] = useState(false);

  // Filtered Incidents based on active layers
  const visibleIncidents = incidents.filter(inc => {
    if (inc.type === 'flood' && !showFloods) return false;
    if (inc.type === 'landslide' && !showLandslides) return false;
    if (inc.type === 'gale' && !showGales) return false;
    if (inc.type === 'infrastructure' && !showInfra) return false;
    return true;
  });

  return (
    <div className={`relative w-full rounded-[20px] overflow-hidden border border-white/[0.08] bg-[#070B14] shadow-2xl ${className}`}>
      {/* Tactical Top Bar / Floating Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-wrap items-center gap-2">
        <div className="bg-[#070B14]/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs flex items-center gap-2.5 shadow-xl">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="font-mono text-cyan-400 font-semibold tracking-wider text-[11px]">
            GIS GRID
          </span>
          <span className="text-white/20">|</span>
          <span className="text-slate-300 font-mono text-[11px]">DINDIGUL TAMIL NADU</span>
          <span className="bg-cyan-500/15 text-cyan-300 px-2 py-0.5 rounded-full text-[10px] font-mono border border-cyan-500/30">
            {visibleIncidents.length} HAZARDS
          </span>
        </div>

        {/* Floating Layer Toggle Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            setActiveLayerPanel(!activeLayerPanel);
          }}
          className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-1.5 font-medium transition backdrop-blur-md shadow-xl ${
            activeLayerPanel
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
              : 'bg-[#070B14]/80 text-slate-300 border-white/10 hover:border-white/20'
          }`}
          title="Toggle Layers"
          aria-label="Toggle Map Layers"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Layers</span>
        </button>

        {/* Risk Zone Quick Switch */}
        <button
          onClick={() => {
            soundFx.playClick();
            setShowRiskZones(!showRiskZones);
          }}
          className={`px-3 py-2 rounded-xl border text-xs flex items-center gap-1.5 font-medium transition backdrop-blur-md shadow-xl ${
            showRiskZones
              ? 'bg-rose-500/15 text-rose-300 border-rose-500/35'
              : 'bg-[#070B14]/80 text-slate-400 border-white/10 line-through'
          }`}
          title="Toggle Danger Zones"
          aria-label="Toggle Risk Zones"
        >
          {showRiskZones ? <Eye className="w-3.5 h-3.5 text-rose-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
          <span>Risk Zones</span>
        </button>
      </div>

      {/* Layer Control Dropdown Floating Panel */}
      {activeLayerPanel && (
        <div className="absolute top-16 left-4 z-[1000] glass-panel border border-white/15 p-3.5 rounded-2xl shadow-2xl w-64 text-xs space-y-2.5 animate-in fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <span className="font-semibold text-slate-200 font-sans">Hazard Layers</span>
            <span className="text-[10px] text-cyan-400 font-mono">MAP FILTERS</span>
          </div>
          
          <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1.5 rounded-lg">
            <span className="flex items-center gap-2 text-slate-300">
              <Waves className="w-3.5 h-3.5 text-cyan-400" /> Flash Floods
            </span>
            <input
              type="checkbox"
              checked={showFloods}
              onChange={(e) => setShowFloods(e.target.checked)}
              className="rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1.5 rounded-lg">
            <span className="flex items-center gap-2 text-slate-300">
              <Mountain className="w-3.5 h-3.5 text-amber-500" /> Landslides & Slopes
            </span>
            <input
              type="checkbox"
              checked={showLandslides}
              onChange={(e) => setShowLandslides(e.target.checked)}
              className="rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1.5 rounded-lg">
            <span className="flex items-center gap-2 text-slate-300">
              <Wind className="w-3.5 h-3.5 text-rose-400" /> Gale & Storms
            </span>
            <input
              type="checkbox"
              checked={showGales}
              onChange={(e) => setShowGales(e.target.checked)}
              className="rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1.5 rounded-lg">
            <span className="flex items-center gap-2 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-yellow-400" /> Electrical / Grid
            </span>
            <input
              type="checkbox"
              checked={showInfra}
              onChange={(e) => setShowInfra(e.target.checked)}
              className="rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0"
            />
          </label>

          <div className="pt-2 border-t border-white/[0.08]">
            <label className="flex items-center justify-between cursor-pointer hover:bg-white/5 p-1.5 rounded-lg">
              <span className="flex items-center gap-2 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-emerald-400" /> Response Units (NDRF)
              </span>
              <input
                type="checkbox"
                checked={showUnits}
                onChange={(e) => setShowUnits(e.target.checked)}
                className="rounded bg-slate-900 border-white/20 text-cyan-400 focus:ring-0"
              />
            </label>
          </div>
        </div>
      )}

      {/* Simulated Demo Disclaimer Warning: Neat Amber Pill at Top-Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] hidden sm:flex items-center gap-2 bg-amber-500/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-amber-500/30 text-[11px] text-amber-300 font-mono shadow-xl">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>SIMULATED DEMO DATA</span>
      </div>

      {/* Map Legend Floating Card at Bottom-Right */}
      <div className="absolute bottom-6 right-4 z-[1000] bg-[#070B14]/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs shadow-2xl hidden md:block">
        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2 font-semibold">
          TACTICAL MAP LEGEND
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E]" />
            <span className="text-slate-300 text-[11px]">Critical Hazard Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            <span className="text-slate-300 text-[11px]">Moderate Risk Sector</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
            <span className="text-slate-300 text-[11px]">Safe Relief Corridor</span>
          </div>
          <div className="flex items-center gap-2 pt-1 border-t border-white/[0.08]">
            <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_8px_#22D3EE]" />
            <span className="text-slate-300 text-[11px]">Active Response Teams</span>
          </div>
        </div>
      </div>

      {/* Leaflet React Map Canvas */}
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        zoomControl={false}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <ChangeMapView center={mapCenter} zoom={zoom} />
        <MapZoomControls />

        {/* CARTO Basemap Tiles - Dynamic CARTO Dark vs Positron Light */}
        <TileLayer
          key={theme}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener noreferrer">CARTO</a>'
          url={
            theme === 'light'
              ? "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          }
          maxZoom={19}
        />

        {/* Risk Zones: Soft gradient circles with dashed borders */}
        {showRiskZones && riskZones.map(zone => (
          <Circle
            key={zone.id}
            center={zone.center}
            radius={zone.radius}
            pathOptions={{
              color: zone.type === 'critical' ? '#F43F5E' : zone.type === 'moderate' ? '#F59E0B' : '#10B981',
              fillColor: zone.type === 'critical' ? '#F43F5E' : zone.type === 'moderate' ? '#F59E0B' : '#10B981',
              fillOpacity: zone.type === 'critical' ? 0.16 : 0.12,
              weight: 1.5,
              dashArray: zone.type === 'critical' ? '6, 6' : '4, 4'
            }}
          >
            <Popup>
              <div className="p-3 space-y-2 min-w-[210px]">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                    zone.type === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    zone.type === 'moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {zone.threatLevel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{zone.id}</span>
                </div>
                <h4 className="font-semibold text-white text-sm">{zone.name}</h4>
                <p className="text-xs text-slate-300">{zone.description}</p>
                <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300 flex justify-between font-mono">
                  <span>At-Risk Population:</span>
                  <span className="text-cyan-400 font-semibold">
                    {zone.populationAtRisk ? `${zone.populationAtRisk.toLocaleString()}` : `${zone.populationCapacity?.toLocaleString()}`}
                  </span>
                </div>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Incident Glowing Pins */}
        {visibleIncidents.map(inc => {
          const isSelected = selectedIncident?.id === inc.id;
          return (
            <Marker
              key={inc.id}
              position={inc.coordinates}
              icon={createCustomMarkerIcon(inc.severity, inc.type, isSelected)}
              eventHandlers={{
                click: () => {
                  soundFx.playClick();
                  onSelectIncident(inc);
                }
              }}
            >
              <Popup>
                <div className="p-3 space-y-2.5 min-w-[250px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-cyan-300">
                      {inc.id}
                    </span>
                    <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                      inc.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      inc.severity === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white text-sm leading-snug">{inc.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{inc.location}</p>
                  </div>

                  <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5 text-[11px] space-y-1 font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Affected Count:</span>
                      <span className="text-amber-300 font-bold">{inc.affectedCount?.toLocaleString()}</span>
                    </div>
                    {inc.trappedCount > 0 && (
                      <div className="flex justify-between text-rose-300">
                        <span>Trapped / Urgent:</span>
                        <span className="text-rose-400 font-bold">{inc.trappedCount} individuals</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-400">
                      <span>Status:</span>
                      <span className="uppercase text-cyan-300 font-medium">{inc.status}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playClick();
                      onSelectIncident(inc);
                    }}
                    className="w-full h-8 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Open Incident Dossier</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Response Unit Markers */}
        {showUnits && responseUnits.map(unit => (
          <Marker
            key={unit.id}
            position={unit.coordinates}
            icon={createUnitIcon(unit.status)}
          >
            <Popup>
              <div className="p-2.5 space-y-1.5 min-w-[210px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                    {unit.id}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    unit.status === 'On Scene' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {unit.status}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-xs">{unit.name}</h4>
                <p className="text-[11px] text-slate-300">Personnel: {unit.personnel} | Radio: {unit.batteryRadio}</p>
                <div className="bg-white/[0.04] p-2 rounded-lg text-[10px] text-slate-400 font-mono">
                  Mission: {unit.currentAssignment}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
