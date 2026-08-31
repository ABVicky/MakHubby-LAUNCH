/**
 * High-Fidelity UI Mockup Suite for MakHubby
 */

function renderProductMockup(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="device-frame">
      <!-- Device Top Notch & Status Bar -->
      <div class="device-topbar">
        <div class="device-camera-lens"></div>
        <div class="device-status">
          <span class="status-time">9:41</span>
          <div class="status-indicators">
            <span class="status-pill">MAKAUT • LIVE</span>
            <div class="status-icons">
              <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M1 9h2V7H1v2zm3 0h2V5H4v4zm3 0h2V3H7v6zm3 0h2V1h-2v8z"/></svg>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor"><path d="M6 1C3.8 1 2 2.8 2 5s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 6.5c-1.4 0-2.5-1.1-2.5-2.5S4.6 2.5 6 2.5 8.5 3.6 8.5 5 7.4 7.5 6 7.5z"/></svg>
              <div class="battery-icon"><span></span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- App Header -->
      <div class="app-header">
        <div class="app-brand">
          <img src="https://www.google.com/s2/favicons?domain=makhubby.in&sz=128" alt="MakHubby Logo" class="app-logo-img" />
          <div>
            <div class="app-title">MakHubby</div>
            <div class="app-subtitle">Student Operating Ecosystem</div>
          </div>
        </div>
        <div class="app-profile">
          <div class="student-badge">CSE • 3rd Year</div>
          <div class="avatar-ring">AV</div>
        </div>
      </div>

      <!-- Main Interface Tabs -->
      <div class="app-nav-tabs">
        <button class="mockup-tab active" data-target="tab-dashboard">Dashboard</button>
        <button class="mockup-tab" data-target="tab-resources">Resources</button>
        <button class="mockup-tab" data-target="tab-faculty">Faculty Connect</button>
        <button class="mockup-tab" data-target="tab-schedule">Live Schedule</button>
      </div>

      <!-- App Content Screens Container -->
      <div class="app-screen-body">
        <!-- SCREEN 1: DASHBOARD -->
        <div class="screen-view active" id="tab-dashboard">
          <div class="quick-stats-row">
            <div class="stat-card stat-cyan">
              <span class="stat-num">8.92</span>
              <span class="stat-lbl">Current SGPA</span>
              <div class="stat-trend">↑ Top 5% in Dept</div>
            </div>
            <div class="stat-card stat-violet">
              <span class="stat-num">94%</span>
              <span class="stat-lbl">Attendance</span>
              <div class="stat-trend">Compliant</div>
            </div>
            <div class="stat-card stat-emerald">
              <span class="stat-num">14</span>
              <span class="stat-lbl">Active Credits</span>
              <div class="stat-trend">Semester 6</div>
            </div>
          </div>

          <div class="section-title-row">
            <h4>UPCOMING SESSION</h4>
            <span class="live-tag"><span class="pulse-dot"></span> In 25 Mins</span>
          </div>

          <div class="session-card">
            <div class="session-info">
              <div class="session-code">CS-601</div>
              <div class="session-name">Distributed Systems & Cloud Architecture</div>
              <div class="session-prof">Prof. Dr. S. Banerjee • Hall 302 / Online Room A</div>
            </div>
            <button class="session-action-btn">Join Session</button>
          </div>

          <div class="section-title-row mt-3">
            <h4>MAKAUT DIRECT NOTICES</h4>
            <span class="time-tag">Synced 2m ago</span>
          </div>

          <div class="notice-item">
            <div class="notice-icon">📢</div>
            <div class="notice-content">
              <div class="notice-head">Even Semester Examination Schedule Published</div>
              <div class="notice-sub">Office of the Controller of Examinations, MAKAUT WB</div>
            </div>
            <div class="notice-badge">Official</div>
          </div>
        </div>

        <!-- SCREEN 2: RESOURCES -->
        <div class="screen-view" id="tab-resources">
          <div class="search-bar-mock" style="padding:0.7rem 1rem; background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); border-radius:6px; font-size:0.8rem; color:var(--text-secondary); margin-bottom:1rem;">
            <span>🔍 Search 1,420+ verified MAKAUT notes, PYQs, and lab manuals...</span>
          </div>
          <div class="resource-grid" style="display:flex; flex-direction:column; gap:0.8rem;">
            <div class="resource-item" style="padding:0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:6px; text-align:left;">
              <h5 style="color:#ffffff; font-size:0.9rem;">Compiler Design - Full Module 1-4 (PDF)</h5>
              <span style="font-size:0.75rem; color:var(--accent-cyan);">Verified by Topper Network • 4.9 ★ (342 downloads)</span>
            </div>
            <div class="resource-item" style="padding:0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:6px; text-align:left;">
              <h5 style="color:#ffffff; font-size:0.9rem;">Machine Learning 2021-2025 Solved Papers (PYQ)</h5>
              <span style="font-size:0.75rem; color:var(--accent-cyan);">Solutions with step-by-step math proofs</span>
            </div>
          </div>
        </div>

        <!-- SCREEN 3: FACULTY CONNECT -->
        <div class="screen-view" id="tab-faculty">
          <div class="faculty-card" style="padding:0.9rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:6px; display:flex; justify-content:space-between; align-items:center; text-align:left;">
            <div class="faculty-details">
              <div style="font-weight:700; font-size:0.9rem; color:#fff;">Prof. R. Mukherjee, Ph.D.</div>
              <div style="font-size:0.75rem; color:var(--text-secondary);">Head of Dept, Computer Science • MAKAUT</div>
              <div style="font-size:0.75rem; color:var(--accent-emerald);">🟢 Office Hours Active</div>
            </div>
            <button class="session-action-btn">Request Slot</button>
          </div>
        </div>

        <!-- SCREEN 4: LIVE SCHEDULE -->
        <div class="screen-view" id="tab-schedule">
          <div class="timeline-day-picker" style="display:flex; gap:0.5rem; margin-bottom:0.8rem;">
            <span class="day-chip active" style="padding:0.2rem 0.6rem; background:var(--accent-cyan); color:#000; font-weight:700; border-radius:4px; font-size:0.75rem;">MON</span>
            <span class="day-chip" style="padding:0.2rem 0.6rem; background:rgba(255,255,255,0.05); color:#fff; border-radius:4px; font-size:0.75rem;">TUE</span>
            <span class="day-chip" style="padding:0.2rem 0.6rem; background:rgba(255,255,255,0.05); color:#fff; border-radius:4px; font-size:0.75rem;">WED</span>
          </div>
          <div class="schedule-slots" style="display:flex; flex-direction:column; gap:0.6rem; text-align:left;">
            <div style="padding:0.7rem; background:rgba(56,189,248,0.08); border-left:3px solid var(--accent-cyan); border-radius:4px;">
              <strong style="color:#fff; font-size:0.85rem; display:block;">10:00 AM • Software Engineering & Agile</strong>
              <span style="font-size:0.75rem; color:var(--text-secondary);">Room 404 • Assignment #3 Submission</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const tabs = container.querySelectorAll('.mockup-tab');
  const views = container.querySelectorAll('.screen-view');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      tabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      const target = container.querySelector(`#${tab.dataset.target}`);
      if (target) target.classList.add('active');
    });
  });

  let currentTabIndex = 0;
  setInterval(() => {
    if (!container.closest('.scene.active')) return;
    currentTabIndex = (currentTabIndex + 1) % tabs.length;
    tabs[currentTabIndex].click();
  }, 4500);
}

window.renderProductMockup = renderProductMockup;
