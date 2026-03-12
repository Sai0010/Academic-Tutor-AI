import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { TutorForm } from './components/TutorForm';
import { TutorResults } from './components/TutorResults';
import { getTutorExplanation } from './services/aiService';
import { TutorResponse } from './types/tutor';

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

  const handleTryPractice = (question: string) => {
    setInput(question);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] font-sans selection:bg-emerald-100">
      <Header />

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

        <TutorForm 
          input={input}
          setInput={setInput}
          loading={loading}
          onSubmit={handleSubmit}
          error={error}
        />

        <AnimatePresence mode="wait">
          {result && !loading ? (
            <TutorResults 
              result={result} 
              onTryPractice={handleTryPractice} 
            />
          ) : !loading && (
            <div className="mt-20 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-200 mb-6">
                <BookOpen className="w-8 h-8 text-neutral-400" />
              </div>
              <p className="text-neutral-400 font-medium">Ready to help with your studies.</p>
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-black/5 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
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
