import React, { useState } from 'react';
import { Header } from './components/Header';
import { CornerSelector } from './components/CornerSelector';
import { SchematicFlujo } from './components/SchematicFlujo';
import { SchematicEmbalse } from './components/SchematicEmbalse';
import { SchematicBombeo } from './components/SchematicBombeo';
import { SimulationControls } from './components/SimulationControls';
import { MetricsPanel } from './components/MetricsPanel';
import { ComponentList } from './components/ComponentList';
import { ComponentModal } from './components/ComponentModal';
import { GuidedTour } from './components/GuidedTour';
import { ComparisonView } from './components/ComparisonView';
import { QuizModal } from './components/QuizModal';
import { HYDRO_STATIONS } from './data/hydroData';
import { HydroType, HydroComponent, SimulationParams } from './types/hydro';
import { Mountain, Waves, Repeat, Info, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeType, setActiveType] = useState<HydroType>('flujo');
  const [activeView, setActiveView] = useState<'schematic' | 'comparison'>('schematic');
  const [selectedComponent, setSelectedComponent] = useState<HydroComponent | null>(null);
  const [hoveredComponentId, setHoveredComponentId] = useState<string | null>(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const currentStation = HYDRO_STATIONS[activeType];

  // Simulation state per station type with default values
  const [params, setParams] = useState<SimulationParams>({
    head: currentStation.defaultHead,
    flow: currentStation.defaultFlow,
    efficiency: currentStation.defaultEfficiency,
    gateOpening: 100,
    isRunning: true,
    speed: 1,
    pumpMode: 'generation',
    riverSeason: 'medio',
    reservoirLevel: 80
  });

  // Handle switching hydro station type (from corner tab or elsewhere)
  const handleSelectType = (newType: HydroType) => {
    setActiveType(newType);
    setActiveView('schematic');
    setSelectedComponent(null);
    setHoveredComponentId(null);

    const station = HYDRO_STATIONS[newType];
    setParams((prev) => ({
      ...prev,
      head: station.defaultHead,
      flow: station.defaultFlow,
      efficiency: station.defaultEfficiency,
      gateOpening: 100,
      isRunning: true,
      pumpMode: 'generation',
      riverSeason: 'medio',
      reservoirLevel: 80
    }));
  };

  const handleUpdateParams = (newParams: Partial<SimulationParams>) => {
    setParams((prev) => ({ ...prev, ...newParams }));
  };

  const handleResetParams = () => {
    setParams({
      head: currentStation.defaultHead,
      flow: currentStation.defaultFlow,
      efficiency: currentStation.defaultEfficiency,
      gateOpening: 100,
      isRunning: true,
      speed: 1,
      pumpMode: 'generation',
      riverSeason: 'medio',
      reservoirLevel: 80
    });
  };

  const handleSelectComponentById = (id: string) => {
    const comp = currentStation.components.find((c) => c.id === id);
    if (comp) {
      setSelectedComponent(comp);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Bar Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenSelector={() => {
          // scrolls smoothly to top if needed
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Corner Selector Tab (As explicitly requested by user) */}
      <CornerSelector
        activeType={activeType}
        onSelectType={handleSelectType}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Station Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider flex items-center gap-1.5">
                {activeType === 'flujo' && <Waves className="w-3.5 h-3.5" />}
                {activeType === 'embalse' && <Mountain className="w-3.5 h-3.5" />}
                {activeType === 'bombeo' && <Repeat className="w-3.5 h-3.5" />}
                {currentStation.shortName}
              </span>

              <span className="text-xs text-slate-400 font-mono">
                {activeType === 'flujo'
                  ? 'Salto: 5 - 50 m · Caudal continuo'
                  : activeType === 'embalse'
                  ? 'Salto: 40 - 1200 m · Presa de regulación'
                  : 'Salto: 80 - 800 m · Reversible (Batería GW)'}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {currentStation.title}
            </h1>

            <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
              {currentStation.description}
            </p>

            {/* Quick Fact Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Turbinas Habituales:</span>
                <span className="font-semibold text-slate-200">
                  {currentStation.typicalTurbines.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Capacidad de Regulación:</span>
                <span className="font-semibold text-slate-200">
                  {currentStation.regulationCapacity}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tiempo de Arranque:</span>
                <span className="font-semibold text-slate-200">
                  {currentStation.startUpTime}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Rango de Caudal:</span>
                <span className="font-semibold text-slate-200">
                  {currentStation.flowRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher: Interactive Schematic VS Comparison Matrix */}
        {activeView === 'schematic' ? (
          <div className="space-y-6">
            {/* Interactive Schematic Diagram */}
            <section aria-label="Esquema interactivo de la central">
              {activeType === 'flujo' && (
                <SchematicFlujo
                  components={currentStation.components}
                  params={params}
                  selectedComponentId={selectedComponent?.id || null}
                  onSelectComponent={setSelectedComponent}
                  hoveredComponentId={hoveredComponentId}
                  onHoverComponent={setHoveredComponentId}
                />
              )}

              {activeType === 'embalse' && (
                <SchematicEmbalse
                  components={currentStation.components}
                  params={params}
                  selectedComponentId={selectedComponent?.id || null}
                  onSelectComponent={setSelectedComponent}
                  hoveredComponentId={hoveredComponentId}
                  onHoverComponent={setHoveredComponentId}
                />
              )}

              {activeType === 'bombeo' && (
                <SchematicBombeo
                  components={currentStation.components}
                  params={params}
                  onTogglePumpMode={() =>
                    handleUpdateParams({
                      pumpMode: params.pumpMode === 'generation' ? 'pumping' : 'generation'
                    })
                  }
                  selectedComponentId={selectedComponent?.id || null}
                  onSelectComponent={setSelectedComponent}
                  hoveredComponentId={hoveredComponentId}
                  onHoverComponent={setHoveredComponentId}
                />
              )}
            </section>

            {/* Simulation Controls & Parameters */}
            <SimulationControls
              station={currentStation}
              params={params}
              onChangeParams={handleUpdateParams}
              onReset={handleResetParams}
            />

            {/* Telemetry & Metrics Panel */}
            <MetricsPanel
              stationType={activeType}
              params={params}
            />

            {/* Guided Step-by-Step Cycle Walkthrough */}
            <GuidedTour
              station={currentStation}
              onSelectComponentById={handleSelectComponentById}
            />

            {/* Component Inventory & Quick Explorer */}
            <ComponentList
              components={currentStation.components}
              selectedComponentId={selectedComponent?.id || null}
              hoveredComponentId={hoveredComponentId}
              onSelectComponent={setSelectedComponent}
              onHoverComponent={setHoveredComponentId}
            />
          </div>
        ) : (
          /* Technical Comparison View */
          <ComparisonView onSelectStation={handleSelectType} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 px-4 sm:px-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">HidroSim</span>
            <span>·</span>
            <span>Simulador Educativo de Ingeniería Hidroeléctrica</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Ecuaciones: P = ρ · g · Q · H · η · Principio de Bernoulli & Inducción de Faraday
          </div>
        </div>
      </footer>

      {/* Component Details Inspection Modal */}
      <ComponentModal
        component={selectedComponent}
        allComponents={currentStation.components}
        onClose={() => setSelectedComponent(null)}
        onSelectComponent={setSelectedComponent}
      />

      {/* Quiz Modal */}
      {isQuizOpen && <QuizModal onClose={() => setIsQuizOpen(false)} />}
    </div>
  );
}
