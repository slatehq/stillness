import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Series, ShortFilm } from '../types';
import { getThumbnailUrl } from '../constants';

interface CarouselProps {
  items: (Series | ShortFilm)[];
  onItemClick: (item: Series | ShortFilm) => void;
  title: string;
}

export const Carousel: React.FC<CarouselProps> = ({ items, onItemClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const displayItems = items.slice(0, 5);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const width = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        const width = scrollRef.current.clientWidth;
        if (width === 0) return;
        
        const currentIndex = Math.round(scrollRef.current.scrollLeft / width);
        const nextIndex = (currentIndex + 1) % displayItems.length;
        scrollToIndex(nextIndex);
      }
    }, 5000);
  }, [displayItems.length, scrollToIndex]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      setActiveIndex(index);
    }
  };

  const handleIndicatorClick = (index: number) => {
    scrollToIndex(index);
    // Restart timer to avoid immediate jump after interaction
    startAutoPlay();
  };

  const handleTouchStart = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTouchEnd = () => {
    startAutoPlay();
  };

  return (
    <div className="relative w-full mb-8 group">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full touch-pan-x"
      >
        {displayItems.map((item) => {
          const videoId = 'featured_video_id' in item ? item.featured_video_id : item.youtube_video_id;
          return (
            <div 
              key={item.id} 
              onClick={() => onItemClick(item)}
              className="flex-none w-full snap-center relative aspect-video cursor-pointer"
            >
              <img 
                src={getThumbnailUrl(videoId)} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-8 left-4 right-4">
                <h3 className="text-white font-bold text-2xl md:text-4xl truncate shadow-black drop-shadow-lg">
                  {item.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10 pointer-events-none">
        {displayItems.map((_, i) => (
          <button 
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              handleIndicatorClick(i);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm pointer-events-auto cursor-pointer ${
              i === activeIndex ? 'bg-white w-4' : 'bg-white/50 w-1.5 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};