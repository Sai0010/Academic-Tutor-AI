import React, { useState } from 'react';
import { BookOpen, Send, Loader2, GraduationCap, CheckCircle2, ListChecks, HelpCircle } from 'lucide-react';
import { getTutorExplanation, TutorResponse } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TutorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getTutorExplanation(input);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching the explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-emerald-100">
      {/* Header */}
      <header className="bg-white border-b border-black/5 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold tracking-tight">Academic Tutor AI</h1>
          </div>
          <div className="text-xs text-neutral-500 font-medium uppercase tracking-widest">
            University Edition
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Master any concept.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            Enter an assignment question or a complex topic, and I'll break it down into simple, actionable steps.
          </motion.p>
        </section>

        {/* Input Form */}
        <section className="mb-12">
          <form onSubmit={handleSubmit} className="relative group">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., Explain the difference between Big O and Big Omega notation..."
              className="w-full min-h-[160px] p-6 bg-white rounded-2xl border border-black/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className="text-xs text-neutral-400 hidden sm:block">
                Press <kbd className="px-1.5 py-0.5 rounded border border-neutral-200 bg-neutral-50 font-mono">Enter</kbd> to send
              </span>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-neutral-300 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-emerald-600/10"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {loading ? 'Thinking...' : 'Explain'}
              </button>
            </div>
          </form>
          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-lg border border-red-100"
            >
              {error}
            </motion.p>
          )}
        </section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {result && !loading && (
            <motion.div
              key="result"
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
                    onClick={() => {
                      setInput(result.practice_question);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                  >
                    Try answering this <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!result && !loading && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-200 mb-6">
              <BookOpen className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-neutral-400 font-medium">Ready to help with your studies.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-black/5 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <GraduationCap className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">Academic Tutor AI</span>
          </div>
          <p className="text-xs text-neutral-400">
            Built for students to simplify complex learning.
          </p>
        </div>
      </footer>
    </div>
  );
}
