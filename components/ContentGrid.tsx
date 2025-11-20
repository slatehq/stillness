import React from 'react';
import { Series, ShortFilm } from '../types';
import { PlayCircle } from 'lucide-react';
import { getThumbnailUrl } from '../constants';

interface ContentGridProps {
  items: (Series | ShortFilm)[];
  onItemClick: (item: Series | ShortFilm) => void;
  title: string;
}

export const ContentGrid: React.FC<ContentGridProps> = ({ items, onItemClick, title }) => {
  return (
    <div className="px-4 pb-24">
      <h2 className="text-xl font-bold text-slate-200 mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => {
          const videoId = 'featured_video_id' in item ? item.featured_video_id : item.youtube_video_id;
          return (
            <div 
              key={item.id} 
              onClick={() => onItemClick(item)}
              className="flex flex-col cursor-pointer group"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg shadow-black/50 bg-slate-800 mb-2 group-hover:shadow-teal-900/20 transition-all duration-300">
                <img 
                  src={getThumbnailUrl(videoId)} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <PlayCircle className="text-white opacity-0 group-hover:opacity-100 w-12 h-12 drop-shadow-lg transition-opacity duration-300 transform scale-90 group-hover:scale-100" />
                </div>
                <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-sm">
                  {item.recommended_age}
                </div>
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-200 text-sm md:text-base leading-tight line-clamp-1 group-hover:text-teal-400 transition-colors">
                  {item.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};