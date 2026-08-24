/**
 * Vercel Serverless Function: /api/error-trigger
 * Generates runtime 500 errors for PatchR automated detection testing.
 */

export default function handler(req, res) {
  const mode = (req.query && req.query.mode) || 'error';

  if (mode === 'healthy') {
    console.log('[INFO] [200 OK] Health check passed.');
    return res.status(200).json({
      status: 'healthy',
      message: 'System operating normally.',
      timestamp: new Date().toISOString()
    });
  }

  if (mode === 'crash') {
    console.error('[PatchR-Test] Unhandled serverless runtime exception', {
      timestamp: new Date().toISOString(),
      severity: 'CRITICAL',
      stack: 'TypeError: Cannot read properties of undefined (reading data)\n    at handler (/api/error-trigger.js:22:15)'
    });
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Simulated crash — unhandled TypeError exception',
      code: 'ERR_UNHANDLED_CRASH'
    });
  }

  // Default: Return 500 runtime error
  console.error('[PatchR-Test] Serverless runtime error detected', {
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
    stack: 'Error: Database connection pool exhausted\n    at handler (/api/error-trigger.js:35:10)'
  });

  return res.status(500).json({
    error: 'Internal Server Error',
    message: 'Database connection pool exhausted (PatchR test)',
    code: 'ERR_DB_CONNECTION_FAILED'
  });
}