import React from 'react';
import { ArrowDownRight, ArrowUpRight, Repeat } from 'lucide-react';
import { HydroComponent, SimulationParams } from '../types/hydro';

interface SchematicBombeoProps {
  components: HydroComponent[];
  params: SimulationParams;
  onTogglePumpMode: () => void;
  selectedComponentId: string | null;
  onSelectComponent: (component: HydroComponent) => void;
  hoveredComponentId: string | null;
  onHoverComponent: (id: string | null) => void;
}

export const SchematicBombeo: React.FC<SchematicBombeoProps> = ({
  components,
  params,
  onTogglePumpMode,
  selectedComponentId,
  onSelectComponent,
  hoveredComponentId,
  onHoverComponent
}) => {
  const isRunning = params.isRunning && params.gateOpening > 0;
  const isPumping = params.pumpMode === 'pumping';
  const flowFactor = (params.flow / 95) * params.speed * (params.gateOpening / 100);
  const animDuration = isRunning ? Math.max(0.3, 2.2 / Math.max(flowFactor, 0.2)) : 0;
  const turbineRpmDuration = isRunning ? Math.max(0.18, 1.5 / Math.max(flowFactor, 0.2)) : 0;

  return (
    <div className="relative w-full aspect-[16/9] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden select-none">
      <svg
        viewBox="0 0 1000 562.5"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="skyGradBombeo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#05101a" />
            <stop offset="50%" stopColor="#0b1726" />
            <stop offset="100%" stopColor="#132337" />
          </linearGradient>

          <linearGradient id="waterUpperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="waterLowerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#0284c7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.98" />
          </linearGradient>

          <filter id="glowEffectBombeo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sky */}
        <rect width="1000" height="562.5" fill="url(#skyGradBombeo)" />

        {/* Mountain Silhouette in background */}
        <path
          d="M0,200 L160,80 L320,160 L480,90 L640,170 L800,100 L1000,180 L1000,562.5 L0,562.5 Z"
          fill="#091422"
          opacity="0.85"
        />

        {/* Mountain Top Plateau Profile for Upper Reservoir */}
        <path
          d="M0,230 L70,160 L320,160 L440,240 L580,240 L700,380 L820,380 L1000,420 L1000,562.5 L0,562.5 Z"
          fill="#132032"
        />

        {/* Deep Rock Massif (Cavern host rock) */}
        <path
          d="M320,240 L500,240 L680,360 L800,380 L1000,420 L1000,562.5 L320,562.5 Z"
          fill="#0e1726"
        />

        {/* ---------------- 1. EMBALSE SUPERIOR (UPPER RESERVOIR) ---------------- */}
        {/* Upper Basin excavation */}
        <polygon
          points="80,160 300,160 280,240 100,240"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* Upper Reservoir Water Body */}
        <polygon
          points="88,172 292,172 278,236 102,236"
          fill="url(#waterUpperGrad)"
        />
        {/* Water surface ripples */}
        <line x1="90" y1="172" x2="290" y2="172" stroke="#6ee7b7" strokeWidth="2" opacity="0.8" />
        <text x="185" y="152" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">
          Embalse Superior (+Cota)
        </text>

        {/* ---------------- 2. TOMA / DESAGÜE BIDIRECCIONAL ---------------- */}
        <rect x="280" y="200" width="30" height="38" rx="2" fill="#334155" stroke="#10b981" strokeWidth="1.5" />
        <line x1="285" y1="205" x2="285" y2="233" stroke="#a7f3d0" strokeWidth="1.5" />
        <line x1="295" y1="205" x2="295" y2="233" stroke="#a7f3d0" strokeWidth="1.5" />
        <line x1="305" y1="205" x2="305" y2="233" stroke="#a7f3d0" strokeWidth="1.5" />

        {/* ---------------- 3. POZO VERTICAL & CONDUCCIÓN DE ALTA PRESIÓN ---------------- */}
        {/* Horizontal headrace tunnel */}
        <path d="M310,225 L450,225" fill="none" stroke="#0f172a" strokeWidth="22" />
        <path d="M310,225 L450,225" fill="none" stroke="#059669" strokeWidth="14" />

        {/* Vertical Shaft (Pozo vertical en roca) */}
        <path d="M450,225 L450,440" fill="none" stroke="#0f172a" strokeWidth="24" />
        <path d="M450,225 L450,440" fill="none" stroke="#059669" strokeWidth="16" />

        {/* Pressure Tunnel to cavern */}
        <path d="M450,440 L600,440" fill="none" stroke="#0f172a" strokeWidth="22" />
        <path d="M450,440 L600,440" fill="none" stroke="#059669" strokeWidth="14" />

        {/* Bidirectional Water Flow Particles in Tunnel & Vertical Shaft */}
        {isRunning && (
          <g>
            <path
              d="M310,225 L450,225 L450,440 L600,440"
              fill="none"
              stroke="#a7f3d0"
              strokeWidth="4"
              strokeDasharray="14 14"
              className={isPumping ? 'animate-water-flow-reverse' : 'animate-water-flow'}
              style={{ animationDuration: `${animDuration}s` }}
            />
          </g>
        )}

        {/* ---------------- 4. CHIMENEA DE EQUILIBRIO BIDIRECCIONAL ---------------- */}
        {/* Surge tank shaft */}
        <rect x="438" y="125" width="24" height="100" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <rect x="441" y="160" width="18" height="65" fill="#34d399" opacity="0.85" />
        <line x1="441" y1="160" x2="459" y2="160" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
        <text x="450" y="118" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">
          Chimenea Reversible
        </text>

        {/* Head dimension H indicator */}
        <g opacity="0.85">
          <line x1="380" y1="180" x2="380" y2="440" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="370" y1="180" x2="390" y2="180" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="370" y1="440" x2="390" y2="440" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="365" y="315" textAnchor="end" fill="#fbbf24" fontSize="11" fontWeight="bold">
            Salto H = {params.head} m
          </text>
        </g>

        {/* ---------------- 5. CAVERNA SUBTERRÁNEA DE POTENCIA ---------------- */}
        {/* Underground Cavern Vault outline */}
        <path
          d="M580,340 C580,320 670,320 670,340 L670,470 L580,470 Z"
          fill="#09101d"
          stroke="#475569"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
        <text x="625" y="335" textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="bold">
          Caverna Profunda
        </text>

        {/* Overhead crane in cavern */}
        <rect x="585" y="348" width="80" height="6" fill="#334155" />

        {/* Reversible Motor-Generator Unit */}
        <rect x="602" y="365" width="46" height="26" rx="3" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
        <g
          transform="translate(625, 378)"
          style={{
            transformOrigin: '625px 378px',
            animation: isRunning
              ? `spin ${turbineRpmDuration}s linear infinite ${isPumping ? 'reverse' : 'normal'}`
              : 'none'
          }}
        >
          <rect x="-16" y="-7" width="32" height="14" rx="1" fill="#3b82f6" />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#bfdbfe" strokeWidth="2.5" />
        </g>
        <text x="625" y="401" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">
          {isPumping ? 'Motor Síncrono' : 'Generador Síncrono'}
        </text>

        {/* Main Shaft */}
        <line x1="625" y1="403" x2="625" y2="422" stroke="#cbd5e1" strokeWidth="5" />

        {/* Reversible Pump-Turbine casing */}
        <circle cx="625" cy="440" r="24" fill="#1e293b" stroke="#10b981" strokeWidth="2" />

        {/* Reversible Runner (gira en sentido horario en generación, antihorario en bombeo) */}
        <g
          transform="translate(625, 440)"
          style={{
            transformOrigin: '625px 440px',
            animation: isRunning
              ? `spin ${turbineRpmDuration}s linear infinite ${isPumping ? 'reverse' : 'normal'}`
              : 'none'
          }}
        >
          <circle cx="0" cy="0" r="8" fill="#d97706" />
          {/* Reversible dual-curved blades */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d="M0,0 Q10,-10 16,-6 Q12,2 0,0"
              fill={isPumping ? '#34d399' : '#fbbf24'}
              transform={`rotate(${deg})`}
            />
          ))}
        </g>

        {/* ---------------- 6. TÚNEL INFERIOR & EMBALSE INFERIOR ---------------- */}
        {/* Tailrace/Suction Tunnel */}
        <path d="M649,440 L780,440" fill="none" stroke="#0f172a" strokeWidth="22" />
        <path d="M649,440 L780,440" fill="none" stroke="#0284c7" strokeWidth="14" />
        {isRunning && (
          <path
            d="M649,440 L780,440"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="3.5"
            strokeDasharray="10 10"
            className={isPumping ? 'animate-water-flow-reverse' : 'animate-water-flow'}
            style={{ animationDuration: `${animDuration * 0.8}s` }}
          />
        )}

        {/* Embalse Inferior (Lower Reservoir) Basin */}
        <polygon
          points="780,420 980,420 960,490 800,490"
          fill="#1e293b"
          stroke="#334155"
          strokeWidth="2"
        />
        {/* Lower Reservoir Water Body */}
        <polygon
          points="785,426 975,426 957,486 803,486"
          fill="url(#waterLowerGrad)"
        />
        <line x1="785" y1="426" x2="975" y2="426" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
        <text x="880" y="415" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
          Embalse Inferior (-Cota)
        </text>

        {/* ---------------- 7. CONEXIÓN A RED ELÉCTRICA BIDIRECCIONAL ---------------- */}
        {/* Substation & Switchyard */}
        <rect x="740" y="320" width="34" height="26" rx="2" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="750" cy="333" r="5" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
        <circle cx="762" cy="333" r="5" stroke="#a5b4fc" strokeWidth="1.5" fill="none" />
        <text x="757" y="312" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">
          Trafo Reversible
        </text>

        {/* Power Line from Cavern to Surface Substation */}
        <line x1="640" y1="365" x2="740" y2="330" stroke="#facc15" strokeWidth="2" strokeDasharray="4 2" />

        {/* Transmission Tower */}
        <g transform="translate(850, 240)">
          <line x1="0" y1="90" x2="16" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="32" y1="90" x2="16" y2="0" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="6" y1="55" x2="26" y2="55" stroke="#94a3b8" strokeWidth="1" />
          <line x1="8" y1="30" x2="24" y2="30" stroke="#94a3b8" strokeWidth="1" />
          <line x1="-5" y1="20" x2="37" y2="20" stroke="#cbd5e1" strokeWidth="2" />
        </g>

        {/* Power Line to National Grid */}
        <path
          d="M774,320 Q810,270 866,270 T940,265"
          fill="none"
          stroke={isPumping ? '#34d399' : '#facc15'}
          strokeWidth="2"
          strokeDasharray={isRunning ? '6 4' : 'none'}
          className={isRunning ? (isPumping ? 'animate-water-flow-reverse' : 'animate-water-flow') : ''}
          style={{ animationDuration: '0.5s' }}
        />

        {/* Mode Direction Indicator Overlay on SVG */}
        <g transform="translate(480, 50)">
          <rect x="0" y="0" width="220" height="42" rx="8" fill="#0f172a" stroke={isPumping ? '#10b981' : '#f59e0b'} strokeWidth="1.5" opacity="0.95" />
          <text x="20" y="26" fill={isPumping ? '#34d399' : '#fbbf24'} fontSize="12" fontWeight="bold">
            {isPumping ? 'MODO BOMBEO (Valle)' : 'MODO GENERACIÓN (Punta)'}
          </text>
        </g>

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
                  stroke="#34d399"
                  strokeWidth="2"
                  className="animate-ping"
                  opacity="0.7"
                />
              )}

              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 13 : isHovered ? 12 : 10}
                fill={isSelected ? '#059669' : isHovered ? '#047857' : '#0f172a'}
                stroke={isSelected ? '#34d399' : isHovered ? '#6ee7b7' : '#64748b'}
                strokeWidth={isSelected ? 2.5 : 1.5}
                filter="url(#glowEffectBombeo)"
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
                    stroke="#34d399"
                    strokeWidth="1"
                    opacity="0.95"
                  />
                  <text
                    x={cx}
                    y={cy - 18}
                    textAnchor="middle"
                    fill="#ecfdf5"
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

      {/* Floating status & mode switch inside schematic */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-800 text-slate-300">
        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePumpMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-all ${
              isPumping
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500'
                : 'bg-amber-600 text-white shadow-lg shadow-amber-900/40 hover:bg-amber-500'
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Alternar: {isPumping ? 'Modo Bombeo ➔ Generación' : 'Modo Generación ➔ Bombeo'}</span>
          </button>

          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">
            Flujo de Agua:{' '}
            <strong className={isPumping ? 'text-emerald-300' : 'text-amber-300'}>
              {isPumping ? 'Ascendente (Inferior ➔ Superior)' : 'Descendente (Superior ➔ Inferior)'}
            </strong>
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Haz clic en cualquier punto (1 - {components.length}) para ver su función
        </div>
      </div>
    </div>
  );
};
