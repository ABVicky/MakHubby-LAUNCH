/**
 * Cinematic Web Audio Procedural Synthesizer
 * Zero external audio dependencies - generates realistic cinematic sub-bass,
 * risers, impacts, glitches, ticks, and ambient drones natively in the browser.
 */

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Default muted until user toggles or enables
    this.isInitialized = false;
    this.masterGain = null;
  }

  init() {
    if (this.isInitialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
      this.isInitialized = true;
    } catch (e) {
      console.warn("Web Audio not initialized yet", e);
    }
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.8, now + 0.1);
    }
    if (!this.isMuted) {
      this.playTick();
    }
    return !this.isMuted;
  }

  playTick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  }

  playBassImpact() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 1.2);
      
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now);
      osc.stop(now + 1.5);
    } catch (e) {}
  }

  playGlitchBurst() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(3, now);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      whiteNoise.start(now);
    } catch (e) {}
  }

  playRiser() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 1.8);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + 1.8);
      
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.9);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now);
      osc.stop(now + 2.0);
    } catch (e) {}
  }

  playLaunchChord() {
    if (this.isMuted || !this.ctx) return;
    try {
      const freqs = [220, 277.18, 329.63, 440, 554.37, 659.25];
      const now = this.ctx.currentTime;
      
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.18 / freqs.length, now + idx * 0.05 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start(now + idx * 0.05);
        osc.stop(now + 3.2);
      });
      
      this.playBassImpact();
    } catch (e) {}
  }
}

window.audioEngine = new AudioEngine();
