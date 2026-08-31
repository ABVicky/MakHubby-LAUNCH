/**
 * Scene Animation Controller & Storyboard Triggers
 */

class SceneController {
  constructor(indiaMap, particleBg) {
    this.indiaMap = indiaMap;
    this.particleBg = particleBg;
  }

  onSceneEnter(sceneIndex, sceneEl) {
    if (!sceneEl) return;
    const sceneId = sceneEl.id;

    if (this.particleBg) {
      this.particleBg.setTheme('default');
    }

    switch (sceneId) {
      case 'scene-01':
        this.animateScene01(sceneEl);
        break;
      case 'scene-02':
        this.animateScene02(sceneEl);
        break;
      case 'scene-03':
        this.animateScene03(sceneEl);
        break;
      case 'scene-04':
        this.animateScene04(sceneEl);
        break;
      case 'scene-05':
        this.animateScene05(sceneEl);
        break;
      case 'scene-06':
        this.animateScene06(sceneEl);
        break;
      case 'scene-07':
        this.animateScene07(sceneEl);
        break;
      case 'scene-08':
        this.animateScene08(sceneEl);
        break;
      case 'scene-09':
        this.animateScene09(sceneEl);
        break;
      case 'scene-10':
        this.animateScene10(sceneEl);
        break;
      case 'scene-11':
        this.animateScene11(sceneEl);
        break;
      case 'scene-12':
        this.animateScene12(sceneEl);
        break;
      case 'scene-13':
        this.animateScene13(sceneEl);
        break;
      case 'scene-14':
        this.animateScene14(sceneEl);
        break;
      case 'scene-15':
        this.animateScene15(sceneEl);
        break;
      case 'scene-16':
        this.animateScene16(sceneEl);
        break;
      case 'scene-17':
        this.animateScene17(sceneEl);
        break;
      case 'scene-18':
        this.animateScene18(sceneEl);
        break;
      case 'scene-19':
        this.animateScene19(sceneEl);
        break;
      case 'scene-20':
        this.animateScene20(sceneEl);
        break;
    }
  }

