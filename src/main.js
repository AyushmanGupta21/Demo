import './style.css';
import { renderDashboardView } from './components/dashboard.js';
import { renderMetrics } from './components/metrics.js';
import { renderAnalytics } from './components/analytis.js';
import { renderIncidents } from './components/incidents.js';
import { renderSettings, initSettingsInteractions } from './components/settings.js';

// ── Tab Router ────────────────────────────────────────────────────────────────

const TABS = ['dashboard', 'analytics', 'incidents', 'settings'];
let activeTab = 'dashboard';

function getPageContent(tab) {
  switch (tab) {
    case 'dashboard':
      return renderMetrics() + renderDashboardView();
    case 'analytics':
      return renderAnalytics();
    case 'incidents':
      return renderIncidents();
    case 'settings':
      return renderSettings();
    default:
      return renderMetrics() + renderDashboardView();
  }
}

function getHeroContent(tab) {
  const heroes = {
    dashboard: {
      tag: 'System Status & Service Telemetry',
      title: 'Next-Gen Autonomous Infrastructure',
      sub: 'Real-time health monitoring, automated failure detection, and auto-remediation telemetry pipelines.'
    },
    analytics: {
      tag: 'Performance & Traffic Analytics',
      title: 'Deep Observability Insights',
      sub: 'Granular breakdown of request volume, latency distributions, region performance, and endpoint-level telemetry.'
    },
    incidents: {
      tag: 'Incident Management',
      title: 'Automated Incident Response',
      sub: 'Full history of detected incidents, root cause analysis, and autonomous remediation outcomes.'
    },
    settings: {
      tag: 'System Configuration',
      title: 'Control & Configuration Center',
      sub: 'Manage alert thresholds, notification channels, API credentials, and auto-remediation engine settings.'
    }
  };
  return heroes[tab] || heroes.dashboard;
}

function switchTab(tab) {
  if (!TABS.includes(tab)) return;
  activeTab = tab;

  // Update tab buttons
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  // Update hero section
  const hero = getHeroContent(tab);
  const heroTag = document.querySelector('.hero-tag');
  const heroTitle = document.querySelector('.hero-title');
  const heroSub = document.querySelector('.hero-subtitle');
  if (heroTag) heroTag.textContent = hero.tag;
  if (heroTitle) heroTitle.textContent = hero.title;
  if (heroSub) heroSub.textContent = hero.sub;

  // Render page content
  const root = document.getElementById('dashboard-root');
  if (!root) return;
  root.innerHTML = getPageContent(tab);

  // Page-specific interactions
  if (tab === 'dashboard') {
    setupHealthCheck();
  } else if (tab === 'settings') {
    initSettingsInteractions();
  }
}

// ── Health Check (Dashboard tab) ─────────────────────────────────────────────

function setupHealthCheck() {
  const triggerBtn = document.getElementById('btn-trigger-action');
  if (triggerBtn) {
    triggerBtn.addEventListener('click', async () => {
      const logStream = document.getElementById('audit-log-stream');
      const time = new Date().toTimeString().split(' ')[0];

      if (logStream) {
        const pingLog = document.createElement('div');
        pingLog.className = 'log-line';
        pingLog.innerHTML = `
          <span class="log-time">[${time}]</span>
          <span class="log-level log-info">[HTTP]</span>
          <span class="log-msg">Invoking Serverless Endpoint: GET /api/telemetry...</span>
        `;
        logStream.prepend(pingLog);
      }

      try {
        const res = await fetch('/api/telemetry');
        const data = await res.json();

        if (logStream) {
          const log = document.createElement('div');
          log.className = 'log-line';
          if (res.ok) {
            log.innerHTML = `
              <span class="log-time">[${time}]</span>
              <span class="log-level log-success">[200 OK]</span>
              <span class="log-msg">Telemetry sync nominal: ${data.status} — uptime ${data.metrics?.uptime || data.uptime}</span>
            `;
          } else {
            log.innerHTML = `
              <span class="log-time">[${time}]</span>
              <span class="log-level log-warn" style="color: var(--danger);">[ERROR]</span>
              <span class="log-msg" style="color: #ff7b72;">Unexpected response: ${data.message || data.error}</span>
            `;
          }
          logStream.prepend(log);
        }
      } catch (err) {
        if (logStream) {
          const errLog = document.createElement('div');
          errLog.className = 'log-line';
          errLog.innerHTML = `
            <span class="log-time">[${time}]</span>
            <span class="log-level log-warn" style="color: var(--danger);">[FETCH FAIL]</span>
            <span class="log-msg" style="color: #ff7b72;">${err.message}</span>
          `;
          logStream.prepend(errLog);
        }
      }
    });
  }
}

// ── App Init ──────────────────────────────────────────────────────────────────

function initApp() {
  const root = document.getElementById('dashboard-root');
  if (!root) return;

  // Wire up tab nav
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
    });
  }

  // Initial render
  switchTab('dashboard');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
