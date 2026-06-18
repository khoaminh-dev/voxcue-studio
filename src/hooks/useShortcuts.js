import { useEffect } from 'react';

export function useShortcuts(actions) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if inside an input/textarea unless it's a specific combo
      const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      
      if (e.key === 'Tab') {
        e.preventDefault();
        if (e.shiftKey) {
          actions.onPrevSegment?.();
        } else {
          actions.onNextSegment?.();
        }
      } else if (e.key === ' ' && !isInput) {
        e.preventDefault();
        actions.onTogglePlay?.();
      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        actions.onGenerateDubbing?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [actions]);
}