  animateNumber(el, start, end, durationMs, suffix = '', prefix = '') {
    if (!el) return;
    const startTime = performance.now();
    const isThousands = end > 1000;

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(start + (end - start) * ease);
      
      const formatted = isThousands 
        ? current.toLocaleString('en-US') 
        : current;
      
      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${end.toLocaleString('en-US')}${suffix}`;
      }
    };
    requestAnimationFrame(update);
  }

  // SCENE 01: BEFORE EVERYTHING
  animateScene01(el) {
    const date = el.querySelector('.sc1-date');
    const line1 = el.querySelector('.sc1-line1');
    const line2 = el.querySelector('.sc1-line2');
    const point = el.querySelector('.sc1-light-point');

    if (date) date.style.opacity = '0';
    if (line1) line1.style.opacity = '0';
    if (line2) line2.style.opacity = '0';
    if (point) point.style.opacity = '0';

    setTimeout(() => {
      if (date) date.style.opacity = '1';
      window.audioEngine?.playTick();
    }, 400);

    setTimeout(() => {
      if (line1) line1.style.opacity = '1';
    }, 1200);

    setTimeout(() => {
      if (line2) line2.style.opacity = '1';
    }, 2200);

    setTimeout(() => {
      if (point) {
        point.style.opacity = '1';
        point.classList.add('pulse-glow');
      }
    }, 3200);
  }

  // SCENE 02: THE PROBLEM
  animateScene02(el) {
    const words = el.querySelectorAll('.scattered-word');
    const banner = el.querySelector('.sc2-banner');
    const sub = el.querySelector('.sc2-sub');

    words.forEach((w) => {
      w.style.opacity = '0';
      w.style.transform = 'scale(0.8)';
    });
    if (banner) banner.style.opacity = '0';
    if (sub) sub.style.opacity = '0';

    words.forEach((word, idx) => {
      setTimeout(() => {
        word.style.opacity = '0.85';
        word.style.transform = 'scale(1)';
        window.audioEngine?.playTick();
      }, 200 + idx * 160);
    });

    setTimeout(() => {
      words.forEach(w => w.style.opacity = '0.15');
      if (banner) banner.style.opacity = '1';
      window.audioEngine?.playBassImpact();
    }, 200 + words.length * 160 + 300);

    setTimeout(() => {
      if (sub) sub.style.opacity = '1';
    }, 200 + words.length * 160 + 800);
  }

  // SCENE 03: THE DECISION
  animateScene03(el) {
    const items = el.querySelectorAll('.decision-step');
    const hero = el.querySelector('.decision-hero');

    items.forEach(i => i.style.opacity = '0');
    if (hero) hero.style.opacity = '0';

    items.forEach((item, idx) => {
      setTimeout(() => {
        item.style.opacity = '1';
        window.audioEngine?.playTick();
      }, 400 + idx * 500);
    });

    setTimeout(() => {
      if (hero) hero.style.opacity = '1';
      window.audioEngine?.playBassImpact();
    }, 2000);
  }

  // SCENE 04: THE JOURNEY BEGINS
  animateScene04(el) {
    const nodes = el.querySelectorAll('.timeline-h-node');
    nodes.forEach((n, idx) => {
      n.classList.remove('active');
      setTimeout(() => {
        n.classList.add('active');
        window.audioEngine?.playTick();
      }, 200 + idx * 180);
    });
  }

  // SCENE 05: THE CLOCK
  animateScene05(el) {
    const numDays = el.querySelector('.num-days');
    const numHours = el.querySelector('.num-hours');
    const numMinutes = el.querySelector('.num-minutes');
    const numSeconds = el.querySelector('.num-seconds');

    this.animateNumber(numDays, 0, 243, 1000);
    setTimeout(() => {
      this.animateNumber(numHours, 0, 4374, 1200);
      window.audioEngine?.playBassImpact();
    }, 500);
    setTimeout(() => {
      this.animateNumber(numMinutes, 0, 262440, 1400);
    }, 1000);
    setTimeout(() => {
      this.animateNumber(numSeconds, 0, 15746400, 1600);
      window.audioEngine?.playBassImpact();
    }, 1500);
  }

  // SCENE 06: THE EFFORT
  animateScene06(el) {
    const tags = el.querySelectorAll('.effort-tag');
    tags.forEach((tag, idx) => {
      tag.style.opacity = '0';
      setTimeout(() => {
        tag.style.opacity = '1';
      }, 80 + idx * 90);
    });
  }

  // SCENE 07: THE BUILD
  animateScene07(el) {
    const numFolders = el.querySelector('.num-folders');
    const numFiles = el.querySelector('.num-files');
    const numCode = el.querySelector('.num-code');
    const numTotal = el.querySelector('.num-total');

    const cfg = window.PRESENTATION_CONFIG?.metrics || {};
    this.animateNumber(numFolders, 0, cfg.totalFolders || 96, 900);
    setTimeout(() => {
      this.animateNumber(numFiles, 0, cfg.totalFiles || 264, 1000);
    }, 300);
    setTimeout(() => {
      this.animateNumber(numCode, 0, cfg.sourceCodeLines || 73500, 1400, '+');
      window.audioEngine?.playBassImpact();
    }, 700);
    setTimeout(() => {
      this.animateNumber(numTotal, 0, cfg.totalProjectLines || 131980, 1500);
    }, 1200);
  }

  // SCENE 08: WHAT'S UNDER THE HOOD
  animateScene08(el) {
    const items = el.querySelectorAll('.arch-clean-item');
    items.forEach((item, idx) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(12px)';
      item.style.transition = 'all 0.4s ease';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        window.audioEngine?.playTick();
      }, 150 + idx * 140);
    });
  }

  // SCENE 09: IT BROKE
  animateScene09(el) {
    if (this.particleBg) this.particleBg.setTheme('glitch');
    window.audioEngine?.playGlitchBurst();
  }

  // SCENE 10: JOURNEY THROUGH THE MONTHS
  animateScene10(el) {
    const monthItems = el.querySelectorAll('.month-chip');
    monthItems.forEach((m, idx) => {
      m.classList.remove('active');
      setTimeout(() => {
        m.classList.add('active');
        window.audioEngine?.playTick();
      }, 150 + idx * 180);
    });
  }

  // SCENE 11: IT BECAME REAL
  animateScene11(el) {
    window.audioEngine?.playBassImpact();
  }

  // SCENE 12: WHAT IS MAKHUBBY?
  animateScene12(el) {
    const words = el.querySelectorAll('.pillar-word');
    words.forEach((word, idx) => {
      word.style.opacity = '0';
      setTimeout(() => {
        word.style.opacity = '1';
        window.audioEngine?.playTick();
      }, 200 + idx * 280);
    });
    setTimeout(() => {
      window.audioEngine?.playBassImpact();
    }, 200 + words.length * 280 + 200);
  }

  // SCENE 13: MANIKARNIKA TECHNOLOGIES
  animateScene13(el) {
    window.audioEngine?.playBassImpact();
  }

  // SCENE 14: WHY STOP HERE?
  animateScene14(el) {}

  // SCENE 15: FROM ONE UNIVERSITY TO INDIA
  animateScene15(el) {
    if (this.indiaMap) {
      this.indiaMap.start();
      this.indiaMap.setStage(1);
      setTimeout(() => {
        this.indiaMap.setStage(2);
        window.audioEngine?.playTick();
      }, 1200);
      setTimeout(() => {
        this.indiaMap.setStage(3);
        window.audioEngine?.playBassImpact();
      }, 2500);
    }
  }

  // SCENE 16: THE VISION
  animateScene16(el) {
    const badges = el.querySelectorAll('.vision-badge');
    badges.forEach((b, idx) => {
      b.style.opacity = '0';
      setTimeout(() => {
        b.style.opacity = '1';
        window.audioEngine?.playTick();
      }, 200 + idx * 220);
    });
    setTimeout(() => {
      window.audioEngine?.playBassImpact();
    }, 200 + badges.length * 220 + 300);
  }

  // SCENE 17: THIS IS NOT THE END
  animateScene17(el) {
    const markers = el.querySelectorAll('.vert-timeline-item');
    markers.forEach((item, idx) => {
      item.style.opacity = '0';
      setTimeout(() => {
        item.style.opacity = '1';
      }, 80 + idx * 100);
    });
  }

  // SCENE 18: RISING FROM HERE
  animateScene18(el) {
    window.audioEngine?.playRiser();
  }

  // SCENE 19: LAUNCH
  animateScene19(el) {
    if (this.particleBg) this.particleBg.setTheme('launch');
    window.audioEngine?.playLaunchChord();
    el.classList.add('launch-burst');
  }

  // SCENE 20: CLOSING FINALE
  animateScene20(el) {
    if (this.particleBg) this.particleBg.setTheme('gold');
    window.audioEngine?.playBassImpact();
  }
}

window.SceneController = SceneController;
