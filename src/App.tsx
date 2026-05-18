import { useEffect, useRef, useState } from 'react';
import { tracks, type Track } from './assets/songs/tracks';

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const current: Track | undefined = tracks.find((t) => t.id === currentId);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current) return;
    el.src = current.src;
    el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [current]);

  const handleBarClick = (track: Track) => {
    if (track.id === currentId && audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      return;
    }
    setCurrentId(track.id);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Vinyl Player</h1>
        {current ? (
          <p className="now-playing">
            {isPlaying ? 'Now playing' : 'Paused'}: <strong>{current.title}</strong> — {current.artist}
          </p>
        ) : (
          <p className="now-playing">Click a track to play</p>
        )}
      </header>

      <ul className="tracklist">
        {tracks.map((track) => {
          const active = track.id === currentId;
          return (
            <li key={track.id}>
              <button
                type="button"
                className={`bar ${active ? 'bar--active' : ''}`}
                onClick={() => handleBarClick(track)}
              >
                <span className="bar__icon" aria-hidden>
                  {active && isPlaying ? '⏸' : '▶'}
                </span>
                <span className="bar__meta">
                  <span className="bar__title">{track.title}</span>
                  <span className="bar__artist">{track.artist}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
}
