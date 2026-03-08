/**
 * Play a success/completion sound using Web Audio API
 * Creates a pleasant chime sound without needing external audio files
 */
export const playSuccessSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const playTone = (frequency: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  const now = audioContext.currentTime;
  
  // Play a pleasant ascending chime
  playTone(523.25, now, 0.15);        // C5
  playTone(659.25, now + 0.1, 0.15);  // E5
  playTone(783.99, now + 0.2, 0.25);  // G5
  playTone(1046.50, now + 0.3, 0.4);  // C6 (higher, longer)
};