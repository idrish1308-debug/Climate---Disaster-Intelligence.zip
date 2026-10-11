# DISASTER INTELLIGENCE | AI-Assisted Emergency Response Coordination Dashboard

A mission-critical, hackathon-ready command center prototype designed for emergency operations centers (EOC), disaster mitigation authorities, and rapid incident coordination.

Developed with **React 19**, **Vite**, **Tailwind CSS**, **React Leaflet (OpenStreetMap)**, **Recharts**, and **Lucide Icons**.

---

## 🛰️ Key Features

### 1. Operations Command Center (Overview Dashboard)
- **6 Key Performance Indicators (KPIs)**:
  - Active Incidents (with real-time delta)
  - Critical Danger Hazards (with pulsing status indicator)
  - Reports Received (with hourly surge velocity)
  - AI Verified Reports percentage
  - People Potentially Affected (14,280+ simulated citizens)
  - Response Units Available (NDRF, SDRF, Medical, TNEB)
- **Large Interactive GIS Tactical Map**:
  - Centered on **Dindigul, Tamil Nadu, India**
  - Simulated risk zones: **RED** (Critical Danger), **YELLOW** (Moderate Buffer), **GREEN** (Safe Assembly / Relief)
  - Interactive incident pins with popups and inspection shortcuts
- **Real-Time Feeds**:
  - Live incident stream
  - Critical alerts ticker
  - Incident severity distribution (Recharts Donut chart)
  - Disaster report & rainfall timeline (Recharts Area chart)
  - Operational audit log

### 2. Full GIS Command Center (`Live Disaster Map`)
- Zoom, pan, custom tactical dark markers with severity-based glow
- **Layer Filters**: Flash Floods, Landslides & Slopes, Gale & Storms, Electrical Grid, Response Units, Risk Zones
- **Quick Sector Jumps**: Anna Nagar, Sirumalai Ghat, Kamarajar Sagar Dam, Dindigul Central
- Filter by Severity and Hazard Type
- Incident targeting list with click-to-locate navigation

### 3. Incident Intelligence & AI Triage (`Incident Intelligence`)
- High-fidelity incident dossiers:
  - **INC-001**: Flash Flood Rescue & Submersion — Anna Nagar
  - **INC-002**: Severe Gale & Infrastructure Crisis — Dindigul Outskirts
  - **INC-003**: Landslide Risk & Rockfall Hazard — Sirumalai Ghat Road (Hairpin 11 to 14)
  - **INC-004**: Dam Overflow Inflow Surge Alert — Kamarajar Sagar Dam
  - **INC-005**: Substation Waterlogging & Blackout — Begambur
  - **INC-006**: Evacuation Corridor Congestion — Palani Highway
- **AI Damage Assessment & Predictive Vector**:
  - Simulated AI hydrological models and slope stability recalculation
  - One-click unit dispatch directly from dossier modal
  - Status progression: `Active` → `In Progress` → `Contained` → `Resolved`
- **Log New Incident**: Interactive form to add custom incidents with coordinates, auto-updating the map and state.

### 4. Early Warning & CAP Dissemination (`Alerts & Notifications`)
- Common Alerting Protocol (CAP 1.2) simulator
- Dissemination channels: Cell Broadcast (WEA), Outdoor Sirens, CAP SMS, FM Radio
- Operator acknowledgement tracking
- Emergency broadcast trigger modal with simulated cellular dispatch

### 5. Crowdsourced Intelligence & AI Verification (`Reports & Verification`)
- Citizen field submissions with geotagged locations and observations
- **Multimodal AI Verification Engine**:
  - Automated credibility score calculation (e.g. 98% vs 32% flagged hoax)
  - Computer vision tags (e.g. `WATER DEPTH > 1.5M`, `LIVE WIRE RISK`, `OUTDATED MEDIA DETECTED`)
- One-click actions: **Verify**, **Flag / Reject**, or **Escalate to Incident**
- Interactive **"Submit Citizen Field Report"** modal for live judge testing

### 6. Resource Coordination (`Resource Coordination`)
- **Fleet Tracker**:
  - NDRF Battalion 4 - Alpha Squad (Inflatable boats & heavy rescue)
  - SDRF Water Rescue Team Bravo
  - 108 Mobile Trauma Unit Delta
  - TNEB High-Voltage Response Team
  - Sirumalai Forest Drone Wing
  - Municipal Sludge Pumping Squadron
- **Relief Shelter Tracker**:
  - Anna Indoor Stadium (1,200 capacity)
  - Government Arts College (800 capacity)
  - Begambur Municipal School (500 capacity)
  - Sirumalai Foothills Hall (400 capacity)
  - Real-time occupancy progress bars with simulated intake/discharge controls

### 7. Mission Analytics (`Analytics`)
- Mean Time to Respond (MTTR) across sectors
- Evacuation progression vs rainfall intensity
- Criticality index by hazard type
- Response SLA performance benchmarks

### 8. Simulation Controls & Audio (`Settings`)
- **Hackathon Scenario Injectors**:
  - *Scenario A*: Flash Flood Runoff Surge (Anna Nagar)
  - *Scenario B*: Mountain Rockfall (Sirumalai Ghat)
- **Web Audio API Tactical Sound Effects**:
  - Radar ping synthesis (880Hz-1760Hz)
  - Dual-oscillator critical emergency siren
- **Role Switcher**: Incident Commander, GIS Specialist, NDRF Coordinator
- Reset dataset button to restore clean baseline

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite Development Server
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS
- **GIS Mapping**: React Leaflet + OpenStreetMap + CARTO Dark Tiles
- **Charts**: Recharts
- **Icons**: Lucide React
- **Audio Synthesis**: Native Web Audio API
- **Persistence**: Browser `localStorage`
