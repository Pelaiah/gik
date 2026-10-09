import { ServiceItem, HardwareProduct, CaseStudy, TournamentItem, SmartDeviceNode } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'consultancy-cloud',
    number: '01',
    title: 'Technology Consultancy & Cloud Architecture',
    tagline: 'Strategic infrastructure modernization and digital transformation advisory',
    description: 'We guide enterprise CTOs and engineering directors through high-stakes migrations, zero-trust cloud adoption, distributed systems auditing, and microservice decoupling on AWS, Azure, and Google Cloud.',
    capabilities: [
      'Multi-cloud & hybrid Kubernetes orchestration',
      'Zero-trust security & compliance audits (SOC2 / ISO 27001)',
      'Legacy monolith modernization & domain-driven design',
      'FinOps cloud cost reduction and telemetry infrastructure'
    ],
    deliverables: ['Production Architecture Blueprint', 'Cost Optimization Audit', 'Migration Runway Matrix'],
    targetAudience: 'Enterprises'
  },
  {
    id: 'saas-engineering',
    number: '02',
    title: 'Enterprise SaaS & Custom Software Engineering',
    tagline: 'High-throughput, multi-tenant digital platforms built for planetary scale',
    description: 'From high-concurrency billing engines to real-time collaboration platforms, we engineer resilient web applications, custom ERPs, and automated workflow engines using modern TypeScript, Go, and event-driven architectures.',
    capabilities: [
      'Multi-tenant database isolation & tenant telemetry',
      'Real-time WebSocket & event streaming with Kafka/Redis',
      'High-performance GraphQL & gRPC API gateways',
      'Automated CI/CD pipelines with declarative infrastructure as code'
    ],
    deliverables: ['Full-Stack SaaS Platform', 'API Documentation & SDKs', 'Automated Test Suites'],
    targetAudience: 'Enterprises'
  },
  {
    id: 'predictive-maintenance',
    number: '03',
    title: 'AI-Driven Predictive Maintenance for Industry',
    tagline: 'Edge telemetry and machine-learning anomaly detection that eliminates unplanned downtime',
    description: 'We instrument heavy machinery, pumps, CNC mills, and turbines with low-latency vibration, thermal, and acoustic sensors. Our edge models flag bearing degradation, cavitation, and thermal drift 48 to 72 hours before failure occurs.',
    capabilities: [
      'Real-time edge FFT frequency & vibration spectrum analysis',
      'Remaining Useful Life (RUL) estimation algorithms',
      'Automated CMMS work-order dispatch & SMS/PagerDuty alerts',
      'SCADA & PLC telemetry bridging (Modbus / OPC UA / MQTT)'
    ],
    deliverables: ['Industrial Digital Twin Dashboard', 'Edge Sensor Ingestion Layer', 'Predictive Alert Engine'],
    targetAudience: 'Industrial'
  },
  {
    id: 'smart-iot-systems',
    number: '04',
    title: 'Smart Homes & IoT Facility Integration',
    tagline: 'Unified environmental controls, energy intelligence, and automated spaces',
    description: 'We design and deploy integrated IoT architectures for luxury residential estates, commercial offices, and smart manufacturing facilities. Unified under Matter, Thread, and Zigbee with local-first offline fallback.',
    capabilities: [
      'Smart HVAC zone balancing & sub-metered power monitoring',
      'Matter, Zigbee 3.0 & Thread unified protocol hubs',
      'Automated occupancy, access control & perimeter telemetry',
      'Custom wall-mounted touch dashboards & mobile control suites'
    ],
    deliverables: ['Centralized IoT Gateway', 'Automation Rule Engine', 'Occupant Mobile App'],
    targetAudience: 'Commercial'
  },
  {
    id: 'startup-accelerator',
    number: '05',
    title: 'Startup Engineering & Workflow Acceleration',
    tagline: 'Turn MVP specifications into validated scalable platforms in 6 to 8 weeks',
    description: 'Designed specifically for venture-backed and bootstrapped startups that need senior full-stack firepower without full-time hiring lag. We establish clean technical foundations, modular component libraries, and CI/CD pipelines.',
    capabilities: [
      'Rapid prototype to production architecture transition',
      'Automated customer onboarding & payment engine integration',
      'Developer workflow optimization & trunk-based release cadences',
      'Scalable serverless / containerized deployment templates'
    ],
    deliverables: ['Production MVP Launch', 'Developer Playbook', 'Cloud Budget Guardrails'],
    targetAudience: 'Startups'
  }
];

