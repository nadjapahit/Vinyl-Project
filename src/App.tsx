import { useEffect, useRef, useState } from 'react';
import { tracks, type Track } from './assets/songs/tracks';

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentId, setCurrentId] = useState<string>(tracks[0].id);
  const [isPlaying, setIsPlaying] = useState(false);

  const current: Track = tracks.find((t) => t.id === currentId) ?? tracks[0];

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.src = current.src;
    if (isPlaying) {
      el.play().catch(() => setIsPlaying(false));
    }
  }, [current.src]);

  const play = () => {
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };
  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };
  const toggle = () => (isPlaying ? pause() : play());

  const selectTrack = (track: Track) => {
    if (track.id === currentId) {
      toggle();
      return;
    }
    setCurrentId(track.id);
    setIsPlaying(true);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>VINYL</h1>
        <p className="subtitle">Drop the needle. Pick a track.</p>
      </header>

      <div className="player">
        <div className="turntable">
          <div className="platter">
            <div className={`vinyl ${isPlaying ? 'vinyl--spinning' : ''}`}>
              <div className="vinyl__shine" />
              <div
                className="vinyl__label"
                style={{ background: current.labelColor }}
              >
                <div className="vinyl__label-inner">
                  <span className="vinyl__title">{current.title}</span>
                  <span className="vinyl__artist">{current.artist}</span>
                </div>
                <div className="vinyl__spindle" />
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`tonearm ${isPlaying ? 'tonearm--playing' : ''}`}
            onClick={toggle}
            aria-label={isPlaying ? 'Lift tone arm (pause)' : 'Drop tone arm (play)'}
          >
            <span className="tonearm__pivot" />
            <span className="tonearm__shaft" />
            <span className="tonearm__head" />
          </button>
        </div>

        <div className="sidebar">
          <h2 className="sidebar__title">Tracks</h2>
          <ul className="tracklist">
            {tracks.map((track) => {
              const active = track.id === currentId;
              return (
                <li key={track.id}>
                  <button
                    type="button"
                    className={`bar ${active ? 'bar--active' : ''}`}
                    onClick={() => selectTrack(track)}
                  >
                    <span
                      className="bar__dot"
                      style={{ background: track.labelColor }}
                    />
                    <span className="bar__meta">
                      <span className="bar__title">{track.title}</span>
                      <span className="bar__artist">{track.artist}</span>
                    </span>
                    <span className="bar__icon" aria-hidden>
                      {active && isPlaying ? '❚❚' : '▶'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="controls">
            <button type="button" className="control-btn" onClick={toggle}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
}
