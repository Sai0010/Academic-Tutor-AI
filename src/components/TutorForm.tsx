import React from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TutorFormProps {
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
}

export const TutorForm: React.FC<TutorFormProps> = ({ 
  input, 
  setInput, 
  loading, 
  onSubmit, 
  error 
}) => {
  return (
    <section className="mb-12">
      <form onSubmit={onSubmit} className="relative group">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Explain the difference between Big O and Big Omega notation..."
          className="w-full min-h-[160px] p-6 bg-white rounded-2xl border border-black/5 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-lg resize-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e);
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
  );
};
