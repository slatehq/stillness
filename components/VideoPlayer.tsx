import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  autoPlay?: boolean;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, autoPlay = false, title }) => {
  // Removed hardcoded origin which can cause configuration errors if it doesn't match the actual domain
  // Switched back to standard youtube.com
  const src = `https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&rel=0&playsinline=1&modestbranding=1`;

  return (
    <div className="w-full aspect-video bg-black rounded-b-3xl md:rounded-3xl overflow-hidden shadow-lg relative z-10">
      <iframe
        key={videoId} // Unique key forces remount, preventing iframe src change from adding to browser history
        src={src}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen
        style={{ border: 0 }}
      />
    </div>
  );
};