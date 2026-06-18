import React, { useState } from 'react';
import { Settings2, Mic2, Sparkles, SlidersHorizontal, Wand2 } from 'lucide-react';
import './VoiceDirectorPanel.css';

export function VoiceDirectorPanel({ activeSegmentId, segments, onUpdateSettings, onGenerate }) {
  const activeSegment = segments.find(s => s.id === activeSegmentId);
  const [prompt, setPrompt] = useState('');

  if (!activeSegment) {
    return (
      <div className="voice-director idle-state">
        <div className="idle-content">
          <Wand2 size={32} className="idle-icon" />
          <p>Click on any text segment to open<br/>Voice Directing controls.</p>
        </div>
      </div>
    );
  }

  const isGenerating = activeSegment.status === 'generating';

  return (
    <div className="voice-director active">
      <div className="director-header">
        <div className="title-group">
          <Settings2 size={18} />
          <span>Voice Director</span>
        </div>
        <div className="target-speaker">
          <Mic2 size={14} />
          <span>{activeSegment.speaker}</span>
        </div>
      </div>

      <div className="director-body">
        
        {/* Pacing Control */}
        <div className="control-group">
          <label>Pacing & Timing</label>
          <div className="slider-container">
            <span>Slow</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={activeSegment.pacing ?? 50} 
              onChange={(e) => onUpdateSettings(activeSegmentId, { pacing: parseInt(e.target.value) })}
              className="styled-slider" 
            />
            <span>Fast</span>
          </div>
        </div>

        {/* Emotion Intensity */}
        <div className="control-group">
          <label>Emotion Intensity</label>
          <div className="slider-container">
            <span>Subtle</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={activeSegment.emotion ?? 50} 
              onChange={(e) => onUpdateSettings(activeSegmentId, { emotion: parseInt(e.target.value) })}
              className="styled-slider" 
            />
            <span>Strong</span>
          </div>
        </div>

        {/* Prompting */}
        <div className="control-group">
          <label>Direction Prompt (Optional)</label>
          <textarea 
            className="prompt-input" 
            placeholder="e.g. Speak with a more authoritative tone, emphasizing the last word..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
        </div>

      </div>

      <div className="director-footer">
        <button 
          className="btn-generate" 
          onClick={() => onGenerate(activeSegmentId)}
          disabled={isGenerating}
          style={{ opacity: isGenerating ? 0.7 : 1 }}
        >
          {isGenerating ? 'Generating...' : <><Sparkles size={16} /> Generate Target Voice</>}
        </button>
      </div>
    </div>
  );
}
