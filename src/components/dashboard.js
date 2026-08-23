/**
 * Core Dashboard View Component
 */

export function renderDashboardView() {
  return `
    <div class="card grid-col-8">
      <div class="card-header">
        <span class="card-title">🖥️ Active Service Clusters</span>
        <span class="badge badge-pulse">4 Nodes Active</span>
      </div>
      <div class="service-list">
        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">us-east-edge-router</div>
              <div class="service-latency">Vercel Serverless Edge // Region: iad1</div>
            </div>
          </div>
          <span class="status-badge healthy">99.98% Healthy</span>
        </div>
        
        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">auth-token-validator</div>
              <div class="service-latency">Global Auth Cache // Region: fra1</div>
            </div>
          </div>
          <span class="status-badge healthy">12ms Latency</span>
        </div>

        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">event-stream-consumer</div>
              <div class="service-latency">Kinesis / Kafka Bridge // Region: hnd1</div>
            </div>
          </div>
          <span class="status-badge healthy">0 Lag</span>
        </div>

        <div class="service-item">
          <div class="service-meta">
            <span class="status-indicator online"></span>
            <div>
              <div class="service-name">telemetry-pipeline</div>
              <div class="service-latency">PulseStream Core Engine // Region: Global</div>
            </div>
          </div>
          <span class="status-badge healthy">99.99% Uptime</span>
        </div>
      </div>
    </div>

    <div class="console-card card grid-col-4">
      <div class="console-header">
        <div class="console-dots">
          <div class="dot red"></div>
          <div class="dot yellow"></div>
          <div class="dot green"></div>
        </div>
        <div class="console-title">audit.log [stream]</div>
      </div>
      <div class="console-body" id="audit-log-stream">
        <div class="log-line">
          <span class="log-time">[21:55:01]</span>
          <span class="log-level log-info">[INFO]</span>
          <span class="log-msg">Worker process started</span>
        </div>
        <div class="log-line">
          <span class="log-time">[21:55:04]</span>
          <span class="log-level log-success">[OK]</span>
          <span class="log-msg">Health check passed</span>
        </div>
        <div class="log-line">
          <span class="log-time">[21:55:10]</span>
          <span class="log-level log-info">[INFO]</span>
          <span class="log-msg">Telemetry sync nominal</span>
        </div>
        <div class="log-line">
          <span class="log-time">[21:55:18]</span>
          <span class="log-level log-success">[200 OK]</span>
          <span class="log-msg">GET /api/telemetry: 11ms</span>
        </div>
        <div class="log-line">
          <span class="log-time">[21:55:25]</span>
          <span class="log-level log-info">[INFO]</span>
          <span class="log-msg">Auth cache warm: hit-rate 98.2%</span>
        </div>
      </div>
    </div>

    <!-- System Health Overview -->
    <div class="card grid-col-12">
      <div class="card-header">
        <span class="card-title">🏥 System Health Overview</span>
        <span class="badge badge-pulse">All Systems Operational</span>
      </div>
      <div class="health-grid">
        <div class="health-item">
          <div class="health-icon" style="background: rgba(16,185,129,0.15); color: #10b981;">🛡️</div>
          <div class="health-details">
            <div class="health-name">Telemetry Pipeline</div>
            <div class="health-sub">Fully operational — no errors in 72h</div>
          </div>
          <div class="health-bar-wrap">
            <div class="health-bar" style="width:99.99%; background: linear-gradient(90deg, #10b981, #059669);"></div>
          </div>
          <span class="health-pct">99.99%</span>
        </div>
        <div class="health-item">
          <div class="health-icon" style="background: rgba(99,102,241,0.15); color: #6366f1;">⚡</div>
          <div class="health-details">
            <div class="health-name">API Gateway</div>
            <div class="health-sub">28.4k req/s — P99 48ms</div>
          </div>
          <div class="health-bar-wrap">
            <div class="health-bar" style="width:99.98%; background: linear-gradient(90deg, #6366f1, #4338ca);"></div>
          </div>
          <span class="health-pct">99.98%</span>
        </div>
        <div class="health-item">
          <div class="health-icon" style="background: rgba(6,182,212,0.15); color: #06b6d4;">🔒</div>
          <div class="health-details">
            <div class="health-name">Auth Service</div>
            <div class="health-sub">12ms avg latency — cache hit 98.2%</div>
          </div>
          <div class="health-bar-wrap">
            <div class="health-bar" style="width:100%; background: linear-gradient(90deg, #06b6d4, #0891b2);"></div>
          </div>
          <span class="health-pct">100%</span>
        </div>
        <div class="health-item">
          <div class="health-icon" style="background: rgba(245,158,11,0.15); color: #f59e0b;">📊</div>
          <div class="health-details">
            <div class="health-name">Event Stream</div>
            <div class="health-sub">0 consumer lag — Kafka Bridge nominal</div>
          </div>
          <div class="health-bar-wrap">
            <div class="health-bar" style="width:99.97%; background: linear-gradient(90deg, #f59e0b, #d97706);"></div>
          </div>
          <span class="health-pct">99.97%</span>
        </div>
      </div>
    </div>
  `;
}
