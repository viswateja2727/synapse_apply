class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('synapse-rush-sound');
      this.enabled = saved !== 'false';
    }
  }

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('synapse-rush-sound', String(this.enabled));
    return this.enabled;
  }

  playCorrect(): void {
    if (!this.enabled) return;
    this.playTone([523.25, 659.25, 783.99], 0.15, 'sine');
  }

  playWrong(): void {
    if (!this.enabled) return;
    this.playTone([200, 150], 0.2, 'sawtooth');
  }

  playStreak(): void {
    if (!this.enabled) return;
    this.playTone([440, 554.37, 659.25, 880], 0.1, 'sine');
  }

  playGameOver(): void {
    if (!this.enabled) return;
    this.playTone([440, 349.23, 293.66, 220], 0.25, 'triangle');
  }

  playStart(): void {
    if (!this.enabled) return;
    this.playTone([261.63, 329.63, 392, 523.25], 0.12, 'sine');
  }

  playTick(): void {
    if (!this.enabled) return;
    this.playTone([800], 0.05, 'sine');
  }

  private playTone(frequencies: number[], duration: number, type: OscillatorType): void {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, now + i * duration);

        gainNode.gain.setValueAtTime(0.3, now + i * duration);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + (i + 1) * duration);

        oscillator.start(now + i * duration);
        oscillator.stop(now + (i + 1) * duration);
      });
    } catch (e) {
      console.warn('Audio not available');
    }
  }
}

export const soundManager = new SoundManager();
