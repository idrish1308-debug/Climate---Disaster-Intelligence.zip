// Mock Data for Dindigul, Tamil Nadu Emergency Response Command

export const DINDIGUL_CENTER = [10.3673, 77.9803];

export const INITIAL_INCIDENTS = [
  {
    id: "INC-001",
    title: "Flash Flood Rescue & Submersion",
    location: "Anna Nagar, Dindigul",
    coordinates: [10.3690, 77.9780],
    severity: "critical", // critical | high | moderate | safe
    type: "flood",        // flood | gale | landslide | infrastructure
    status: "active",     // active | in_progress | contained | resolved
    timeReported: "18 mins ago",
    affectedCount: 3840,
    trappedCount: 42,
    evacuatedCount: 820,
    waterLevel: "1.65m (Rising)",
    rainfallRate: "88 mm/hr",
    aiConfidence: 96,
    aiDamageAssessment: "High urban density inundation. Rapid runoff from Sanarpatti watershed channel. Water breached 1.5m benchmark on residential ground floors.",
    aiSuggestedAction: "Deploy Zodiac rescue boats from SDRF Unit Beta. Cut low-voltage power grid in sector 4. Prioritize elderly evacuation from 2nd Street.",
    assignedUnits: ["SDRF Water Rescue Team", "108 Medical Van 04"],
    contactPerson: "Insp. S. Ramanathan (Anna Nagar Station)",
    lastUpdate: "3 mins ago via Drone Recon Wing"
  },
  {
    id: "INC-002",
    title: "Severe Gale & Infrastructure Crisis",
    location: "Dindigul Outskirts / Bypass Junction",
    coordinates: [10.3450, 77.9500],
    severity: "high",
    type: "gale",
    status: "in_progress",
    timeReported: "42 mins ago",
    affectedCount: 2150,
    trappedCount: 8,
    evacuatedCount: 310,
    windSpeed: "78 km/h gusts",
    rainfallRate: "42 mm/hr",
    aiConfidence: 91,
    aiDamageAssessment: "High-tension 33kV distribution line downed over bypass highway. 3 heavy freight trucks immobilized. Secondary structural roof collapse at commercial warehouse.",
    aiSuggestedAction: "Dispatch TNEB emergency de-energizing crew immediately. Reroute heavy vehicles to Palani link road. Clear road blockage with hydraulic crane.",
    assignedUnits: ["TNEB High-Voltage Crew", "TN Fire & Rescue Unit 2"],
    contactPerson: "Highway Patrol Duty Officer (Sector C)",
    lastUpdate: "11 mins ago via Patrol Telemetry"
  },
  {
    id: "INC-003",
    title: "Landslide Risk & Rockfall Hazard",
    location: "Sirumalai Ghat Road (Hairpin Bend 11 to 14)",
    coordinates: [10.2200, 77.9950],
    severity: "critical",
    type: "landslide",
    status: "active",
    timeReported: "1 hr ago",
    affectedCount: 1450,
    trappedCount: 26,
    evacuatedCount: 180,
    soilSaturation: "94% (Near Liquefaction)",
    rainfallRate: "112 mm/hr (Sirumalai Hills)",
    aiConfidence: 94,
    aiDamageAssessment: "Slope stability index decreased below 0.72. Significant mudflow across 80 meters of Ghat road. 4 tourist vehicles halted between bend 12 and 13.",
    aiSuggestedAction: "Issue immediate traffic embargo at Foothills checkpost. Deploy NDRF Earthmovers and tactical search K9 unit. Establish emergency drone communication tether.",
    assignedUnits: ["NDRF Battalion 4 Alpha", "Sirumalai Forest Quick Response"],
    contactPerson: "Forest Range Officer M. Karthik",
    lastUpdate: "7 mins ago via Sirumalai Hilltop Sensor"
  },
  {
    id: "INC-004",
    title: "Dam Overflow Inflow Surge Alert",
    location: "Kamarajar Sagar Dam Spillway Catchment",
    coordinates: [10.2800, 77.8900],
    severity: "high",
    type: "flood",
    status: "in_progress",
    timeReported: "2 hrs ago",
    affectedCount: 4600,
    trappedCount: 0,
    evacuatedCount: 1250,
    waterLevel: "23.4 ft / 24 ft Maximum Reservoir Level",
    rainfallRate: "65 mm/hr",
    aiConfidence: 89,
    aiDamageAssessment: "Inflow exceeding 14,200 cusecs due to Western Ghats monsoon runoff. Shutter discharge initiation required within 45 minutes to prevent uncontrolled crest spill.",
    aiSuggestedAction: "Sound downstream audio warning sirens across Athoor, Sempatti and surrounding low-lying agrarian communities. Evacuate riverbank settlements within 500m.",
    assignedUnits: ["PWD Water Resources Engineering Division", "Revenue Disaster Wing"],
    contactPerson: "Executive Engineer R. Sundaram",
    lastUpdate: "15 mins ago via SCADA Sensor Feed"
  },
  {
    id: "INC-005",
    title: "Substation Waterlogging & Power Blackout",
    location: "Begambur 110kV Primary Substation",
    coordinates: [10.3620, 77.9620],
    severity: "moderate",
    type: "infrastructure",
    status: "in_progress",
    timeReported: "3 hrs ago",
    affectedCount: 22000,
    trappedCount: 0,
    evacuatedCount: 0,
    waterLevel: "0.45m inside switchyard",
    rainfallRate: "35 mm/hr",
    aiConfidence: 88,
    aiDamageAssessment: "Transformer basement pumps submerged. Preventative islanding activated to avert catastrophic short-circuit transformer explosion.",
    aiSuggestedAction: "Deploy 2 high-capacity sludge dewatering pump trucks. Feed critical hospital line (Dindigul Govt HQ Hospital) via standby DG microgrid.",
    assignedUnits: ["Dindigul Municipal Dewatering Unit", "TNEB Backup Team"],
    contactPerson: "Assistant Engineer S. Meenakshi",
    lastUpdate: "22 mins ago via TNEB Control Room"
  },
  {
    id: "INC-006",
    title: "Palani Highway Evacuation Corridor Congestion",
    location: "Palani Highway Toll Plaza Exit",
    coordinates: [10.3750, 77.9550],
    severity: "moderate",
    type: "infrastructure",
    status: "contained",
    timeReported: "3 hrs ago",
    affectedCount: 1200,
    trappedCount: 0,
    evacuatedCount: 950,
    waterLevel: "0.2m ponding on shoulder",
    rainfallRate: "28 mm/hr",
    aiConfidence: 95,
    aiDamageAssessment: "Fallen signage board blocking lane 2 and 3. Ambulances facing 18-minute transit delay towards tertiary hospital.",
    aiSuggestedAction: "Open emergency green corridor on reverse carriageway. Assign traffic police marshals to clear bottleneck.",
    assignedUnits: ["Traffic Police Emergency Flying Squad"],
    contactPerson: "DSP Traffic Control",
    lastUpdate: "35 mins ago via CCTV Network"
  }
];

