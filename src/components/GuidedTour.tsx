import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { HydroStationData, HydroComponent } from '../types/hydro';

interface GuidedTourProps {
  station: HydroStationData;
  onSelectComponentById: (id: string) => void;
}

export const GuidedTour: React.FC<GuidedTourProps> = ({
  station,
  onSelectComponentById
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const steps = station.stepGuide;
  const currentStep = steps[currentStepIndex];

  const handleGoToStep = (index: number) => {
    setCurrentStepIndex(index);
    if (steps[index]) {
      onSelectComponentById(steps[index].targetComponentId);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      handleGoToStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      handleGoToStep(currentStepIndex - 1);
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            Recorrido Paso a Paso del Ciclo Hidráulico
          </h3>
          <p className="text-xs text-slate-400">
            Sigue la trayectoria del agua desde la captación hasta la entrega de electricidad
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Paso {currentStepIndex + 1} de {steps.length}</span>
        </div>
      </div>

      {/* Step Indicator Pills */}
      <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1">
        {steps.map((step, idx) => (
          <button
            key={step.step}
            onClick={() => handleGoToStep(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              idx === currentStepIndex
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : idx < currentStepIndex
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-950/60 text-slate-500 hover:bg-slate-800'
            }`}
          >
            <span className="font-mono text-[10px] w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center">
              {step.step}
            </span>
            <span>{step.title}</span>
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            Etapa {currentStep.step}: {currentStep.title}
          </div>
          <p className="text-sm text-slate-200">
            {currentStep.description}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`p-2 rounded-lg text-xs font-medium border border-slate-700 transition-colors ${
              currentStepIndex === 0
                ? 'text-slate-600 bg-slate-900 cursor-not-allowed'
                : 'text-slate-300 bg-slate-800 hover:bg-slate-700'
            }`}
            title="Paso anterior"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {currentStepIndex < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 shadow-md transition-colors"
            >
              <span>Avanzar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleGoToStep(0)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
