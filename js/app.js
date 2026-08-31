/**
 * MakHubby Launch Presentation - Main Application Controller
 * Powered & Brought to you by Manikarnika Technologies
 */

class PresentationApp {
  constructor() {
    this.currentSceneIndex = 0;
    this.scenes = [];
    this.totalScenes = 20;
    this.isTransitioning = false;
    this.touchStartY = 0;
    this.touchStartX = 0;
    this.wheelDebounceTimer = null;
    this.presenterTimer = 0;
    this.presenterTimerInterval = null;

    // Projector Stage Features
    this.isLaserActive = false;
    this.isBlackoutActive = false;
    this.idleTimer = null;
    this.laserDotEl = null;
    this.blackoutEl = null;

    // Subsystems
    this.particleBg = null;
    this.indiaMap = null;
    this.sceneController = null;

    this.init();
  }

  init() {
    // Collect scene DOM elements
    this.scenes = Array.from(document.querySelectorAll('.scene'));
    this.totalScenes = this.scenes.length || 20;
    this.laserDotEl = document.getElementById('stage-laser-dot');
    this.blackoutEl = document.getElementById('stage-blackout-screen');

    // Initialize VFX and Sub-engines
    if (window.ParticleBackground) {
      this.particleBg = new window.ParticleBackground('particle-canvas');
    }
    if (window.IndiaMapVisualizer) {
      this.indiaMap = new window.IndiaMapVisualizer('india-map-canvas');
    }
    if (window.SceneController) {
      this.sceneController = new window.SceneController(this.indiaMap, this.particleBg);
    }

    // Render interactive mockup in Scene 11
    if (window.renderProductMockup) {
      window.renderProductMockup('product-mockup-container');
    }

    // Build presenter drawer menu
    this.buildPresenterDrawer();

    // Setup input event listeners
    this.setupKeyboard();
    this.setupWheelAndGestures();
    this.setupPresenterHUD();
    this.setupProjectorFeatures();
    this.startPresenterClock();

    // Check URL Hash for initial scene (e.g. #0, #1, #15)
    const hash = window.location.hash.replace('#', '');
    const initialIndex = parseInt(hash, 10);
    if (!isNaN(initialIndex) && initialIndex >= 0 && initialIndex < this.totalScenes) {
      this.goToScene(initialIndex, false);
    } else {
      this.goToScene(0, false);
    }

    // Window resize handler
    window.addEventListener('resize', () => {
      if (this.indiaMap && this.scenes[this.currentSceneIndex]?.id === 'scene-15') {
        this.indiaMap.resize();
      }
    });
  }

  setupProjectorFeatures() {
    // Laser pointer coordinate tracking
    window.addEventListener('mousemove', (e) => {
      if (this.laserDotEl && this.isLaserActive) {
        this.laserDotEl.style.left = `${e.clientX}px`;
        this.laserDotEl.style.top = `${e.clientY}px`;
      }
      this.resetIdleTimer();
    });

    // Auto-hide cursor on projector when idle
    this.resetIdleTimer();
  }

