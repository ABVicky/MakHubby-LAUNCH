/**
 * High-Precision India Academic Network Map Visualizer
 * Ultra-Detailed Authentic Vector Projection + Photon Laser Engine
 */

class IndiaMapVisualizer {
  constructor(containerId) {
    this.container = document.querySelector('.map-canvas-container');
    this.canvas = document.getElementById('india-map-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.animTime = 0;
    this.animationFrame = null;
    this.active = false;

    // True geographical positions mapped onto standard India map coordinate space [viewBox: 0 0 600 680]
    this.nodes = [
      { id: 'makaut', name: 'MAKAUT (West Bengal)', x: 420, y: 345, isOrigin: true, labelPos: 'right', state: 'Origin Hub' },
      { id: 'kolkata', name: 'Kolkata (JU / CU)', x: 425, y: 375, isOrigin: false, labelPos: 'right', state: 'WB' },
      { id: 'delhi', name: 'Delhi NCR (IITD / DU)', x: 235, y: 205, isOrigin: false, labelPos: 'left', state: 'Delhi' },
      { id: 'roorkee', name: 'Roorkee (IITR)', x: 260, y: 165, isOrigin: false, labelPos: 'right', state: 'UK' },
      { id: 'guwahati', name: 'Guwahati (IITG)', x: 505, y: 255, isOrigin: false, labelPos: 'right', state: 'Assam' },
      { id: 'mumbai', name: 'Mumbai (IITB / MU)', x: 165, y: 420, isOrigin: false, labelPos: 'left', state: 'MH' },
      { id: 'pune', name: 'Pune (SPPU / COEP)', x: 185, y: 450, isOrigin: false, labelPos: 'left', state: 'MH' },
      { id: 'hyderabad', name: 'Hyderabad (IITH)', x: 280, y: 460, isOrigin: false, labelPos: 'right', state: 'TS' },
      { id: 'bengaluru', name: 'Bengaluru (IISc)', x: 245, y: 555, isOrigin: false, labelPos: 'left', state: 'KA' },
      { id: 'chennai', name: 'Chennai (IITM / Anna)', x: 305, y: 565, isOrigin: false, labelPos: 'right', state: 'TN' }
    ];

    this.pulses = [];
    this.init();
  }

  init() {
    this.injectDetailedSvgMap();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  /**
   * Embeds an authentic, high-definition curved SVG vector of India into the background
   */
  injectDetailedSvgMap() {
    if (!this.container) return;
    
    // Check if svg already exists
    let svgEl = document.getElementById('india-svg-vector');
    if (!svgEl) {
      svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.setAttribute('id', 'india-svg-vector');
      svgEl.setAttribute('viewBox', '0 0 600 680');
      svgEl.innerHTML = `
        <defs>
          <linearGradient id="indiaMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#064e3b" stop-opacity="0.35" />
            <stop offset="50%" stop-color="#1e1b4b" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#06090e" stop-opacity="0.6" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Authentic High-Resolution India Geographic Vector Path -->
        <path class="india-border-path" d="
          M 245,35
          C 255,25 270,20 285,25
          C 295,30 310,25 320,40
          C 335,60 330,85 315,105
          C 305,115 315,130 330,135
          C 350,140 375,155 395,160
          C 415,165 425,155 435,160
          C 440,165 440,175 450,180
          C 465,185 490,170 515,165
          C 535,160 555,175 565,195
          C 575,215 565,240 545,260
          C 535,270 535,290 525,305
          C 515,320 495,325 480,315
          C 465,305 450,300 440,315
          C 435,325 445,340 440,355
          C 435,370 415,385 405,395
          C 390,410 380,440 365,470
          C 350,500 335,535 320,570
          C 305,605 285,640 270,660
          C 260,650 250,620 240,580
          C 230,540 215,500 200,470
          C 185,440 170,410 160,390
          C 145,360 120,345 105,350
          C 90,355 80,340 90,325
          C 100,310 120,305 135,315
          C 150,325 170,310 165,290
          C 160,270 145,250 155,230
          C 165,210 185,185 205,165
          C 220,145 225,120 230,95
          C 235,70 235,45 245,35 Z
        " fill="url(#indiaMapGrad)" stroke="#34d399" stroke-width="2.2" filter="url(#glowFilter)" opacity="0.9" />

        <!-- Interior Zone Contours -->
        <path d="M 235,205 Q 330,270 420,345" fill="none" stroke="rgba(52, 211, 153, 0.15)" stroke-width="1" stroke-dasharray="4,4"/>
        <path d="M 420,345 Q 330,450 245,555" fill="none" stroke="rgba(52, 211, 153, 0.15)" stroke-width="1" stroke-dasharray="4,4"/>
        <path d="M 420,345 Q 290,380 165,420" fill="none" stroke="rgba(52, 211, 153, 0.15)" stroke-width="1" stroke-dasharray="4,4"/>
      `;
      this.container.insertBefore(svgEl, this.canvas);
    }
  }

  resize() {
    if (!this.canvas || !this.container) return;
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.cssWidth = rect.width || 760;
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

    // Coordinate mapping from SVG viewBox (600x680) to Screen Canvas
    const svgAspect = 600 / 680;
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
      y: offsetY + (y / 680) * renderH
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
      this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.22)';
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
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
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