export const RISK_ZONES = [
  {
    id: "ZONE-RED-1",
    name: "Anna Nagar Severe Inundation Basin",
    type: "critical", // Red
    color: "#EF4444",
    fillColor: "#EF4444",
    fillOpacity: 0.28,
    center: [10.3690, 77.9780],
    radius: 1200, // meters
    description: "Simulated Extreme Inundation Zone: Water depth exceeding 1.5m. Rapid current from Sanarpatti overflow.",
    threatLevel: "CRITICAL DANGER",
    populationAtRisk: 12500,
    evacuationPriority: "IMMEDIATE"
  },
  {
    id: "ZONE-RED-2",
    name: "Sirumalai Ghat Slope Failure Corridor",
    type: "critical", // Red
    color: "#EF4444",
    fillColor: "#EF4444",
    fillOpacity: 0.28,
    center: [10.2200, 77.9950],
    radius: 1800,
    description: "Simulated High Landslide Hazard: Highly saturated topsoil on 45° slope. Road impassable.",
    threatLevel: "CRITICAL DANGER",
    populationAtRisk: 2800,
    evacuationPriority: "IMMEDIATE"
  },
  {
    id: "ZONE-YELLOW-1",
    name: "Dindigul Central Market & Railway Colony",
    type: "moderate", // Yellow
    color: "#EAB308",
    fillColor: "#EAB308",
    fillOpacity: 0.22,
    center: [10.3620, 77.9700],
    radius: 1500,
    description: "Simulated Moderate Flood Buffer: 0.3m to 0.6m urban waterlogging. Electrical hazard caution.",
    threatLevel: "MODERATE RISK",
    populationAtRisk: 8400,
    evacuationPriority: "PRECAUTIONARY"
  },
  {
    id: "ZONE-YELLOW-2",
    name: "Kamarajar Sagar Downstream Floodway",
    type: "moderate", // Yellow
    color: "#EAB308",
    fillColor: "#EAB308",
    fillOpacity: 0.22,
    center: [10.2850, 77.9100],
    radius: 2000,
    description: "Simulated Dam Spillway Buffer: Flash surge expected along riverbed within 60 minutes.",
    threatLevel: "MODERATE RISK",
    populationAtRisk: 6200,
    evacuationPriority: "PRECAUTIONARY"
  },
  {
    id: "ZONE-GREEN-1",
    name: "Collectorate Safe Assembly & Operations Hub",
    type: "safe", // Green
    color: "#10B981",
    fillColor: "#10B981",
    fillOpacity: 0.25,
    center: [10.3780, 77.9890],
    radius: 1100,
    description: "Safe Zone: Elevated municipal ground, medical triage staging point, helicopter landing zone.",
    threatLevel: "SAFE / LOW RISK",
    populationCapacity: 15000,
    evacuationPriority: "ACTIVE RECEIVING"
  },
  {
    id: "ZONE-GREEN-2",
    name: "Anna Indoor Stadium Emergency Relief Center",
    type: "safe", // Green
    color: "#10B981",
    fillColor: "#10B981",
    fillOpacity: 0.25,
    center: [10.3550, 77.9820],
    radius: 900,
    description: "Safe Shelter Zone: Food distribution, generator power, Red Cross pediatric triage.",
    threatLevel: "SAFE / LOW RISK",
    populationCapacity: 2500,
    evacuationPriority: "ACTIVE SHELTER"
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-901",
    severity: "critical",
    category: "METEOROLOGICAL",
    title: "RED ALERT: Cloudburst Flash Flood Warning",
    message: "District Disaster Management Authority issued RED WARNING for Anna Nagar and low-lying basin areas. Evacuate ground floor properties immediately.",
    issuedAt: "10 mins ago",
    targetAudience: "Dindigul Urban Taluk",
    channels: ["Cell Broadcast", "CAP SMS", "Radio FM 102.8", "Siren"],
    status: "Broadcasting",
    acknowledgedByOperator: true
  },
  {
    id: "ALT-902",
    severity: "critical",
    category: "TERRAIN HAZARD",
    title: "Sirumalai Ghat Road Closed - Debris Influx",
    message: "All vehicular traffic on Sirumalai Ghat Road suspended indefinitely from checkpost KM 0 to KM 18. Emergency personnel only.",
    issuedAt: "35 mins ago",
    targetAudience: "Sirumalai / Sanarpatti Travelers",
    channels: ["Highway Electronic Boards", "Police Checkpoints", "SMS"],
    status: "Active",
    acknowledgedByOperator: true
  },
  {
    id: "ALT-903",
    severity: "high",
    category: "HYDROLOGICAL",
    title: "Kamarajar Sagar Dam Spillway Inflow Alert",
    message: "Water release of 8,500 cusecs scheduled at 15:30 IST. Residents along Athoor and Kodaganar riverbanks instructed to relocate to designated camps.",
    issuedAt: "52 mins ago",
    targetAudience: "Downstream Riverine Villages",
    channels: ["PA System Vans", "Village Officers"],
    status: "Active",
    acknowledgedByOperator: false
  },
  {
    id: "ALT-904",
    severity: "moderate",
    category: "PUBLIC UTILITIES",
    title: "Controlled Power Islanding in Begambur Substation Area",
    message: "Power outage in Ward 12, 14 & 15 to avoid electrical arcing in submerged distribution conduits. Backup generators operational at District Hospital.",
    issuedAt: "2 hrs ago",
    targetAudience: "Begambur Ward Residents",
    channels: ["TNEB Notification", "Citizen Portal"],
    status: "Monitored",
    acknowledgedByOperator: false
  }
];

