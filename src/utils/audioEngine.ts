/**
 * Audio Engine for Ganjina-e-Adab
 * Synthesizes classical tanpura/harmonium contemplative drone via Web Audio API
 * and couples with speech narration for authentic Urdu poetry recitation.
 */

class RecitationEngine {
  private audioCtx: AudioContext | null = null;
  private droneGain: GainNode | null = null;
  private isDroneActive: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private isPaused: boolean = false;
  private onSherProgressCallback: ((progress: number) => void) | null = null;
  private onCoupletEndCallback: (() => void) | null = null;
  private progressInterval: number | null = null;
  private startTime: number = 0;
  private totalSherDuration: number = 14;

  public initAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Start warm classical Sa-Pa Tanpura drone for archival poetic ambiance
   */
  public startAmbientDrone() {
    try {
      this.initAudioContext();
      if (!this.audioCtx || this.isDroneActive) return;

      const now = this.audioCtx.currentTime;
      this.droneGain = this.audioCtx.createGain();
      this.droneGain.gain.setValueAtTime(0.001, now);
      this.droneGain.gain.exponentialRampToValueAtTime(0.07, now + 2); // very soft, warm background
      this.droneGain.connect(this.audioCtx.destination);

      // Lowpass warmth filter (simulates wooden resonance of Tanpura / Harmonium)
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.connect(this.droneGain);

      // Base Tonic (C#3 / 138.59 Hz - classical South Asian tuning)
      const baseFreq = 138.59;
      const pitches = [
        baseFreq * 0.75, // Pa lower octave (G#2)
        baseFreq,        // Sa tonic (C#3)
        baseFreq * 1.5,  // Pa dominant (G#3)
        baseFreq * 2.0,  // Sa octave (C#4)
      ];

      pitches.forEach((freq, idx) => {
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), now);

        const subGain = this.audioCtx.createGain();
        subGain.gain.setValueAtTime(0.18 / (idx + 1), now);

        // Gentle lfo flutter
        const lfo = this.audioCtx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, now);
        const lfoGain = this.audioCtx.createGain();
        lfoGain.gain.setValueAtTime(1.5, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(now);

        osc.connect(subGain);
        subGain.connect(filter);
        osc.start(now);
      });

      this.isDroneActive = true;
    } catch {
      // AudioContext policy safe fallback
    }
  }

  public stopAmbientDrone() {
    if (this.droneGain && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);
      setTimeout(() => {
        this.isDroneActive = false;
      }, 1000);
    } else {
      this.isDroneActive = false;
    }
  }

  /**
   * Recite couplet aloud with solemn poetic cadence
   */
  public reciteCouplet(
    misra1: string,
    misra2: string,
    rate: number = 0.88,
    onProgress?: (progress: number) => void,
    onEnd?: () => void
  ) {
    this.stopSpeaking();
    this.initAudioContext();
    this.startAmbientDrone();

    this.onSherProgressCallback = onProgress || null;
    this.onCoupletEndCallback = onEnd || null;
    this.isSpeaking = true;
    this.isPaused = false;
    this.startTime = Date.now();
    this.totalSherDuration = (14 / rate);

    // Track simulated calligraphic progress
    if (this.progressInterval) clearInterval(this.progressInterval);
    this.progressInterval = window.setInterval(() => {
      if (this.isSpeaking && !this.isPaused) {
        const elapsed = (Date.now() - this.startTime) / 1000;
        const ratio = Math.min(1, elapsed / this.totalSherDuration);
        if (this.onSherProgressCallback) {
          this.onSherProgressCallback(ratio);
        }
        if (ratio >= 1) {
          if (this.progressInterval) clearInterval(this.progressInterval);
          this.isSpeaking = false;
          if (this.onCoupletEndCallback) {
            this.onCoupletEndCallback();
          }
        }
      }
    }, 100);

    // Speech Synthesis
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // Combined text with deliberate poetic caesura between hemistichs
      const fullText = `${misra1} ... ... ${misra2}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = rate;
      utterance.pitch = 0.92; // Slightly deeper, more contemplative tone

      // Prefer Urdu or Hindi speech voices
      const voices = window.speechSynthesis.getVoices();
      const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.startsWith('hi')) ||
        voices.find(v => v.lang.includes('IN') || v.lang.includes('PK')) || null;

      if (urduVoice) {
        utterance.voice = urduVoice;
      }
      utterance.lang = 'ur-PK';

      utterance.onend = () => {
        // Will be handled by time threshold or end
      };

      utterance.onerror = () => {
        // Fallback progress will finish gracefully
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }

  public pause() {
    this.isPaused = true;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }

  public resume() {
    this.isPaused = false;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }

  public stopSpeaking() {
    this.isSpeaking = false;
    this.isPaused = false;
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public getIsPlaying(): boolean {
    return this.isSpeaking && !this.isPaused;
  }
}

export const recitationEngine = new RecitationEngine();
