import React from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, Atom, Wrench, Sparkles } from 'lucide-react';
import { HydroComponent } from '../types/hydro';

interface ComponentModalProps {
  component: HydroComponent | null;
  allComponents: HydroComponent[];
  onClose: () => void;
  onSelectComponent: (component: HydroComponent) => void;
}

export const ComponentModal: React.FC<ComponentModalProps> = ({
  component,
  allComponents,
  onClose,
  onSelectComponent
}) => {
  if (!component) return null;

  const currentIndex = allComponents.findIndex((c) => c.id === component.id);
  const prevComponent = currentIndex > 0 ? allComponents[currentIndex - 1] : null;
  const nextComponent = currentIndex < allComponents.length - 1 ? allComponents[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden ring-1 ring-white/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-component-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-sm">
              {currentIndex + 1}
            </span>
            <div>
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                {component.tag} · Componente {currentIndex + 1} de {allComponents.length}
              </span>
              <h2 id="modal-component-title" className="text-lg font-bold text-white">
                {component.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Main function description */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Función Operativa en la Central
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
              {component.description}
            </p>
          </div>

          {/* Physics & Scientific Principle */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Atom className="w-4 h-4 text-amber-400" />
              Principio Físico & Leyes Científicas
            </h3>
            <div className="text-sm font-mono text-amber-200/90 bg-amber-950/20 border border-amber-900/40 p-3.5 rounded-xl">
              {component.physicsPrinciple}
            </div>
          </div>

          {/* Materials & Construction */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-400" />
              Materiales & Diseño Estructural
            </h3>
            <p className="text-sm text-slate-300 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
              {component.materials}
            </p>
          </div>

          {/* Engineering Key Fact */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Dato Clave de Ingeniería
            </h3>
            <p className="text-sm text-emerald-200/90 bg-emerald-950/20 border border-emerald-900/40 p-3.5 rounded-xl">
              {component.keyFact}
            </p>
          </div>
        </div>

        {/* Footer with Prev / Next navigation */}
        <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={() => prevComponent && onSelectComponent(prevComponent)}
            disabled={!prevComponent}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              prevComponent
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Anterior</span>
          </button>

          <span className="text-xs text-slate-400">
            Usa las flechas o haz clic en el esquema
          </span>

          <button
            onClick={() => nextComponent && onSelectComponent(nextComponent)}
            disabled={!nextComponent}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              nextComponent
                ? 'bg-cyan-600 text-white hover:bg-cyan-500'
                : 'text-slate-600 cursor-not-allowed'
            }`}
          >
            <span>Siguiente</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
