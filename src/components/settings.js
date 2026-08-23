/**
 * Settings Page Component
 */

export function renderSettings() {
  return `
    <!-- Alert Thresholds -->
    <div class="card grid-col-8">
      <div class="card-header">
        <span class="card-title">⚠️ Alert Thresholds</span>
        <span class="badge badge-pulse">Auto-Enforced</span>
      </div>
      <div class="settings-group">
        <div class="setting-row">
          <div class="setting-label-wrap">
            <span class="setting-label">Error Rate Threshold</span>
            <span class="setting-desc">Alert when error rate exceeds this value.</span>
          </div>
          <div class="setting-control">
            <input type="range" class="range-input" id="setting-error-rate" min="0.001" max="1" step="0.001" value="0.05">
            <span class="range-val" id="err-rate-val">0.05%</span>
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label-wrap">
            <span class="setting-label">P99 Latency Threshold</span>
            <span class="setting-desc">Alert when P99 latency exceeds this value.</span>
          </div>
          <div class="setting-control">
            <input type="range" class="range-input" id="setting-latency" min="10" max="500" step="5" value="100">
            <span class="range-val" id="latency-val">100ms</span>
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label-wrap">
            <span class="setting-label">Throughput Drop Alert</span>
            <span class="setting-desc">Alert when requests/sec drops below this.</span>
          </div>
          <div class="setting-control">
            <input type="range" class="range-input" id="setting-throughput" min="100" max="10000" step="100" value="5000">
            <span class="range-val" id="throughput-val">5,000 req/s</span>
          </div>
        </div>
        <div class="setting-row">
          <div class="setting-label-wrap">
            <span class="setting-label">Incident Auto-Resolve Timeout</span>
            <span class="setting-desc">Max time before escalating unresolved incidents.</span>
          </div>
          <div class="setting-control">
            <input type="range" class="range-input" id="setting-timeout" min="5" max="120" step="5" value="30">
            <span class="range-val" id="timeout-val">30 min</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Channels -->
    <div class="card grid-col-4">
      <div class="card-header">
        <span class="card-title">🔔 Notification Channels</span>
      </div>
      <div class="settings-group">
        <div class="notif-row">
          <div class="notif-meta">
            <span class="notif-icon">📧</span>
            <div>
              <div class="setting-label">Email Alerts</div>
              <div class="setting-desc">ops-team@pulsestream.io</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="notif-email" checked>
            <span class="pill-slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div class="notif-meta">
            <span class="notif-icon">💬</span>
            <div>
              <div class="setting-label">Slack Notifications</div>
              <div class="setting-desc">#incidents-alerts</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="notif-slack" checked>
            <span class="pill-slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div class="notif-meta">
            <span class="notif-icon">📟</span>
            <div>
              <div class="setting-label">PagerDuty</div>
              <div class="setting-desc">Critical incidents only</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="notif-pagerduty">
            <span class="pill-slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div class="notif-meta">
            <span class="notif-icon">🔗</span>
            <div>
              <div class="setting-label">Webhook</div>
              <div class="setting-desc">Custom endpoint</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="notif-webhook">
            <span class="pill-slider"></span>
          </label>
        </div>
      </div>
    </div>

    <!-- API Keys -->
    <div class="card grid-col-6">
      <div class="card-header">
        <span class="card-title">🔑 API Credentials</span>
        <span class="badge" style="background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);">Sensitive</span>
      </div>
      <div class="settings-group">
        <div class="apikey-row">
          <span class="setting-label">Production API Key</span>
          <div class="apikey-display">
            <code class="apikey-val" id="prod-key">ps_live_••••••••••••••••••••••••••••••4f2a</code>
            <button class="btn btn-secondary btn-sm" id="reveal-prod-key">👁️ Reveal</button>
          </div>
        </div>
        <div class="apikey-row">
          <span class="setting-label">Staging API Key</span>
          <div class="apikey-display">
            <code class="apikey-val" id="stg-key">ps_test_••••••••••••••••••••••••••••••9c1b</code>
            <button class="btn btn-secondary btn-sm" id="reveal-stg-key">👁️ Reveal</button>
          </div>
        </div>
        <div class="apikey-row">
          <span class="setting-label">Webhook Secret</span>
          <div class="apikey-display">
            <code class="apikey-val">whsec_••••••••••••••••••••••••••••••••••••</code>
            <button class="btn btn-secondary btn-sm">🔄 Rotate</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Auto-Remediation Settings -->
    <div class="card grid-col-6">
      <div class="card-header">
        <span class="card-title">🤖 Auto-Remediation Engine</span>
        <span class="badge badge-pulse">Active</span>
      </div>
      <div class="settings-group">
        <div class="notif-row">
          <div class="notif-meta">
            <div>
              <div class="setting-label">Auto-apply patches</div>
              <div class="setting-desc">Automatically deploy agent-generated code fixes</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="auto-patch" checked>
            <span class="pill-slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div class="notif-meta">
            <div>
              <div class="setting-label">Auto-scale on load</div>
              <div class="setting-desc">Scale serverless workers on throughput spikes</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="auto-scale" checked>
            <span class="pill-slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div class="notif-meta">
            <div>
              <div class="setting-label">Rollback on error spike</div>
              <div class="setting-desc">Auto-revert deployments exceeding error threshold</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="auto-rollback" checked>
            <span class="pill-slider"></span>
          </label>
        </div>
        <div class="notif-row">
          <div class="notif-meta">
            <div>
              <div class="setting-label">Require human approval</div>
              <div class="setting-desc">Pause before applying critical patches</div>
            </div>
          </div>
          <label class="toggle-pill">
            <input type="checkbox" id="human-approval">
            <span class="pill-slider"></span>
          </label>
        </div>
      </div>
      <div style="margin-top: 1.25rem;">
        <button class="btn btn-primary" id="save-settings-btn" style="width:100%;">
          💾 Save Configuration
        </button>
        <div id="settings-saved-msg" style="display:none; margin-top:0.75rem; text-align:center; color: var(--success); font-size:0.85rem; font-family: var(--font-mono);">
          ✅ Settings saved successfully.
        </div>
      </div>
    </div>
  `;
}

