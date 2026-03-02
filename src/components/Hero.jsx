import { useEffect, useRef, useState, useCallback } from 'react'
import anime from 'animejs'
import WhatsappLink from './WhatsappLink'

export default function Hero({ isInitializing, onInitialize, hasRegistered }) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const btnRef = useRef(null)
  const btnSvgRef = useRef(null)
  const neonLoopRef = useRef(null)

  const [timeStr, setTimeStr] = useState('00:00:00')
  const [memUsage, setMemUsage] = useState(87)
  const [netPackets, setNetPackets] = useState(1024)

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

  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutQuart' })

    tl.add({
      targets: '.system-status',
      translateY: [-30, 0],
      opacity: [0, 1],
      duration: 900,
    })

    tl.add({
      targets: '.status-item',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 500,
      easing: 'easeOutExpo',
    }, '-=600')

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
          svgRef.current?.classList.add('glowing')
        }
      }, '-=300')
    }

    tl.add({
      targets: '.hero-subtitle-char',
      opacity: [0, 1],
      translateY: [10, 0],
      delay: anime.stagger(25),
      duration: 400,
      easing: 'easeOutExpo',
    }, '-=500')

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

    tl.add({
      targets: '.hero-meta',
      translateY: [15, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100),
    }, '-=300')

    tl.add({
      targets: btnRef.current,
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 700,
      easing: 'easeOutElastic(1, .6)',
    }, '-=200')

    tl.add({
      targets: '.corner-bracket',
      opacity: [0, 0.3],
      scale: [0.8, 1],
      duration: 500,
      delay: anime.stagger(100),
    }, '-=400')
  }, [])

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

      anime({
        targets: '.scanline-overlay',
        opacity: [0.03, 0.18, 0.05, 0.12, 0.02],
        duration: 180,
        easing: 'steps(5)'
      })

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

  const handleHoverIn = useCallback(() => {
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

  const dPath = "M0,5 L60,5 L80,25 L80,65 L60,85 L0,85 Z M18,22 L18,68 L50,68 L62,56 L62,34 L50,22 Z"
  const ePath = "M95,5 L175,5 L175,22 L113,22 L113,37 L160,37 L160,52 L113,52 L113,68 L175,68 L175,85 L95,85 Z"
  const d2Path = "M190,5 L250,5 L270,25 L270,65 L250,85 L190,85 Z M208,22 L208,68 L240,68 L252,56 L252,34 L240,22 Z"
  const sPath = "M285,5 L365,5 L365,21 L303,21 L303,37 L365,37 L365,85 L285,85 L285,69 L347,69 L347,53 L285,53 Z"
  const e2Path = "M380,5 L460,5 L460,22 L398,22 L398,37 L445,37 L445,52 L398,52 L398,68 L460,68 L460,85 L380,85 Z"
  const c2Path = "M555,5 L475,5 L475,85 L555,85 L555,68 L493,68 L493,22 L555,22 Z"

  const subtitleText = "CAPTURE · THE · FLAG"
  const subtitleChars = subtitleText.split('')

  const timerUnits = [
    { label: 'Days', value: countdown.days },
    { label: 'Hrs', value: countdown.hours },
    { label: 'Min', value: countdown.mins },
    { label: 'Sec', value: countdown.secs },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=VT323&display=swap');

        .hero-root {
          font-family: 'Share Tech Mono', monospace;
          background: #020408;
          position: relative;
          overflow: hidden;
        }

        .hero-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.018) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 1;
        }

        .hero-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.18) 2px,
            rgba(0,0,0,0.18) 4px
          );
          pointer-events: none;
          z-index: 2;
        }

        .scanline-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0,255,255,0.015) 50%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 3;
          opacity: 0.04;
        }

        .sys-bar {
          font-family: 'Share Tech Mono', monospace;
          border-bottom: 1px solid rgba(0,255,255,0.08);
          background: rgba(2,8,12,0.92);
          backdrop-filter: blur(12px);
        }

        .sys-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 2px 10px;
          border: 1px solid rgba(0,255,255,0.08);
          font-size: 9px;
          letter-spacing: 2px;
          text-transform: uppercase;
          /* FIX: was rgba(0,255,255,0.45) — bumped up */
          color: rgba(0,255,255,0.65);
        }

        .sys-chip.alert {
          border-color: rgba(255,40,100,0.2);
          color: rgba(255,40,100,0.9);
        }

        .sys-chip.active {
          border-color: rgba(0,255,100,0.2);
          color: rgba(0,255,100,0.85);
        }

        /* FIX: subtitle-track was rgba(0,255,255,0.35) — too faint */
        .subtitle-track {
          font-family: 'Orbitron', monospace;
          letter-spacing: 0.35em;
          font-size: clamp(10px, 1.4vw, 15px);
          color: rgba(0,255,255,0.7);
          text-transform: uppercase;
        }

        .corner-tl {
          position: absolute;
          top: 80px; left: 20px;
          width: 48px; height: 48px;
          border-left: 1px solid rgba(0,255,255,0.15);
          border-top: 1px solid rgba(0,255,255,0.15);
        }
        .corner-tr {
          position: absolute;
          top: 80px; right: 20px;
          width: 48px; height: 48px;
          border-right: 1px solid rgba(0,255,255,0.15);
          border-top: 1px solid rgba(0,255,255,0.15);
        }
        .corner-bl {
          position: absolute;
          bottom: 20px; left: 20px;
          width: 48px; height: 48px;
          border-left: 1px solid rgba(0,255,255,0.15);
          border-bottom: 1px solid rgba(0,255,255,0.15);
        }
        .corner-br {
          position: absolute;
          bottom: 20px; right: 20px;
          width: 48px; height: 48px;
          border-right: 1px solid rgba(0,255,255,0.15);
          border-bottom: 1px solid rgba(0,255,255,0.15);
        }

        .timer-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 14px 20px;
          background: rgba(0,255,255,0.022);
          border: 1px solid rgba(0,255,255,0.1);
          min-width: 72px;
        }
        .timer-cell::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.4), transparent);
        }
        .timer-cell + .timer-cell {
          border-left: none;
        }
        .timer-num {
          font-family: 'VT323', monospace;
          font-size: clamp(36px, 5vw, 52px);
          color: #00ffff;
          line-height: 1;
          text-shadow: 0 0 20px rgba(0,255,255,0.5), 0 0 40px rgba(0,255,255,0.2);
        }
        /* FIX: was rgba(0,255,255,0.25) — too faint */
        .timer-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(0,255,255,0.6);
          text-transform: uppercase;
          margin-top: 6px;
        }
        /* FIX: was rgba(0,255,255,0.2) — too faint */
        .timer-colon {
          font-family: 'VT323', monospace;
          font-size: 40px;
          color: rgba(0,255,255,0.5);
          line-height: 1;
          align-self: center;
          margin-bottom: 16px;
        }

        .prize-block {
          position: relative;
          border: 1px solid rgba(255,200,50,0.2);
          background: rgba(255,200,50,0.03);
          padding: 16px 40px;
          display: flex;
          align-items: center;
          gap: 20px;
          clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
        }
        .prize-block::before {
          content: 'PRIZE POOL';
          position: absolute;
          top: -1px; left: 20px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 4px;
          /* FIX: was rgba(255,200,50,0.35) — too faint */
          color: rgba(255,200,50,0.7);
          background: #020408;
          padding: 0 8px;
          transform: translateY(-50%);
        }
        .prize-amount {
          font-family: 'Orbitron', monospace;
          font-size: clamp(22px, 3.5vw, 32px);
          font-weight: 900;
          color: rgb(255,200,50);
          letter-spacing: 0.1em;
          text-shadow: 0 0 30px rgba(255,200,50,0.4);
        }

        /* FIX: was rgba(255,255,255,0.25) — too faint */
        .meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px;
          border: 1px solid rgba(255,255,255,0.05);
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          background: rgba(255,255,255,0.015);
        }

        .cta-outer {
          position: relative;
          display: inline-block;
        }
        .cta-btn {
          position: relative;
          background: transparent;
          border: none;
          font-family: 'Orbitron', monospace;
          font-weight: 700;
          font-size: 13px;
          color: #00ffff;
          text-transform: uppercase;
          padding: 20px 64px;
          cursor: pointer;
          overflow: visible;
          letter-spacing: 0.4em;
          clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
          background: rgba(0,255,255,0.04);
          transition: background 0.3s;
        }
        .cta-btn:hover {
          background: rgba(0,255,255,0.07);
        }
        /* FIX: was rgba(0,255,255,0.35) — too faint */
        .cta-label-prefix {
          color: rgba(0,255,255,0.65);
          font-size: 11px;
          margin-right: 8px;
        }
        /* FIX: was rgba(255,255,255,0.06) — nearly invisible */
        .cta-hex {
          display: block;
          text-align: center;
          margin-top: 10px;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.3);
          font-family: 'Share Tech Mono', monospace;
        }

        .scroll-pip {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .scroll-line {
          width: 1px;
          height: 28px;
          background: linear-gradient(to bottom, rgba(0,255,255,0.3), transparent);
          animation: scrollPulse 1.8s ease-in-out infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.7; transform: scaleY(1.2); }
        }
        /* FIX: was rgba(255,255,255,0.15) — too faint */
        .scroll-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        .svg-ambient {
          position: absolute;
          inset: -30% -10%;
          background: radial-gradient(ellipse at center, rgba(0,255,255,0.04) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(40px);
        }

        .side-label {
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 5px;
          /* FIX: was rgba(0,255,255,0.08) — nearly invisible */
          color: rgba(0,255,255,0.35);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .side-label-left { left: -30px; }
        .side-label-right { right: -30px; }

        .h-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,255,255,0.07) 20%, rgba(0,255,255,0.07) 80%, transparent);
        }

        /* FIX: was rgba(0,255,255,0.12) — too faint */
        .divider-slash {
          color: rgba(0,255,255,0.4);
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          line-height: 1;
        }

        @keyframes flicker {
          0%, 97%, 100% { opacity: 1; }
          98% { opacity: 0.85; }
          99% { opacity: 1; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <section
        ref={containerRef}
        className="hero-root relative flex flex-col items-center justify-center min-h-screen px-8 text-center transition-transform origin-center"
      >
        <div className="scanline-overlay" />

        {/* Corner brackets */}
        <div className="corner-bracket corner-tl opacity-0" />
        <div className="corner-bracket corner-tr opacity-0" />
        <div className="corner-bracket corner-bl opacity-0" />
        <div className="corner-bracket corner-br opacity-0" />

        {/* Side labels */}
        <div className="side-label side-label-left hidden lg:block">SOLASTA CTF // NSS COLLEGE OF ENGINEERING</div>
        <div className="side-label side-label-right hidden lg:block">DEDSEC // CAPTURE THE FLAG // 2026</div>

        {/* ═══ System Status Bar ═══ */}
        <div className="system-status sys-bar absolute top-0 left-0 right-0 flex items-center justify-between w-full px-6 py-2.5 opacity-0 z-20">
          <div className="flex items-center gap-3">
            <div className="status-item sys-chip alert opacity-0">
              <div className="relative flex items-center">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full animate-ping opacity-40" />
              </div>
              REC
            </div>
            <div className="status-item sys-chip active opacity-0">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" style={{ boxShadow: '0 0 6px #00ff64' }} />
              SYS.ONLINE
            </div>
            <div className="status-item sys-chip opacity-0 hidden sm:flex">
              {/* FIX: was rgba(255,255,255,0.2) */}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>CPU</span>
              <span style={{ color: '#00ffff', fontWeight: 'bold' }}>100%</span>
            </div>
          </div>

          <div className="status-item sys-chip opacity-0" style={{ borderColor: 'rgba(0,255,255,0.12)' }}>
            {/* FIX: was rgba(255,255,255,0.1) */}
            <span style={{ color: 'rgba(255,255,255,0.4)' }} className="hidden sm:inline">DEDSEC://</span>
            <span style={{ color: 'rgba(0,255,255,0.75)' }}>SOLASTA.CTF</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="status-item sys-chip opacity-0 hidden sm:flex">
              {/* FIX: was rgba(255,255,255,0.2) */}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>MEM</span>
              <span style={{ color: 'rgb(255,200,50)', opacity: 0.9 }}>{memUsage.toFixed(1)}%</span>
            </div>
            <div className="status-item sys-chip opacity-0 hidden md:flex">
              {/* FIX: was rgba(255,255,255,0.2) */}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>NET</span>
              <span style={{ color: 'rgba(0,255,255,0.75)' }}>{netPackets}PKT</span>
            </div>
            <div className="status-item sys-chip opacity-0 hidden lg:flex">
              {/* FIX: was rgba(255,255,255,0.2) */}
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>UPTIME</span>
              <span style={{ color: 'rgba(0,255,100,0.75)' }}>99.9%</span>
            </div>
            <div className="status-item sys-chip opacity-0">
              <div className="w-1 h-1 rounded-full" style={{ background: 'rgba(0,255,255,0.4)' }} />
              {/* FIX: was rgba(255,255,255,0.35) */}
              <span style={{ color: 'rgba(255,255,255,0.65)' }}>{timeStr}</span>
            </div>
          </div>
        </div>

        {/* ═══ Main content column ═══ */}
        <div className="relative z-10 flex flex-col items-center w-full" style={{ maxWidth: '860px' }}>

          {/* Top micro-label */}
          <div className="flex items-center gap-4 mb-6" style={{ marginTop: '0' }}>
            <div className="h-rule" style={{ width: '60px' }} />
            {/* FIX: was rgba(0,255,255,0.2) */}
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '9px', letterSpacing: '5px', color: 'rgba(0,255,255,0.55)', textTransform: 'uppercase' }}>
              CSE DEPT // SOLASTA FEST // 2026
            </span>
            <div className="h-rule" style={{ width: '60px' }} />
          </div>

          {/* ═══ DEDSEC SVG ═══ */}
          <div className="mb-6 relative w-full">
            <div className="svg-ambient" />
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

          {/* Subtitle divider row */}
          <div className="mb-8 flex items-center justify-center gap-5 w-full">
            <div className="hero-divider-left h-px opacity-0 hidden sm:block" style={{ width: '80px', background: 'linear-gradient(to right, transparent, rgba(0,255,255,0.2))' }} />
            <div className="subtitle-track">
              {subtitleChars.map((c, i) => (
                <span key={i} className="hero-subtitle-char inline-block opacity-0" style={{ minWidth: c === ' ' ? '8px' : 'auto' }}>
                  {c === ' ' ? '\u00A0' : c}
                </span>
              ))}
            </div>
            <div className="hero-divider-right h-px opacity-0 hidden sm:block" style={{ width: '80px', background: 'linear-gradient(to left, transparent, rgba(0,255,255,0.2))' }} />
          </div>

          {/* Meta pills */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 mb-10">
            <div className="hero-meta meta-pill opacity-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,200,50,0.6)' }} />
              CSE Department
            </div>
            <div className="divider-slash hidden sm:block" style={{ padding: '0 4px' }}>//</div>
            <div className="hero-meta meta-pill opacity-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,255,255,0.6)' }} />
              Solasta Fest
            </div>
            <div className="divider-slash hidden sm:block" style={{ padding: '0 4px' }}>//</div>
            <div className="hero-meta meta-pill opacity-0">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,255,100,0.6)' }} />
              NSS College of Engineering
            </div>
          </div>

          {/* Prize block */}
          <div className="hero-meta prize-block mb-10 opacity-0">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'rgb(255,200,50)', boxShadow: '0 0 14px rgba(255,200,50,0.7)' }} />
            <span className="prize-amount">15K INR</span>
          </div>

          {/* Countdown */}
          <div className="hero-meta flex items-end mb-12 opacity-0">
            {timerUnits.map((u, i) => (
              <>
                <div key={u.label} className="timer-cell">
                  <div className="timer-num">{String(u.value).padStart(2, '0')}</div>
                  <div className="timer-label">{u.label}</div>
                </div>
                {i < timerUnits.length - 1 && (
                  <div key={`sep-${i}`} className="timer-colon" style={{ padding: '0 4px', marginBottom: '20px' }}>:</div>
                )}
              </>
            ))}
          </div>

          {/* CTA Button */}
          {!hasRegistered ? (
            <div ref={btnRef} className="opacity-0 cta-outer">
              <button
                onClick={handleClick}
                onMouseEnter={handleHoverIn}
                onMouseLeave={handleHoverOut}
                className="cta-btn init-btn group"
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
                    rx="0" ry="0"
                    fill="none"
                    stroke="#00ffff"
                    strokeWidth="1"
                    strokeDasharray="10 6"
                  />
                </svg>
                <div className="btn-glow absolute inset-0 opacity-0" style={{ background: 'rgba(0,255,255,0.05)' }} />
                <span className="btn-text relative flex items-center gap-3" style={{ letterSpacing: '0.35em' }}>
                  <span className="cta-label-prefix">$_</span>
                  <span>Initialize</span>
                  <span className="terminal-cursor-blink !w-[6px] !h-[14px] !bg-cyber/80" />
                </span>
              </button>
              <span className="cta-hex">0x4445445345432E696E6974</span>
            </div>
          ) : (
            <WhatsappLink />
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="scroll-pip">
            <span className="scroll-text">Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>
    </>
  )
}