
import { useState, useEffect, useRef } from 'react'

// ── Inline styles as CSS vars + keyframes injected once ──────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&display=swap');

  :root {
    --bg:        #040810;
    --surface:   #080f1a;
    --surface2:  #0d1826;
    --border:    rgba(0,200,255,0.12);
    --border-hi: rgba(0,200,255,0.35);
    --cyan:      #00c8ff;
    --cyan-dim:  rgba(0,200,255,0.18);
    --green:     #00ff9d;
    --green-dim: rgba(0,255,157,0.12);
    --pink:      #ff2d6b;
    --pink-dim:  rgba(255,45,107,0.12);
    --yellow:    #ffe94a;
    --text:      #c8d8e8;
    --text-dim:  #5a7a96;
    --mono:      'Share Tech Mono', monospace;
    --sans:      'Rajdhani', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root { background: var(--bg); min-height: 100vh; }

  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes flicker {
    0%,100% { opacity: 1; }
    92%      { opacity: 1; }
    93%      { opacity: 0.7; }
    94%      { opacity: 1; }
    96%      { opacity: 0.85; }
    97%      { opacity: 1; }
  }
  @keyframes pulse-border {
    0%,100% { box-shadow: 0 0 0 0 rgba(0,200,255,0); }
    50%      { box-shadow: 0 0 12px 1px rgba(0,200,255,0.2); }
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes rowIn {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0); }
  }

  .admin-wrap {
    min-height: 100vh;
    background: var(--bg);
    font-family: var(--sans);
    color: var(--text);
    position: relative;
    overflow-x: hidden;
  }

  /* Scanline overlay */
  .admin-wrap::before {
    content: '';
    position: fixed; inset: 0;
    background: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0,0,0,0.04) 2px,
      rgba(0,0,0,0.04) 4px
    );
    pointer-events: none;
    z-index: 9999;
  }

  /* Grid background */
  .admin-wrap::after {
    content: '';
    position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(0,200,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,200,255,0.03) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  .content-layer { position: relative; z-index: 1; }

  /* ── Login ── */
  .login-shell {
    display: flex; align-items: center; justify-content: center;
    min-height: 100vh; padding: 24px;
    animation: fadeUp 0.7s ease both;
  }

  .login-card {
    width: 100%; max-width: 420px;
    background: var(--surface);
    border: 1px solid var(--border-hi);
    border-radius: 2px;
    padding: 40px 36px;
    animation: pulse-border 4s ease infinite;
    position: relative;
    overflow: hidden;
  }

  .login-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, var(--cyan), transparent);
  }

  .login-eyebrow {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.3em;
    color: var(--cyan);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .login-title {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: #fff;
    margin-bottom: 6px;
  }

  .login-sub {
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    margin-bottom: 32px;
  }

  .field-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    color: var(--cyan);
    text-transform: uppercase;
    margin-bottom: 8px;
    display: block;
  }

  .cyber-input {
    width: 100%;
    background: rgba(0,0,0,0.4);
    border: 1px solid var(--border-hi);
    border-radius: 2px;
    padding: 12px 14px;
    font-family: var(--mono);
    font-size: 13px;
    color: var(--cyan);
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    letter-spacing: 0.1em;
  }
  .cyber-input::placeholder { color: var(--text-dim); }
  .cyber-input:focus {
    border-color: var(--cyan);
    box-shadow: 0 0 16px rgba(0,200,255,0.15);
  }

  .error-box {
    margin-top: 12px;
    padding: 10px 14px;
    background: var(--pink-dim);
    border: 1px solid rgba(255,45,107,0.3);
    border-radius: 2px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--pink);
    letter-spacing: 0.05em;
  }

  .btn-primary {
    margin-top: 20px;
    width: 100%;
    padding: 13px;
    background: transparent;
    border: 1px solid var(--cyan);
    border-radius: 2px;
    font-family: var(--mono);
    font-size: 11px;
    letter-spacing: 0.3em;
    color: var(--cyan);
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
  }
  .btn-primary:hover:not(:disabled) {
    background: var(--cyan);
    color: #000;
    box-shadow: 0 0 24px rgba(0,200,255,0.35);
  }
  .btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Dashboard ── */
  .dash-shell {
    min-height: 100vh;
    padding: 0 0 60px;
    animation: fadeUp 0.6s ease both;
  }

  .dash-header {
    border-bottom: 1px solid var(--border);
    background: rgba(4,8,16,0.85);
    backdrop-filter: blur(12px);
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    position: sticky; top: 0; z-index: 100;
  }

  .header-left {}

  .dash-eyebrow {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.35em;
    color: var(--cyan);
    text-transform: uppercase;
    margin-bottom: 2px;
  }

  .dash-title {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #fff;
  }

  .header-right {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }

  .filter-select {
    background: var(--surface2);
    border: 1px solid var(--border-hi);
    border-radius: 2px;
    padding: 8px 12px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    color: var(--text);
    outline: none;
    cursor: pointer;
    text-transform: uppercase;
  }
  .filter-select option { background: #0d1826; }

  .btn-export {
    padding: 8px 18px;
    background: transparent;
    border: 1px solid var(--green);
    border-radius: 2px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.25em;
    color: var(--green);
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  }
  .btn-export:hover {
    background: var(--green);
    color: #000;
    box-shadow: 0 0 18px rgba(0,255,157,0.3);
  }

  /* ── Table ── */
  .table-wrapper {
    padding: 24px 32px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  thead th {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.3em;
    color: var(--cyan);
    text-transform: uppercase;
    padding: 10px 14px;
    text-align: left;
    border-bottom: 1px solid var(--border-hi);
    white-space: nowrap;
    background: rgba(0,200,255,0.04);
  }

  tbody tr {
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
    animation: rowIn 0.4s ease both;
  }
  tbody tr:hover { background: rgba(0,200,255,0.04); }

  td {
    padding: 14px;
    vertical-align: top;
  }

  .team-name {
    font-weight: 700;
    font-size: 14px;
    color: #fff;
    letter-spacing: 0.03em;
    margin-bottom: 2px;
  }
  .team-code {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.25em;
    color: var(--cyan);
    background: var(--cyan-dim);
    display: inline-block;
    padding: 2px 7px;
    border-radius: 1px;
    margin-bottom: 6px;
  }
  .team-members {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-dim);
    line-height: 1.5;
  }
  .members-label {
    color: var(--text-dim);
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .reg-date {
    font-family: var(--mono);
    font-size: 9px;
    color: var(--text-dim);
    margin-top: 6px;
    letter-spacing: 0.05em;
  }

  .leader-name {
    font-weight: 600;
    color: #fff;
    font-size: 13px;
    margin-bottom: 3px;
  }
  .info-line {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-dim);
    line-height: 1.7;
  }

  .payment-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: rgba(255,233,74,0.08);
    border: 1px solid rgba(255,233,74,0.25);
    border-radius: 2px;
    font-family: var(--mono);
    font-size: 10px;
    color: var(--yellow);
    text-decoration: none;
    letter-spacing: 0.1em;
    transition: background 0.2s;
  }
  .payment-link:hover { background: rgba(255,233,74,0.18); }

  .no-payment {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--text-dim);
    letter-spacing: 0.1em;
  }
  .txn-id {
    font-family: var(--mono);
    font-size: 9px;
    color: var(--text-dim);
    margin-top: 6px;
    letter-spacing: 0.05em;
    max-width: 120px;
    word-break: break-all;
  }

  .status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 1px;
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    font-weight: 700;
    text-transform: uppercase;
  }
  .status-VERIFIED  { background: var(--green-dim);  color: var(--green);  border: 1px solid rgba(0,255,157,0.3); }
  .status-REJECTED  { background: var(--pink-dim);   color: var(--pink);   border: 1px solid rgba(255,45,107,0.3); }
  .status-PENDING   { background: rgba(255,233,74,0.1); color: var(--yellow); border: 1px solid rgba(255,233,74,0.25); }

  .action-btn {
    padding: 6px 14px;
    border-radius: 2px;
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  .btn-verify {
    background: var(--green-dim);
    color: var(--green);
    border-color: rgba(0,255,157,0.3);
  }
  .btn-verify:hover {
    background: var(--green);
    color: #000;
    box-shadow: 0 0 12px rgba(0,255,157,0.3);
  }
  .btn-reject {
    background: rgba(255,255,255,0.04);
    color: var(--text-dim);
    border-color: rgba(255,255,255,0.1);
  }
  .btn-reject:hover {
    background: var(--pink);
    color: #fff;
    border-color: var(--pink);
    box-shadow: 0 0 12px rgba(255,45,107,0.3);
  }

  .empty-row td {
    text-align: center;
    padding: 48px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--text-dim);
    letter-spacing: 0.2em;
  }

  .loading-msg {
    text-align: center;
    padding: 80px 32px;
    font-family: var(--mono);
    font-size: 11px;
    color: var(--cyan);
    letter-spacing: 0.3em;
    animation: flicker 3s infinite;
  }
  .loading-msg::after {
    content: '_';
    animation: blink 1s step-end infinite;
  }

  /* ── Pagination ── */
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 24px 32px 0;
  }
  .page-btn {
    background: transparent;
    border: 1px solid var(--border-hi);
    border-radius: 2px;
    padding: 8px 18px;
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.2em;
    color: var(--text-dim);
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
  }
  .page-btn:hover:not(:disabled) {
    border-color: var(--cyan);
    color: var(--cyan);
  }
  .page-btn:disabled { opacity: 0.25; cursor: not-allowed; }

  .page-info {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.15em;
    color: var(--text-dim);
  }
  .page-info span { color: var(--cyan); }
