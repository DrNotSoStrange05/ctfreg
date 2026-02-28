import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function SuccessOverlay({ teamCode, onClose }) {
  const overlayRef = useRef(null)
  const checkRef = useRef(null)

  useEffect(() => {
    // Overlay fade in
    anime({
      targets: overlayRef.current,
      opacity: [0, 1],
      duration: 400,
      easing: 'easeOutQuart',
    })

    // Window scale in
    anime({
      targets: '.success-window',
      scale: [0.85, 1],
      opacity: [0, 1],
      duration: 600,
      delay: 100,
      easing: 'easeOutElastic(1, .7)',
    })

    // Terminal lines type in
    anime({
      targets: '.s-line',
      opacity: [0, 1],
      translateY: [8, 0],
      delay: anime.stagger(350, { start: 400 }),
      duration: 400,
      easing: 'easeOutQuart',
    })

    // SVG checkmark draw
    anime({
      targets: '.success-check',
      strokeDashoffset: [100, 0],
      duration: 800,
      delay: 2200,
      easing: 'easeOutQuart',
    })

    // Access badge
    anime({
      targets: '.access-text',
      opacity: [0, 1],
      scale: [0.8, 1],
      delay: 2600,
      duration: 600,
      easing: 'easeOutElastic(1, .6)',
    })

    // Close text
    anime({
      targets: '.close-btn',
      opacity: [0, 1],
      translateY: [10, 0],
      delay: 3200,
      duration: 500,
      easing: 'easeOutQuart',
    })

    const timer = setTimeout(onClose, 7000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div ref={overlayRef} className="success-overlay" onClick={onClose} style={{ opacity: 0 }}>
      <div className="success-window terminal-container max-w-md w-[92%]" onClick={(e) => e.stopPropagation()} style={{ opacity: 0 }}>
        <div className="terminal-bar">
          <div className="terminal-dot bg-hot-pink" />
          <div className="terminal-dot bg-gold" />
          <div className="terminal-dot bg-neon-green" />
          <span className="ml-3 text-[10px] font-mono text-white/15">stacs@ctf ~ submit</span>
        </div>
        <div className="terminal-body text-center">
          <div className="text-left mb-6">
            <div className="s-line opacity-0">$ init registration --submit</div>
            <div className="s-line opacity-0">$ validating credentials... <span className="text-white/40">OK</span></div>
            <div className="s-line opacity-0">$ encrypting [AES-256-GCM]... <span className="text-white/40">OK</span></div>
            <div className="s-line opacity-0">$ status: <span className="text-white font-bold">200 SUCCESS</span></div>
          </div>

          {/* SVG Checkmark */}
          <div className="flex justify-center my-6">
            <svg width="64" height="64" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="24" fill="none" stroke="rgba(0,255,136,0.15)" strokeWidth="1.5" />
              <path ref={checkRef} className="success-check" d="M14 27l8 8 16-16" />
            </svg>
          </div>

          {/* Access badge */}
          <div className="access-text opacity-0">
            <div className="inline-block px-8 py-3 border-2 border-neon-green rounded-xl">
              <span className="font-mono text-lg font-black tracking-[6px] text-neon-green" style={{ textShadow: '0 0 20px rgba(0,255,136,0.3)' }}>
                {teamCode ? `CODE: ${teamCode}` : 'ACCESS GRANTED'}
              </span>
            </div>
            <p className="text-white/20 text-xs mt-4">
              {teamCode ? 'Your team is registered. Save this code!' : 'Your team is registered. See you at the arena!'}
            </p>
          </div>

          <button onClick={onClose} className="close-btn w-full mt-6 py-3 text-[10px] font-mono uppercase tracking-[2px] text-neon-green/40 rounded-xl border border-neon-green/8 hover:bg-neon-green/[0.03] transition-colors opacity-0" data-hover>
            Close Terminal
          </button>
        </div>
      </div>
    </div>
  )
}
