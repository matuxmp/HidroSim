import React from 'react';
import { Zap, Home, Wind, Compass, Gauge, BarChart3 } from 'lucide-react';
import { SimulationParams, HydroType } from '../types/hydro';

interface MetricsPanelProps {
  stationType: HydroType;
  params: SimulationParams;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  stationType,
  params
}) => {
  const isRunning = params.isRunning && params.gateOpening > 0;
  const isPumping = stationType === 'bombeo' && params.pumpMode === 'pumping';

  // Effective flow based on gate opening
  const effectiveFlow = params.flow * (params.gateOpening / 100);

  // Power Calculation: P (kW) = 9.81 * Q * H * eta
  // P (MW) = P (kW) / 1000
  let powerMW = 0;
  let powerConsumedMW = 0;

  if (isRunning) {
    if (isPumping) {
      // In pumping mode, electricity is consumed to lift the water (P = rho * g * Q * H / eta)
      powerConsumedMW = (9.81 * effectiveFlow * params.head) / (params.efficiency * 1000);
    } else {
      powerMW = (9.81 * effectiveFlow * params.head * params.efficiency) / 1000;
    }
  }

  // Hydrostatic pressure at base of penstock: P = rho * g * H in bar (1 bar = 100,000 Pa)
  const pressureBar = (1000 * 9.81 * params.head) / 100000;

  // Theoretical velocity at nozzle: v = sqrt(2 * g * H)
  const jetVelocity = Math.sqrt(2 * 9.81 * params.head);

  // Annual Generation (assuming 4,800 operating equivalent hours/year)
  const annualGWh = (powerMW * 4800) / 1000;

  // Equivalent households powered (3.5 MWh/year per average home)
  const households = Math.round((annualGWh * 1000) / 3.5);

  // CO2 avoided (approx 0.40 tonnes CO2 / MWh compared to natural gas combined cycle)
  const co2AvoidedTonnes = Math.round(annualGWh * 1000 * 0.40);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Telemetría de Potencia & Física en Tiempo Real
            </h3>
            <p className="text-xs text-slate-400">
              Fórmula de Euler & Bernoulli: P = ρ · g · Q · H · η
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
          {isRunning ? (isPumping ? 'Consumiendo de Red' : 'Generando a Red') : 'En Parada Técnica'}
        </span>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {/* Potencia Neta */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>{isPumping ? 'Potencia Absorbida' : 'Potencia Activa'}</span>
            <Zap className={`w-3.5 h-3.5 ${isPumping ? 'text-emerald-400' : 'text-amber-400'}`} />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
            {isPumping ? powerConsumedMW.toFixed(1) : powerMW.toFixed(1)}
            <span className="text-xs font-normal text-slate-400 ml-1">MW</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {isPumping ? 'Alimentando motores-bomba' : 'Inyectada al sistema'}
          </div>
        </div>

        {/* Presión Hidrostática */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Presión en Base</span>
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
            {pressureBar.toFixed(1)}
            <span className="text-xs font-normal text-slate-400 ml-1">bar</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {(pressureBar * 0.1).toFixed(2)} MPa dinámicos
          </div>
        </div>

        {/* Velocidad del Torrente */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Velocidad Caída</span>
            <Compass className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
            {jetVelocity.toFixed(1)}
            <span className="text-xs font-normal text-slate-400 ml-1">m/s</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {(jetVelocity * 3.6).toFixed(0)} km/h en inyectores
          </div>
        </div>

        {/* Generación Anual Estimada */}
        <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Energía Anual</span>
            <Wind className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
            {isPumping ? (powerConsumedMW * 2500 / 1000).toFixed(1) : annualGWh.toFixed(1)}
            <span className="text-xs font-normal text-slate-400 ml-1">GWh</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {isPumping ? 'Almacenamiento anual' : 'Renovable gestionable'}
          </div>
        </div>
      </div>

      {/* Environmental & Social Impact Footprint */}
      <div className="bg-slate-950/40 border border-slate-800/80 rounded-lg p-3 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Abastece a aprox.{' '}
            <strong className="text-white font-mono">{households.toLocaleString('es-ES')}</strong>{' '}
            hogares equivalentes
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Evita{' '}
            <strong className="text-emerald-300 font-mono">
              {co2AvoidedTonnes.toLocaleString('es-ES')}
            </strong>{' '}
            toneladas de CO₂ al año
          </span>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          P = 1000 × 9.81 × {effectiveFlow.toFixed(0)} × {params.head} × {params.efficiency} ={' '}
          <span className="text-cyan-300 font-bold">{powerMW.toFixed(2)} MW</span>
        </div>
      </div>
    </div>
  );
};