export const INITIAL_REPORTS = [
  {
    id: "REP-401",
    author: "K. Muralidharan (Resident)",
    phone: "+91 98421 *****",
    location: "Anna Nagar 3rd Cross Street",
    coordinates: [10.3685, 77.9792],
    category: "Flash Flood",
    timestamp: "14 mins ago",
    description: "Water has entered ground floors. 8 people including 2 infants stuck on terrace with no drinking water. Water current is very rapid.",
    imageDescription: "Terrace rescue flag visible, brown floodwater submerging ground-floor car roofs.",
    aiScore: 98,
    aiTag: "HIGH CREDIBILITY - WATER DEPTH 1.6M",
    sentiment: "URGENT / DISTRESS",
    status: "Verified",
    assignedIncident: "INC-001"
  },
  {
    id: "REP-402",
    author: "R. Selvaraj (Milk Delivery Driver)",
    phone: "+91 94432 *****",
    location: "Sirumalai Hairpin 12",
    coordinates: [10.2210, 77.9940],
    category: "Landslide",
    timestamp: "28 mins ago",
    description: "Massive boulder and soil came crashing down near hairpin 12. Two tourist vans are trapped between tree fall and rock block.",
    imageDescription: "Downed eucalyptus trees, reddish wet mud pile across asphalt lane.",
    aiScore: 94,
    aiTag: "HIGH CREDIBILITY - TERRAIN DEBRIS CONFIRMED",
    sentiment: "PANIC / BLOCKED",
    status: "Verified",
    assignedIncident: "INC-003"
  },
  {
    id: "REP-403",
    author: "M. Abdul (Store Owner)",
    phone: "+91 98940 *****",
    location: "Begambur Mosque Roundabout",
    coordinates: [10.3615, 77.9630],
    category: "Electrical Hazard",
    timestamp: "45 mins ago",
    description: "Sparks flying from fallen electrical cable dipping into standing water near transformer pole. Pedestrians warned to stay away.",
    imageDescription: "Exposed utility pole with water at pedestal; smoke residue on insulator.",
    aiScore: 91,
    aiTag: "HIGH CREDIBILITY - LIVE WIRE RISK",
    sentiment: "HAZARD WARNING",
    status: "Verified",
    assignedIncident: "INC-005"
  },
  {
    id: "REP-404",
    author: "Anitha Prakash (Social Volunteer)",
    phone: "+91 97871 *****",
    location: "Sanarpatti Bridge",
    coordinates: [10.3320, 78.0120],
    category: "Bridge Overflow",
    timestamp: "1 hr ago",
    description: "Bridge parapet wall cracked. Water flowing 6 inches over roadway. Light two-wheelers slipping.",
    imageDescription: "Swirling brown tributary torrent brushing against bridge railing.",
    aiScore: 86,
    aiTag: "MODERATE CREDIBILITY - INFRASTRUCTURE WEAKNESS",
    sentiment: "CAUTION",
    status: "Pending Review",
    assignedIncident: null
  },
  {
    id: "REP-405",
    author: "Anonymous User #9218",
    phone: "Hidden",
    location: "Palani Highway Km 4",
    coordinates: [10.3700, 77.9400],
    category: "Rumor / Unconfirmed",
    timestamp: "1.5 hrs ago",
    description: "Unverified claim that major bridge has collapsed completely. Need verification.",
    imageDescription: "Old image recycled from 2021 flooding detected via metadata comparison.",
    aiScore: 32,
    aiTag: "SUSPECTED FALSE ALARM / OUTDATED MEDIA",
    sentiment: "SUSPICIOUS",
    status: "Flagged",
    assignedIncident: null
  }
];

