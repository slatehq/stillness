
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, Play, Clock } from 'lucide-react';
import { Series, Episode } from '../types';
import { VideoPlayer } from '../components/VideoPlayer';
import { supabase } from '../lib/supabase';

interface SeriesDetailProps {
  series: Series;
  onBack: () => void;
}

export const SeriesDetail: React.FC<SeriesDetailProps> = ({ series, onBack }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch episodes for this series
  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('episodes')
          .select('*')
          .eq('series_id', series.id);
        
        if (error) {
          console.error('Error fetching episodes:', error);
          setEpisodes([]);
        } else {
          setEpisodes(data || []);
        }
      } catch (e) {
        console.error("Failed to fetch episodes", e);
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [series.id]);

  // Get unique seasons
  const seasons = useMemo(() => 
    Array.from(new Set(episodes.map(e => e.season_number))).sort((a, b) => Number(a) - Number(b)),
  [episodes]);

  const [activeSeason, setActiveSeason] = useState<number>(1);
  
  // When seasons load, set default active season
  useEffect(() => {
    if (seasons.length > 0 && !seasons.includes(activeSeason)) {
      setActiveSeason(seasons[0]);
    }
  }, [seasons, activeSeason]);

  // Active episode logic
  // Default to first episode of the active season
  const episodesInSeason = useMemo(() => 
    episodes.filter(e => e.season_number === activeSeason).sort((a, b) => a.episode_number - b.episode_number),
  [episodes, activeSeason]);

  const [activeEpisode, setActiveEpisode] = useState<Episode | null>(null);

  // Effect to set initial episode when season changes or component mounts
  useEffect(() => {
    if (episodesInSeason.length > 0) {
       // Only set if no active episode or if active episode is not in current season list (though usually we just want first of season)
       // Let's default to first in season when switching seasons
       setActiveEpisode(episodesInSeason[0]);
    }
  }, [activeSeason, episodesInSeason]); // Depend on episodesInSeason reference changing

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
         <div className="animate-pulse">Loading episodes...</div>
      </div>
    );
  }

  if (!activeEpisode) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-950">
         <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3 flex items-center shadow-sm">
            <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-full"><ChevronLeft className="w-6 h-6" /></button>
         </div>
         <div className="p-8 text-center text-slate-400">No episodes found.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Sticky Header with Back Button */}
      <div className="sticky top-0 z-20 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 px-4 py-3 flex items-center shadow-sm">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 font-bold text-lg text-slate-200 truncate">{series.name}</h1>
      </div>

      <div className="max-w-screen-lg mx-auto w-full">
        {/* Video Player Section */}
        <div className="md:p-6">
           <VideoPlayer 
             videoId={activeEpisode.youtube_video_id} 
             autoPlay={true} 
             title={activeEpisode.name} 
           />
        </div>

        <div className="px-6 py-4">
           <h2 className="text-2xl font-bold text-slate-100 mb-1">{activeEpisode.name}</h2>
           <p className="text-slate-400 text-sm mb-4">
             Season {activeSeason} • Episode {activeEpisode.episode_number}
           </p>
           <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-6">
             {series.description}
           </p>

           {/* Season Selector */}
           {seasons.length > 0 && (
             <div className="flex space-x-2 overflow-x-auto pb-4 no-scrollbar mb-2">
               {seasons.map((s) => (
                 <button
                   key={s}
                   onClick={() => setActiveSeason(s)}
                   className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                     activeSeason === s
                       ? 'bg-teal-500 text-white shadow-md'
                       : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-teal-500/50'
                   }`}
                 >
                   Season {s}
                 </button>
               ))}
             </div>
           )}

           {/* Episodes List */}
           <div className="space-y-3 pb-12">
             {episodesInSeason.map((ep) => (
               <div 
                 key={ep.id}
                 onClick={() => setActiveEpisode(ep)}
                 className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                   activeEpisode.id === ep.id 
                     ? 'bg-teal-900/20 border-teal-800/50 ring-1 ring-teal-800' 
                     : 'bg-slate-900 border-transparent hover:border-slate-700 hover:shadow-sm shadow-black/20'
                 }`}
               >
                 <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4 text-slate-500">
                   {activeEpisode.id === ep.id ? (
                     <Play className="w-5 h-5 text-teal-400 fill-current" />
                   ) : (
                     <span className="font-bold text-sm">{ep.episode_number}</span>
                   )}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                   <h4 className={`font-bold text-sm truncate ${activeEpisode.id === ep.id ? 'text-teal-200' : 'text-slate-300'}`}>
                     {ep.name}
                   </h4>
                   <div className="flex items-center text-xs text-slate-500 mt-0.5">
                     <Clock className="w-3 h-3 mr-1" />
                     {ep.duration}
                   </div>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};
