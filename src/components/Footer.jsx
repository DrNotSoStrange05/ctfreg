import { useEffect, useRef } from 'react'

const CYAN = "#00f5e4"
const CYAN_FAINT = "rgba(0,245,228,0.2)"
const CYAN_GLOW = "rgba(0,245,228,0.07)"
const CYAN_BORDER = "rgba(0,245,228,0.15)"

const links = [
  {
    name: 'Instagram', href: '#',
    d: 'M7.8 2h8.4C18.9 2 22 5.1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C5.1 22 2 18.9 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10A5 5 0 0 1 12 7zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  },
  {
    name: 'LinkedIn', href: '#',
    d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  },
  {
    name: 'GitHub', href: '#',
    d: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.6 9.6 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z',
  },
  {
    name: 'Email', href: 'mailto:dedsec@nssce.ac.in',
    d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2l8 5 8-5v2l-8 5-8-5V6z',
  },
]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const cols = footer.querySelectorAll('[data-col]')
    const bottom = footer.querySelector('[data-bottom]')

    cols.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
    })
    if (bottom) bottom.style.opacity = '0'

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cols.forEach((el, i) => {
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)'
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, i * 110)
        })
        if (bottom) {
          setTimeout(() => {
            bottom.style.transition = 'opacity 0.6s ease'
            bottom.style.opacity = '1'
          }, 500)
        }
        obs.disconnect()
      }
    }, { threshold: 0.2 })

    obs.observe(footer)
    return () => obs.disconnect()
  }, [])

  return (
    <footer
      ref={footerRef}
      style={{
        position: 'relative',
        padding: '5rem 1.5rem 3.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#050a0a',
        borderTop: `1px solid ${CYAN_BORDER}`,
        fontFamily: "'Courier New', Courier, monospace",
        overflow: 'hidden',
      }}
    >
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
        zIndex: 1,
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: 0.03,
        backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', bottom: '-6rem', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: `radial-gradient(ellipse, ${CYAN_GLOW} 0%, transparent 70%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* 3-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem',
        }}>

          {/* Brand */}
          <div data-col>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                border: `1px solid ${CYAN_BORDER}`,
                background: CYAN_GLOW,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 12px rgba(0,245,228,0.1)`,
              }}>
                <span style={{ color: CYAN, fontWeight: '900', fontSize: '13px', textShadow: `0 0 8px ${CYAN}` }}>D</span>
              </div>
              <span style={{ color: '#fff', fontWeight: '700', fontSize: '15px', letterSpacing: '0.1em' }}>
                DEDSEC<span style={{ color: CYAN, textShadow: `0 0 10px ${CYAN}` }}>CTF</span>
              </span>
            </div>
            <p style={{ color: 'rgba(0,245,228,0.22)', fontSize: '13px', lineHeight: 1.8, margin: 0, letterSpacing: '0.03em' }}>
              The premier cybersecurity competition by CSE dept at NSS College of Engineering.
            </p>
          </div>

          {/* Contact */}
          <div data-col>
            <h4 style={{
              fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(0,245,228,0.25)', margin: '0 0 1.25rem',
            }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '13px', color: 'rgba(0,245,228,0.22)', letterSpacing: '0.03em' }}>
              <span>Department of CSE</span>
              <span>NSS College of Engineering</span>
              <span>Palakkad, Kerala 678008</span>
              {/* <a
                href="mailto:dedsec@nssce.ac.in"
                style={{ color: 'rgba(0,245,228,0.45)', textDecoration: 'none', marginTop: '0.5rem', transition: 'color 0.25s, text-shadow 0.25s' }}
                onMouseEnter={e => { e.target.style.color = CYAN; e.target.style.textShadow = `0 0 10px ${CYAN}` }}
                onMouseLeave={e => { e.target.style.color = 'rgba(0,245,228,0.45)'; e.target.style.textShadow = 'none' }}
              >
                dedsec@nssce.ac.in
              </a> */}
            </div>
          </div>

          {/* Social */}
          <div data-col>
            <h4 style={{
              fontSize: '9px', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: 'rgba(0,245,228,0.25)', margin: '0 0 1.25rem',
            }}>
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.name}
                  style={{
                    width: '40px', height: '40px', borderRadius: '8px',
                    border: `1px solid ${CYAN_BORDER}`,
                    background: CYAN_GLOW,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(0,245,228,0.3)', textDecoration: 'none',
                    transition: 'color 0.3s, border-color 0.3s, box-shadow 0.3s, background 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = CYAN
                    e.currentTarget.style.borderColor = 'rgba(0,245,228,0.5)'
                    e.currentTarget.style.background = 'rgba(0,245,228,0.1)'
                    e.currentTarget.style.boxShadow = `0 0 14px rgba(0,245,228,0.15)`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(0,245,228,0.3)'
                    e.currentTarget.style.borderColor = CYAN_BORDER
                    e.currentTarget.style.background = CYAN_GLOW
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={l.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          data-bottom
          style={{
            paddingTop: '2rem',
            borderTop: 'rgba(0,245,228,0.07) 1px solid',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '10px', color: 'rgba(0,245,228,0.15)', margin: 0, letterSpacing: '0.2em' }}>
            © 2026 DEDSEC CTF. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '10px', letterSpacing: '0.2em' }}>
            <span style={{ color: 'rgba(0,245,228,0.15)' }}>Powered by</span>
            <span style={{ color: 'rgba(0,245,228,0.45)', fontWeight: '700', textShadow: `0 0 8px rgba(0,245,228,0.2)` }}>
              DEDSEC
            </span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: CYAN, opacity: 0.3, boxShadow: `0 0 6px ${CYAN}` }} />
            <span style={{ color: 'rgba(0,245,228,0.3)', fontWeight: '600' }}>Solasta</span>
          </div>
        </div>
      </div>

      <style>{`* { box-sizing: border-box; }`}</style>
    </footer>
  )
}