export const HARDWARE_PRODUCTS: HardwareProduct[] = [
  {
    id: 'gik-sen-vib-01',
    name: 'Gikspot Tri-Axis Vibration & Acoustic Telemetry Node',
    category: 'Sensors',
    price: 349,
    inStock: true,
    stockCount: 42,
    protocol: 'MQTT / LoRaWAN / RS-485',
    rating: 4.9,
    reviewsCount: 38,
    sku: 'GS-VIB-980',
    shortDesc: 'IP67 industrial magnetic-mount sensor for rotating machinery bearing health and high-frequency vibration analysis.',
    features: [
      'Tri-axial acceleration up to ±16g with 6.4 kHz sampling rate',
      'Acoustic spectrum sensing for micro-crack detection',
      'Internal 5-year lithium battery or 24V DC DIN tap',
      'Operating temperature: -40°C to +85°C'
    ],
    specs: {
      'Mounting': 'Neodymium magnetic or M8 stud',
      'Protection': 'IP67 waterproof & dustproof',
      'Wireless Range': 'Up to 2 km line-of-sight (LoRaWAN)',
      'Certification': 'CE, FCC, ATEX Zone 2'
    },
    isNew: true
  },
  {
    id: 'gik-plc-edge-800',
    name: 'Gikspot Edge-800 Industrial Automation Controller',
    category: 'Industrial Controllers',
    price: 890,
    inStock: true,
    stockCount: 19,
    protocol: 'Modbus TCP / OPC UA / MQTT / EtherNet/IP',
    rating: 5.0,
    reviewsCount: 24,
    sku: 'GS-PLC-800',
    shortDesc: 'High-performance DIN-rail programmable logic controller with dual Gigabit Ethernet and embedded Python/Rust runtime.',
    features: [
      'Quad-core 1.8 GHz ARM Cortex with 4GB ECC RAM and 32GB eMMC',
      '16 Opto-isolated digital inputs + 8 relay outputs (10A 250VAC)',
      'Integrated real-time hardware clock with supercapacitor backup',
      'Hardware secure element for cryptographic key storage'
    ],
    specs: {
      'Form Factor': 'Standard 35mm DIN-rail mount',
      'Power Input': '9V - 36V DC redundant input',
      'Interfaces': '2x GbE, 2x RS485/422, 1x CAN bus 2.0B, 2x USB 3.0',
      'Compliance': 'IEC 61131-2, CE, UL 508'
    },
    isNew: false
  },
  {
    id: 'gik-hub-matter-x1',
    name: 'Gikspot Multi-Protocol Smart Building Gateway',
    category: 'IoT Gateways',
    price: 480,
    inStock: true,
    stockCount: 31,
    protocol: 'Matter / Thread / Zigbee 3.0 / BACnet IP',
    rating: 4.8,
    reviewsCount: 52,
    sku: 'GS-GATE-X1',
    shortDesc: 'Unified edge gateway orchestrating up to 250 connected smart home and facility nodes with zero cloud latency.',
    features: [
      'Local-first automation engine runs seamlessly during internet outage',
      'Concurrent Thread Border Router and Zigbee 3.0 coordinator',
      'BACnet and Modbus bridge for enterprise HVAC integration',
      'Power over Ethernet (PoE 802.3af) or 12V DC auxiliary'
    ],
    specs: {
      'Capacity': 'Up to 250 mesh devices per coordinator',
      'Processor': 'Dual-core RISC-V 1.2 GHz + Crypto Accelerator',
      'Network': 'Gigabit PoE Ethernet, Wi-Fi 6 (802.11ax), BLE 5.3',
      'Dimensions': '120 x 85 x 32 mm'
    },
    isNew: true
  },
  {
    id: 'gik-act-relay-16',
    name: 'Gikspot 16-Channel Solid-State Automation Relay Unit',
    category: 'Automation Hardware',
    price: 310,
    inStock: true,
    stockCount: 64,
    protocol: 'RS-485 / Modbus RTU / CANOpen',
    rating: 4.9,
    reviewsCount: 19,
    sku: 'GS-REL-16',
    shortDesc: 'Zero-cross solid-state industrial relay module engineered for motor starters, lighting banks, and pneumatic valves.',
    features: [
      '16 independent channels rated at 5A 240VAC with snubber protection',
      'Zero-crossing detection prevents switching arc and inductive surges',
      'Individual status LEDs per channel and manual override dip-switches',
      'Galvanic 2500V isolation between logic and load'
    ],
    specs: {
      'Isolation Voltage': '2500 Vrms',
      'Response Time': '< 1 ms switching latency',
      'Enclosure': 'Flame-retardant polyamide DIN housing',
      'Current Draw': '85mA @ 24VDC full engagement'
    },
    isNew: false
  },
  {
    id: 'gik-sen-env-pro',
    name: 'Gikspot Environmental & VOC Industrial Multi-Sensor',
    category: 'Sensors',
    price: 220,
    inStock: true,
    stockCount: 58,
    protocol: 'Modbus RTU / I2C / 4-20mA',
    rating: 4.7,
    reviewsCount: 44,
    sku: 'GS-ENV-PRO',
    shortDesc: 'Calibrated laboratory-grade sensor monitoring temperature, relative humidity, barometric pressure, CO2, and total VOCs.',
    features: [
      'Non-dispersive infrared (NDIR) optical CO2 measurement (400-10000 ppm)',
      'Sintered bronze particulate cap protects against condensation and oils',
      'Configurable dual 4-20mA analog outputs or digital RS-485 bus',
      'Self-calibrating baseline algorithm with manual zero-point override'
    ],
    specs: {
      'Accuracy': '±0.2°C Temp, ±1.5% RH, ±30 ppm CO2',
      'Enclosure': 'Wall-mount UV-resistant IP65 enclosure',
      'Operating Voltage': '12-30V DC',
      'Sampling Interval': '1 sec to 60 min user-programmable'
    },
    isNew: false
  },
  {
    id: 'gik-dev-iot-core',
    name: 'Gikspot Industrial Prototyping & Developer Rapid Kit',
    category: 'Prototyping',
    price: 185,
    inStock: true,
    stockCount: 77,
    protocol: 'UART / SPI / I2C / MQTT',
    rating: 4.9,
    reviewsCount: 89,
    sku: 'GS-DEV-KIT',
    shortDesc: 'Modular hardware developer platform with breakout boards for rapid industrial POC validation and edge testing.',
    features: [
      'Pre-flashed with Gikspot telemetry daemon and local web config panel',
      'Includes 3 modular click-boards: Vibration, Thermal, and Relay',
      'Compatible with Arduino, ESP-IDF, FreeRTOS, and Zephyr OS',
      'USB-C debugging with on-board hardware probe'
    ],
    specs: {
      'MCU': 'Dual-core 240MHz with 8MB PSRAM and 16MB Flash',
      'Included': 'Mainboard, 3 sensor boards, DIN clip, antenna array',
      'Documentation': 'Open-source GitHub SDK and schematics',
      'Warranty': '2 years direct replacement'
    },
    isNew: true
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Vanguard Precision Manufacturing',
    industry: 'Automotive Powertrain',
    metric: '94% Reduction in Unscheduled Downtime',
    timeline: 'Deployed across 4 facilities in 12 weeks',
    title: 'Transforming 48 CNC Milling Lines with AI Predictive Telemetry',
    challenge: 'High-frequency spindle bearing failures were costing Vanguard $42,000 per hour in scrap parts and unscheduled tooling stoppage.',
    solution: 'Gikspot deployed 192 tri-axis vibration nodes hooked into our edge predictive engine. The system predicts micro-crack propagation 64 hours before thermal runaway, auto-scheduling maintenance during off-peak shifts.',
    quote: {
      text: 'Gikspot delivered what legacy industrial vendors promised for years: plug-and-play sensor telemetry that paid for itself within the first quarter.',
      author: 'Erich Lindner',
      role: 'Head of Reliability Engineering, Vanguard'
    }
  },
  {
    client: 'Strata Cloud Logistics',
    industry: 'Automated Warehousing',
    metric: '62% Reduction in Cloud Ingestion Overheads',
    timeline: 'Architecture revamp in 8 weeks',
    title: 'Scaling an IoT Telemetry Pipeline to 1.8M Messages / Minute',
    challenge: 'A legacy centralized database bottlenecked warehouse conveyer telemetry, creating 14-second data lags and runaway cloud billing.',
    solution: 'Gikspot re-architected the ingestion layer using distributed Go microservices, Kafka event partitions, and local edge deduplication gateways.',
    quote: {
      text: 'Their technical consultancy was decisive. The team not only fixed our throughput bottlenecks but engineered a system capable of 10x scale.',
      author: 'Devon Patel',
      role: 'VP of Platform Engineering, Strata Logistics'
    }
  }
];

