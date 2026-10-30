import React from 'react';
import { ArrowRight, Check, X } from 'lucide-react';
import { COMPARISON_DATA, HYDRO_STATIONS } from '../data/hydroData';
import { HydroType } from '../types/hydro';

interface ComparisonViewProps {
  onSelectStation: (type: HydroType) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  onSelectStation
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Flujo Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
              Tipo 1 · Pasada
            </span>
            <h3 className="text-base font-bold text-white">Central por Flujo</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sin embalse masivo. Turbina continuamente el agua del río y la devuelve íntegra aguas abajo. Salto bajo o medio.
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Mínima alteración ecológica
              </div>
              <div className="text-rose-400 font-semibold flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Sujeto a estiajes y sequías
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectStation('flujo')}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-cyan-950/60 text-cyan-300 border border-cyan-800/80 hover:bg-cyan-900/60 text-xs font-semibold transition-colors"
          >
            <span>Ver Esquema Interactivo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Embalse Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider">
              Tipo 2 · Regulación
            </span>
            <h3 className="text-base font-bold text-white">Central con Embalse</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gran presa de hormigón retiene millones de m³. Almacena energía para arrancar en minutos cuando la demanda sube.
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Alta capacidad de regulación
              </div>
              <div className="text-rose-400 font-semibold flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Inundación de valles naturales
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectStation('embalse')}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-blue-950/60 text-blue-300 border border-blue-800/80 hover:bg-blue-900/60 text-xs font-semibold transition-colors"
          >
            <span>Ver Esquema Interactivo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bombeo Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
              Tipo 3 · Reversible
            </span>
            <h3 className="text-base font-bold text-white">Central de Bombeo</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Doble embalse. Almacena excedentes renovables en horas valle (bombeando) y genera en horas punta.
            </p>

            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Batería limpia a escala de GW
              </div>
              <div className="text-rose-400 font-semibold flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Pérdidas del ciclo (~20%)
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectStation('bombeo')}
            className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900/60 text-xs font-semibold transition-colors"
          >
            <span>Ver Esquema Interactivo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Full Comparison Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-800">
          <h3 className="text-sm font-semibold text-slate-100">
            Matriz Comparativa de Ingeniería Hidráulica
          </h3>
          <p className="text-xs text-slate-400">
            Comparación directa de parámetros físicos, turbomáquinas y papel en el sistema eléctrico
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-3.5 w-1/4">Parámetro Técnico</th>
                <th className="p-3.5 w-1/4 text-cyan-400">Central por Flujo</th>
                <th className="p-3.5 w-1/4 text-blue-400">Central con Embalse</th>
                <th className="p-3.5 w-1/4 text-emerald-400">Central de Bombeo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {COMPARISON_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-200 bg-slate-950/30">
                    {row.parameter}
                  </td>
                  <td className="p-3.5 leading-relaxed">{row.flujo}</td>
                  <td className="p-3.5 leading-relaxed">{row.embalse}</td>
                  <td className="p-3.5 leading-relaxed">{row.bombeo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