export const RESPONSE_UNITS = [
  {
    id: "UNIT-01",
    name: "NDRF Battalion 4 - Alpha Squad",
    type: "NDRF Heavy Rescue",
    base: "Madurai Staging Station / Dindigul Deploy",
    personnel: 16,
    vehicles: ["2 Inflatable Zodiac Boats", "1 Heavy 4x4 Rescue Truck", "LIDAR Drone Unit"],
    status: "On Scene", // Available | En Route | On Scene | Standby
    currentAssignment: "INC-003: Sirumalai Ghat Road",
    leader: "Commander Vijayendra Singh",
    batteryRadio: "98% (Tactical Mesh)",
    coordinates: [10.2220, 77.9945]
  },
  {
    id: "UNIT-02",
    name: "SDRF Water Rescue Team Bravo",
    type: "Flood Evacuation",
    base: "Dindigul Fire Station Central",
    personnel: 12,
    vehicles: ["3 Motorized Rescue Skiffs", "Diver Suite", "Dewatering Pumps"],
    status: "On Scene",
    currentAssignment: "INC-001: Anna Nagar Flash Flood",
    leader: "Sub-Officer K. Ramesh",
    batteryRadio: "92% (Tactical Mesh)",
    coordinates: [10.3692, 77.9775]
  },
  {
    id: "UNIT-03",
    name: "108 Mobile Trauma Unit Delta",
    type: "Paramedic / Ambulance",
    base: "Govt Headquarters Hospital, Dindigul",
    personnel: 4,
    vehicles: ["Advanced Life Support Ambulance", "Mobile ICU Equipment"],
    status: "En Route",
    currentAssignment: "INC-001: Anna Nagar Flash Flood",
    leader: "Dr. Revathi & EMT Selvam",
    batteryRadio: "89% (Cellular & VHF)",
    coordinates: [10.3710, 77.9810]
  },
  {
    id: "UNIT-04",
    name: "TNEB High-Voltage Response Team 7",
    type: "Electrical Grid Safety",
    base: "Dindigul Grid Sub-Center",
    personnel: 8,
    vehicles: ["Hydraulic Sky-Lift Truck", "De-energizing Mobile Unit"],
    status: "On Scene",
    currentAssignment: "INC-002: Dindigul Outskirts",
    leader: "Engineer G. Shanmugam",
    batteryRadio: "95% (VHF Channel 4)",
    coordinates: [10.3460, 77.9515]
  },
  {
    id: "UNIT-05",
    name: "Sirumalai Forest Recon Drone Unit",
    type: "Aerial LIDAR Recon",
    base: "Sirumalai Forest Checkpost",
    personnel: 3,
    vehicles: ["2 Long-Endurance Matrice Drones", "Satellite Ground Uplink"],
    status: "Available",
    currentAssignment: "Airborne Surveillance over Western Ghats",
    leader: "Pilot S. Vignesh",
    batteryRadio: "84% (Drone 1 92% | Drone 2 100%)",
    coordinates: [10.2450, 77.9850]
  },
  {
    id: "UNIT-06",
    name: "Municipal Sludge & Pumping Squadron",
    type: "Drainage / Pumping",
    base: "Begambur Municipal Depot",
    personnel: 6,
    vehicles: ["2 High-Horsepower Dewatering Pumps", "Gully Emptier"],
    status: "Available",
    currentAssignment: "Standby for Begambur Substation",
    leader: "Supervisor Anbarasu",
    batteryRadio: "90% (VHF Channel 2)",
    coordinates: [10.3640, 77.9640]
  }
];

