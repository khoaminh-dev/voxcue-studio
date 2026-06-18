import React, { useState, useRef, useEffect } from 'react';
import { Settings, Play, Pause, Languages, Sparkles, Search, User, AlertCircle, CheckCircle2, Loader2, Music, Volume2 } from 'lucide-react';
import { SpeakerProfilePopover } from './SpeakerProfilePopover';
import { FloatingToolbar } from './FloatingToolbar';
import { useAudioStore } from '../../store/audioStore';
import './TranscriptEditor.css';

export function TranscriptEditor({ segments, activeSegmentId, onSelectSegment, onUpdateSegment, onTranslateAll }) {
  const [activeSpeakerPopover, setActiveSpeakerPopover] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { currentAudioId, isPlaying, play, pause, setProgress, clearAudio } = useAudioStore();

  // Floating toolbar state
  const [toolbarState, setToolbarState] = useState({ visible: false, position: null, text: '' });
  const editorRef = useRef(null);

  const handleTextSelection = () => {
    if (document.activeElement && document.activeElement.tagName === 'TEXTAREA') {
      return; // Will be handled by the textarea's onSelect event
    }
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0 && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      
      setToolbarState({
        visible: true,
        text,
        position: {
          top: rect.top - editorRect.top + editorRef.current.scrollTop,
          left: rect.left - editorRect.left + (rect.width / 2)
        }
      });
    } else {
      setToolbarState({ visible: false, position: null, text: '' });
    }
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleTextSelection);
    return () => document.removeEventListener('selectionchange', handleTextSelection);
  }, []);

  const handleTextareaSelect = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    if (start !== end) {
      const text = textarea.value.substring(start, end).trim();
      if (text.length > 0) {
        const rect = textarea.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        
        // Position toolbar slightly above the textarea
        setToolbarState({
          visible: true,
          text,
          position: {
            top: rect.top - editorRect.top + editorRef.current.scrollTop - 10,
            left: rect.left - editorRect.left + (rect.width / 2)
          }
        });
      } else {
        setToolbarState({ visible: false, position: null, text: '' });
      }
    } else {
      setToolbarState({ visible: false, position: null, text: '' });
    }
  };

  // Auto-resize textarea function
  const handleTextareaChange = (e, id) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    if (onUpdateSegment) {
      onUpdateSegment(id, e.target.value);
    }
  };

  const playTargetAudio = (id, e) => {
    e.stopPropagation();
    if (currentAudioId === id && isPlaying) {
      pause();
    } else {
      play(id);
      // Simulate playback progress
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        setProgress(p, p/10, 10);
        if (p >= 100) {
          clearInterval(interval);
          clearAudio();
        }
      }, 100);
    }
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <div className="status-badge approved" title="Approved"><CheckCircle2 size={14} /></div>;
      case 'ready':
        return <div className="status-badge ready" title="Audio Generated"><Music size={14} /></div>;
      case 'generating':
        return <div className="status-badge generating" title="Generating audio..."><Loader2 size={14} className="spin" /></div>;
      default:
        return <div className="status-badge draft" title="Draft">Draft</div>;
    }
  };

  const filteredSegments = segments.filter(s => 
    s.targetText.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.originalText.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.speaker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`transcript-editor ${activeSegmentId ? 'has-active' : ''}`}>
      
      {/* Global Toolbar */}
      <div className="transcript-toolbar">
        <div className="toolbar-left">
          <div className="lang-badge">
            EN <span className="arrow">➔</span> VI
          </div>
          <button className="icon-btn" title="Change Language"><Languages size={16} /></button>
        </div>
        
        <div className="toolbar-right">
          <div className="search-box">
            <Search size={14} />
            <input 
              type="text" 
              placeholder="Find & Replace..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="btn-primary-sm" onClick={onTranslateAll}>
            <Sparkles size={14} /> Auto Translate All
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="transcript-body" ref={editorRef} style={{ position: 'relative' }}>
        
        {toolbarState.visible && (
          <FloatingToolbar 
            position={toolbarState.position} 
            selectedText={toolbarState.text}
            onAction={(action, level) => {
              if (action === 'emphasize' && activeSegmentId) {
                const segment = segments.find(s => s.id === activeSegmentId);
                if (segment && onUpdateSegment) {
                  // In a real app we'd wrap in SSML or custom tags, here we simulate with **text[level]**
                  const newText = segment.targetText.replace(toolbarState.text, `**${toolbarState.text}[${level}%]**`);
                  onUpdateSegment(activeSegmentId, newText);
                }
              } else if (action === 'pronounce') {
                alert(`Open dictionary for: ${toolbarState.text}`);
              }
              setToolbarState({ visible: false, position: null, text: '' });
              window.getSelection().removeAllRanges();
            }}
          />
        )}

        <div className="segments-list">
          {filteredSegments.map((segment) => {
            const isActive = activeSegmentId === segment.id;
            
            return (
              <div 
                key={segment.id} 
                className={`segment-card ${isActive ? 'active' : ''} ${segment.warning ? 'has-warning' : ''}`}
                onClick={() => onSelectSegment(segment.id)}
              >
                {/* Card Header: Speaker & Meta */}
                <div className="card-header">
                  <div 
                    className="speaker-tag" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSpeakerPopover(activeSpeakerPopover === segment.id ? null : segment.id);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="avatar"><User size={12} /></div>
                    <span className="speaker-name">{segment.speaker}</span>
                    
                    {activeSpeakerPopover === segment.id && (
                      <SpeakerProfilePopover 
                        speakerName={segment.speaker} 
                        onClose={(e) => {
                          e?.stopPropagation();
                          setActiveSpeakerPopover(null);
                        }} 
                      />
                    )}
                  </div>
                  
                  <div className="card-meta">
                    {renderStatusBadge(segment.status)}
                    {segment.warning && (
                      <div className="warning-badge" title="Target text is longer than original audio duration">
                        <AlertCircle size={14} />
                        <span>Lip-sync</span>
                      </div>
                    )}
                    <span className="timestamp">{segment.time}</span>
                    <button className="play-segment-btn" title="Play original audio">
                      <Play size={14} />
                    </button>
                    {(segment.status === 'ready' || segment.status === 'approved') && (
                      <button 
                        className={`btn-play-circle ${currentAudioId === segment.id && isPlaying ? 'playing' : ''}`}
                        onClick={(e) => playTargetAudio(segment.id, e)}
                        title="Play AI Voice"
                      >
                        {currentAudioId === segment.id && isPlaying ? (
                          <Pause size={14} />
                        ) : (
                          <Play size={14} />
                        )}
                      </button>
                    )}
                    {isActive && (
                      <div className="active-indicator">
                        <Settings size={14} /> Voice Directing
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Body: Bilingual Texts */}
                <div className="card-body">
                  <div className="original-text">
                    {segment.originalText}
                  </div>
                  
                  <textarea 
                    className="target-textarea"
                    value={segment.targetText}
                    onChange={(e) => handleTextareaChange(e, segment.id)}
                    placeholder="Nhập bản dịch tiếng Việt..."
                    onSelect={handleTextareaSelect}
                    onClick={(e) => {
                      // Prevent collapsing or losing focus
                      e.stopPropagation();
                      onSelectSegment(segment.id);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
