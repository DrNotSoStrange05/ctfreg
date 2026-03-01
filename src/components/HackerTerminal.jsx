import { useEffect, useRef, useState } from 'react'

const CYAN = "#00f5e4"
const CYAN_DIM = "rgba(0,245,228,0.5)"
const CYAN_FAINT = "rgba(0,245,228,0.2)"
const CYAN_GLOW = "rgba(0,245,228,0.07)"
const CYAN_BORDER = "rgba(0,245,228,0.25)"

const LINES = [
  '$ cat /etc/dedsec/rules.conf',
  '',
  '┌───────────────────────────────────────────┐',
  '│ DEDSEC CTF — Official Rules               │',
  '├───────────────────────────────────────────┤',
  '│ 01. Teams of 1-3 members allowed          │',
  '│ 02. No flag sharing between teams         │',
  '│ 03. No attacking the CTF infra            │',
  '│ 04. Internet access is permitted          │',
  '│ 05. Custom tools & scripts allowed        │',
  '│ 06. Admin decisions are final             │',
  '│                                           │',
  '└───────────────────────────────────────────┘',
  '',
  '$ echo "Good luck, hacker."',
  'Good luck, hacker.',
]

export default function HackerTerminal() {
  const sectionRef = useRef(null)
  const terminalRef = useRef(null)
  const bodyRef = useRef(null)
  const startedRef = useRef(false)

  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [typing, setTyping] = useState(false)
  const [done, setDone] = useState(false)

  // Auto-scroll on every update
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines, currentLine])

  // Start typing — imperative, no state dependency issues
  function startTyping() {
    let lineIdx = 0
    let charIdx = 0

    setTyping(true)

    function tick() {
      if (lineIdx >= LINES.length) {
        setTyping(false)
        setDone(true)
        return
      }

      const line = LINES[lineIdx]

      if (charIdx <= line.length) {
        const chunk = line.substring(0, charIdx)
        setCurrentLine(chunk)
        charIdx++
        const delay = line.startsWith('$') ? 38 : 10
        setTimeout(tick, delay)
      } else {
        setLines(prev => [...prev, line])
        setCurrentLine('')
        lineIdx++
        charIdx = 0
        const pause = line === '' ? 80 : 180
        setTimeout(tick, pause)
      }
    }

    setTimeout(tick, 600)
  }

  // Intersection observer — fires startTyping once
  useEffect(() => {
    const el = terminalRef.current
    if (!el) return

    // Start hidden
    el.style.opacity = '0'
    el.style.transform = 'translateY(36px)'

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true

          // Fade in terminal
          el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)'
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'

          // Begin typing after fade settles
          setTimeout(startTyping, 400)
          obs.disconnect()
        }
      })
    }, { threshold: 0.2 })

    obs.observe(el)
    return () => obs.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '7rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#050a0a',
        overflow: 'hidden',
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
      }} />

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        opacity: 0.035,
        backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-6rem', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: `radial-gradient(ellipse, ${CYAN_GLOW} 0%, transparent 68%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '896px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 10 }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '0.4rem 1.4rem',
            border: `1px solid ${CYAN_BORDER}`,
            borderRadius: '9999px',
            background: CYAN_GLOW,
            marginBottom: '1.5rem',
          }}>
            <span style={{
              fontSize: '10px', letterSpacing: '0.45em',
              color: CYAN_FAINT, textTransform: 'uppercase',
            }}>
              Rules Terminal
            </span>
          </div>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.5rem)',
            fontWeight: '700',
            color: '#fff',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            The{' '}
            <span style={{
              color: CYAN,
              textShadow: `0 0 20px ${CYAN}, 0 0 40px rgba(0,245,228,0.2)`,
            }}>
              Protocol
            </span>
          </h2>
        </div>

        {/* Terminal window */}
        <div ref={terminalRef}>

          {/* Title bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.25rem',
            background: 'rgba(0,245,228,0.05)',
            border: `1px solid ${CYAN_BORDER}`,
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
          }}>
            {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
              <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, opacity: 0.8 }} />
            ))}
            <span style={{ marginLeft: '1rem', fontSize: '10px', letterSpacing: '0.3em', color: 'rgba(0,245,228,0.2)' }}>
              dedsec@ctf:~/rules
            </span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: CYAN, boxShadow: `0 0 6px ${CYAN}`,
                animation: 'termBlink 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '9px', color: CYAN_FAINT, letterSpacing: '0.3em' }}>LIVE</span>
            </div>
          </div>

          {/* Terminal body */}
          <div
            ref={bodyRef}
            style={{
              background: '#050a0a',
              border: `1px solid ${CYAN_BORDER}`,
              borderTop: '1px solid rgba(0,245,228,0.08)',
              borderRadius: '0 0 8px 8px',
              padding: '1.75rem 2rem',
              minHeight: '420px',
              maxHeight: '520px',
              overflowY: 'auto',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
              lineHeight: 1.9,
              color: CYAN_DIM,
              letterSpacing: '0.03em',
              scrollbarWidth: 'none',
            }}
          >
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  height: line === '' ? '0.75rem' : 'auto',
                  color: line.startsWith('$')
                    ? 'rgba(255,255,255,0.7)'
                    : line.startsWith('Good luck')
                      ? CYAN
                      : CYAN_DIM,
                  textShadow: line.startsWith('Good luck') ? `0 0 12px ${CYAN}` : 'none',
                  fontWeight: line.startsWith('$') ? '600' : '400',
                  whiteSpace: 'pre',
                }}
              >
                {line}
              </div>
            ))}

            {/* Currently typing line */}
            {typing && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  color: currentLine.startsWith('$') ? 'rgba(255,255,255,0.7)' : CYAN_DIM,
                  fontWeight: currentLine.startsWith('$') ? '600' : '400',
                  whiteSpace: 'pre',
                }}>
                  {currentLine}
                </span>
                <span style={{
                  display: 'inline-block',
                  width: '8px', height: '1em',
                  background: CYAN,
                  marginLeft: '2px',
                  boxShadow: `0 0 8px ${CYAN}`,
                  animation: 'cursorBlink 1s step-end infinite',
                }} />
              </div>
            )}

            {/* Idle cursor after done */}
            {done && (
              <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>$</span>
                <span style={{
                  display: 'inline-block',
                  width: '8px', height: '1em',
                  background: CYAN,
                  boxShadow: `0 0 8px ${CYAN}`,
                  animation: 'cursorBlink 1s step-end infinite',
                }} />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        @keyframes cursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes termBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  )
}