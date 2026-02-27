// ─── EDIT THIS FILE to personalise the site ───────────────────────────────

export const SITE = {
  name: 'P-World Engineering',
  title: 'Electrical Engineer',
  email: 'quarcoopomekelvin@gmail.com',
  phone: '+233 55 762 8942',
  location: 'Spintex, Accra',
  linkedin: 'https://www.linkedin.com/in/theophilus-n-l-quarcoopome-1280541a4/',
  linkedinName: 'Theophilus N.L Quarcoopome',
  available: true,
}

export const STATS = [
  { num: '8+', label: 'Years Experience' },
  { num: '120+', label: 'Projects Delivered' },
  { num: '5', label: 'Core Disciplines' },
  { num: '100%', label: 'Safety Compliance' },
]

// ─── Hero background ───────────────────────────────────────────────────────
// Night-time electrical substation towers with glowing high-voltage lines —
// dramatic and instantly communicates "electrical engineer"
export const HERO_IMG =
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=90&auto=format&fit=crop'

// ─── Specializations ───────────────────────────────────────────────────────
export const SPECS = [
  {
    id: '01', icon: '🔧',
    title: 'Electrical Installation & Field Engineering',
    desc: 'Expert-level field installations across commercial, industrial and residential environments. Commissioning, cabling, panel wiring and full site integration with zero-defect standards.',
    tags: ['HV/LV Systems', 'Cable Mgmt', 'Panel Wiring', 'Commissioning'],
    // Uploaded image: electrician with gloves probing a live distribution panel
    img: '/assets/electrical-installation.png',
    alt: 'Electrician with gloves testing live electrical panel connections',
  },
  {
    id: '02', icon: '💻',
    title: 'Tech & Automation — Embedded & Smart Systems',
    desc: 'Designing and deploying intelligent automation systems from microcontroller firmware to full smart facility integrations, bridging the physical and digital worlds seamlessly.',
    tags: ['Arduino / ESP32', 'PLCs', 'SCADA', 'IoT'],
    // Macro shot of a green printed circuit board — perfect for embedded systems
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=90&auto=format&fit=crop',
    alt: 'Green printed circuit board macro shot',
  },
  {
    id: '03', icon: '⚡',
    title: 'Power & Renewable Energy Specialist',
    desc: 'Deep expertise in solar PV systems, inverter technology, battery storage and grid-tied installations. Maximising energy efficiency while meeting all regulatory requirements.',
    tags: ['Solar PV', 'Inverters', 'Battery Storage', 'Grid Tie'],
    // Rows of solar panels on an open field under a vivid blue sky
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=90&auto=format&fit=crop',
    alt: 'Solar panel farm under blue sky',
  },
  {
    id: '04', icon: '🏭',
    title: 'Industrial Systems & Maintenance Expert',
    desc: 'Preventive and corrective maintenance for heavy industrial environments. Motor drives, switchgear, transformers and production-critical electrical infrastructure.',
    tags: ['VFDs', 'Switchgear', 'Transformers', 'MCC Panels'],
    // Uploaded image: two engineers in hard hats inspecting industrial plant
    img: '/assets/industrial-systems.png',
    alt: 'Two engineers in hard hats reviewing industrial systems on the factory floor',
  },
  {
    id: '05', icon: '🛠',
    title: 'Electrical Troubleshooting & Fault Diagnostics',
    desc: 'Systematic fault-finding across complex electrical systems using thermal imaging, oscilloscopes, multimeters and logic analysis. Fast, accurate root-cause identification every time.',
    tags: ['Thermal Imaging', 'Power Quality', 'Root Cause', 'EMC Testing'],
    // Engineer holding and using a clamp / probe meter on live electrical equipment
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=90&auto=format&fit=crop',
    alt: 'Engineer using clamp meter for electrical fault diagnostics',
  },
]

// ─── About ─────────────────────────────────────────────────────────────────
export const ABOUT = {
  bio: [
    `A results-driven electrical engineer with <strong>over 8 years</strong> in the field, blending hands-on installation expertise with forward-looking automation and smart energy solutions.`,
    `My work spans from <strong>commissioning high-voltage systems</strong> in industrial plants to programming microcontrollers for smart building automation — a rare combination of high-voltage know-how and embedded systems depth.`,
    `I thrive in technically demanding environments where <strong>precision, safety and innovation</strong> are non-negotiable.`,
  ],
  skills: [
    { label: 'Electrical Systems', pct: 95 },
    { label: 'Embedded Systems & Automation', pct: 88 },
    { label: 'Renewable Energy', pct: 90 },
    { label: 'Fault Diagnostics', pct: 93 },
  ],
  certs: [
    'IEE Wiring Regulations (BS 7671) Compliant',
    'City & Guilds 2382 — Electrical Inspector',
    'NEBOSH — Health & Safety Certificate',
    'Photovoltaic Systems Installer (NABCEP)',
    'PLC Programming — Siemens TIA Portal',
    'AutoCAD Electrical — Schematic Design',
  ],
  // Engineer in a hard hat studying blueprints/schematics on-site — professional portrait vibe
  img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=90&auto=format&fit=crop',
  alt: 'Electrical engineer reviewing technical schematics on site',
}

