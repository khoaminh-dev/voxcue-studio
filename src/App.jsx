import React, { useState } from 'react';
import { Workspace } from './components/layout/Workspace';
import { TranscriptEditor } from './components/features/TranscriptEditor';
import { VoiceDirectorPanel } from './components/features/VoiceDirectorPanel';
import { PreviewPlayer } from './components/features/PreviewPlayer';
import { useShortcuts } from './hooks/useShortcuts';
import './App.css';

const MOCK_SEGMENTS = [
  { id: 1, speaker: "Dr. Smith", time: "00:02 - 00:08", originalText: "Welcome to this lecture on the human cardiovascular system.", targetText: "Chào mừng các bạn đến với bài giảng về hệ tim mạch ở người.", status: "approved", pitch: 50, pacing: 50, emotion: 50 },
  { id: 2, speaker: "Dr. Smith", time: "00:08 - 00:15", originalText: "Today, we will primarily focus on the mechanics of the left ventricle.", targetText: "Hôm nay, chúng ta sẽ chủ yếu tập trung vào cơ chế hoạt động của tâm thất trái.", status: "ready", pitch: 50, pacing: 50, emotion: 50 },
  { id: 3, speaker: "Dr. Smith", time: "00:15 - 00:22", originalText: "Notice how the pressure builds up before the aortic valve opens.", targetText: "Hãy chú ý cách áp lực tích tụ trước khi van động mạch chủ mở ra.", warning: true, status: "draft", pitch: 50, pacing: 50, emotion: 50 },
  { id: 4, speaker: "Dr. Smith", time: "00:22 - 00:28", originalText: "This is a critical phase in the cardiac cycle.", targetText: "Đây là một giai đoạn quan trọng trong chu chuyển tim.", status: "draft", pitch: 50, pacing: 50, emotion: 50 },
];

function App() {
  const [segments, setSegments] = useState(MOCK_SEGMENTS);
  const [activeSegmentId, setActiveSegmentId] = useState(null);
  const [viewMode, setViewMode] = useState('default'); // 'default', 'focus', 'cinema'
  const [topHeight, setTopHeight] = useState(55); // Top panel height %
  const [isPlaying, setIsPlaying] = useState(false);
  const leftColRef = React.useRef(null);

  const handleSelectSegment = (id) => {
    setActiveSegmentId(id);
  };

  const handleUpdateSegment = (id, newText) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, targetText: newText } : s));
  };

  const handleUpdateSegmentSettings = (id, settings) => {
    setSegments(prev => prev.map(s => s.id === id ? { ...s, ...settings } : s));
  };

  const handleGenerateAudio = async (id) => {
    // 1. Set to generating
    setSegments(prev => prev.map(s => s.id === id ? { ...s, status: "generating" } : s));
    
    // Skeleton for Backend API Call
    /*
    try {
      const segment = segments.find(s => s.id === id);
      const response = await fetch('http://localhost:5000/api/tts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: segment.targetText,
          speaker: segment.speaker,
          settings: {
            pacing: segment.pacing || 50,
            emotion: segment.emotion || 50,
            pitch: segment.pitch || 50
          }
        })
      });
      const data = await response.json();
      // data.audioUrl can be passed to audioStore later
    } catch (error) {
      console.error("TTS generation failed", error);
    }
    */

    // 2. Mock 3 second wait, then ready
    setTimeout(() => {
      setSegments(prev => prev.map(s => s.id === id ? { ...s, status: "ready", warning: false } : s));
    }, 3000);
  };

  const handleTranslateAll = () => {
    // 1. Change all drafts to generating
    setSegments(prev => prev.map(s => s.status === 'draft' ? { ...s, status: 'generating' } : s));

    // 2. Mock translation time
    setTimeout(() => {
      setSegments(prev => prev.map(s => s.status === 'generating' ? { ...s, status: 'ready' } : s));
    }, 4000);
  };

  const cycleViewMode = () => {
    setViewMode((prev) => {
      if (prev === 'default') return 'focus';
      if (prev === 'focus') return 'cinema';
      return 'default';
    });
  };

  // Listen for ESC key to exit Cinema/Focus mode
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && viewMode !== 'default') {
        setViewMode('default');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  // Resizer drag logic
  const handleMouseDown = React.useCallback((e) => {
    e.preventDefault();
    const handleMouseMove = (mouseEvent) => {
      if (!leftColRef.current) return;
      const rect = leftColRef.current.getBoundingClientRect();
      let percentage = ((mouseEvent.clientY - rect.top) / rect.height) * 100;
      if (percentage < 20) percentage = 20;
      if (percentage > 80) percentage = 80;
      setTopHeight(percentage);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'row-resize';
  }, []);

  useShortcuts({
    onNextSegment: () => {
      if (!activeSegmentId) {
        setActiveSegmentId(segments[0]?.id);
      } else {
        const idx = segments.findIndex(s => s.id === activeSegmentId);
        if (idx >= 0 && idx < segments.length - 1) setActiveSegmentId(segments[idx + 1].id);
      }
    },
    onPrevSegment: () => {
      const idx = segments.findIndex(s => s.id === activeSegmentId);
      if (idx > 0) setActiveSegmentId(segments[idx - 1].id);
    },
    onGenerateDubbing: () => {
      if (activeSegmentId) {
        handleGenerateAudio(activeSegmentId);
      }
    },
    onTogglePlay: () => {
      setIsPlaying(p => !p);
    }
  });

  return (
    <Workspace>
      <div className="studio-split">
        {/* Left Column: Video & Voice Directing */}
        <div className={`studio-col-left mode-${viewMode}`} ref={leftColRef}>
          <div style={{ height: `${topHeight}%`, overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            <PreviewPlayer 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
              activeSubtitle={segments.find(s => s.id === activeSegmentId)?.targetText}
              activeSegmentId={activeSegmentId}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
            />
          </div>

          {!viewMode.includes('cinema') && (
            <div className="panel-resizer-h" onMouseDown={handleMouseDown}>
              <div className="resizer-handle" />
            </div>
          )}

          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <VoiceDirectorPanel 
              activeSegmentId={activeSegmentId} 
              segments={segments} 
              onUpdateSettings={handleUpdateSegmentSettings}
              onGenerate={handleGenerateAudio}
            />
          </div>
        </div>

        {/* Right Column: Bilingual Script */}
        <div className="studio-col-right">
          <TranscriptEditor 
            segments={segments} 
            activeSegmentId={activeSegmentId}
            onSelectSegment={handleSelectSegment}
            onUpdateSegment={handleUpdateSegment}
            onTranslateAll={handleTranslateAll}
          />
        </div>
      </div>
    </Workspace>
  );
}

export default App;
