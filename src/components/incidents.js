/**
 * Incidents Page Component
 */

const incidents = [
  {
    id: 'INC-2041',
    title: 'Telemetry API elevated error rate',
    severity: 'critical',
    status: 'resolved',
    started: '2026-08-20 14:22 UTC',
    resolved: '2026-08-20 14:47 UTC',
    mttr: '25 min',
    region: 'us-east-1',
    root_cause: 'Null pointer on undefined cluster query param. Auto-remediation applied null-check patch.',
    actions: ['Alert triggered', 'Agent detected TypeError in logs', 'Patch applied automatically', 'Health check passed']
  },
  {
    id: 'INC-2038',
    title: 'Auth token validator latency spike',
    severity: 'warning',
    status: 'resolved',
    started: '2026-08-18 09:11 UTC',
    resolved: '2026-08-18 09:28 UTC',
    mttr: '17 min',
    region: 'eu-west-1',
    root_cause: 'Redis cache eviction under high load. Cache TTL extended, node scaled up.',
    actions: ['P99 > 200ms detected', 'Cache hit-rate drop logged', 'Auto-scaled cache node', 'Latency normalized']
  },
  {
    id: 'INC-2035',
    title: 'Event stream consumer lag',
    severity: 'warning',
    status: 'resolved',
    started: '2026-08-15 02:55 UTC',
    resolved: '2026-08-15 03:12 UTC',
    mttr: '17 min',
    region: 'ap-northeast',
    root_cause: 'Kafka partition rebalance during deployment window. Consumer restarted with increased partition count.',
    actions: ['Lag > 10k messages detected', 'Rebalance event logged', 'Consumer restarted', 'Lag cleared to 0']
  },
  {
    id: 'INC-2031',
    title: 'Build pipeline resolution failure',
    severity: 'info',
    status: 'resolved',
    started: '2026-08-11 16:04 UTC',
    resolved: '2026-08-11 16:09 UTC',
    mttr: '5 min',
    region: 'Global (CI)',
    root_cause: 'Broken import path in main.js (metrics-chart.js → metrics.js). Build agent applied fix automatically.',
    actions: ['Rollup build error detected', 'Import path mismatch identified', 'Patch PR auto-created & merged', 'Build passed']
  },
];

const mttrStats = [
  { label: 'Incidents (30d)', value: '4', icon: '🔔' },
  { label: 'Avg MTTR', value: '16 min', icon: '⏱️' },
  { label: 'Auto-Resolved', value: '100%', icon: '🤖' },
  { label: 'SLA Uptime', value: '99.99%', icon: '✅' },
];

function severityClass(sev) {
  if (sev === 'critical') return 'sev-critical';
  if (sev === 'warning') return 'sev-warning';
  return 'sev-info';
}

function severityLabel(sev) {
  if (sev === 'critical') return '🔴 Critical';
  if (sev === 'warning') return '🟡 Warning';
  return '🔵 Info';
}

export function renderIncidents() {
  const statsHtml = mttrStats.map(s => `
    <div class="card grid-col-3 incident-stat">
      <div class="incident-stat-icon">${s.icon}</div>
      <div class="card-value" style="font-size:1.8rem;">${s.value}</div>
      <div class="card-title" style="margin-top:0.25rem;">${s.label}</div>
    </div>`).join('');

  const timelineHtml = incidents.map(inc => `
    <div class="incident-card card grid-col-12">
      <div class="incident-header">
        <div class="incident-left">
          <span class="inc-id">${inc.id}</span>
          <span class="sev-badge ${severityClass(inc.severity)}">${severityLabel(inc.severity)}</span>
          <span class="inc-title">${inc.title}</span>
        </div>
        <div class="incident-right">
          <span class="region-tag">📍 ${inc.region}</span>
          <span class="mttr-tag">⏱️ MTTR: ${inc.mttr}</span>
          <span class="status-badge healthy">✓ Resolved</span>
        </div>
      </div>
      <div class="inc-timeline-meta">
        <span class="inc-time">🕐 Started: ${inc.started}</span>
        <span class="inc-time">✅ Resolved: ${inc.resolved}</span>
      </div>
      <p class="inc-root-cause"><strong>Root Cause:</strong> ${inc.root_cause}</p>
      <div class="inc-actions">
        ${inc.actions.map((a, i) => `
          <div class="action-step">
            <div class="action-dot"></div>
            ${i < inc.actions.length - 1 ? '<div class="action-line"></div>' : ''}
            <span class="action-label">${a}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');

  return `
    ${statsHtml}
    <div class="grid-col-12" style="margin-top:0.5rem;">
      <h2 class="section-heading">📋 Incident Timeline</h2>
    </div>
    ${timelineHtml}
  `;
}
