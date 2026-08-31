/**
 * High-Precision India Academic Network Map Visualizer
 * Accurate Geographical Vector Projection with Aspect Ratio Preservation
 */

class IndiaMapVisualizer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.stage = 1;
    this.pulses = [];
    this.animTime = 0;
    this.animationFrame = null;
    this.active = false;

    // Geographically accurate coordinates mapped on a normalized 100x100 grid
    this.nodes = [
      { id: 'makaut', name: 'MAKAUT (West Bengal)', x: 72, y: 47, isOrigin: true, labelPos: 'right' },
      { id: 'kolkata', name: 'Kolkata (JU / CU)', x: 73, y: 51, isOrigin: false, labelPos: 'right' },
      { id: 'delhi', name: 'Delhi NCR (IITD / DU)', x: 44, y: 22, isOrigin: false, labelPos: 'left' },
      { id: 'roorkee', name: 'Roorkee (IITR)', x: 48, y: 16, isOrigin: false, labelPos: 'right' },
      { id: 'northeast', name: 'Guwahati / NE (IITG)', x: 84, y: 31, isOrigin: false, labelPos: 'right' },
      { id: 'mumbai', name: 'Mumbai (IITB / MU)', x: 33, y: 55, isOrigin: false, labelPos: 'left' },
      { id: 'pune', name: 'Pune (SPPU / COEP)', x: 36, y: 60, isOrigin: false, labelPos: 'left' },
      { id: 'hyderabad', name: 'Hyderabad (IITH / JNTU)', x: 50, y: 61, isOrigin: false, labelPos: 'right' },
      { id: 'bengaluru', name: 'Bengaluru (IISc / VTU)', x: 45, y: 76, isOrigin: false, labelPos: 'left' },
      { id: 'chennai', name: 'Chennai (IITM / Anna)', x: 55, y: 78, isOrigin: false, labelPos: 'right' }
    ];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    this.cssWidth = rect.width || 800;
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
          progress: Math.random() * 0.5,
          speed: 0.008 + Math.random() * 0.006,
          trail: []
        });
      }
    });
  }

  /**
   * Geographically accurate vector polygon of India's coastline & borders
   * Normalized on a [0..100] coordinate space (North at top, South at bottom)
   */
  getIndiaBoundary() {
    return [
      // Northern Crown (Kashmir / Ladakh)
      [47, 5], [52, 4], [55, 7], [56, 12],
      // Himachal / Uttarakhand / Nepal border
      [53, 15], [55, 18], [61, 22], [67, 24],
      // Sikkim & Bhutan border
      [71, 24], [72, 22], [75, 23],
      // Arunachal Pradesh & North-East Frontier
      [79, 21], [85, 20], [89, 23], [91, 28],
      // Nagaland / Manipur / Mizoram / Myanmar border
      [88, 36], [85, 41], [81, 40], [78, 37],
      // Bangladesh cut / West Bengal coast & Sundarbans
      [75, 34], [73, 40], [75, 46], [72, 49],
      // Odisha & Andhra Coast (Bay of Bengal)
      [68, 54], [64, 61], [58, 69], [55, 77],
      // Tamil Nadu & Kanyakumari (Southern Tip)
      [52, 85], [49, 93], [46, 92],
      // Kerala & Karnataka (Arabian Sea Coast)
      [43, 85], [41, 76], [38, 68],
      // Goa & Maharashtra (Konkan Coast)
      [36, 61], [33, 54], [34, 48],
      // Gujarat Peninsula (Gulf of Khambhat & Kutch)
      [30, 45], [25, 47], [20, 44], [18, 39], [22, 35], [28, 33],
      // Rajasthan & Punjab (Western Border)
      [31, 27], [35, 20], [38, 14], [43, 8],
      // Back to Kashmir Peak
      [47, 5]
    ];
  }

  animate() {
    if (!this.active || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.cssWidth, this.cssHeight);
    this.animTime += 0.03;

    // Aspect ratio preservation (India is tall: height/width ratio ~1.15)
    const padding = 24;
    const availableW = this.cssWidth - padding * 2;
    const availableH = this.cssHeight - padding * 2;

    const scale = Math.min(availableW / 96, availableH / 98);
    const mapWidth = 96 * scale;
    const mapHeight = 98 * scale;

    const offsetX = (this.cssWidth - mapWidth) / 2;
    const offsetY = (this.cssHeight - mapHeight) / 2 + 5;

    const toScreen = (x, y) => ({
      x: offsetX + (x * scale),
      y: offsetY + (y * scale)
    });

    // 1. Futuristic Tactical Coordinate Grid
    this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.04)';
    this.ctx.lineWidth = 1;
    const gridSize = 45;
    for (let x = 0; x < this.cssWidth; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.cssHeight);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.cssHeight; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.cssWidth, y);
      this.ctx.stroke();
    }

    // 2. India Map Vector Outline & Atmospheric Aurora Glow
    const boundary = this.getIndiaBoundary();
    this.ctx.beginPath();
    const firstPt = toScreen(boundary[0][0], boundary[0][1]);
    this.ctx.moveTo(firstPt.x, firstPt.y);
    for (let i = 1; i < boundary.length; i++) {
      const pt = toScreen(boundary[i][0], boundary[i][1]);
      this.ctx.lineTo(pt.x, pt.y);
    }
    this.ctx.closePath();

    // Map Interior Fill Gradient (Aurora Emerald to Deep Obsidian)
    const originNode = this.nodes.find(n => n.isOrigin) || this.nodes[0];
    const originPt = toScreen(originNode.x, originNode.y);

    const mapGradient = this.ctx.createRadialGradient(
      originPt.x, originPt.y, 10,
      this.cssWidth / 2, this.cssHeight / 2, mapHeight * 0.7
    );
    mapGradient.addColorStop(0, 'rgba(16, 185, 129, 0.16)');
    mapGradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.06)');
    mapGradient.addColorStop(1, 'rgba(6, 9, 16, 0.4)');
    this.ctx.fillStyle = mapGradient;
    this.ctx.fill();

    // Luminous Map Border Stroke
    this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.55)';
    this.ctx.lineWidth = 2;
    this.ctx.shadowColor = '#10b981';
    this.ctx.shadowBlur = 14;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // 3. Photon Laser Network Lines from MAKAUT Origin
    this.nodes.forEach((target) => {
      if (target.isOrigin) return;
      const targetPt = toScreen(target.x, target.y);

      this.ctx.beginPath();
      this.ctx.moveTo(originPt.x, originPt.y);
      this.ctx.lineTo(targetPt.x, targetPt.y);
      this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.18)';
      this.ctx.lineWidth = 1.2;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // 4. Animated Photon Laser Pulses traveling across network
    this.pulses.forEach((pulse) => {
      pulse.progress += pulse.speed;
      if (pulse.progress > 1) {
        pulse.progress = 0;
      }

      const fromPt = toScreen(pulse.from.x, pulse.from.y);
      const toPt = toScreen(pulse.to.x, pulse.to.y);

      const curX = fromPt.x + (toPt.x - fromPt.x) * pulse.progress;
      const curY = fromPt.y + (toPt.y - fromPt.y) * pulse.progress;

      // Glow head
      this.ctx.beginPath();
      this.ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#34d399';
      this.ctx.shadowBlur = 12;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // 5. Origin Wave Rings from MAKAUT (West Bengal)
    for (let ring = 0; ring < 2; ring++) {
      const ringRadius = ((this.animTime * 28) + ring * 35) % 80;
      const ringAlpha = Math.max(0, 1 - ringRadius / 80);
      this.ctx.beginPath();
      this.ctx.arc(originPt.x, originPt.y, ringRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(52, 211, 153, ${ringAlpha * 0.7})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }

    // 6. Draw University Nodes & Distance-Legible Labels
    this.nodes.forEach((node) => {
      const pt = toScreen(node.x, node.y);

      if (node.isOrigin) {
        // Origin Beacon (MAKAUT)
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.shadowColor = '#34d399';
        this.ctx.shadowBlur = 18;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#10b981';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // High-Lumen Origin Label
        this.ctx.font = 'bold 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
        this.ctx.fillStyle = '#34d399';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        this.ctx.shadowBlur = 6;
        this.ctx.fillText(`★ ${node.name}`, pt.x + 16, pt.y);
        this.ctx.shadowBlur = 0;
      } else {
        // Target University Hubs
        this.ctx.beginPath();
        this.ctx.arc(pt.x, pt.y, 4.5, 0, Math.PI * 2);
        this.ctx.fillStyle = '#a78bfa';
        this.ctx.shadowColor = '#8b5cf6';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Label formatting
        this.ctx.font = '600 10.5px "SF Mono", "JetBrains Mono", monospace';
        this.ctx.fillStyle = '#e2e8f0';
        this.ctx.textBaseline = 'middle';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        this.ctx.shadowBlur = 5;

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
