import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/hydroData';

interface QuizModalProps {
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === question.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden ring-1 ring-white/10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 id="quiz-modal-title" className="text-base font-bold text-white">
                Desafío Hidroeléctrico
              </h2>
              <span className="text-[11px] text-slate-400">
                Pregunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isFinished ? (
          <div className="p-6 space-y-5">
            {/* Question Text */}
            <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
              {question.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === question.correctIndex;

                let btnStyle = 'border-slate-800 bg-slate-950/50 hover:bg-slate-800/80 text-slate-200';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500/80 bg-rose-950/40 text-rose-200';
                  } else {
                    btnStyle = 'border-slate-800/50 opacity-40 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after answering */}
            {isAnswered && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed animate-in fade-in duration-200">
                <span className="font-semibold text-cyan-400 block mb-1">
                  Explicación Técnica:
                </span>
                {question.explanation}
              </div>
            )}
          </div>
        ) : (
          /* Finished State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto text-2xl font-bold">
              {score}/{QUIZ_QUESTIONS.length}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">
                {score === QUIZ_QUESTIONS.length
                  ? '¡Excelente! Eres un Ingeniero Hidráulico Experto'
                  : score >= 4
                  ? '¡Muy Buen Trabajo!'
                  : '¡Buen Intento! Sigue explorando los esquemas'}
              </h3>
              <p className="text-xs text-slate-400">
                Has acertado {score} de las {QUIZ_QUESTIONS.length} preguntas formuladas sobre las centrales hidroeléctricas.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Aciertos: <span className="font-mono text-cyan-400 font-bold">{score}</span>
          </div>

          {!isFinished ? (
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                isAnswered
                  ? 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-md'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultado'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repetir Test</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-500 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
