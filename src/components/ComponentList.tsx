import React from 'react';
import { Layers, ChevronRight } from 'lucide-react';
import { HydroComponent } from '../types/hydro';

interface ComponentListProps {
  components: HydroComponent[];
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  onSelectComponent: (component: HydroComponent) => void;
  onHoverComponent: (id: string | null) => void;
}

export const ComponentList: React.FC<ComponentListProps> = ({
  components,
  selectedComponentId,
  hoveredComponentId,
  onSelectComponent,
  onHoverComponent
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">
              Desglose de Componentes e Infraestructura
            </h3>
            <p className="text-xs text-slate-400">
              Selecciona cualquier elemento para analizar su principio físico y materiales
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-slate-400">
          {components.length} subsistemas
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {components.map((comp, idx) => {
          const isSelected = selectedComponentId === comp.id;
          const isHovered = hoveredComponentId === comp.id;

          return (
            <button
              key={comp.id}
              onClick={() => onSelectComponent(comp)}
              onMouseEnter={() => onHoverComponent(comp.id)}
              onMouseLeave={() => onHoverComponent(null)}
              className={`p-2.5 rounded-lg border text-left transition-all duration-150 flex flex-col justify-between group ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/40 shadow-md ring-1 ring-cyan-500/30'
                  : isHovered
                  ? 'border-slate-600 bg-slate-800/80 text-white'
                  : 'border-slate-800/80 bg-slate-950/40 hover:bg-slate-800/50 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-mono text-[10px] font-bold group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-300">
                  {comp.tag}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-200 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                {comp.name}
              </div>

              <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-200">
                <span className="text-[10px] truncate max-w-[130px] opacity-80">
                  {comp.physicsPrinciple.split(':')[0]}
                </span>
                <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
