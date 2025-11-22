
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Carousel } from '../components/Carousel';
import { ContentGrid } from '../components/ContentGrid';
import { WhyTab } from '../components/WhyTab';
import { Series, ShortFilm } from '../types';

interface HomeProps {
  series: Series[];
  shorts: ShortFilm[];
}

export const Home: React.FC<HomeProps> = ({ series, shorts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Default to 'SHORTS' if no tab is specified
  const activeTab = (searchParams.get('tab') as 'SERIES' | 'SHORTS' | 'WHY') || 'SHORTS';

  const handleTabChange = (tab: 'SERIES' | 'SHORTS' | 'WHY') => {
    setSearchParams({ tab });
    window.scrollTo(0, 0);
  };

  const handleSeriesClick = (item: Series | ShortFilm) => {
    navigate(`/series/${item.id}`);
  };

  const handleShortClick = (item: Series | ShortFilm) => {
    navigate(`/film/${item.id}`);
  };

  const isSeriesTab = activeTab === 'SERIES';
  const isWhyTab = activeTab === 'WHY';
  
  const items = isWhyTab ? [] : (isSeriesTab ? series : shorts);
  const title = isSeriesTab ? 'Series & Cartoons' : 'Films';
  const clickHandler = isSeriesTab ? handleSeriesClick : handleShortClick;

  return (
    <div className="pb-20 min-h-screen bg-slate-950 transition-colors duration-300">
      {/* App Header */}
      <div className="sticky top-0 z-30 pt-safe-top px-6 py-5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 flex flex-col justify-center shadow-sm">
        <div className="flex items-center">
          <h1 className="text-2xl font-extrabold text-teal-400 tracking-tight font-nunito">
            Stillness
          </h1>
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="ml-2 text-teal-400"
          >
            <path d="M10 2 A 4 4 0 1 0 10 10 A 4.05 4.05 0 0 1 10 2 z" />
            <path d="M2 18c2.5 0 4-1.5 7-1.5s4.5 1.5 7 1.5 4-1.5 6-1.5" />
            <path d="M2 21c2.5 0 4-1.5 7-1.5s4.5 1.5 7 1.5 4-1.5 6-1.5" />
          </svg>
        </div>
        <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase mt-1">
          by <a href="https://daptar.digital" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-400 transition-colors underline">Daptar (दप्तर)</a>
        </span>
      </div>

      <div className="max-w-screen-lg mx-auto w-full">
        {isWhyTab ? (
          <WhyTab />
        ) : (
          <>
            {items.length > 0 && (
              <Carousel 
                items={items} 
                title={`Featured ${isSeriesTab ? 'Series' : 'Films'}`} 
                onItemClick={clickHandler} 
              />
            )}
            <ContentGrid 
              items={items} 
              title={`All ${title}`} 
              onItemClick={clickHandler} 
            />
          </>
        )}
      </div>
      
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};
