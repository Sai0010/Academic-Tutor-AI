import React from 'react';
import { BookOpen, CheckCircle2, ListChecks, HelpCircle, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { TutorResponse } from '../types/tutor';

interface TutorResultsProps {
  result: TutorResponse;
  onTryPractice: (question: string) => void;
}

export const TutorResults: React.FC<TutorResultsProps> = ({ result, onTryPractice }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Concept Explanation */}
      <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-50 p-2 rounded-xl">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">The Concept</h3>
        </div>
        <p className="text-lg leading-relaxed text-neutral-800">
          {result.concept_explanation}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step by Step */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-50 p-2 rounded-xl">
              <ListChecks className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Step-by-Step</h3>
          </div>
          <ul className="space-y-4">
            {result.step_by_step_solution.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-neutral-700 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Key Concepts */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-50 p-2 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">Key Terms</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.key_concepts.map((concept, i) => (
              <span 
                key={i} 
                className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium border border-neutral-200"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Practice Question */}
      <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-xl shadow-black/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white/10 p-2 rounded-xl">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">Test Your Knowledge</h3>
        </div>
        <p className="text-lg text-neutral-300 mb-6 italic">
          "{result.practice_question}"
        </p>
        <div className="flex justify-end">
          <button 
            onClick={() => onTryPractice(result.practice_question)}
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            Try answering this <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
