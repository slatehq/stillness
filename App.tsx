
import React, { useState, useMemo, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Carousel } from './components/Carousel';
import { ContentGrid } from './components/ContentGrid';
import { WhyTab } from './components/WhyTab';
import { SeriesDetail } from './screens/SeriesDetail';
import { ShortDetail } from './screens/ShortDetail';
import { ViewState, Series, ShortFilm } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'HOME', tab: 'SHORTS' });
  const [series, setSeries] = useState<Series[]>([]);
  const [shorts, setShorts] = useState<ShortFilm[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Series
        const { data: seriesData, error: seriesError } = await supabase
          .from('series')
          .select('*')
          .order('name');
          
        if (seriesError) {
          console.error('Error fetching series:', seriesError);
        } else if (seriesData) {
          setSeries(seriesData);
        }

        // Fetch Short Films
        const { data: shortsData, error: shortsError } = await supabase
          .from('short_films')
          .select('*')
          .order('name');

        if (shortsError) {
          console.error('Error fetching shorts:', shortsError);
        } else if (shortsData) {
          setShorts(shortsData);
        }

      } catch (e) {
        console.error("Failed to fetch data", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handlers
  const handleTabChange = (tab: 'SERIES' | 'SHORTS' | 'WHY') => {
    setViewState({ type: 'HOME', tab });
    window.scrollTo(0, 0);
  };

  const handleSeriesClick = (item: Series | ShortFilm) => {
    setViewState({ type: 'SERIES_DETAIL', seriesId: item.id });
    window.scrollTo(0, 0);
  };

  const handleShortClick = (item: Series | ShortFilm) => {
    setViewState({ type: 'SHORT_DETAIL', filmId: item.id });
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setViewState((prev) => {
      if (prev.type === 'SERIES_DETAIL') return { type: 'HOME', tab: 'SERIES' };
      if (prev.type === 'SHORT_DETAIL') return { type: 'HOME', tab: 'SHORTS' };
      return prev;
    });
  };

  // Derived Data
  const currentSeries = useMemo(() => {
    if (viewState.type === 'SERIES_DETAIL') {
      return series.find(s => s.id === viewState.seriesId) || null;
    }
    return null;
  }, [viewState, series]);

  const currentShort = useMemo(() => {
    if (viewState.type === 'SHORT_DETAIL') {
      return shorts.find(s => s.id === viewState.filmId) || null;
    }
    return null;
  }, [viewState, shorts]);


  // Render View Switcher
  const renderContent = () => {
    if (loading && viewState.type === 'HOME') {
      return (
         <div className="min-h-screen bg-slate-950 flex items-center justify-center">
           <div className="text-teal-500 font-bold animate-pulse">Loading Stillness...</div>
         </div>
      );
    }

    if (viewState.type === 'SERIES_DETAIL' && currentSeries) {
      return <SeriesDetail series={currentSeries} onBack={handleBack} />;
    }

    if (viewState.type === 'SHORT_DETAIL' && currentShort) {
      return <ShortDetail film={currentShort} onBack={handleBack} />;
    }

    // Home View
    if (viewState.type === 'HOME') {
      const isSeriesTab = viewState.tab === 'SERIES';
      const isWhyTab = viewState.tab === 'WHY';
      
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
                {/* Moon: Centered over waves (x=10), made slimmer (radius 4.05) */}
                <path d="M10 2 A 4 4 0 1 0 10 10 A 4.05 4.05 0 0 1 10 2 z" />
                {/* Waves: Lower down */}
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
          
          <Navigation activeTab={viewState.tab} onTabChange={handleTabChange} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="antialiased text-slate-200 selection:bg-teal-900 selection:text-teal-100">
      {renderContent()}
    </div>
  );
};

export default App;
