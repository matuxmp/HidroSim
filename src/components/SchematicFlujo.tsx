import React from 'react';
import { HydroComponent, SimulationParams } from '../types/hydro';

interface SchematicFlujoProps {
  components: HydroComponent[];
  params: SimulationParams;
  selectedComponentId: string | null;
  onSelectComponent: (component: HydroComponent) => void;
  hoveredComponentId: string | null;
  onHoverComponent: (id: string | null) => void;
}

export const SchematicFlujo: React.FC<SchematicFlujoProps> = ({
  components,
  params,
  selectedComponentId,
  onSelectComponent,
  hoveredComponentId,
  onHoverComponent
}) => {
  // Animation speed based on flow rate and running state
  const isRunning = params.isRunning && params.gateOpening > 0;
  const flowFactor = (params.flow / 80) * params.speed * (params.gateOpening / 100);
  const animDuration = isRunning ? Math.max(0.4, 2.5 / Math.max(flowFactor, 0.2)) : 0;
  const turbineRpmDuration = isRunning ? Math.max(0.2, 1.8 / Math.max(flowFactor, 0.2)) : 0;

  const componentMap = new Map(components.map((c) => [c.id, c]));

  return (
    <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden select-none">
      {/* Background Terrain and Sky SVG */}
      <svg
        viewBox="0 0 1000 562.5"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skyGradFlujo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1329" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="mountainGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="terrainGradFlujo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#172554" />
            <stop offset="100%" stopColor="#091124" />
          </linearGradient>

          <linearGradient id="waterGradFlujo" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="penstockGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1000" height="562.5" fill="url(#skyGradFlujo)" />

        {/* Mountain Silhouette in background */}
        <path
          d="M0,240 L80,180 L180,230 L320,150 L450,220 L580,140 L720,200 L860,130 L1000,190 L1000,562.5 L0,562.5 Z"
          fill="url(#mountainGrad1)"
          opacity="0.6"
        />

        {/* Foreground Mountain & Hillside Slopes */}
        {/* Left river bank slope */}
        <path
          d="M0,280 Q100,290 200,320 T400,360 L400,562.5 L0,562.5 Z"
          fill="#131c31"
        />

        {/* Central terrace slope for the intake, channel and forebay */}
        <path
          d="M160,330 L600,330 L720,440 L850,440 L850,562.5 L160,562.5 Z"
          fill="#1e293b"
          opacity="0.9"
        />

        {/* Lower river bed where natural stream continues and water is returned */}
        <path
          d="M0,450 C150,440 250,480 450,490 C650,500 850,485 1000,495 L1000,562.5 L0,562.5 Z"
          fill="#0c1322"
        />

        {/* ---------------- 1. RÍO ARRIBA & AZUD DE DERIVACIÓN ---------------- */}
        {/* Main river coming from upstream */}
        <path
          d="M-20,270 C40,270 80,280 130,290 C160,295 180,310 190,335 C195,350 180,380 170,410 C160,440 180,460 250,470"
          fill="none"
          stroke="#0369a1"
          strokeWidth="32"
          strokeLinecap="round"
        />

        {/* Natural river continuing downstream (Caudal Ecológico) */}
        <path
          d="M180,370 C190,410 210,450 350,470 C500,485 700,480 1020,495"
          fill="none"
          stroke="#0284c7"
          strokeWidth="20"
          strokeOpacity="0.75"
        />
        {/* Flow particles along natural river bed */}
        {isRunning && (
          <path
            d="M180,370 C190,410 210,450 350,470 C500,485 700,480 1020,495"
            fill="none"
            stroke="#7dd3fc"
            strokeWidth="3"
            strokeDasharray="8 14"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration * 1.5}s` }}
          />
        )}

        {/* Azud de derivación (pequeño dique vertedor) */}
        <polygon
          points="170,305 195,305 190,345 165,345"
          fill="#475569"
          stroke="#94a3b8"
          strokeWidth="2"
        />
        <text x="180" y="300" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
          Azud
        </text>

        {/* Escala de peces bio-ambiental */}
        <path
          d="M155,310 L160,320 L155,330 L160,340"
          stroke="#22c55e"
          strokeWidth="2.5"
          fill="none"
        />
        <text x="140" y="332" fill="#4ade80" fontSize="9" textAnchor="end">
          Escala peces
        </text>

        {/* ---------------- 2. REJA DE TOMA & CANAL DE ADUCCIÓN ---------------- */}
        {/* Reja de desbaste */}
        <rect x="200" y="292" width="14" height="28" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
        <line x1="203" y1="294" x2="203" y2="318" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="207" y1="294" x2="207" y2="318" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="211" y1="294" x2="211" y2="318" stroke="#cbd5e1" strokeWidth="1" />

        {/* Canal de derivación a cielo abierto */}
        {/* Solera del canal */}
        <path
          d="M210,312 L380,312 L480,312 L580,312"
          fill="none"
          stroke="#334155"
          strokeWidth="22"
          strokeLinecap="square"
        />
        {/* Agua dentro del canal de derivación */}
        <path
          d="M210,312 L580,312"
          fill="none"
          stroke="url(#waterGradFlujo)"
          strokeWidth="16"
        />
        {/* Flow particles in open channel */}
        {isRunning && (
          <path
            d="M210,312 L580,312"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="3"
            strokeDasharray="12 16"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration}s` }}
          />
        )}

        {/* ---------------- 3. DESARENADOR (SEDIMENTADOR) ---------------- */}
        {/* Expanded chamber for settling sand */}
        <rect x="360" y="298" width="75" height="34" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <rect x="365" y="303" width="65" height="20" fill="#0284c7" opacity="0.85" />
        {/* Sediment at bottom of sand trap */}
        <path d="M370,328 Q397,322 425,328" stroke="#d97706" strokeWidth="3" fill="#b45309" />
        <text x="397" y="292" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="600">
          Desarenador
        </text>

        {/* ---------------- 4. CÁMARA DE CARGA Y ALIVIADERO ---------------- */}
        {/* Forebay Tank */}
        <polygon
          points="550,290 600,290 590,345 540,345"
          fill="#1e293b"
          stroke="#64748b"
          strokeWidth="2"
        />
        <polygon
          points="553,296 595,296 587,338 545,338"
          fill="#0284c7"
          opacity="0.9"
        />
        {/* Aliviadero de seguridad en cámara de carga */}
        <path d="M575,340 Q570,390 560,460" stroke="#0ea5e9" strokeWidth="3" strokeDasharray="3 3" fill="none" opacity="0.6" />

        {/* ---------------- 5. TUBERÍA FORZADA (PENSTOCK) ---------------- */}
        {/* Steel penstock descending down the slope */}
        <line
          x1="585"
          y1="335"
          x2="740"
          y2="455"
          stroke="#334155"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <line
          x1="585"
          y1="335"
          x2="740"
          y2="455"
          stroke="url(#penstockGrad)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Water inside penstock */}
        {isRunning && (
          <line
            x1="585"
            y1="335"
            x2="740"
            y2="455"
            stroke="#38bdf8"
            strokeWidth="8"
            strokeDasharray="14 14"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration * 0.7}s` }}
          />
        )}
        {/* Pipe anchorage blocks */}
        <rect x="635" y="375" width="12" height="18" fill="#475569" stroke="#64748b" />
        <rect x="690" y="415" width="12" height="18" fill="#475569" stroke="#64748b" />

        {/* Head indicator H (Salto neto) */}
        <g opacity="0.8">
          <line x1="520" y1="312" x2="520" y2="465" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="512" y1="312" x2="528" y2="312" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="512" y1="465" x2="528" y2="465" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="505" y="392" textAnchor="end" fill="#fbbf24" fontSize="11" fontWeight="bold">
            H = {params.head} m
          </text>
        </g>

        {/* ---------------- 6. CASA DE MÁQUINAS (TURBINA & GENERADOR) ---------------- */}
        {/* Powerhouse Building structure */}
        <rect x="730" y="380" width="105" height="110" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
        <polygon points="725,380 782,350 840,380" fill="#1e293b" stroke="#64748b" strokeWidth="2" />

        {/* Turbine Scroll Case / Chamber */}
        <circle cx="765" cy="455" r="24" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

        {/* Turbine Runner (Kaplan Runner with rotating blades) */}
        <g
          transform={`translate(765, 455)`}
          style={{
            transformOrigin: '765px 455px',
            animation: isRunning ? `spin ${turbineRpmDuration}s linear infinite` : 'none'
          }}
        >
          <circle cx="0" cy="0" r="8" fill="#d97706" />
          {/* Kaplan 4 blades */}
          <path d="M0,0 C8,-12 16,-8 18,-2 C12,4 6,4 0,0" fill="#f59e0b" />
          <path d="M0,0 C12,8 8,16 2,18 C-4,12 -4,6 0,0" fill="#f59e0b" />
          <path d="M0,0 C-8,12 -16,8 -18,2 C-12,-4 -6,-4 0,0" fill="#f59e0b" />
          <path d="M0,0 C-12,-8 -8,-16 -2,-18 C4,-12 4,-6 0,0" fill="#f59e0b" />
        </g>

        {/* Shaft connecting turbine to generator */}
        <line x1="765" y1="431" x2="765" y2="415" stroke="#cbd5e1" strokeWidth="4" />

        {/* Generator Stator & Rotor */}
        <rect x="745" y="395" width="40" height="20" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
        <g
          transform="translate(765, 405)"
          style={{
            transformOrigin: '765px 405px',
            animation: isRunning ? `spin ${turbineRpmDuration}s linear infinite` : 'none'
          }}
        >
          <rect x="-14" y="-5" width="28" height="10" rx="1" fill="#3b82f6" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#93c5fd" strokeWidth="2" />
        </g>

        {/* Generator Status label */}
        <text x="765" y="390" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
          Alternador
        </text>

        {/* Draft Tube / Tubo de aspiración discharging into river */}
        <path
          d="M765,475 C775,490 800,490 840,485"
          fill="none"
          stroke="#0284c7"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {isRunning && (
          <path
            d="M765,475 C775,490 800,490 840,485"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="3"
            strokeDasharray="6 8"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration * 0.8}s` }}
          />
        )}

        {/* Restitución al cauce original */}
        <path
          d="M840,485 C890,482 940,488 1000,495"
          fill="none"
          stroke="#0369a1"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <text x="890" y="475" fill="#38bdf8" fontSize="10" fontWeight="bold">
          Restitución al Río
        </text>

        {/* ---------------- 7. SUBESTACIÓN & RED ELÉCTRICA ---------------- */}
        {/* Step-up Transformer */}
        <rect x="855" y="420" width="28" height="24" rx="2" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="864" cy="432" r="5" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
        <circle cx="874" cy="432" r="5" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
        <text x="869" y="415" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontWeight="bold">
          Trafo
        </text>

        {/* High Voltage Transmission Line Towers */}
        {/* Tower 1 */}
        <g transform="translate(930, 360)">
          {/* Pylon lattice */}
          <line x1="0" y1="80" x2="15" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="30" y1="80" x2="15" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke="#94a3b8" strokeWidth="1" />
          <line x1="8" y1="25" x2="22" y2="25" stroke="#94a3b8" strokeWidth="1" />
          <line x1="0" y1="20" x2="30" y2="20" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="-5" y1="35" x2="35" y2="35" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* Power lines with electric animation */}
        <path
          d="M870,420 Q910,380 945,380 T1010,375"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1.5"
          strokeDasharray={isRunning ? '6 4' : 'none'}
          className={isRunning ? 'animate-water-flow' : ''}
          style={{ animationDuration: '0.6s' }}
        />

        {/* ---------------- INTERACTIVE COMPONENT HOTSPOTS ---------------- */}
        {components.map((comp, idx) => {
          const isSelected = selectedComponentId === comp.id;
          const isHovered = hoveredComponentId === comp.id;

          // Convert percentage coords to 1000x562.5 SVG space
          const cx = (comp.coords.x / 100) * 1000;
          const cy = (comp.coords.y / 100) * 562.5;

          return (
            <g
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              onMouseEnter={() => onHoverComponent(comp.id)}
              onMouseLeave={() => onHoverComponent(null)}
              className="cursor-pointer transition-transform duration-200"
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              {/* Outer pulsing ring if selected or hovered */}
              {(isSelected || isHovered) && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="18"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2"
                  className="animate-ping"
                  opacity="0.7"
                />
              )}

              {/* Pin background circle */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 13 : isHovered ? 12 : 10}
                fill={isSelected ? '#0284c7' : isHovered ? '#0369a1' : '#0f172a'}
                stroke={isSelected ? '#38bdf8' : isHovered ? '#7dd3fc' : '#64748b'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                filter="url(#glowEffect)"
              />

              {/* Pin index number */}
              <text
                x={cx}
                y={cy + 3.5}
                textAnchor="middle"
                fill={isSelected || isHovered ? '#ffffff' : '#cbd5e1'}
                fontSize={isSelected ? '10' : '9'}
                fontWeight="bold"
                className="pointer-events-none font-mono"
              >
                {idx + 1}
              </text>

              {/* Hover Tooltip in SVG */}
              {isHovered && !isSelected && (
                <g className="pointer-events-none">
                  <rect
                    x={cx - 70}
                    y={cy - 34}
                    width="140"
                    height="24"
                    rx="4"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x={cx}
                    y={cy - 18}
                    textAnchor="middle"
                    fill="#e0f2fe"
                    fontSize="9.5"
                    fontWeight="600"
                  >
                    {comp.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating status & legend bar inside schematic */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Flujo Continuo (Pasada)
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Salto Neto: <strong className="text-slate-200">{params.head} m</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Caudal: <strong className="text-slate-200">{params.flow} m³/s</strong>
          </span>
        </div>

        <div className="text-[11px] text-slate-400 hidden sm:block">
          Haz clic sobre los puntos numerados (1 - {components.length}) para inspeccionar cada componente
        </div>
      </div>
    </div>
  );
};
