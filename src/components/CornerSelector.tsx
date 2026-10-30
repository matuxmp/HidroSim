import React, { useState } from 'react';
import { Waves, Mountain, Repeat, ChevronDown, ChevronUp, Layers, Check } from 'lucide-react';
import { HydroType } from '../types/hydro';

interface CornerSelectorProps {
  activeType: HydroType;
  onSelectType: (type: HydroType) => void;
}

export const CornerSelector: React.FC<CornerSelectorProps> = ({
  activeType,
  onSelectType
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const options = [
    {
      id: 'flujo' as HydroType,
      title: 'Central por Flujo',
      shortTitle: 'Por Flujo (Pasada)',
      description: 'Sin gran embalse · Aprovecha el caudal continuo del río',
      icon: Waves,
      tag: 'Agua Fluyente',
      accentColor: 'border-cyan-500/80 text-cyan-400 bg-cyan-950/40'
    },
    {
      id: 'embalse' as HydroType,
      title: 'Central con Embalse',
      shortTitle: 'Con Embalse (Presa)',
      description: 'Presa masiva · Gran salto y regulación estacional',
      icon: Mountain,
      tag: 'Regulación',
      accentColor: 'border-blue-500/80 text-blue-400 bg-blue-950/40'
    },
    {
      id: 'bombeo' as HydroType,
      title: 'Central de Bombeo',
      shortTitle: 'De Bombeo (Reversible)',
      description: 'Doble embalse · Batería gigante turbinación/bombeo',
      icon: Repeat,
      tag: 'Reversible',
      accentColor: 'border-emerald-500/80 text-emerald-400 bg-emerald-950/40'
    }
  ];

  return (
    <div className="fixed top-4 right-4 z-40 max-w-sm w-full sm:w-88 transition-all duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl shadow-2xl shadow-black/60 overflow-hidden ring-1 ring-white/10">
        {/* Corner Tab Header */}
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 cursor-pointer select-none hover:bg-slate-800/80 transition-colors"
          role="button"
          aria-expanded={isExpanded}
          aria-label="Pestaña para elegir entre los tres tipos de centrales"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
                Pestaña de Selección
              </div>
              <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                Elegir Tipo de Central
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {activeType === 'flujo' ? '1/3 Flujo' : activeType === 'embalse' ? '2/3 Embalse' : '3/3 Bombeo'}
            </span>
            <button 
              type="button" 
              className="text-slate-400 hover:text-slate-200 p-1"
              title={isExpanded ? 'Contraer pestaña' : 'Desplegar pestaña'}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Tab Body: Selection of 3 types */}
        {isExpanded && (
          <div className="p-2 space-y-1.5 bg-slate-900/90">
            <div className="px-2 pt-1 pb-1 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Presiona para abrir el esquema interactivo:</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {options.map((opt) => {
                const Icon = opt.icon;
                const isActive = activeType === opt.id;

                return (
                  <button
                    key={opt.id}
                    onClick={() => onSelectType(opt.id)}
                    className={`group w-full text-left p-2.5 rounded-lg border transition-all duration-200 flex items-center gap-3 relative ${
                      isActive
                        ? `${opt.accentColor} shadow-md`
                        : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-800/60 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 transition-transform group-hover:scale-105 ${
                        isActive
                          ? 'bg-slate-900 shadow-inner'
                          : 'bg-slate-800/70 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                          {opt.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-400 shrink-0">
                          {opt.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {opt.description}
                      </p>
                    </div>

                    {isActive && (
                      <div className="shrink-0 p-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
