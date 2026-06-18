import React, { useState } from 'react';
import { User, Play, Pause, Settings2, ShieldCheck } from 'lucide-react';
import './SpeakerProfilePopover.css';

export function SpeakerProfilePopover({ speakerName, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const togglePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  const handleUpdate = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="speaker-popover">
      <div className="popover-header">
        <div className="avatar-large"><User size={20} /></div>
        <div className="speaker-info">
          <h4>{speakerName}</h4>
          <span className="speaker-tag">Primary Voice</span>
        </div>
      </div>

      <div className="popover-body">
        <div className="voice-sample">
          <label>Original Voice Sample</label>
          <div className="sample-player">
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <div className="sample-waveform"></div>
            <span className="sample-time">0:04</span>
          </div>
        </div>

        <div className="clone-settings">
          <div className="setting-header">
            <label>Clone Accuracy</label>
            <span className="setting-value">High (95%)</span>
          </div>
          <input type="range" min="0" max="100" defaultValue="95" className="styled-slider" />
          <p className="setting-desc">Balances identical voice matching with emotional transfer.</p>
        </div>

        <div className="attributes">
          <span className="attr-badge">Male</span>
          <span className="attr-badge">Middle-aged</span>
          <span className="attr-badge">US Accent</span>
        </div>
      </div>

      <div className="popover-footer">
        <button className="btn-secondary" onClick={onClose}>Close</button>
        <button className="btn-primary" onClick={handleUpdate}>
          {isSaved ? "Saved!" : <><ShieldCheck size={14} /> Update Profile</>}
        </button>
      </div>
    </div>
  );
}
