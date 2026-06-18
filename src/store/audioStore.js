import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  currentAudioId: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  currentTime: 0,
  play: (audioId) => set({ currentAudioId: audioId, isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setProgress: (progress, currentTime, duration) => set({ progress, currentTime, duration }),
  clearAudio: () => set({ currentAudioId: null, isPlaying: false, progress: 0, currentTime: 0, duration: 0 })
}));
