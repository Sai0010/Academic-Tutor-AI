import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Header: React.FC = () => (
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
);
