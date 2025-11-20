
import React from 'react';
import { Film, Tv, HelpCircle } from 'lucide-react';

interface NavigationProps {
  activeTab: 'SERIES' | 'SHORTS' | 'WHY';
  onTabChange: (tab: 'SERIES' | 'SHORTS' | 'WHY') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-800 z-50 pb-safe">
      <div className="max-w-screen-lg mx-auto flex justify-around items-center h-16">
        <button
          onClick={() => onTabChange('SHORTS')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
            activeTab === 'SHORTS' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Film className="w-6 h-6" strokeWidth={activeTab === 'SHORTS' ? 2.5 : 2} />
          <span className="text-xs font-bold">Films</span>
        </button>

        <button
          onClick={() => onTabChange('SERIES')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
            activeTab === 'SERIES' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Tv className="w-6 h-6" strokeWidth={activeTab === 'SERIES' ? 2.5 : 2} />
          <span className="text-xs font-bold">Series</span>
        </button>

        <button
          onClick={() => onTabChange('WHY')}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
            activeTab === 'WHY' ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <HelpCircle className="w-6 h-6" strokeWidth={activeTab === 'WHY' ? 2.5 : 2} />
          <span className="text-xs font-bold">Why?</span>
        </button>
      </div>
    </div>
  );
};
