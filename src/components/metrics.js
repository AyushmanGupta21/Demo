/**
 * Telemetry and Metrics Component
 */

export function getSystemStats() {
  return [
    {
      title: 'API Throughput',
      value: '28.4k',
      unit: 'req/s',
      trend: '+12.4%',
      trendUp: true,
      colSpan: 'grid-col-3'
    },
    {
      title: 'Avg Latency',
      value: '24ms',
      unit: 'p99: 48ms',
      trend: '-4.2ms',
      trendUp: true,
      colSpan: 'grid-col-3'
    },
    {
      title: 'Uptime (30d)',
      value: '99.99%',
      unit: '0 incidents',
      trend: 'Optimal',
      trendUp: true,
      colSpan: 'grid-col-3'
    },
    {
      title: 'Error Rate',
      value: '0.002%',
      unit: 'target < 0.05%',
      trend: '-0.001%',
      trendUp: true,
      colSpan: 'grid-col-3'
    }
  ];
}

export function renderMetrics(container) {
  const stats = getSystemStats();
  
  const html = stats.map(stat => `
    <div class="card ${stat.colSpan}">
      <div class="card-header">
        <span class="card-title">${stat.title}</span>
        <span class="badge ${stat.trendUp ? 'badge-pulse' : ''}">${stat.unit}</span>
      </div>
      <div class="card-value">${stat.value}</div>
      <div class="card-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}">
        <span>${stat.trendUp ? '↗' : '↘'}</span>
        <span>${stat.trend} vs last period</span>
      </div>
    </div>
  `).join('');

  return html;
}
