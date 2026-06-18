import React from 'react';
import './AudioWaveform.css';

export function AudioWaveform({ activeSegmentId, segments }) {
  // Generate random bars for the mock waveform
  // We use a fixed seed-like approach to keep it consistent
  const bars = Array.from({ length: 60 }).map((_, i) => {
    // Math.sin creates a wave-like pattern
    const height = Math.abs(Math.sin(i * 0.2) * 50) + Math.random() * 20 + 10;
    return height;
  });

  return (
    <div className="audio-waveform-container">
      <div className="waveform-background">
        {bars.map((h, i) => (
          <div 
            key={i} 
            className="waveform-bar" 
            style={{ height: `${h}%`, left: `${(i / 60) * 100}%` }} 
          />
        ))}
      </div>
      
      {/* Overlay segments */}
      <div className="waveform-segments-overlay">
        {/* Mocking segment positions for visual effect */}
        <div className={`segment-block ${activeSegmentId === 1 ? 'active' : ''}`} style={{ left: '5%', width: '15%' }} />
        <div className={`segment-block ${activeSegmentId === 2 ? 'active' : ''}`} style={{ left: '25%', width: '20%' }} />
        <div className={`segment-block ${activeSegmentId === 3 ? 'active' : 'warning'}`} style={{ left: '50%', width: '18%' }} />
        <div className={`segment-block ${activeSegmentId === 4 ? 'active' : ''}`} style={{ left: '75%', width: '15%' }} />
      </div>
      
      {/* Playhead line */}
      <div className="waveform-playhead" style={{ left: '30%' }} />
    </div>
  );
}
