/**
 * Ambient Canvas Particle & Constellation Engine
 */

class ParticleBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 75;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animationFrame = null;
    this.accentColor = 'rgba(56, 189, 248, '; // Cyan base
    this.speedMultiplier = 1;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseVal: Math.random() * Math.PI
      });
    }
  }

  setTheme(theme) {
    if (theme === 'glitch') {
      this.accentColor = 'rgba(239, 68, 68, ';
      this.speedMultiplier = 3.5;
    } else if (theme === 'launch') {
      this.accentColor = 'rgba(52, 211, 153, ';
      this.speedMultiplier = 2;
    } else if (theme === 'gold') {
      this.accentColor = 'rgba(251, 191, 36, ';
      this.speedMultiplier = 1.2;
    } else {
      this.accentColor = 'rgba(56, 189, 248, ';
      this.speedMultiplier = 1;
    }
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const lineAlpha = (1 - dist / 110) * 0.12;
          this.ctx.strokeStyle = `${this.accentColor}${lineAlpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx * this.speedMultiplier;
      p.y += p.vy * this.speedMultiplier;
      p.pulseVal += p.pulseSpeed;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulseVal));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `${this.accentColor}${currentAlpha})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `${this.accentColor}0.8)`;
      this.ctx.fill();
    }

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

window.ParticleBackground = ParticleBackground;
