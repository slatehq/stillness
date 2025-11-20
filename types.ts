
export interface Series {
  id: string;
  name: string;
  genre: string;
  recommended_age: string;
  featured_video_id: string;
  description: string;
}

export interface Episode {
  id: string;
  series_id: string;
  season_number: number;
  episode_number: number;
  name: string;
  youtube_video_id: string;
  duration: string;
}

export interface ShortFilm {
  id: string;
  name: string;
  genre: string;
  recommended_age: string;
  youtube_video_id: string;
  description: string;
}

export type ViewState = 
  | { type: 'HOME', tab: 'SERIES' | 'SHORTS' | 'WHY' }
  | { type: 'SERIES_DETAIL', seriesId: string }
  | { type: 'SHORT_DETAIL', filmId: string };
