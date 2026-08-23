/**
 * Analytics Page Component
 */

function generateBarChart(data, color = '#6366f1') {
  const max = Math.max(...data);
  const bars = data.map((val, i) => {
    const height = Math.round((val / max) * 80);
    const x = i * 22;
    const opacity = 0.4 + (val / max) * 0.6;
    return `
      <g>
        <rect x="${x}" y="${90 - height}" width="16" height="${height}"
              rx="3" fill="${color}" opacity="${opacity}"
              class="chart-bar" data-value="${val}"/>
      </g>`;
  }).join('');

  return `
    <svg viewBox="0 0 ${data.length * 22} 90" preserveAspectRatio="none" class="bar-chart-svg">
      ${bars}
    </svg>`;
}

function generateSparkline(data, color = '#06b6d4') {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = 36;
  const step = w / (data.length - 1);

  const points = data.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,${h} ${points} ${w},${h}`;

  return `
    <svg viewBox="0 0 ${w} ${h}" class="sparkline-svg" style="overflow:visible">
      <defs>
        <linearGradient id="spark-grad-${color.replace('#','')}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#spark-grad-${color.replace('#','')})" />
      <polyline points="${points}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
}

export function renderAnalytics() {
  const hourlyData = [18, 24, 19, 28, 32, 27, 35, 42, 38, 44, 28, 22, 19, 24, 31, 36, 40, 38, 44, 41, 35, 28, 22, 18];
  const labels = ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22'];

  const latencySparkData = [24, 22, 28, 19, 25, 30, 24, 21, 26, 23, 20, 24];
  const errSparkData = [0.003, 0.002, 0.004, 0.001, 0.002, 0.003, 0.002, 0.001, 0.002, 0.002, 0.001, 0.002];

  const regions = [
    { name: 'us-east-1 (iad1)', requests: '12.4M', pct: 43, color: '#6366f1' },
    { name: 'eu-west-1 (fra1)', requests: '8.1M', pct: 28, color: '#06b6d4' },
    { name: 'ap-northeast (hnd1)', requests: '5.2M', pct: 18, color: '#10b981' },
    { name: 'us-west-2 (sfo1)', requests: '2.6M', pct: 9, color: '#f59e0b' },
    { name: 'ap-south-1 (bom1)', requests: '0.6M', pct: 2, color: '#8b5cf6' },
  ];

  const endpoints = [
    { path: '/api/telemetry', method: 'GET', calls: '8.2M', p50: '11ms', p99: '42ms', errors: '0.001%', status: 'healthy' },
    { path: '/api/auth/token', method: 'POST', calls: '4.1M', p50: '18ms', p99: '65ms', errors: '0.004%', status: 'healthy' },
    { path: '/api/events/stream', method: 'GET', calls: '3.8M', p50: '9ms', p99: '31ms', errors: '0.000%', status: 'healthy' },
    { path: '/api/clusters/status', method: 'GET', calls: '2.9M', p50: '14ms', p99: '48ms', errors: '0.002%', status: 'healthy' },
    { path: '/api/alerts/config', method: 'PUT', calls: '0.4M', p50: '22ms', p99: '88ms', errors: '0.008%', status: 'healthy' },
  ];

  const hourlyLabelsHtml = labels.map(l => `<span class="chart-label">${l}:00</span>`).join('');

  const regionsHtml = regions.map(r => `
    <div class="region-item">
      <div class="region-meta">
        <span class="region-dot" style="background:${r.color}; box-shadow: 0 0 6px ${r.color}55;"></span>
        <span class="region-name">${r.name}</span>
      </div>
      <div class="region-bar-wrap">
        <div class="region-bar" style="width:${r.pct}%; background: linear-gradient(90deg, ${r.color}cc, ${r.color}66);"></div>
      </div>
      <span class="region-val">${r.requests}</span>
      <span class="region-pct">${r.pct}%</span>
    </div>`).join('');

  const endpointsHtml = endpoints.map(e => `
    <tr class="table-row">
      <td><code class="endpoint-path">${e.path}</code></td>
      <td><span class="method-badge method-${e.method.toLowerCase()}">${e.method}</span></td>
      <td class="num-cell">${e.calls}</td>
      <td class="num-cell">${e.p50}</td>
      <td class="num-cell">${e.p99}</td>
      <td class="num-cell"><span class="err-rate">${e.errors}</span></td>
      <td><span class="status-badge healthy">● Healthy</span></td>
    </tr>`).join('');

  return `
    <!-- Analytics Overview Row -->
    <div class="card grid-col-4 analytics-stat-card">
      <div class="card-header">
        <span class="card-title">Total Requests (24h)</span>
        ${generateSparkline([18,24,28,32,35,42,44,38,31,36,40,41], '#6366f1')}
      </div>
      <div class="card-value">28.9M</div>
      <div class="card-trend trend-up">↗ <span>+18.4% vs yesterday</span></div>
    </div>
    <div class="card grid-col-4 analytics-stat-card">
      <div class="card-header">
        <span class="card-title">Avg Latency (p50)</span>
        ${generateSparkline(latencySparkData, '#06b6d4')}
      </div>
      <div class="card-value">24ms</div>
      <div class="card-trend trend-up">↗ <span>-4.2ms improvement</span></div>
    </div>
    <div class="card grid-col-4 analytics-stat-card">
      <div class="card-header">
        <span class="card-title">Error Rate (24h avg)</span>
        ${generateSparkline(errSparkData.map(v => v * 1000), '#10b981')}
      </div>
      <div class="card-value">0.002%</div>
      <div class="card-trend trend-up">↗ <span>Below 0.05% SLA target</span></div>
    </div>

    <!-- Bar Chart -->
    <div class="card grid-col-8">
      <div class="card-header">
        <span class="card-title">📊 Request Volume — Last 24 Hours</span>
        <span class="badge badge-pulse">Hourly Breakdown</span>
      </div>
      <div class="chart-container">
        ${generateBarChart(hourlyData)}
        <div class="chart-x-labels">${hourlyLabelsHtml}</div>
      </div>
      <div class="chart-legend">
        <span class="legend-item"><span class="legend-dot" style="background:#6366f1"></span> Requests (k/h)</span>
        <span class="legend-note">Peak: 44k/h at 18:00</span>
      </div>
    </div>

    <!-- Region Breakdown -->
    <div class="card grid-col-4">
      <div class="card-header">
        <span class="card-title">🌍 Traffic by Region</span>
        <span class="badge badge-pulse">5 Regions</span>
      </div>
      <div class="region-list">${regionsHtml}</div>
    </div>

    <!-- Endpoints Table -->
    <div class="card grid-col-12">
      <div class="card-header">
        <span class="card-title">🔗 Top Endpoints by Traffic</span>
        <span class="badge badge-pulse">All Healthy</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Endpoint</th>
              <th>Method</th>
              <th>Calls (24h)</th>
              <th>P50</th>
              <th>P99</th>
              <th>Error Rate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>${endpointsHtml}</tbody>
        </table>
      </div>
    </div>
  `;
}
