import React from 'react';
import { HydroComponent, SimulationParams } from '../types/hydro';

interface SchematicEmbalseProps {
  components: HydroComponent[];
  params: SimulationParams;
  selectedComponentId: string | null;
  onSelectComponent: (component: HydroComponent) => void;
  hoveredComponentId: string | null;
  onHoverComponent: (id: string | null) => void;
}

export const SchematicEmbalse: React.FC<SchematicEmbalseProps> = ({
  components,
  params,
  selectedComponentId,
  onSelectComponent,
  hoveredComponentId,
  onHoverComponent
}) => {
  const isRunning = params.isRunning && params.gateOpening > 0;
  const flowFactor = (params.flow / 120) * params.speed * (params.gateOpening / 100);
  const animDuration = isRunning ? Math.max(0.3, 2.2 / Math.max(flowFactor, 0.2)) : 0;
  const turbineRpmDuration = isRunning ? Math.max(0.15, 1.4 / Math.max(flowFactor, 0.2)) : 0;

  // Reservoir water level calculation based on slider
  // Level 100% is near top of dam (y=160), 0% is near intake (y=260)
  const reservoirWaterY = 250 - (params.reservoirLevel / 100) * 80;
  const isSpillwayActive = params.reservoirLevel >= 85;

  return (
    <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden select-none">
      <svg
        viewBox="0 0 1000 562.5"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGradEmbalse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080e21" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          <linearGradient id="damConcrete" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="60%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="deepWaterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#0284c7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#082f49" stopOpacity="0.98" />
          </linearGradient>

          <filter id="glowEffectEmbalse" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1000" height="562.5" fill="url(#skyGradEmbalse)" />

        {/* Background Mountain Peaks */}
        <path
          d="M0,180 L120,90 L260,170 L380,100 L540,190 L680,110 L840,170 L1000,120 L1000,562.5 L0,562.5 Z"
          fill="#111827"
          opacity="0.8"
        />

        {/* Midground Mountain Valley Profile */}
        <path
          d="M0,230 L180,240 L300,320 L550,330 L700,420 L860,420 L1000,450 L1000,562.5 L0,562.5 Z"
          fill="#1e293b"
        />

        {/* Mountain Solid Rock Underneath for Underground Galleries */}
        <path
          d="M300,260 L450,260 L600,280 L750,420 L1000,430 L1000,562.5 L300,562.5 Z"
          fill="#172033"
        />

        {/* ---------------- 1. GRAN EMBALSE (RESERVOIR) ---------------- */}
        {/* Reservoir Water Body */}
        <path
          d={`M0,${reservoirWaterY} L270,${reservoirWaterY} L270,360 L0,360 Z`}
          fill="url(#deepWaterGrad)"
        />
        {/* Reservoir animated water ripples */}
        <path
          d={`M0,${reservoirWaterY} Q70,${reservoirWaterY - 3} 140,${reservoirWaterY} T270,${reservoirWaterY}`}
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2.5"
          opacity="0.8"
        />
        {/* Water depth volume lines */}
        <line x1="20" y1={reservoirWaterY + 30} x2="250" y2={reservoirWaterY + 30} stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.4" />
        <line x1="20" y1={reservoirWaterY + 65} x2="250" y2={reservoirWaterY + 65} stroke="#0284c7" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.4" />
        <text x="70" y={reservoirWaterY + 45} fill="#bae6fd" fontSize="13" fontWeight="bold" opacity="0.8">
          Embalse de Regulación
        </text>

        {/* ---------------- 2. PRESA DE HORMIGÓN & ALIVIADERO ---------------- */}
        {/* Dam Profile (Gravity dam profile) */}
        <polygon
          points="260,160 280,160 330,360 260,360"
          fill="url(#damConcrete)"
          stroke="#475569"
          strokeWidth="2"
        />
        {/* Dam Crest Roadway (Coronación) */}
        <rect x="255" y="156" width="30" height="7" fill="#94a3b8" rx="1" />

        {/* Spillway (Aliviadero de superficie) */}
        <path
          d="M276,168 C290,190 310,260 335,350"
          stroke="#334155"
          strokeWidth="10"
          fill="none"
        />

        {/* Spillway gates water discharge if level is high */}
        {isSpillwayActive && (
          <g>
            <path
              d="M276,170 C290,195 310,265 340,355"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="6"
              strokeDasharray="8 6"
              className="animate-water-flow"
              style={{ animationDuration: '0.5s' }}
            />
            {/* Ski jump water foam */}
            <circle cx="342" cy="355" r="7" fill="#ffffff" opacity="0.8" className="animate-pulse" />
          </g>
        )}

        {/* Desagüe de fondo (Bottom Outlet) */}
        <rect x="260" y="338" width="55" height="10" fill="#1e293b" stroke="#64748b" />
        <circle cx="288" cy="343" r="3" fill="#f59e0b" />

        {/* ---------------- 3. TORRE DE TOMA SUMERGIDA ---------------- */}
        <rect x="235" y="220" width="22" height="110" fill="#334155" stroke="#64748b" strokeWidth="1.5" rx="2" />
        {/* Trash rack grids */}
        <line x1="235" y1="260" x2="257" y2="260" stroke="#0ea5e9" strokeWidth="1.5" />
        <line x1="235" y1="275" x2="257" y2="275" stroke="#0ea5e9" strokeWidth="1.5" />
        <line x1="235" y1="290" x2="257" y2="290" stroke="#0ea5e9" strokeWidth="1.5" />

        {/* ---------------- 4. GALERÍA DE PRESIÓN SUBTERRÁNEA ---------------- */}
        <path
          d="M255,300 L510,300"
          fill="none"
          stroke="#0f172a"
          strokeWidth="24"
        />
        <path
          d="M255,300 L510,300"
          fill="none"
          stroke="#0284c7"
          strokeWidth="16"
        />
        {isRunning && (
          <path
            d="M255,300 L510,300"
            fill="none"
            stroke="#e0f2fe"
            strokeWidth="3.5"
            strokeDasharray="14 14"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration}s` }}
          />
        )}

        {/* ---------------- 5. CHIMENEA DE EQUILIBRIO (SURGE TANK) ---------------- */}
        {/* Vertical surge shaft open to mountain surface */}
        <rect x="495" y="160" width="30" height="145" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        {/* Water oscillating inside surge tank */}
        <rect
          x="499"
          y="210"
          width="22"
          height="95"
          fill="#38bdf8"
          opacity="0.85"
        />
        {/* Oscillating water line */}
        <line x1="499" y1="210" x2="521" y2="210" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
        <text x="510" y="152" textAnchor="middle" fill="#93c5fd" fontSize="9.5" fontWeight="bold">
          Chimenea de Equilibrio
        </text>

        {/* ---------------- 6. TUBERÍA FORZADA DE GRAN CAÍDA ---------------- */}
        {/* Steel penstock down mountain slope */}
        <line
          x1="520"
          y1="300"
          x2="720"
          y2="445"
          stroke="#0f172a"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <line
          x1="520"
          y1="300"
          x2="720"
          y2="445"
          stroke="#475569"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {/* High speed water inside penstock */}
        {isRunning && (
          <line
            x1="520"
            y1="300"
            x2="720"
            y2="445"
            stroke="#bae6fd"
            strokeWidth="7"
            strokeDasharray="16 12"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration * 0.6}s` }}
          />
        )}

        {/* Anchor blocks on mountain */}
        <rect x="580" y="340" width="14" height="20" fill="#334155" stroke="#64748b" />
        <rect x="650" y="390" width="14" height="20" fill="#334155" stroke="#64748b" />

        {/* Head H indicator dimension */}
        <g opacity="0.85">
          <line x1="450" y1={reservoirWaterY} x2="450" y2="450" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="440" y1={reservoirWaterY} x2="460" y2={reservoirWaterY} stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="440" y1="450" x2="460" y2="450" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="435" y={(reservoirWaterY + 450) / 2} textAnchor="end" fill="#fbbf24" fontSize="11" fontWeight="bold">
            Gran Salto H = {params.head} m
          </text>
        </g>

        {/* ---------------- 7. CASA DE MÁQUINAS (TURBINA FRANCIS) ---------------- */}
        <rect x="710" y="375" width="115" height="110" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="2" />
        <polygon points="705,375 767,345 830,375" fill="#1e293b" stroke="#64748b" strokeWidth="2" />

        {/* Válvula esférica de guarda */}
        <circle cx="722" cy="445" r="9" fill="#334155" stroke="#f59e0b" strokeWidth="1.5" />
        <line x1="718" y1="445" x2="726" y2="445" stroke="#fbbf24" strokeWidth="2" />

        {/* Francis Turbine Spiral Casing (Caracol) */}
        <circle cx="755" cy="445" r="26" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />

        {/* Francis Runner (Álabes curvados centrípetos) */}
        <g
          transform="translate(755, 445)"
          style={{
            transformOrigin: '755px 445px',
            animation: isRunning ? `spin ${turbineRpmDuration}s linear infinite` : 'none'
          }}
        >
          <circle cx="0" cy="0" r="10" fill="#d97706" />
          {/* Francis spiral curved blades */}
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M0,0 Q12,-6 18,-18 Q8,-12 0,0"
              fill="#fbbf24"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* Vertical Shaft to generator */}
        <line x1="755" y1="419" x2="755" y2="408" stroke="#cbd5e1" strokeWidth="5" />

        {/* Large Synchronous Alternator */}
        <rect x="732" y="388" width="46" height="22" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
        <g
          transform="translate(755, 399)"
          style={{
            transformOrigin: '755px 399px',
            animation: isRunning ? `spin ${turbineRpmDuration}s linear infinite` : 'none'
          }}
        >
          <rect x="-16" y="-6" width="32" height="12" rx="1" fill="#3b82f6" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#93c5fd" strokeWidth="2.5" />
        </g>
        <text x="755" y="382" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">
          Alternador Síncrono
        </text>

        {/* Draft Tube / Tubo de aspiración discharging into tailrace */}
        <path
          d="M755,465 C765,485 790,485 830,480"
          fill="none"
          stroke="#0284c7"
          strokeWidth="16"
          strokeLinecap="round"
        />
        {isRunning && (
          <path
            d="M755,465 C765,485 790,485 830,480"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="3.5"
            strokeDasharray="6 8"
            className="animate-water-flow"
            style={{ animationDuration: `${animDuration * 0.75}s` }}
          />
        )}

        {/* Downstream river channel */}
        <path
          d="M830,480 C880,480 930,485 1000,490"
          fill="none"
          stroke="#0369a1"
          strokeWidth="28"
          strokeLinecap="round"
        />
        <text x="890" y="470" fill="#38bdf8" fontSize="10" fontWeight="bold">
          Canal de Desagüe
        </text>

        {/* ---------------- 8. PARQUE DE TRANSFORMADORES & RED 400 kV ---------------- */}
        {/* Step-up Substation Transformer */}
        <rect x="850" y="415" width="34" height="28" rx="2" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="860" cy="429" r="6" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
        <circle cx="874" cy="429" r="6" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
        <text x="867" y="408" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">
          Trafo 400 kV
        </text>

        {/* High Voltage Pylon */}
        <g transform="translate(930, 330)">
          <line x1="0" y1="100" x2="18" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="36" y1="100" x2="18" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="6" y1="65" x2="30" y2="65" stroke="#94a3b8" strokeWidth="1" />
          <line x1="10" y1="35" x2="26" y2="35" stroke="#94a3b8" strokeWidth="1" />
          <line x1="-5" y1="25" x2="41" y2="25" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="-10" y1="45" x2="46" y2="45" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* 400 kV Power transmission lines */}
        <path
          d="M875,415 Q910,365 948,365 T1015,360"
          fill="none"
          stroke="#facc15"
          strokeWidth="1.8"
          strokeDasharray={isRunning ? '6 4' : 'none'}
          className={isRunning ? 'animate-water-flow' : ''}
          style={{ animationDuration: '0.5s' }}
        />

        {/* ---------------- INTERACTIVE COMPONENT HOTSPOTS ---------------- */}
        {components.map((comp, idx) => {
          const isSelected = selectedComponentId === comp.id;
          const isHovered = hoveredComponentId === comp.id;

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
              {(isSelected || isHovered) && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="18"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2"
                  className="animate-ping"
                  opacity="0.7"
                />
              )}

              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 13 : isHovered ? 12 : 10}
                fill={isSelected ? '#1d4ed8' : isHovered ? '#2563eb' : '#0f172a'}
                stroke={isSelected ? '#60a5fa' : isHovered ? '#93c5fd' : '#64748b'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                filter="url(#glowEffectEmbalse)"
              />

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

              {isHovered && !isSelected && (
                <g className="pointer-events-none">
                  <rect
                    x={cx - 75}
                    y={cy - 34}
                    width="150"
                    height="24"
                    rx="4"
                    fill="#0f172a"
                    stroke="#60a5fa"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x={cx}
                    y={cy - 18}
                    textAnchor="middle"
                    fill="#eff6ff"
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
          <span className="flex items-center gap-1.5 font-medium text-blue-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Central con Embalse
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Nivel Embalse: <strong className="text-slate-200">{params.reservoirLevel}%</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Salto Neto: <strong className="text-slate-200">{params.head} m</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">
            Caudal Turbinado: <strong className="text-slate-200">{params.flow} m³/s</strong>
          </span>
        </div>

        <div className="text-[11px] text-slate-400 hidden sm:block">
          Haz clic sobre los puntos numerados (1 - {components.length}) para inspeccionar cada elemento
        </div>
      </div>
    </div>
  );
};
