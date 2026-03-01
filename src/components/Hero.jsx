import { useEffect, useRef, useState, useCallback } from 'react'
import anime from 'animejs'

export default function Hero({ isInitializing, onInitialize }) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const btnRef = useRef(null)
  const btnSvgRef = useRef(null)
  const neonLoopRef = useRef(null)

  // System status clock
  const [timeStr, setTimeStr] = useState('00:00:00')
  const [memUsage, setMemUsage] = useState(87)
  const [netPackets, setNetPackets] = useState(1024)

  // Countdown timer — set your event date here
  const EVENT_DATE = new Date('2026-03-06T19:00:00+05:30')
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0, secs: 0 })
  
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = Math.max(0, EVENT_DATE - now)
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const it = setInterval(() => {
      tick()
      setTimeStr(new Date().toTimeString().split(' ')[0])
      setMemUsage(prev => {
        const delta = Math.random() * 4 - 2
        return Math.max(82, Math.min(98, prev + delta))
      })
      setNetPackets(prev => prev + Math.floor(Math.random() * 50))
    }, 1000)
    return () => clearInterval(it)
  }, [])

  // Initial Entrance Sequence
  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutQuart' })

    // 1. Status bar fades in from top
    tl.add({
      targets: '.system-status',
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 900,
    })

    // 2. Status bar items stagger in
    tl.add({
      targets: '.status-item',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutExpo',
    }, '-=600')

    // 3. SVG Path Morphing — Laser/decode drawing
    const paths = svgRef.current?.querySelectorAll('.dedsec-path')
    if (paths) {
      tl.add({
        targets: paths,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: anime.stagger(120),
        begin: () => {
          paths.forEach(p => {
            p.style.opacity = 1
            p.style.filter = 'drop-shadow(0 0 4px rgba(0,255,255,0.5))'
          })
        }
      }, '-=400')

      // 4. Fill characters after stroke draw completes
      tl.add({
        targets: paths,
        fill: ['rgba(0,0,0,0)', '#00ffff'],
        strokeWidth: [2, 1],
        duration: 800,
        easing: 'easeOutSine',
        complete: () => {
          paths.forEach(p => {
            p.style.filter = 'drop-shadow(0 0 6px rgba(0,255,255,0.3))'
          })
          // Enable pulsing neon glow after entrance
          svgRef.current?.classList.add('glowing')
        }
      }, '-=300')
    }

    // 5. "CAPTURE THE FLAG" subtitle with decode effect
    tl.add({
      targets: '.hero-subtitle-char',
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(25),
      duration: 400,
      easing: 'easeOutExpo',
    }, '-=500')

    // 6. Decorative dividers
    tl.add({
      targets: '.hero-divider-left',
      width: ['0%', '100%'],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutExpo',
    }, '-=300')
    tl.add({
      targets: '.hero-divider-right',
      width: ['0%', '100%'],
      opacity: [0, 1],
      duration: 600,
      easing: 'easeOutExpo',
    }, '-=600')

    // 7. Meta details
    tl.add({
      targets: '.hero-meta',
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100),
    }, '-=300')

    // 8. CTA button appears
    tl.add({
      targets: btnRef.current,
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutElastic(1, .6)',
    }, '-=200')

    // 9. Corner brackets
    tl.add({
      targets: '.corner-bracket',
      opacity: [0, 0.3],
      scale: [0.8, 1],
      duration: 500,
      delay: anime.stagger(100),
    }, '-=400')
  }, [])

  // 5s periodic glitch effect with RGB Split
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden || isInitializing) return

      const targets = ['.dedsec-svg']
      anime.timeline({ easing: 'linear' })
        .add({
          targets,
          translateX: () => anime.random(-6, 6),
          translateY: () => anime.random(-4, 4),
          skewX: () => anime.random(-12, 12),
          filter: 'drop-shadow(5px 0 0 rgba(255,0,0,0.8)) drop-shadow(-5px 0 0 rgba(0,255,255,0.8))',
          duration: 60,
        })
        .add({
          targets,
          translateX: () => anime.random(-3, 3),
          translateY: () => anime.random(-2, 2),
          skewX: () => anime.random(-6, 6),
          filter: 'drop-shadow(-4px 0 0 rgba(255,0,0,0.6)) drop-shadow(4px 0 0 rgba(0,255,255,0.6))',
          duration: 40,
        })
        .add({
          targets,
          translateX: () => anime.random(-2, 2),
          skewX: 0,
          filter: 'drop-shadow(2px 0 0 rgba(255,0,0,0.3)) drop-shadow(-2px 0 0 rgba(0,255,255,0.3))',
          duration: 30,
        })
        .add({
          targets,
          translateX: 0,
          translateY: 0,
          skewX: 0,
          filter: 'drop-shadow(0px 0 0 red) drop-shadow(0px 0 0 cyan)',
          duration: 50,
        })

      // Scanline flash
      anime({
        targets: '.scanline-overlay',
        opacity: [0.03, 0.18, 0.05, 0.12, 0.02],
        duration: 180,
        easing: 'steps(5)'
      })
      
      // Random text glitch on subtitle
      anime({
        targets: '.hero-subtitle-char',
        opacity: [1, 0.3, 1, 0.5, 1],
        duration: 120,
        delay: anime.stagger(10, { from: 'center' }),
        easing: 'steps(3)'
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [isInitializing])

  // Handle Initialize Sequence
  useEffect(() => {
    if (isInitializing) {
      anime.timeline({ easing: 'easeInOutQuart' })
        .add({
          targets: containerRef.current,
          scale: 0.8,
          opacity: 0.05,
          filter: 'blur(15px)',
          duration: 900,
        })
    } else {
      anime({
        targets: containerRef.current,
        scale: 1,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 900,
        easing: 'easeOutElastic(1, .6)'
      })
    }
  }, [isInitializing])

  // Button hover — animated neon border loop via SVG stroke animation
  const handleHoverIn = useCallback(() => {
    // Clear previous
    if (neonLoopRef.current) {
      anime.remove('.btn-border-path')
      neonLoopRef.current = null
    }
    
    neonLoopRef.current = anime({
      targets: '.btn-border-path',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1200,
      loop: true,
      direction: 'alternate',
    })

    anime({
      targets: '.btn-glow',
      opacity: [0, 0.6],
      duration: 400,
      easing: 'easeOutQuad',
    })

    anime({
      targets: '.btn-text',
      letterSpacing: ['6px', '10px'],
      duration: 400,
      easing: 'easeOutQuad',
    })
  }, [])

  const handleHoverOut = useCallback(() => {
    if (neonLoopRef.current) {
      anime.remove('.btn-border-path')
      neonLoopRef.current = null
    }

    anime({
      targets: '.btn-glow',
      opacity: 0,
      duration: 300,
      easing: 'easeInQuad',
    })

    anime({
      targets: '.btn-text',
      letterSpacing: '6px',
      duration: 300,
      easing: 'easeInQuad',
    })
  }, [])

  // Click effect — flash before transitioning
  const handleClick = useCallback(() => {
    anime({
      targets: '.scanline-overlay',
      opacity: [0.3, 0],
      duration: 300,
      easing: 'easeOutQuad',
    })
    anime({
      targets: btnRef.current,
      scale: [1, 0.92, 1.05, 0],
      opacity: [1, 1, 1, 0],
      duration: 500,
      easing: 'easeInOutQuart',
      complete: () => onInitialize()
    })
  }, [onInitialize])

  // SVG paths for 'dedsec' — clean industrial block letters
  // Each letter: 80 wide, 80 tall, 15px gap, bar thickness 18px
  // Layout: D(0-80) E(95-175) C(190-270) S(285-365) E(380-460) C(475-555)

  // D: outer clockwise + inner counter-clockwise for hole
  const dPath = "M0,5 L60,5 L80,25 L80,65 L60,85 L0,85 Z M18,22 L18,68 L50,68 L62,56 L62,34 L50,22 Z"

  // E: single outline tracing the E shape
  const ePath = "M95,5 L175,5 L175,22 L113,22 L113,37 L160,37 L160,52 L113,52 L113,68 L175,68 L175,85 L95,85 Z"

  // C: open bracket shape
  const d2Path = "M190,5 L250,5 L270,25 L270,65 L250,85 L190,85 Z M208,22 L208,68 L240,68 L252,56 L252,34 L240,22 Z"

  // S: symmetric block S — top bar → left connector → mid bar → right connector → bottom bar
  const sPath = "M285,5 L365,5 L365,21 L303,21 L303,37 L365,37 L365,85 L285,85 L285,69 L347,69 L347,53 L285,53 Z"

  // E2: same as E, shifted
  const e2Path = "M380,5 L460,5 L460,22 L398,22 L398,37 L445,37 L445,52 L398,52 L398,68 L460,68 L460,85 L380,85 Z"

  // C2: same as C, shifted
  const c2Path = "M555,5 L475,5 L475,85 L555,85 L555,68 L493,68 L493,22 L555,22 Z"

  const subtitleText = "CAPTURE · THE · FLAG"
  const subtitleChars = subtitleText.split('')

  // Countdown units for rendering
  const timerUnits = [
    { label: 'Days', value: countdown.days },
    { label: 'Hrs', value: countdown.hours },
    { label: 'Min', value: countdown.mins },
    { label: 'Sec', value: countdown.secs },
  ]

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen px-8 text-center transition-transform origin-center"
    >
      {/* Corner Brackets — decorative framing */}
      <div className="corner-bracket absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyber/20 opacity-0" />
      <div className="corner-bracket absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyber/20 opacity-0" />
      <div className="corner-bracket absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyber/20 opacity-0" />
      <div className="corner-bracket absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyber/20 opacity-0" />

      {/* ═══ System Status Bento-Header ═══ */}
      <div className="system-status absolute top-0 left-0 right-0 flex items-center justify-between w-full px-8 py-3 opacity-0 border-b border-white/[0.03] bg-carbon/60 backdrop-blur-md z-20">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="status-item flex items-center gap-2 opacity-0">
            <div className="relative flex items-center gap-1.5">
              <div className="w-2 h-2 bg-hot-pink rounded-full animate-pulse" />
              <div className="absolute w-2 h-2 bg-hot-pink rounded-full animate-ping opacity-50" />
            </div>
            <span className="text-[10px] font-mono tracking-[3px] text-hot-pink font-bold uppercase">REC</span>
          </div>
          <div className="status-item flex items-center gap-2 opacity-0">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_var(--color-neon-green)]" />
            <span className="text-[10px] font-mono tracking-[3px] text-neon-green/80 uppercase">SYS.ONLINE</span>
          </div>
          <div className="status-item items-center gap-2 opacity-0 hidden sm:flex">
            <span className="text-[10px] font-mono tracking-[2px] text-white/25 uppercase">CPU:</span>
            <span className="text-[10px] font-mono tracking-[2px] text-cyber font-bold">93%</span>
          </div>
        </div>

        <div className="status-item flex items-center gap-2 opacity-0">
          <span className="text-[10px] font-mono tracking-[4px] text-white/15 uppercase hidden sm:inline">dedsec://</span>
          <span className="text-[10px] font-mono tracking-[4px] text-cyber/40 uppercase">SOLASTA.CTF</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="status-item items-center gap-2 opacity-0 hidden sm:flex">
            <span className="text-[10px] font-mono tracking-[2px] text-white/25 uppercase">MEM:</span>
            <span className="text-[10px] font-mono tracking-[2px] text-gold/60 font-bold">{memUsage.toFixed(1)}%</span>
          </div>
          <div className="status-item items-center gap-2 opacity-0 hidden md:flex">
            <span className="text-[10px] font-mono tracking-[2px] text-white/25 uppercase">NET:</span>
            <span className="text-[10px] font-mono tracking-[2px] text-cyber/50 font-bold">{netPackets}PKT</span>
          </div>
          <div className="status-item items-center gap-2 opacity-0 hidden lg:flex">
            <span className="text-[10px] font-mono tracking-[2px] text-white/25 uppercase">UPTIME:</span>
            <span className="text-[10px] font-mono tracking-[2px] text-neon-green/50">99.9%</span>
          </div>
          <div className="status-item flex items-center gap-2 opacity-0">
            <div className="w-1 h-1 bg-cyber/40 rounded-full" />
            <span className="text-[10px] font-mono tracking-[3px] text-white/40">{timeStr}</span>
          </div>
        </div>
      </div>

      {/* ═══ dedsec SVG Title — Focal Point ═══ */}
      <div className="mb-8 relative w-full" style={{ maxWidth: '800px' }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[120px] bg-cyber/[0.02] blur-[80px] rounded-full" />
        </div>
        <svg ref={svgRef} viewBox="0 0 560 90" className="dedsec-svg w-full relative z-10">
          <g fill="transparent" stroke="#00ffff" strokeWidth="2" strokeLinejoin="miter" strokeLinecap="square">
            <path className="dedsec-path" d={dPath} style={{ opacity: 0 }} />
            <path className="dedsec-path" d={ePath} style={{ opacity: 0 }} />
            <path className="dedsec-path" d={d2Path} style={{ opacity: 0 }} />
            <path className="dedsec-path" d={sPath} style={{ opacity: 0 }} />
            <path className="dedsec-path" d={e2Path} style={{ opacity: 0 }} />
            <path className="dedsec-path" d={c2Path} style={{ opacity: 0 }} />
          </g>
        </svg>
      </div>

      {/* ═══ Subtitle ═══ */}
      <div className="mb-8 flex items-center justify-center gap-5">
        <div className="hero-divider-left h-px w-12 sm:w-24 bg-gradient-to-r from-transparent to-cyber/30 opacity-0 hidden sm:block" />
        <div className="font-mono text-sm sm:text-lg text-cyber/60 uppercase tracking-[4px] sm:tracking-[6px] whitespace-nowrap">
          {subtitleChars.map((c, i) => (
            <span key={i} className="hero-subtitle-char inline-block opacity-0" style={{ minWidth: c === ' ' ? '8px' : 'auto' }}>
              {c === ' ' ? '\u00A0' : c}
            </span>
          ))}
        </div>
        <div className="hero-divider-right h-px w-12 sm:w-24 bg-gradient-to-l from-transparent to-cyber/30 opacity-0 hidden sm:block" />
      </div>

      {/* ═══ Event Meta ═══ */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 mb-10">
        <div className="hero-meta flex items-center gap-2.5 opacity-0">
          <div className="w-2 h-2 bg-gold/50 rounded-full" />
          <span className="text-xs sm:text-sm font-mono tracking-[3px] text-white/35 uppercase">STACS</span>
        </div>
        <div className="hero-meta flex items-center gap-2.5 opacity-0">
          <div className="w-2 h-2 bg-cyber/50 rounded-full" />
          <span className="text-xs sm:text-sm font-mono tracking-[3px] text-white/35 uppercase">Solasta TechFest</span>
        </div>
        <div className="hero-meta flex items-center gap-2.5 opacity-0">
          <div className="w-2 h-2 bg-neon-green/50 rounded-full" />
          <span className="text-xs sm:text-sm font-mono tracking-[3px] text-white/35 uppercase">NSS College of Engineering</span>
        </div>
      </div>

      {/* ═══ Countdown Timer ═══ */}
      <div className="hero-meta flex items-center justify-center gap-3 sm:gap-4 opacity-0" style={{ marginBottom: '1rem' }}>
        {timerUnits.map((u) => (
          <div key={u.label} className="timer-block">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyber tabular-nums">
              {String(u.value).padStart(2, '0')}
            </div>
            <div className="text-[9px] font-mono text-white/20 uppercase tracking-[2px] mt-1">{u.label}</div>
          </div>
        ))}
      </div>

      {/* ═══ Initialize CTA — extra breathing room via mt-12 above ═══ */}
      <div ref={btnRef} className="opacity-0 relative mt-10">
        <button
          onClick={handleClick}
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
          className="init-btn relative bg-transparent border-none text-cyber font-mono font-bold text-base uppercase overflow-visible group"
          style={{ padding: '20px 56px' }}
          data-hover
        >
          <svg
            ref={btnSvgRef}
            className="absolute inset-[-1px] w-[calc(100%+2px)] h-[calc(100%+2px)] pointer-events-none"
            preserveAspectRatio="none"
          >
            <rect
              className="btn-border-path"
              x="1" y="1"
              width="calc(100% - 2px)" height="calc(100% - 2px)"
              rx="4" ry="4"
              fill="none"
              stroke="#00ffff"
              strokeWidth="1.5"
              strokeDasharray="8 4"
            />
          </svg>
          <div className="absolute inset-0 border border-cyber/25 rounded" />
          <div className="btn-glow absolute inset-0 bg-cyber/[0.03] rounded opacity-0" />
          <span className="btn-text relative flex items-center gap-4 tracking-[5px]">
            <span className="relative flex items-center gap-1.5">
              <span className="text-cyber/60">$</span>
              <span className="text-white/30">~/</span>
            </span>
            <span className="text-cyber">Register</span>
            <span className="terminal-cursor-blink !w-[7px] !h-[16px] !bg-cyber/80" />
          </span>
        </button>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="text-[10px] font-mono text-white/10 tracking-[2px]">0x4445435345432E696E6974</span>
        </div>
      </div>

      {/* ═══ Scroll Indicator ═══ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <div className="scroll-indicator flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-mono tracking-[4px] text-white/30 uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/25 animate-bounce">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}