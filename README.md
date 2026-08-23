# PulseStream // Cloud Telemetry & Autonomous Reliability Testbed

> A mock web application designed as a testbed for automated error-detection, Vercel build & runtime log scraping, and autonomous GitHub code repair agents.

---

## 🎯 Purpose of this Repository

This repository provides realistic reliability test scenarios for AI agents, PatchR, and automated remediation bots:

1. **Build / Deploy Failure Scenario** (Pre-Deployment)
2. **Serverless Runtime 500 Failure Scenario with Live Toggle** (Post-Deployment / In Production)

---

## 🎛️ Live Reliability Simulator (Interactive In-App Toggle)

On the live deployed website, there is an interactive **Reliability Simulator Card** with a toggle switch:

### 🔴 Failure Mode (500 ERROR)
- **Switch Position**: Left (Red)
- **Action**: Clicking the button calls `/api/error-trigger?mode=error`.
- **Result**:
  - Webpage receives HTTP `500 Internal Server Error`.
  - **Vercel Dashboard → Logs** records a critical red 500 stack trace:
    ```text
    🚨 CRITICAL ERROR: Unhandled exception in telemetry worker
    TypeError: Cannot read properties of undefined (reading 'cluster_id') at /api/error-trigger.js:25:25
    ```

### 🟢 Healthy Mode (200 OK)
- **Switch Position**: Right (Green)
- **Action**: Clicking the button calls `/api/error-trigger?mode=healthy`.
- **Result**:
  - Webpage receives HTTP `200 OK`.
  - **Vercel Dashboard → Logs** records a clean operational log:
    ```text
    [INFO] [200 OK] Telemetry pipeline operational. Auto-remediation validated.
    ```

---

## 🛠️ The Serverless Backend Code ([api/error-trigger.js](api/error-trigger.js))

```javascript
export default function handler(req, res) {
  const { mode } = req.query;

  if (mode === 'healthy') {
    // 🟢 Healthy State
    console.log('[INFO] [200 OK] Telemetry pipeline operational.');
    return res.status(200).json({ status: 'healthy', message: 'System operating normally.' });
  }

  // 🔴 Error State
  console.error(`🚨 CRITICAL ERROR: Unhandled exception in telemetry worker`);
  console.error(`TypeError: Cannot read properties of undefined (reading 'cluster_id') at /api/error-trigger.js:25:25`);
  return res.status(500).json({ error: 'Internal Server Error', message: "Cannot read properties of undefined (reading 'cluster_id')" });
}
```

---

## 🚀 Local Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Test (Verifies build passes cleanly)
```bash
npm run build
```

### 3. Local Development
```bash
npm run dev
```

---

## 📦 Vercel Deployment Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