// ─── Services ──────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    num: '01', icon: '🏗️',
    title: 'Full Electrical Installations',
    desc: 'End-to-end installation for residential, commercial and industrial facilities — design through commissioning and client handover.',
    // Workers pulling and terminating cables inside a building under construction
    img: '/assets/electrical_wiring.png',
    alt: 'Electricians installing wiring in a building under construction',
  },
  {
    num: '02', icon: '☀️',
    title: 'Solar & Battery Storage Systems',
    desc: 'Design, supply and installation of solar PV systems with battery backup — off-grid, on-grid and hybrid configurations.',
    // Person installing solar panels on a rooftop — hands-on installation shot
    img: '/assets/solar_panels.png',
    alt: 'Technician installing solar panels on a residential rooftop',
  },
  {
    num: '03', icon: '🤖',
    title: 'Smart Automation & IoT',
    desc: 'Custom embedded systems, smart building automation, PLC programming and IoT sensor integration to modernise your operations.',
    // Rows of coloured DIN-rail mounted PLC modules on a control panel — perfect automation image
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&q=90&auto=format&fit=crop',
    alt: 'DIN-rail PLC and automation modules inside a control cabinet',
  },
  {
    num: '04', icon: '🔍',
    title: 'Electrical Inspections & Testing',
    desc: 'PIR/EICR testing, thermal imaging surveys, power quality analysis and full compliance certification reporting.',
    // Technician using a digital multimeter — testing and measurement context
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=90&auto=format&fit=crop',
    alt: 'Technician performing electrical inspection with digital multimeter',
  },
  {
    num: '05', icon: '⚙️',
    title: 'Industrial Maintenance Contracts',
    desc: 'Scheduled and emergency maintenance for industrial electrical systems — minimising downtime and maximising asset life.',
    // Technician doing hands-on preventive maintenance on industrial motor drives
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&q=90&auto=format&fit=crop',
    alt: 'Engineer conducting scheduled maintenance on industrial electrical equipment',
  },
  {
    num: '06', icon: '📋',
    title: 'Engineering Consultancy',
    desc: 'Technical audits, energy assessments, electrical design reviews and expert advisory services for construction and infrastructure projects.',
    // Engineer at a desk with technical drawings, laptop and documents — consultancy
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=90&auto=format&fit=crop',
    alt: 'Engineer reviewing technical drawings for consultancy project',
  },
]

// ─── Projects ──────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    status: 'Completed',
    title: 'Industrial Plant Electrical Overhaul — 11kV System',
    desc: 'Complete re-engineering of an 11kV distribution network for a manufacturing facility. New switchgear, transformer replacement and MCC panel overhaul delivered with zero production downtime during phased commissioning.',
    meta: ['🏭 Industrial', '⚡ 11kV', '📅 2023'],
    // Outdoor high-voltage electrical substation with transformers — matches 11kV overhaul
    img: 'https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=900&q=90&auto=format&fit=crop',
    alt: 'High-voltage electrical substation with power transformers',
  },
  {
    status: 'Completed',
    title: '100kWp Rooftop Solar PV + 80kWh Battery Storage',
    desc: 'Design and full installation of a commercial-scale solar PV array with 80kWh lithium-ion battery storage. Achieved a 62% reduction in grid energy consumption with complete remote SCADA monitoring.',
    meta: ['☀️ Renewable', '🔋 100kWp', '📅 2024'],
    // Clean aerial view of solar panels on a commercial building rooftop
    img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&q=90&auto=format&fit=crop',
    alt: 'Aerial view of commercial rooftop solar PV installation',
  },
  {
    status: 'Ongoing',
    title: 'Smart Factory Automation — Siemens S7-1500 PLC & SCADA',
    desc: 'Multi-phase automation project integrating Siemens S7-1500 PLCs across 3 production lines. Includes real-time energy monitoring, OEE dashboards and predictive fault alerting via a centralised SCADA platform.',
    meta: ['🤖 Automation', '💻 SCADA', '📅 2024–25'],
    // Inside view of an industrial control cabinet with many PLC/relay modules — exact match
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=90&auto=format&fit=crop',
    alt: 'Industrial PLC control cabinet for smart factory automation',
  },
  {
    status: 'Completed',
    title: 'Smart Home Embedded Control System (ESP32 + IoT)',
    desc: 'Custom ESP32-based smart home solution with voice control, automated lighting zones, whole-home energy metering and a remote mobile monitoring app. From proof-of-concept to full residential deployment in six weeks.',
    meta: ['🏠 Smart Home', '📡 IoT', '📅 2023'],
    // Close-up of a smart home thermostat/control panel on a white wall — matches IoT home automation
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&auto=format&fit=crop',
    alt: 'Smart home IoT control panel showing energy and automation data',
  },
]
