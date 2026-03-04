// REGISTRATION IS PERMANENTLY CLOSED — this component is intentionally disabled.
// Do not re-enable the form below even if imported elsewhere.

/**
 * RegistrationForm — DISABLED
 * Registration for SOLASTA CTF 2026 ended on 2026-03-04.
 * This component renders a closed notice only. The form fields,
 * submit handler, and API call have all been removed.
 */
export default function RegistrationForm() {
  return (
    <section
      id="registration"
      style={{
        position: 'relative',
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: "'Share Tech Mono', monospace",
      }}
    >
      <div style={{
        maxWidth: '480px',
        width: '100%',
        border: '1px solid rgba(255,40,100,0.3)',
        background: 'rgba(255,40,100,0.04)',
        clipPath: 'polygon(14px 0%, 100% 0%, calc(100% - 14px) 100%, 0% 100%)',
        padding: '40px 36px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '9px',
          letterSpacing: '4px',
          color: 'rgba(255,40,100,0.7)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          // ACCESS DENIED
        </div>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontWeight: 900,
          fontSize: 'clamp(16px, 3vw, 22px)',
          letterSpacing: '0.3em',
          color: 'rgba(255,40,100,0.95)',
          textTransform: 'uppercase',
          textShadow: '0 0 20px rgba(255,40,100,0.4)',
          marginBottom: '12px',
        }}>
          Registration Closed
        </div>
        <div style={{
          fontSize: '11px',
          letterSpacing: '2px',
          color: 'rgba(255,255,255,0.4)',
          lineHeight: 1.8,
        }}>
          SOLASTA CTF 2026 registrations have ended.<br />
          Thank you for your interest.
        </div>
      </div>
    </section>
  )
}