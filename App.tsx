
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './screens/Home';
import { SeriesDetail } from './screens/SeriesDetail';
import { ShortDetail } from './screens/ShortDetail';
import { Series, ShortFilm } from './types';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
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

  if (loading) {
     return (
       <div className="min-h-screen bg-slate-950 flex items-center justify-center">
         <div className="text-teal-500 font-bold animate-pulse">Loading Stillness...</div>
       </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="antialiased text-slate-200 selection:bg-teal-900 selection:text-teal-100">
        <Routes>
          <Route 
            path="/" 
            element={<Home series={series} shorts={shorts} />} 
          />
          <Route 
            path="/series/:id" 
            element={<SeriesDetail seriesList={series} />} 
          />
          <Route 
            path="/film/:id" 
            element={<ShortDetail shortsList={shorts} />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