`

function StyleInjector() {
  useEffect(() => {
    const id = 'admin-dash-styles'
    if (!document.getElementById(id)) {
      const el = document.createElement('style')
      el.id = id
      el.textContent = GLOBAL_CSS
      document.head.appendChild(el)
    }
    return () => {}
  }, [])
  return null
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconReceipt = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/>
    <line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/>
  </svg>
)

// ── Main Component ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [adminKey, setAdminKey]           = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading]             = useState(false)
  const [error, setError]                 = useState('')
  const [page, setPage]                   = useState(1)
  const [totalPages, setTotalPages]       = useState(1)
  const [filterStatus, setFilterStatus]   = useState('')

  const BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'https://ctfreg-backend.onrender.com'

  const fetchRegistrations = async (key = adminKey, currentPage = page, status = filterStatus) => {
    setLoading(true)
    setError('')
    try {
      let url = `${BASE_URL}/api/admin/registrations?page=${currentPage}&limit=20`
      if (status) url += `&status=${status}`
      const res  = await fetch(url, { headers: { 'x-admin-key': key } })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to fetch data')
      setRegistrations(data.data)
      setTotalPages(data.pages)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err.message)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!adminKey.trim()) return
    fetchRegistrations(adminKey, 1, filterStatus)
  }

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/registrations/${id}/status`, {
        method: 'PATCH',
        headers: { 'x-admin-key': adminKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setRegistrations(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r))
    } catch (err) {
      alert(`Error updating status: ${err.message}`)
    }
  }

  const handleExport = () => {
    // We must encode the admin key before placing it in the URL so special characters (like + or / or =) are properly preserved
    window.location.href = `${BASE_URL}/api/admin/export?x-admin-key=${encodeURIComponent(adminKey)}`
  }

  const handleClearDatabase = async () => {
    const isConfirmed = window.confirm(
      "⚠ WARNING: INITIATING PURGE PROTOCOL ⚠\n\nThis will permanently delete ALL team registrations and clear ALL uploaded images from the database.\n\nAre you absolutely sure you want to proceed?"
    )
    
    if (!isConfirmed) return
    
    // Extra safety confirmation
    const verifyText = window.prompt('Type "DELETE EVERYTHING" to confirm the purge:')
    if (verifyText !== "DELETE EVERYTHING") {
      alert("Purge aborted.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/admin/clear-database`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey }
      })
      const data = await res.json()
      
      if (!res.ok) throw new Error(data.message || 'Failed to clear database')
      
      alert(data.message || "Database successfully wiped.")
      
      // Refresh the table which should now be empty
      fetchRegistrations(adminKey, 1, filterStatus)
    } catch (err) {
      alert(`Error clearing database: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) fetchRegistrations(adminKey, page, filterStatus)
  }, [page, filterStatus])

  // ── Login View ───────────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="admin-wrap">
        <StyleInjector />
        <div className="content-layer">
          <div className="login-shell">
            <div className="login-card">
              <div className="login-eyebrow">// restricted access</div>
              <div className="login-title">Command Center</div>
              <div className="login-sub">ADMIN PROTOCOL v2.4 — AUTHENTICATE TO PROCEED</div>

              <form onSubmit={handleLogin}>
                <label className="field-label">Admin Key</label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={e => setAdminKey(e.target.value)}
                  className="cyber-input"
                  placeholder="Enter secret key..."
                  autoComplete="current-password"
                />
                {error && <div className="error-box">⚠ {error}</div>}
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'AUTHENTICATING...' : 'ACCESS DATABASE'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Dashboard View ───────────────────────────────────────────────────────────
  return (
    <div className="admin-wrap">
      <StyleInjector />
      <div className="content-layer">
        <div className="dash-shell">

          {/* Header */}
          <div className="dash-header">
            <div className="header-left">
              <div className="dash-eyebrow">// intel database</div>
              <div className="dash-title">Team Registrations</div>
            </div>
            <div className="header-right">
              <select
                className="filter-select"
                value={filterStatus}
                onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
              >
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <button 
                className="btn-export" 
                style={{ borderColor: 'var(--pink)', color: 'var(--pink)' }}
                onClick={handleClearDatabase}
                title="Wipe DB"
              >
                PURGE DB
              </button>
              <button className="btn-export" onClick={handleExport}>Export CSV</button>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            {loading && registrations.length === 0 ? (
              <div className="loading-msg">LOADING INTEL</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Team Info</th>
                    <th>Leader & College</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.length === 0 && !loading ? (
                    <tr className="empty-row">
                      <td colSpan={5}>NO REGISTRATIONS FOUND</td>
                    </tr>
                  ) : (
                    registrations.map((reg, i) => (
                      <tr key={reg._id} style={{ animationDelay: `${i * 40}ms` }}>

                        {/* Team Info */}
                        <td>
                          <div className="team-name">{reg.teamName}</div>
                          <div className="team-code">{reg.teamCode}</div>
                          <div className="team-members">
                            <span className="members-label">Members: </span>
                            {reg.members?.length > 0 ? reg.members.join(', ') : 'Solo'}
                          </div>
                          <div className="reg-date">
                            Registered: {new Date(reg.createdAt).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Leader & College */}
                        <td>
                          <div className="leader-name">{reg.leaderName}</div>
                          <div className="info-line">{reg.email}</div>
                          <div className="info-line">{reg.phone}</div>
                          <div className="info-line" style={{ marginTop: 6 }}>{reg.collegeName}</div>
                          <div className="info-line">{reg.department} · {reg.year}</div>
                        </td>

                        {/* Payment */}
                        <td>
                          {reg.paymentScreenshotUrl ? (
                            <a
                              href={reg.paymentScreenshotUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="payment-link"
                            >
                              <IconReceipt /> Receipt
                            </a>
                          ) : (
                            <span className="no-payment">NO FILE</span>
                          )}
                          {reg.transactionId && (
                            <div className="txn-id">TXN: {reg.transactionId}</div>
                          )}
                        </td>

                        {/* Status */}
                        <td>
                          <span className={`status-badge status-${reg.status}`}>
                            {reg.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            {reg.status !== 'VERIFIED' && (
                              <button
                                className="action-btn btn-verify"
                                onClick={() => updateStatus(reg._id, 'VERIFIED')}
                              >
                                Verify
                              </button>
                            )}
                            {reg.status !== 'REJECTED' && (
                              <button
                                className="action-btn btn-reject"
                                onClick={() => updateStatus(reg._id, 'REJECTED')}
                              >
                                Reject
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage(p => p - 1)}
                disabled={page === 1 || loading}
              >
                ← Prev
              </button>
              <span className="page-info">
                Page <span>{page}</span> / <span>{totalPages}</span>
              </span>
              <button
                className="page-btn"
                onClick={() => setPage(p => p + 1)}
                disabled={page === totalPages || loading}
              >
                Next →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}