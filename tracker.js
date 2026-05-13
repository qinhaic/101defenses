// Visit Tracker — Powered by Supabase (free tier)
// Records visits with IP, user agent, and timestamp
// Displays total visits and today's visits

const SUPABASE_CONFIG = {
  // Replace these with your Supabase project values after setup
  url: 'https://yhzamwrmxjewappnxlgc.supabase.co',
  anonKey: 'sb_publishable_WKFIzuhZvMPLAK7YnVFHQw_CvJRwnfx'
};

// ====== Setup Instructions ======
// 1. Go to https://supabase.com and create a free account
// 2. Create a new project (free tier: 500MB database)
// 3. In SQL Editor, run the following SQL:
//
//   CREATE TABLE visits (
//     id BIGSERIAL PRIMARY KEY,
//     ip_address TEXT NOT NULL,
//     user_agent TEXT,
//     page TEXT DEFAULT 'index',
//     created_at TIMESTAMPTZ DEFAULT NOW()
//   );
//   CREATE INDEX idx_visits_date ON visits(created_at);
//   ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
//   CREATE POLICY "allow_insert" ON visits FOR INSERT WITH CHECK (true);
//   CREATE POLICY "allow_select" ON visits FOR SELECT USING (true);
//
// 4. Copy your project URL and anon key from Settings > API
// 5. Paste them into SUPABASE_CONFIG above

let supabaseReady = false;

function initTracker() {
  if (SUPABASE_CONFIG.url.includes('YOUR_')) {
    console.log('[Tracker] Supabase not configured — using localStorage fallback');
    useLocalFallback();
    return;
  }
  supabaseReady = true;
  recordVisit();
  loadStats();
}

// ====== Record a visit ======
async function recordVisit() {
  if (!supabaseReady) return;

  // First get the real client IP via a free IP service
  let ip = 'unknown';
  try {
    const ipR = await fetch('https://api.ipify.org?format=json');
    if (ipR.ok) {
      ip = (await ipR.json()).ip;
    }
  } catch {}

  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/visits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_CONFIG.anonKey,
        'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        ip_address: ip,
        user_agent: navigator.userAgent.substring(0, 500),
        page: window.location.pathname || 'index'
      })
    });

    if (!res.ok) {
      console.error('[Tracker] Record failed:', res.status);
    }
  } catch (err) {
    console.error('[Tracker] Record error:', err.message);
  }
}

// ====== Load stats for display ======
async function loadStats() {
  if (!supabaseReady) return;

  try {
    // Total visits
    const totalRes = await fetch(
      `${SUPABASE_CONFIG.url}/rest/v1/visits?select=count`,
      {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      }
    );
    const totalCount = totalRes.ok ? (await totalRes.json())[0]?.count || 0 : 0;

    // Today's visits (UTC)
    const today = new Date().toISOString().split('T')[0];
    const todayRes = await fetch(
      `${SUPABASE_CONFIG.url}/rest/v1/visits?select=count&created_at=gte.${today}T00:00:00Z`,
      {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      }
    );
    const todayCount = todayRes.ok ? (await todayRes.json())[0]?.count || 0 : 0;

    updateCounterDisplay(totalCount, todayCount);
  } catch (err) {
    console.error('[Tracker] Stats error:', err.message);
    updateCounterDisplay('…', '…');
  }
}

// ====== Update the counter in the footer ======
function updateCounterDisplay(total, today) {
  const el = document.getElementById('visitCounter');
  if (!el) return;
  el.innerHTML = `👁 总访问：${total} 次 | 今日：${today} 次`;
}

// ====== localStorage fallback (when Supabase not configured) ======
function useLocalFallback() {
  const KEY = 'local_visit_stats';
  let stats;
  try {
    stats = JSON.parse(localStorage.getItem(KEY)) || { total: 0, days: {} };
  } catch {
    stats = { total: 0, days: {} };
  }

  const today = new Date().toISOString().split('T')[0];
  stats.total += 1;
  stats.days[today] = (stats.days[today] || 0) + 1;

  try {
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {}

  updateCounterDisplay(stats.total, stats.days[today]);

  // Show note that this is local-only
  const el = document.getElementById('visitCounter');
  if (el) {
    el.title = '当前为本机记录模式（未配置Supabase）';
  }
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTracker);
} else {
  initTracker();
}
