/**
 * High-Precision India Academic Network Map Visualizer
 */

class IndiaMapVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = (window.PRESENTATION_CONFIG && window.PRESENTATION_CONFIG.mapNodes) || [];
    this.stage = 1;
    this.pulses = [];
    this.animTime = 0;
    this.animationFrame = null;
    this.active = false;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = this.canvas.width = rect.width || 800;
    this.height = this.canvas.height = rect.height || 480;
  }

  start() {
    this.active = true;
    this.resize();
    if (!this.animationFrame) {
      this.animate();
    }
  }

  stop() {
    this.active = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  setStage(stageNum) {
    this.stage = stageNum;
    if (stageNum >= 3) {
      this.triggerNetworkPulses();
    }
  }

  triggerNetworkPulses() {
    const origin = this.nodes.find(n => n.isOrigin) || this.nodes[0];
    if (!origin) return;
    this.pulses = [];
    this.nodes.forEach((targetNode) => {
      if (!targetNode.isOrigin) {
        this.pulses.push({
          from: origin,
          to: targetNode,
          progress: 0,
          speed: 0.012 + Math.random() * 0.008,
          color: '#38bdf8'
        });
      }
    });
  }

  getIndiaBoundary() {
    return [
      [36, 12], [42, 14], [48, 16], [54, 22], [58, 28], [64, 30],
      [72, 32], [80, 32], [86, 36], [92, 38], [94, 42], [90, 48],
      [84, 48], [78, 52], [76, 60], [70, 68], [62, 76], [54, 86],
      [48, 92], [44, 88], [38, 78], [32, 70], [24, 62], [22, 54],
      [22, 44], [28, 38], [32, 30], [32, 20], [36, 12]
    ];
  }

  animate() {
    if (!this.active || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.animTime += 0.03;

    const scaleX = this.width / 100;
    const scaleY = this.height / 100;

    // Futuristic Grid
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
    this.ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // India Outline
    const boundary = this.getIndiaBoundary();
    this.ctx.beginPath();
    this.ctx.moveTo(boundary[0][0] * scaleX, boundary[0][1] * scaleY);
    for (let i = 1; i < boundary.length; i++) {
      this.ctx.lineTo(boundary[i][0] * scaleX, boundary[i][1] * scaleY);
    }
    this.ctx.closePath();

    const gradient = this.ctx.createRadialGradient(
      74 * scaleX, 54 * scaleY, 10,
      50 * scaleX, 50 * scaleY, 200
    );
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.12)');
    gradient.addColorStop(0.7, 'rgba(99, 102, 241, 0.05)');
    gradient.addColorStop(1, 'rgba(5, 5, 7, 0)');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowBlur = 12;
    this.ctx.shadowColor = '#38bdf8';
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    const origin = this.nodes.find(n => n.isOrigin) || this.nodes[0];
    if (!origin) return;

    const ox = origin.x * scaleX;
    const oy = origin.y * scaleY;

    // Waves from MAKAUT
    const pulseRadius = (this.animTime * 25) % 90;
    const pulseAlpha = Math.max(0, 1 - pulseRadius / 90);
    this.ctx.beginPath();
    this.ctx.arc(ox, oy, pulseRadius, 0, Math.PI * 2);
    this.ctx.strokeStyle = `rgba(56, 189, 248, ${pulseAlpha * 0.7})`;
    this.ctx.lineWidth = 1.8;
    this.ctx.stroke();

    const pulseRadius2 = ((this.animTime * 25) + 45) % 90;
    const pulseAlpha2 = Math.max(0, 1 - pulseRadius2 / 90);
    this.ctx.beginPath();
    this.ctx.arc(ox, oy, pulseRadius2, 0, Math.PI * 2);
    this.ctx.strokeStyle = `rgba(99, 102, 241, ${pulseAlpha2 * 0.6})`;
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    if (this.stage >= 2) {
      const activeTargets = this.stage === 2 
        ? this.nodes.filter(n => n.id === 'kolkata' || n.isOrigin)
        : this.nodes;

      activeTargets.forEach(target => {
        if (target.isOrigin) return;
        const tx = target.x * scaleX;
        const ty = target.y * scaleY;

        this.ctx.beginPath();
        this.ctx.moveTo(ox, oy);
        this.ctx.lineTo(tx, ty);
        this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([4, 4]);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
      });

      for (let i = 0; i < this.pulses.length; i++) {
        const p = this.pulses[i];
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;

        const px = ox + (p.to.x * scaleX - ox) * p.progress;
        const py = oy + (p.to.y * scaleY - oy) * p.progress;

        this.ctx.beginPath();
        this.ctx.arc(px, py, 3, 0, Math.PI * 2);
        this.ctx.fillStyle = '#38bdf8';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = '#38bdf8';
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      }
    }

    const visibleNodes = this.stage === 1 
      ? [origin] 
      : this.stage === 2 
        ? this.nodes.filter(n => n.id === 'kolkata' || n.isOrigin)
        : this.nodes;

    visibleNodes.forEach(node => {
      const nx = node.x * scaleX;
      const ny = node.y * scaleY;

      this.ctx.beginPath();
      this.ctx.arc(nx, ny, node.isOrigin ? 8 : 4.5, 0, Math.PI * 2);
      this.ctx.fillStyle = node.isOrigin ? '#38bdf8' : '#a78bfa';
      this.ctx.shadowBlur = node.isOrigin ? 20 : 10;
      this.ctx.shadowColor = node.isOrigin ? '#38bdf8' : '#a78bfa';
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      this.ctx.beginPath();
      this.ctx.arc(nx, ny, node.isOrigin ? 3.5 : 2, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fill();

      this.ctx.font = node.isOrigin ? '600 13px Inter, sans-serif' : '500 11px Inter, sans-serif';
      this.ctx.fillStyle = node.isOrigin ? '#38bdf8' : 'rgba(255, 255, 255, 0.75)';
      this.ctx.fillText(node.name, nx + 12, ny + 4);
    });

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

window.IndiaMapVisualizer = IndiaMapVisualizer;