export const SHELTERS = [
  {
    id: "SHL-01",
    name: "Anna Indoor Stadium Disaster Relief Shelter",
    location: "Stadium Road, Dindigul",
    capacity: 1200,
    currentOccupants: 840,
    status: "Operating (70% Cap)",
    medicalSupport: "Full Field Hospital Staged",
    foodSupplies: "3,500 Meals in Stock",
    powerBackup: "Triple Diesel Generator + Solar",
    coordinates: [10.3550, 77.9820]
  },
  {
    id: "SHL-02",
    name: "Government Arts College Relief Staging",
    location: "Collectorate Road, Dindigul",
    capacity: 800,
    currentOccupants: 320,
    status: "Operating (40% Cap)",
    medicalSupport: "2 Paramedics on Duty",
    foodSupplies: "1,200 Meals in Stock",
    powerBackup: "Municipal Line + 1 DG",
    coordinates: [10.3780, 77.9890]
  },
  {
    id: "SHL-03",
    name: "Begambur Municipal Higher Secondary School",
    location: "Begambur Main Road",
    capacity: 500,
    currentOccupants: 435,
    status: "Near Capacity (87% Cap)",
    medicalSupport: "First Aid Triage",
    foodSupplies: "Community Kitchen Active",
    powerBackup: "Battery Inverter",
    coordinates: [10.3605, 77.9650]
  },
  {
    id: "SHL-04",
    name: "Sirumalai Foothills Community Hall",
    location: "Sirumalai Checkpost, Dindigul",
    capacity: 400,
    currentOccupants: 110,
    status: "Operating (28% Cap)",
    medicalSupport: "Mobile Medical Van on Call",
    foodSupplies: "Dry Rations Ready",
    powerBackup: "Generator Active",
    coordinates: [10.2800, 78.0050]
  }
];