export function initSettingsInteractions() {
  // Range sliders
  const errorRateSlider = document.getElementById('setting-error-rate');
  const errorRateVal = document.getElementById('err-rate-val');
  if (errorRateSlider && errorRateVal) {
    errorRateSlider.addEventListener('input', () => {
      errorRateVal.textContent = parseFloat(errorRateSlider.value).toFixed(3) + '%';
    });
  }

  const latencySlider = document.getElementById('setting-latency');
  const latencyVal = document.getElementById('latency-val');
  if (latencySlider && latencyVal) {
    latencySlider.addEventListener('input', () => {
      latencyVal.textContent = latencySlider.value + 'ms';
    });
  }

  const throughputSlider = document.getElementById('setting-throughput');
  const throughputVal = document.getElementById('throughput-val');
  if (throughputSlider && throughputVal) {
    throughputSlider.addEventListener('input', () => {
      throughputVal.textContent = parseInt(throughputSlider.value).toLocaleString() + ' req/s';
    });
  }

  const timeoutSlider = document.getElementById('setting-timeout');
  const timeoutVal = document.getElementById('timeout-val');
  if (timeoutSlider && timeoutVal) {
    timeoutSlider.addEventListener('input', () => {
      timeoutVal.textContent = timeoutSlider.value + ' min';
    });
  }

  // Save button
  const saveBtn = document.getElementById('save-settings-btn');
  const savedMsg = document.getElementById('settings-saved-msg');
  if (saveBtn && savedMsg) {
    saveBtn.addEventListener('click', () => {
      savedMsg.style.display = 'block';
      saveBtn.textContent = '✅ Saved!';
      saveBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        saveBtn.textContent = '💾 Save Configuration';
        saveBtn.style.background = '';
        savedMsg.style.display = 'none';
      }, 2500);
    });
  }

  // API key reveal
  const revealProd = document.getElementById('reveal-prod-key');
  const prodKey = document.getElementById('prod-key');
  if (revealProd && prodKey) {
    revealProd.addEventListener('click', () => {
      if (prodKey.textContent.includes('•')) {
        prodKey.textContent = 'ps_live_3a8f2c1d9e4b7a6f0e2d5c8b1a4f7e0d4f2a';
        revealProd.textContent = '🙈 Hide';
      } else {
        prodKey.textContent = 'ps_live_••••••••••••••••••••••••••••••4f2a';
        revealProd.textContent = '👁️ Reveal';
      }
    });
  }

  const revealStg = document.getElementById('reveal-stg-key');
  const stgKey = document.getElementById('stg-key');
  if (revealStg && stgKey) {
    revealStg.addEventListener('click', () => {
      if (stgKey.textContent.includes('•')) {
        stgKey.textContent = 'ps_test_7b2e9a1c4d8f3e6b0a5c2d9e7f1b4e9c1b';
        revealStg.textContent = '🙈 Hide';
      } else {
        stgKey.textContent = 'ps_test_••••••••••••••••••••••••••••••9c1b';
        revealStg.textContent = '👁️ Reveal';
      }
    });
  }
}
