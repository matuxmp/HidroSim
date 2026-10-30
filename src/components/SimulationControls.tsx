import React from 'react';
import { Play, Pause, RotateCcw, Sliders, Gauge, Activity, Sun, Moon } from 'lucide-react';
import { HydroStationData, SimulationParams } from '../types/hydro';

interface SimulationControlsProps {
  station: HydroStationData;
  params: SimulationParams;
  onChangeParams: (newParams: Partial<SimulationParams>) => void;
  onReset: () => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  station,
  params,
  onChangeParams,
  onReset
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Controles Hidráulicos & Simulación
            </h3>
            <p className="text-xs text-slate-400">
              Modifica los parámetros físicos y observa el comportamiento dinámico
            </p>
          </div>
        </div>

        {/* Play / Pause / Speed buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeParams({ isRunning: !params.isRunning })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              params.isRunning
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
            }`}
          >
            {params.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{params.isRunning ? 'Pausar Flujo' : 'Reanudar'}</span>
          </button>

          <div className="flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700/60">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => onChangeParams({ speed: s })}
                className={`px-2 py-1 text-[11px] font-mono rounded transition-colors ${
                  params.speed === s
                    ? 'bg-slate-700 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
            title="Restablecer valores predeterminados"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Salto Neto (H) */}
        <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Salto Neto (H)
            </span>
            <span className="font-mono text-amber-400 font-semibold">{params.head} metros</span>
          </div>
          <input
            type="range"
            min={station.minHead}
            max={station.maxHead}
            step={station.id === 'flujo' ? 1 : 5}
            value={params.head}
            onChange={(e) => onChangeParams({ head: Number(e.target.value) })}
            className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Min: {station.minHead} m</span>
            <span>Max: {station.maxHead} m</span>
          </div>
        </div>

        {/* 2. Caudal Turbinado (Q) */}
        <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              Caudal de Diseño (Q)
            </span>
            <span className="font-mono text-cyan-400 font-semibold">{params.flow} m³/s</span>
          </div>
          <input
            type="range"
            min={station.minFlow}
            max={station.maxFlow}
            step={5}
            value={params.flow}
            onChange={(e) => onChangeParams({ flow: Number(e.target.value) })}
            className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Min: {station.minFlow} m³/s</span>
            <span>Max: {station.maxFlow} m³/s</span>
          </div>
        </div>

        {/* 3. Apertura de Compuertas */}
        <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              Apertura de Compuerta
            </span>
            <span className="font-mono text-blue-400 font-semibold">{params.gateOpening}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={params.gateOpening}
            onChange={(e) => onChangeParams({ gateOpening: Number(e.target.value) })}
            className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Cerrada (0%)</span>
            <span>Plena carga (100%)</span>
          </div>
        </div>

        {/* 4. Rendimiento de Turbomáquina (η) */}
        <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-slate-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Rendimiento Global (η)
            </span>
            <span className="font-mono text-purple-400 font-semibold">
              {(params.efficiency * 100).toFixed(0)}%
            </span>
          </div>
          <input
            type="range"
            min={0.70}
            max={0.95}
            step={0.01}
            value={params.efficiency}
            onChange={(e) => onChangeParams({ efficiency: Number(e.target.value) })}
            className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>70% (parcial)</span>
            <span>95% (óptimo)</span>
          </div>
        </div>

        {/* 5. Specific parameter depending on hydro station type */}
        {station.id === 'flujo' && (
          <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 md:col-span-2">
            <div className="text-xs font-medium text-slate-300 mb-1">
              Régimen Hidrológico del Río:
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'estiaje', label: 'Estiaje (Sequía)', flow: 25 },
                { id: 'medio', label: 'Caudal Medio', flow: 80 },
                { id: 'crecida', label: 'Crecida / Deshielo', flow: 220 }
              ].map((season) => (
                <button
                  key={season.id}
                  onClick={() =>
                    onChangeParams({
                      riverSeason: season.id as any,
                      flow: season.flow
                    })
                  }
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    params.riverSeason === season.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {season.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {station.id === 'embalse' && (
          <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 md:col-span-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Nivel de Agua en Embalse
              </span>
              <span className="font-mono text-blue-400 font-semibold">{params.reservoirLevel}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={params.reservoirLevel}
              onChange={(e) => onChangeParams({ reservoirLevel: Number(e.target.value) })}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Nivel mínimo de toma (10%)</span>
              <span className={params.reservoirLevel >= 85 ? 'text-amber-400 font-bold' : ''}>
                {params.reservoirLevel >= 85 ? '¡Aliviadero Activo!' : 'Capacidad máxima (100%)'}
              </span>
            </div>
          </div>
        )}

        {station.id === 'bombeo' && (
          <div className="space-y-1.5 bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 md:col-span-2">
            <div className="text-xs font-medium text-slate-300 mb-1">
              Modo Operativo Reversible:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onChangeParams({ pumpMode: 'generation' })}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  params.pumpMode === 'generation'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Turbinación (Horas Punta)</span>
              </button>

              <button
                onClick={() => onChangeParams({ pumpMode: 'pumping' })}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  params.pumpMode === 'pumping'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bombeo (Horas Valle / Exceso)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
