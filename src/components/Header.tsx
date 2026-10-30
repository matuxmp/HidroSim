import React from 'react';
import { Award, GitCompare, HelpCircle, Layers } from 'lucide-react';

interface HeaderProps {
  onOpenQuiz: () => void;
  activeView: 'schematic' | 'comparison';
  setActiveView: (view: 'schematic' | 'comparison') => void;
  onOpenSelector: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenQuiz,
  activeView,
  setActiveView,
  onOpenSelector
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
      {/* Zone 1: Brand title wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <a href="/" className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
          HidroSim
        </a>
        <span className="text-slate-600 hidden sm:inline">/</span>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline whitespace-nowrap">
          Centrales Hidroeléctricas Interactivas
        </span>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
        <button
          onClick={() => setActiveView('schematic')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            activeView === 'schematic' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Esquema Interactivo
        </button>

        <button
          onClick={() => setActiveView('comparison')}
          className={`hover:text-white transition-colors whitespace-nowrap ${
            activeView === 'comparison' ? 'text-cyan-400 font-semibold' : ''
          }`}
        >
          Comparativa Técnica
        </button>

        <button
          onClick={onOpenSelector}
          className="hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Elegir Central</span>
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenQuiz}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-cyan-500/20"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>Test de Conocimiento</span>
        </button>
      </div>
    </header>
  );
};
