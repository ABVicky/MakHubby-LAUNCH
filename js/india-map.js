/**
 * High-Precision India Academic Network Map Visualizer
 * Uses the EXACT User-Provided Official Silhouette Map of India
 */

class IndiaMapVisualizer {
  constructor() {
    this.container = document.querySelector('.map-canvas-container');
    this.canvas = document.getElementById('india-map-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.animTime = 0;
    this.animationFrame = null;
    this.active = false;

    // Exact city coordinates calibrated to the 518 x 600 map coordinate space
    this.nodes = [
      { id: 'makaut', name: 'MAKAUT (West Bengal)', x: 368, y: 298, isOrigin: true, labelPos: 'right' },
      { id: 'kolkata', name: 'Kolkata (JU / CU)', x: 372, y: 326, isOrigin: false, labelPos: 'right' },
      { id: 'delhi', name: 'Delhi NCR (IITD / DU)', x: 205, y: 178, isOrigin: false, labelPos: 'left' },
      { id: 'roorkee', name: 'Roorkee (IITR)', x: 228, y: 142, isOrigin: false, labelPos: 'right' },
      { id: 'guwahati', name: 'Guwahati / NE (IITG)', x: 445, y: 228, isOrigin: false, labelPos: 'right' },
      { id: 'mumbai', name: 'Mumbai (IITB / MU)', x: 148, y: 368, isOrigin: false, labelPos: 'left' },
      { id: 'pune', name: 'Pune (SPPU / COEP)', x: 166, y: 395, isOrigin: false, labelPos: 'left' },
      { id: 'hyderabad', name: 'Hyderabad (IITH)', x: 248, y: 405, isOrigin: false, labelPos: 'right' },
      { id: 'bengaluru', name: 'Bengaluru (IISc)', x: 218, y: 490, isOrigin: false, labelPos: 'left' },
      { id: 'chennai', name: 'Chennai (IITM / Anna)', x: 272, y: 500, isOrigin: false, labelPos: 'right' }
    ];

    this.pulses = [];
    this.init();
  }

  init() {
    this.injectExactMapImage();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Injects the EXACT official map image provided by the user
   */
  injectExactMapImage() {
    if (!this.container) return;
    
    // Remove old SVG if present
    const oldSvg = document.getElementById('india-svg-vector');
    if (oldSvg) oldSvg.remove();

    let imgEl = document.getElementById('india-exact-map-img');
    if (!imgEl) {
      imgEl = document.createElement('img');
      imgEl.setAttribute('id', 'india-exact-map-img');
      imgEl.setAttribute('src', 'assets/india-map.png');
      imgEl.setAttribute('alt', 'India Map Official Boundary');
      this.container.insertBefore(imgEl, this.canvas);
    }
  }

  resize() {
    if (!this.canvas || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.cssWidth = rect.width || 680;
    this.cssHeight = rect.height || 500;
    
    this.canvas.width = this.cssWidth * dpr;
    this.canvas.height = this.cssHeight * dpr;
    
    this.ctx.scale(dpr, dpr);
  }

  start() {
    this.active = true;
    this.resize();
    this.triggerNetworkPulses();
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
    if (stageNum >= 2) {
      this.triggerNetworkPulses();
    }
  }

  triggerNetworkPulses() {
    const origin = this.nodes.find(n => n.isOrigin) || this.nodes[0];
    if (!origin) return;
    this.pulses = [];
    this.nodes.forEach((target) => {
      if (!target.isOrigin) {
        this.pulses.push({
          from: origin,
          to: target,
          progress: Math.random() * 0.6,
          speed: 0.008 + Math.random() * 0.005
        });
      }
    });
  }

  animate() {
    if (!this.active || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    this.animTime += 0.03;

    // Coordinate mapping from 518x600 image to responsive screen canvas
    const imgAspect = 518 / 600;
    let renderW = this.cssWidth;
    let renderH = renderW / imgAspect;

    if (renderH > this.cssHeight) {
      renderH = this.cssHeight;
      renderW = renderH * imgAspect;
    }

    const offsetX = (this.cssWidth - renderW) / 2;
    const offsetY = (this.cssHeight - renderH) / 2;

    const toScreen = (x, y) => ({
      x: offsetX + (x / 518) * renderW,
      y: offsetY + (y / 600) * renderH
    });

    const origin = this.nodes.find(n => n.isOrigin) || this.nodes[0];
    const originPt = toScreen(origin.x, origin.y);

    // 1. Draw Network Connection Rays from MAKAUT Origin
    this.nodes.forEach((target) => {
      if (target.isOrigin) return;
      const targetPt = toScreen(target.x, target.y);

      this.ctx.beginPath();
      this.ctx.moveTo(originPt.x, originPt.y);
      this.ctx.lineTo(targetPt.x, targetPt.y);
      this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.28)';
      this.ctx.lineWidth = 1.3;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // 2. Animated Laser Photon Pulses
    this.pulses.forEach((pulse) => {
      pulse.progress += pulse.speed;
      if (pulse.progress > 1) {
        pulse.progress = 0;
      }

      const pFrom = toScreen(pulse.from.x, pulse.from.y);
      const pTo = toScreen(pulse.to.x, pulse.to.y);

      const curX = pFrom.x + (pTo.x - pFrom.x) * pulse.progress;
      const curY = pFrom.y + (pTo.y - pFrom.y) * pulse.progress;

      this.ctx.beginPath();
      this.ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#34d399';
      this.ctx.shadowBlur = 14;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // 3. Origin Beacon Waves from MAKAUT (West Bengal)
    for (let r = 0; r < 2; r++) {
      const radius = ((this.animTime * 25) + r * 35) % 75;
      const alpha = Math.max(0, 1 - radius / 75);
      this.ctx.beginPath();
      this.ctx.arc(originPt.x, originPt.y, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(52, 211, 153, ${alpha * 0.8})`;
      this.ctx.lineWidth = 1.6;
      this.ctx.stroke();
    }

    // 4. University Nodes & Precision Labels
    this.nodes.forEach((node) => {
      const pt = toScreen(node.x, node.y);

      if (node.isOrigin) {
        // High-Lumen Origin Beacon
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 7.5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = '#34d399';
        this.ctx.shadowBlur = 20;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 12, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#10b981';
        this.ctx.lineWidth = 2.2;
        this.ctx.stroke();

        // Origin text
        this.ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
        this.ctx.fillStyle = '#34d399';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        this.ctx.shadowBlur = 8;
        this.ctx.fillText(`★ ${node.name}`, pt.x + 16, pt.y);
        this.ctx.shadowBlur = 0;
      } else {
        // Expansion Node Pins
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#a78bfa';
        this.ctx.shadowColor = '#8b5cf6';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.font = '600 11px "SF Mono", "JetBrains Mono", monospace';
        this.ctx.fillStyle = '#f1f5f9';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        this.ctx.shadowBlur = 6;

        if (node.labelPos === 'left') {
          this.ctx.textAlign = 'right';
          this.ctx.fillText(node.name, pt.x - 9, pt.y);
        } else {
          this.ctx.textAlign = 'left';
          this.ctx.fillText(node.name, pt.x + 9, pt.y);
        }
        this.ctx.shadowBlur = 0;
      }
    });

    this.animationFrame = requestAnimationFrame(() => this.animate());
  }
}

window.IndiaMapVisualizer = IndiaMapVisualizer;
