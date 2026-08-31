/**
 * High-Precision India Academic Network Map Visualizer
 * Exact Official Geographic Boundary of India + Photon Laser Engine
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

    // High-precision geographic nodes calibrated to standard 600x700 map space
    this.nodes = [
      { id: 'makaut', name: 'MAKAUT (West Bengal)', x: 415, y: 345, isOrigin: true, labelPos: 'right' },
      { id: 'kolkata', name: 'Kolkata (JU / CU)', x: 420, y: 375, isOrigin: false, labelPos: 'right' },
      { id: 'delhi', name: 'Delhi NCR (IITD / DU)', x: 235, y: 200, isOrigin: false, labelPos: 'left' },
      { id: 'roorkee', name: 'Roorkee (IITR)', x: 260, y: 165, isOrigin: false, labelPos: 'right' },
      { id: 'guwahati', name: 'Guwahati / NE (IITG)', x: 505, y: 260, isOrigin: false, labelPos: 'right' },
      { id: 'mumbai', name: 'Mumbai (IITB / MU)', x: 165, y: 415, isOrigin: false, labelPos: 'left' },
      { id: 'pune', name: 'Pune (SPPU / COEP)', x: 185, y: 445, isOrigin: false, labelPos: 'left' },
      { id: 'hyderabad', name: 'Hyderabad (IITH)', x: 275, y: 455, isOrigin: false, labelPos: 'right' },
      { id: 'bengaluru', name: 'Bengaluru (IISc)', x: 240, y: 550, isOrigin: false, labelPos: 'left' },
      { id: 'chennai', name: 'Chennai (IITM / Anna)', x: 300, y: 560, isOrigin: false, labelPos: 'right' }
    ];

    this.pulses = [];
    this.init();
  }

  init() {
    this.injectOfficialSvgMap();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Injects the exact official silhouette boundary of India
   */
  injectOfficialSvgMap() {
    if (!this.container) return;
    
    let svgEl = document.getElementById('india-svg-vector');
    if (!svgEl) {
      svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.setAttribute('id', 'india-svg-vector');
      svgEl.setAttribute('viewBox', '0 0 600 700');
      svgEl.innerHTML = `
        <defs>
          <linearGradient id="indiaMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#059669" stop-opacity="0.32" />
            <stop offset="50%" stop-color="#6d28d9" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#06090e" stop-opacity="0.65" />
          </linearGradient>
          <filter id="indiaNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        <!-- Exact Official Mainland Boundary of India -->
        <path class="india-border-path" d="
          M 160,55
          C 170,40 190,25 210,25
          C 220,25 230,35 235,45
          C 240,40 250,45 260,50
          C 275,60 270,75 275,85
          C 280,95 285,90 295,95
          C 305,100 300,115 305,125
          C 310,135 295,145 290,155
          C 285,165 295,175 300,185
          C 310,200 325,200 335,210
          C 345,220 340,235 350,245
          C 360,255 375,250 385,255
          C 395,260 405,250 415,255
          C 425,260 425,230 435,225
          C 440,225 440,240 450,240
          C 460,240 460,230 470,230
          C 485,230 500,215 515,215
          C 530,215 545,200 555,205
          C 565,210 575,225 580,240
          C 570,245 560,250 560,260
          C 560,270 570,280 565,290
          C 555,300 540,310 535,325
          C 530,340 520,350 515,365
          C 505,370 495,355 490,340
          C 485,325 480,310 470,305
          C 460,300 450,305 440,315
          C 430,325 435,340 430,355
          C 425,370 420,380 410,390
          C 395,400 385,420 375,445
          C 365,470 350,490 345,515
          C 340,540 335,565 325,590
          C 315,615 295,640 280,650
          C 275,650 270,640 265,630
          C 255,610 245,580 235,550
          C 225,520 215,485 200,455
          C 185,425 170,395 155,370
          C 145,355 130,345 115,350
          C 100,355 90,345 95,335
          C 100,325 115,320 130,325
          C 145,330 160,315 155,295
          C 150,275 135,260 140,245
          C 145,230 160,225 170,215
          C 180,205 185,185 190,170
          C 195,155 185,145 175,140
          C 165,135 165,120 170,105
          C 175,90 155,75 160,55 Z
        " fill="url(#indiaMapGrad)" stroke="#34d399" stroke-width="2.2" filter="url(#indiaNeonGlow)" opacity="0.95" />

        <!-- Andaman & Nicobar Islands -->
        <g fill="#34d399" opacity="0.8">
          <ellipse cx="495" cy="545" rx="3.5" ry="14" />
          <ellipse cx="498" cy="575" rx="3" ry="8" />
          <ellipse cx="490" cy="605" rx="2.5" ry="3.5" />
          <ellipse cx="500" cy="625" rx="3.5" ry="6" />
          <ellipse cx="508" cy="645" rx="3" ry="7" />
        </g>

        <!-- Lakshadweep Islands -->
        <g fill="#34d399" opacity="0.8">
          <circle cx="185" cy="580" r="2.5" />
          <circle cx="190" cy="600" r="2.5" />
          <circle cx="195" cy="625" r="3" />
        </g>
      `;
      this.container.insertBefore(svgEl, this.canvas);
    }
  }

  resize() {
    if (!this.canvas || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.cssWidth = rect.width || 680;
    this.cssHeight = rect.height || 480;
    
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

    // Coordinate mapping from SVG viewBox (600x700) to Screen Canvas
    const svgAspect = 600 / 700;
    let renderW = this.cssWidth;
    let renderH = renderW / svgAspect;

    if (renderH > this.cssHeight) {
      renderH = this.cssHeight;
      renderW = renderH * svgAspect;
    }

    const offsetX = (this.cssWidth - renderW) / 2;
    const offsetY = (this.cssHeight - renderH) / 2;

    const toScreen = (x, y) => ({
      x: offsetX + (x / 600) * renderW,
      y: offsetY + (y / 700) * renderH
    });

    const origin = this.nodes.find(n => n.isOrigin) || this.nodes[0];
    const originPt = toScreen(origin.x, origin.y);

    // 1. Draw Network Connections from MAKAUT Origin
    this.nodes.forEach((target) => {
      if (target.isOrigin) return;
      const targetPt = toScreen(target.x, target.y);

      this.ctx.beginPath();
      this.ctx.moveTo(originPt.x, originPt.y);
      this.ctx.lineTo(targetPt.x, targetPt.y);
      this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.25)';
      this.ctx.lineWidth = 1.3;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // 2. Animated Laser Photons Traveling on Network Lines
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
      this.ctx.strokeStyle = `rgba(52, 211, 153, ${alpha * 0.75})`;
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
