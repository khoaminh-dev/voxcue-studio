import React, { useEffect, useState } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize2, MonitorPlay, Minimize2, X } from 'lucide-react';
import { AudioWaveform } from './AudioWaveform';
import './PreviewPlayer.css';

export function PreviewPlayer({ viewMode, setViewMode, activeSubtitle, activeSegmentId, isPlaying, onTogglePlay }) {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const isCinema = viewMode === 'cinema';
  const isFocus = viewMode === 'focus';

  // Toggle Focus Mode
  const toggleFocus = () => {
    if (viewMode === 'default') setViewMode('focus');
    else if (viewMode === 'focus') setViewMode('default');
  };

  // Toggle Cinema Mode
  const toggleCinema = () => {
    setViewMode('cinema');
  };

  const exitCinema = () => {
    setViewMode('default');
  };

  // Handle ESC key to exit cinema
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCinema) {
        exitCinema();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCinema]);

  return (
    <div className={`preview-player ${isCinema ? 'cinema-overlay' : ''}`}>
      {/* Background blur for cinema mode */}
      {isCinema && <div className="cinema-backdrop" onClick={exitCinema}></div>}
      
      <div className={`player-container ${isCinema ? 'cinema-mode' : ''}`}>
        <div className="player-video-area">
          <div className="video-placeholder">
            <div className="watermark-overlay">VoxCue Pro</div>
            <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200" alt="Video preview" />
            
            {/* Cinema Subtitle (Teleprompter) */}
            {isCinema && activeSubtitle && (
              <div className="cinema-subtitle">
                <span className="subtitle-text">{activeSubtitle}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="player-controls">
          <div className="timeline-waveform">
            <AudioWaveform activeSegmentId={activeSegmentId} />
          </div>
          
          <div className="control-bar">
            <div className="control-left">
              <button className="icon-btn primary-action" onClick={onTogglePlay}>
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
              <span className="time-display">00:32 / 01:45</span>
            </div>
            
            <div className="control-right">
              <div 
                className="volume-container"
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <button 
                  className="icon-btn" 
                  title={isMuted ? "Unmute" : "Mute"}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : (volume < 50 ? <Volume1 size={18} /> : <Volume2 size={18} />)}
                </button>
                
                <div className={`volume-slider-wrapper ${showVolumeSlider ? 'visible' : ''}`}>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseInt(e.target.value));
                      if (isMuted && e.target.value > 0) setIsMuted(false);
                    }}
                    className="volume-slider" 
                  />
                </div>
              </div>
              
              {!isCinema && (
                <>
                  <button 
                    className={`icon-btn ${isFocus ? 'active' : ''}`} 
                    onClick={toggleFocus}
                    title={isFocus ? "Restore Width" : "Expand Width"}
                  >
                    {isFocus ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                  <button 
                    className="icon-btn" 
                    onClick={toggleCinema}
                    title="Cinema Mode (Theater)"
                  >
                    <MonitorPlay size={18} />
                  </button>
                </>
              )}

              {isCinema && (
                <button className="icon-btn exit-btn" onClick={exitCinema} title="Exit Cinema Mode (ESC)">
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