  resetIdleTimer() {
    document.body.classList.remove('hide-cursor');
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      // Hide cursor if not hovering over HUD/modals
      if (!document.querySelector('.drawer.open') && !document.querySelector('.modal-overlay.open')) {
        document.body.classList.add('hide-cursor');
      }
    }, 3500);
  }

  toggleLaser() {
    this.isLaserActive = !this.isLaserActive;
    document.body.classList.toggle('laser-active', this.isLaserActive);
    const btn = document.getElementById('hud-laser');
    if (btn) btn.classList.toggle('active', this.isLaserActive);
  }

  toggleBlackout() {
    this.isBlackoutActive = !this.isBlackoutActive;
    document.body.classList.toggle('blackout-active', this.isBlackoutActive);
    const btn = document.getElementById('hud-blackout');
    if (btn) btn.classList.toggle('active', this.isBlackoutActive);
  }

  goToScene(index, animate = true) {
    if (index < 0 || index >= this.totalScenes) return;
    if (this.isTransitioning && animate) return;

    this.isTransitioning = true;

    // Stop current scene map if leaving scene 15
    if (this.scenes[this.currentSceneIndex]?.id === 'scene-15' && index !== this.currentSceneIndex) {
      this.indiaMap?.stop();
    }

    // Update active class on scenes
    this.scenes.forEach((sc, idx) => {
      sc.classList.toggle('active', idx === index);
      sc.classList.toggle('passed', idx < index);
    });

    this.currentSceneIndex = index;
    const currentScene = this.scenes[index];

    // Update Progress Indicator & Hash
    this.updateHUD(index);
    try {
      window.history.replaceState(null, null, `#${String(index + 1).padStart(2, '0')}`);
    } catch (e) {}

    // Trigger Scene Animations
    if (this.sceneController && currentScene) {
      this.sceneController.onSceneEnter(index, currentScene);
    }

    setTimeout(() => {
      this.isTransitioning = false;
    }, 450);
  }

  next() {
    if (this.isBlackoutActive) this.toggleBlackout();
    if (this.currentSceneIndex < this.totalScenes - 1) {
      this.goToScene(this.currentSceneIndex + 1);
    }
  }

  prev() {
    if (this.isBlackoutActive) this.toggleBlackout();
    if (this.currentSceneIndex > 0) {
      this.goToScene(this.currentSceneIndex - 1);
    }
  }

  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      this.resetIdleTimer();

      switch (e.key) {
        // Next triggers (compatible with Logitech / standard wireless presentation remotes)
        case ' ':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case 'Enter':
        case 'N':
        case 'n':
          e.preventDefault();
          this.next();
          break;

        // Previous triggers
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
        case 'P':
        case 'p':
          // If shift is held or P is pressed
          if (e.key === 'p' || e.key === 'P') {
            e.preventDefault();
            this.togglePresenterDrawer();
          } else {
            e.preventDefault();
            this.prev();
          }
          break;

        // Stage Blackout (Standard presenter remote 'B' or '.')
        case 'b':
        case 'B':
        case '.':
          e.preventDefault();
          this.toggleBlackout();
          break;

        // Stage Laser Pointer
        case 'l':
        case 'L':
          e.preventDefault();
          this.toggleLaser();
          break;

        case 'Home':
          e.preventDefault();
          this.goToScene(0);
          break;

        case 'End':
          e.preventDefault();
          this.goToScene(this.totalScenes - 1);
          break;

        case 'f':
        case 'F':
        case 'F5':
          e.preventDefault();
          this.toggleFullscreen();
          break;

        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleAudio();
          break;

        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          this.toggleHelpModal();
          break;

        case 'Escape':
          if (this.isBlackoutActive) {
            this.toggleBlackout();
          } else {
            this.closeModalsAndDrawers();
          }
          break;
      }
    });
  }

  setupWheelAndGestures() {
    window.addEventListener('wheel', (e) => {
      if (document.querySelector('.drawer.open') || document.querySelector('.modal-overlay.open')) return;

      if (this.wheelDebounceTimer) return;
      if (Math.abs(e.deltaY) < 25) return;

      if (e.deltaY > 0) {
        this.next();
      } else {
        this.prev();
      }

      this.wheelDebounceTimer = setTimeout(() => {
        this.wheelDebounceTimer = null;
      }, 700);
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const deltaY = e.changedTouches[0].clientY - this.touchStartY;
      const deltaX = e.changedTouches[0].clientX - this.touchStartX;

      if (Math.abs(deltaY) > 50 || Math.abs(deltaX) > 50) {
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          if (deltaY < 0) this.next();
          else this.prev();
        } else {
          if (deltaX < 0) this.next();
          else this.prev();
        }
      }
    }, { passive: true });
  }

  setupPresenterHUD() {
    document.getElementById('hud-prev')?.addEventListener('click', () => this.prev());
    document.getElementById('hud-next')?.addEventListener('click', () => this.next());
    document.getElementById('hud-fullscreen')?.addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('hud-audio')?.addEventListener('click', () => this.toggleAudio());
    document.getElementById('hud-laser')?.addEventListener('click', () => this.toggleLaser());
    document.getElementById('hud-blackout')?.addEventListener('click', () => this.toggleBlackout());
    document.getElementById('hud-drawer-toggle')?.addEventListener('click', () => this.togglePresenterDrawer());
    document.getElementById('drawer-close-btn')?.addEventListener('click', () => this.closeModalsAndDrawers());
    document.getElementById('hud-help-btn')?.addEventListener('click', () => this.toggleHelpModal());
    document.getElementById('help-modal-close')?.addEventListener('click', () => this.closeModalsAndDrawers());
  }

  updateHUD(index) {
    const formattedCurrent = String(index).padStart(2, '0');
    const formattedTotal = String(Math.max(0, this.totalScenes - 1)).padStart(2, '0');

    const counterEl = document.getElementById('hud-scene-counter');
    if (counterEl) {
      counterEl.textContent = `${formattedCurrent} / ${formattedTotal}`;
    }

    const progressBar = document.getElementById('hud-progress-bar');
    if (progressBar) {
      const pct = (index / Math.max(1, this.totalScenes - 1)) * 100;
      progressBar.style.width = `${Math.max(3, pct)}%`;
    }

    const drawerItems = document.querySelectorAll('.drawer-scene-item');
    drawerItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === index);
    });
  }

  buildPresenterDrawer() {
    const listEl = document.getElementById('drawer-scene-list');
    if (!listEl || !window.PRESENTATION_CONFIG) return;

    listEl.innerHTML = '';
    window.PRESENTATION_CONFIG.scenesList.forEach((sc, idx) => {
      const item = document.createElement('div');
      item.className = 'drawer-scene-item';
      item.innerHTML = `
        <span class="drawer-num">${sc.num}</span>
        <span class="drawer-title">${sc.title}</span>
      `;
      item.addEventListener('click', () => {
        this.goToScene(idx);
        this.closeModalsAndDrawers();
      });
      listEl.appendChild(item);
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen?.();
    }
  }

  toggleAudio() {
    if (!window.audioEngine) return;
    const isUnmuted = window.audioEngine.toggleMute();
    const btn = document.getElementById('hud-audio');
    if (btn) {
      btn.classList.toggle('active', isUnmuted);
      btn.setAttribute('title', isUnmuted ? 'Sound SFX Enabled (Press M)' : 'Sound SFX Muted (Press M)');
      const label = btn.querySelector('.btn-label');
      if (label) label.textContent = isUnmuted ? 'Audio On' : 'Audio';
    }
  }

  togglePresenterDrawer() {
    document.getElementById('presenter-drawer')?.classList.toggle('open');
  }

  toggleHelpModal() {
    document.getElementById('help-modal')?.classList.toggle('open');
  }

  closeModalsAndDrawers() {
    document.getElementById('presenter-drawer')?.classList.remove('open');
    document.getElementById('help-modal')?.classList.remove('open');
  }

  startPresenterClock() {
    const timerEl = document.getElementById('presenter-timer');
    if (!timerEl) return;

    this.presenterTimerInterval = setInterval(() => {
      this.presenterTimer++;
      const mins = String(Math.floor(this.presenterTimer / 60)).padStart(2, '0');
      const secs = String(this.presenterTimer % 60).padStart(2, '0');
      timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  }
}

// Bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.MakHubbyApp = new PresentationApp();
  });
} else {
  window.MakHubbyApp = new PresentationApp();
}
