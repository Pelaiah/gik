export type NavigationTab = 'overview' | 'services' | 'predictive-ai' | 'smart-iot' | 'hardware-shop' | 'estimator' | 'gaming-future';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  targetAudience: 'Enterprises' | 'Startups' | 'Industrial' | 'Commercial';
}

export interface HardwareProduct {
  id: string;
  name: string;
  category: 'Sensors' | 'Industrial Controllers' | 'Automation Hardware' | 'IoT Gateways' | 'Prototyping';
  price: number;
  inStock: boolean;
  stockCount: number;
  protocol: string;
  rating: number;
  reviewsCount: number;
  sku: string;
  shortDesc: string;
  features: string[];
  specs: Record<string, string>;
  isNew?: boolean;
}

export interface CartItem {
  product: HardwareProduct;
  quantity: number;
}

export interface PredictiveTelemetry {
  timestamp: string;
  rpm: number;
  temperatureC: number;
  vibrationMmS: number;
  bearingLoadKn: number;
  acousticDb: number;
  healthScore: number;
  status: 'nominal' | 'warning' | 'critical';
  predictedFailureHours: number | null;
  activeAnomaly: string | null;
}

export interface SmartDeviceNode {
  id: string;
  name: string;
  zone: 'Server Room' | 'Assembly Line' | 'Smart Office' | 'Facility Perimeter';
  type: 'climate' | 'lighting' | 'power' | 'security' | 'sensor';
  status: 'online' | 'standby' | 'alert';
  value: string;
  isActive: boolean;
  powerDrawWatts: number;
}

export interface TournamentItem {
  id: string;
  title: string;
  game: string;
  prizePool: string;
  dates: string;
  format: string;
  maxTeams: number;
  registeredTeams: number;
  status: 'Registration Open' | 'Coming Soon' | 'Qualifiers';
  rigSpecs: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  metric: string;
  timeline: string;
  title: string;
  challenge: string;
  solution: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
}
