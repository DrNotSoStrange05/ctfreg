import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'

const LINES = [
  '$ cat /etc/stacs/rules.conf',
  '',
  '┌─────────────────────────────────────────────┐',
  '│ STACS CTF — Official Rules                  │',
  '├─────────────────────────────────────────────┤',
  '│ 01. Teams of 1-4 members allowed            │',
  '│ 02. No flag sharing between teams           │',
  '│ 03. No attacking the CTF infra              │',
  '│ 04. Internet access is permitted            │',
  '│ 05. Custom tools & scripts allowed          │',
  '│ 06. Points decay over time                  │',
  '│ 07. First blood bonus: +50 pts              │',
  '│ 08. Admin decisions are final               │',
  '└─────────────────────────────────────────────┘',
  '',
  '$ echo "Good luck, hacker."',
  'Good luck, hacker.',
]

export default function HackerTerminal() {
  const containerRef = useRef(null)
  const bodyRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [typing, setTyping] = useState(true)

  // Scroll trigger
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          // Animate container in
          anime({
            targets: containerRef.current,
            translateY: [40, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutQuart',
          })
        }
      },
      { threshold: 0.3 }
    )
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [started])

  // Typing simulation — line-by-line with staggered delay
  useEffect(() => {
    if (!started) return

    let lineIdx = 0
    let charIdx = 0
    let timer

    const typeNext = () => {
      if (lineIdx >= LINES.length) {
        setTyping(false)
        return
      }

      const line = LINES[lineIdx]
      if (charIdx <= line.length) {
        setCurrentLine(line.substring(0, charIdx))
        charIdx++
        const isCommand = line.startsWith('$')
        timer = setTimeout(typeNext, isCommand ? 35 : 8)
      } else {
        setLines((prev) => [...prev, line])
        setCurrentLine('')
        lineIdx++
        charIdx = 0
        timer = setTimeout(typeNext, line === '' ? 100 : 200)
      }
    }

    timer = setTimeout(typeNext, 500)
    return () => clearTimeout(timer)
  }, [started])

  return (
    <section className="section-spacing relative flex flex-col items-center overflow-hidden">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.015] mb-8">
            <span className="text-[10px] font-mono uppercase tracking-[4px] text-neon-green/60">Rules Terminal</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            The <span className="text-gold">Protocol</span>
          </h2>
        </div>

        {/* Terminal — max-w-4xl centered */}
        <div className="max-w-4xl mx-auto">
          <div ref={containerRef} className="terminal-container opacity-0">
            <div className="terminal-bar">
              <div className="terminal-dot bg-hot-pink" />
              <div className="terminal-dot bg-gold" />
              <div className="terminal-dot bg-neon-green" />
              <span className="ml-4 text-[10px] font-mono text-white/15">stacs@ctf:~/rules</span>
            </div>
            <div ref={bodyRef} className="terminal-body">
              {lines.map((line, i) => (
                <div key={i} className={`${line === '' ? 'h-4' : ''} ${line.startsWith('$') ? 'text-white/70' : ''}`}>
                  {line}
                </div>
              ))}
              {typing && (
                <div>
                  <span className={currentLine.startsWith('$') ? 'text-white/70' : ''}>{currentLine}</span>
                  <span className="terminal-cursor-blink" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