export const INITIAL_SMART_DEVICES: SmartDeviceNode[] = [
  {
    id: 'dev-1',
    name: 'Cleanroom HVAC Climate Controller',
    zone: 'Server Room',
    type: 'climate',
    status: 'online',
    value: '20.4°C · 45% RH',
    isActive: true,
    powerDrawWatts: 1420
  },
  {
    id: 'dev-2',
    name: 'Assembly Line Primary Motor Bank',
    zone: 'Assembly Line',
    type: 'power',
    status: 'online',
    value: '400V · 48.2A Load',
    isActive: true,
    powerDrawWatts: 19280
  },
  {
    id: 'dev-3',
    name: 'Facility Perimeter Thermal Sensor Array',
    zone: 'Facility Perimeter',
    type: 'security',
    status: 'online',
    value: 'Perimeter Secure',
    isActive: true,
    powerDrawWatts: 65
  },
  {
    id: 'dev-4',
    name: 'Dynamic Circadian Architectural Lighting',
    zone: 'Smart Office',
    type: 'lighting',
    status: 'online',
    value: '4200K · 75% Intensity',
    isActive: true,
    powerDrawWatts: 380
  }
];

export const TOURNAMENT_LIST: TournamentItem[] = [
  {
    id: 'tourney-01',
    title: 'Gikspot Masters CS2 Invitational 2027',
    game: 'Counter-Strike 2',
    prizePool: '$45,000 USD',
    dates: 'May 14 - May 16, 2027',
    format: '5v5 Double Elimination · LAN Arena',
    maxTeams: 16,
    registeredTeams: 12,
    status: 'Registration Open',
    rigSpecs: 'Gikspot Apex Rig: Intel Core i9-14900KS · RTX 4090 · 360Hz BenQ ZOWIE'
  },
  {
    id: 'tourney-02',
    title: 'Gikspot Sim-Racing Endurance Championship',
    game: 'Assetto Corsa Competizione',
    prizePool: '$25,000 USD',
    dates: 'July 9 - July 11, 2027',
    format: '24-Hour Team Relay · Direct Drive Rigs',
    maxTeams: 24,
    registeredTeams: 18,
    status: 'Registration Open',
    rigSpecs: 'Direct Drive 25Nm Wheelbase · Hydraulic 3-Pedal Cell · Triple 4K OLED'
  },
  {
    id: 'tourney-03',
    title: 'Apex Legends Regional Tech Cup',
    game: 'Apex Legends',
    prizePool: '$15,000 USD',
    dates: 'September 22 - September 24, 2027',
    format: 'Trios Battle Royale · 6 Matches Per Stage',
    maxTeams: 20,
    registeredTeams: 20,
    status: 'Qualifiers',
    rigSpecs: 'Gikspot Tier-1 Competition Workstation · 32GB 6400MHz DDR5'
  }
];
