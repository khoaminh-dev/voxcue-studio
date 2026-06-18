import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Mic, Check } from 'lucide-react';
import './FloatingToolbar.css';

export function FloatingToolbar({ position, selectedText, onAction, onClose }) {
  const [mode, setMode] = useState('default');
  const [emphasisLevel, setEmphasisLevel] = useState(50);

  // Reset mode if selected text changes
  useEffect(() => {
    setMode('default');
    setEmphasisLevel(50);
  }, [selectedText]);

  if (!position) return null;

  return (
    <div 
      className="floating-toolbar" 
      style={{ top: position.top, left: position.left }}
    >
      <div className="toolbar-text-preview">"{selectedText}"</div>
      
      {mode === 'default' ? (
        <div className="toolbar-actions">
          <button onClick={() => setMode('emphasize')} className="toolbar-btn" title="Emphasize word">
            <Sparkles size={14} /> Emphasize
          </button>
          <button onClick={() => onAction('pronounce')} className="toolbar-btn" title="Pronunciation Dictionary">
            <BookOpen size={14} /> Dictionary
          </button>
        </div>
      ) : (
        <div className="toolbar-emphasize-mode">
          <div className="slider-row">
            <span className="slider-label">Subtle</span>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={emphasisLevel}
              onChange={(e) => setEmphasisLevel(parseInt(e.target.value))}
              className="styled-slider emphasize-slider"
            />
            <span className="slider-label">Strong</span>
          </div>
          <button 
            className="btn-primary-sm"
            onClick={() => onAction('emphasize', emphasisLevel)}
          >
            <Check size={14} /> Apply
          </button>
        </div>
      )}
    </div>
  );
}
