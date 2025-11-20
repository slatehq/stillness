import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { ShortFilm } from '../types';
import { VideoPlayer } from '../components/VideoPlayer';

interface ShortDetailProps {
  film: ShortFilm;
  onBack: () => void;
}

export const ShortDetail: React.FC<ShortDetailProps> = ({ film, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 font-bold text-lg text-slate-200 truncate">Film</h1>
      </div>

      <div className="max-w-screen-lg mx-auto w-full">
        <div className="md:p-6">
          <VideoPlayer 
            videoId={film.youtube_video_id} 
            autoPlay={true} 
            title={film.name} 
          />
        </div>

        <div className="px-6 py-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-1">{film.name}</h2>
              <span className="inline-block bg-teal-900/40 text-teal-300 text-xs px-2 py-1 rounded-md font-bold border border-teal-900/50">
                {film.genre}
              </span>
            </div>
            <div className="bg-slate-800 text-slate-300 text-xs font-bold px-3 py-1 rounded-full border border-slate-700">
              Age {film.recommended_age}
            </div>
          </div>
          
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">About</h3>
            <p className="text-slate-300 leading-relaxed">
              {film.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};