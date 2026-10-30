export type HydroType = 'flujo' | 'embalse' | 'bombeo';

export interface HydroComponent {
  id: string;
  name: string;
  category: 'captacion' | 'conduccion' | 'generacion' | 'regulacion' | 'electrico' | 'restitucion';
  tag: string;
  description: string;
  physicsPrinciple: string;
  materials: string;
  keyFact: string;
  coords: { x: number; y: number }; // Percentage position on SVG viewBox
}

export interface HydroStationData {
  id: HydroType;
  shortName: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  headRange: string;
  flowRange: string;
  typicalTurbines: string[];
  regulationCapacity: string;
  startUpTime: string;
  defaultHead: number; // in meters (H)
  minHead: number;
  maxHead: number;
  defaultFlow: number; // in m³/s (Q)
  minFlow: number;
  maxFlow: number;
  defaultEfficiency: number; // 0.0 - 1.0
  environmentalPros: string[];
  environmentalCons: string[];
  components: HydroComponent[];
  stepGuide: {
    step: number;
    title: string;
    description: string;
    targetComponentId: string;
  }[];
}

export interface SimulationParams {
  head: number; // m
  flow: number; // m³/s
  efficiency: number; // 0.70 - 0.95
  gateOpening: number; // 0 - 100%
  isRunning: boolean;
  speed: number; // 0.5, 1, 2
  // Specific to pumped-storage:
  pumpMode: 'generation' | 'pumping';
  // Specific to run-of-river:
  riverSeason: 'estiaje' | 'medio' | 'crecida';
  // Specific to reservoir:
  reservoirLevel: number; // 0 - 100%
}

export interface QuizQuestion {
  id: number;
  type: HydroType | 'general';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
