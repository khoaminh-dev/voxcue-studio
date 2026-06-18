import React from 'react';
import { useAudioStore } from '../../store/audioStore';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';
import './Playbar.css';

export function Playbar() {
  const { currentAudioId, isPlaying, togglePlay, progress, clearAudio } = useAudioStore();

  if (!currentAudioId) return null;

  return (
    <div className="global-playbar">
      <div className="playbar-progress" style={{ width: `${progress}%` }}></div>
      <div className="playbar-content">
        <div className="playbar-info">
          <div className="playbar-title">Segment {currentAudioId}</div>
          <div className="playbar-subtitle">AI Voice Output</div>
        </div>
        
        <div className="playbar-controls">
          <button className="btn-icon" onClick={() => {}}>
            <SkipBack size={20} />
          </button>
          <button className="btn-play-main" onClick={togglePlay}>
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="btn-icon" onClick={() => {}}>
            <SkipForward size={20} />
          </button>
        </div>

        <div className="playbar-right">
          <Volume2 size={20} className="volume-icon" />
          <button className="btn-close" onClick={clearAudio}>Close</button>
        </div>
      </div>
    </div>
  );
}