export const HOURLY_TIMELINE_DATA = [
  { time: "06:00", rainfall: 12, reports: 4, incidents: 1, evacuated: 0 },
  { time: "08:00", rainfall: 28, reports: 14, incidents: 2, evacuated: 45 },
  { time: "10:00", rainfall: 45, reports: 38, incidents: 3, evacuated: 210 },
  { time: "12:00", rainfall: 82, reports: 92, incidents: 5, evacuated: 650 },
  { time: "14:00", rainfall: 112, reports: 184, incidents: 6, evacuated: 1420 },
  { time: "16:00 (NOW)", rainfall: 94, reports: 246, incidents: 6, evacuated: 2310 }
];

export const SEVERITY_CHART_DATA = [
  { name: "Critical Danger", value: 2, color: "#EF4444" },
  { name: "High Risk", value: 2, color: "#F97316" },
  { name: "Moderate Risk", value: 2, color: "#EAB308" },
  { name: "Safe Haven", value: 2, color: "#10B981" }
];

export const HAZARD_TYPE_DATA = [
  { type: "Flash Flood", active: 2, contained: 1, criticalScore: 94 },
  { type: "Landslide", active: 1, contained: 0, criticalScore: 92 },
  { type: "Severe Gale", active: 1, contained: 1, criticalScore: 78 },
  { type: "Power & Grid", active: 1, contained: 1, criticalScore: 65 },
  { type: "Dam Catchment", active: 1, contained: 0, criticalScore: 85 }
];

export const RECENT_ACTIVITY_FEED = [
  { id: 1, time: "Just now", type: "ai", text: "AI Copilot updated flood inundation rate for Anna Nagar: +0.12m/hr" },
  { id: 2, time: "2m ago", type: "unit", text: "NDRF Battalion 4 reached Hairpin 11 on Sirumalai Ghat Road" },
  { id: 3, time: "5m ago", type: "report", text: "Crowdsourced report #REP-401 verified by automated image analysis (98% confidence)" },
  { id: 4, time: "12m ago", type: "alert", text: "Broadcast SMS alert triggered for Dindigul Urban Taluk via Cell Broadcast System" },
  { id: 5, time: "18m ago", type: "shelter", text: "Anna Indoor Stadium capacity updated: 840/1200 beds occupied" },
  { id: 6, time: "25m ago", type: "unit", text: "SDRF Boat Squad launched 2 inflatable Zodiacs into Anna Nagar 2nd Street" }
];
