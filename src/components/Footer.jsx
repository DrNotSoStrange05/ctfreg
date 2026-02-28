import { useEffect, useRef } from 'react'
import anime from 'animejs'

const links = [
  { name: 'Instagram', href: '#', d: 'M7.8 2h8.4C18.9 2 22 5.1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C5.1 22 2 18.9 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z' },
  { name: 'LinkedIn', href: '#', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
  { name: 'GitHub', href: '#', d: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.6 9.6 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z' },
  { name: 'Email', href: 'mailto:stacs@nssce.ac.in', d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2l8 5 8-5v2l-8 5-8-5V6z' },
]

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: '.footer-col',
            translateY: [30, 0],
            opacity: [0, 1],
            delay: anime.stagger(100),
            duration: 700,
            easing: 'easeOutQuart',
          })
          anime({
            targets: '.footer-bottom',
            opacity: [0, 1],
            duration: 600,
            delay: 500,
            easing: 'easeOutQuart',
          })
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (footerRef.current) obs.observe(footerRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="relative py-20 sm:py-28 flex flex-col items-center border-t border-white/10">
      <div className="section-container">
        <div className="grid gap-12 sm:gap-16 sm:grid-cols-3">
          {/* Brand */}
          <div className="footer-col opacity-0">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center">
                <span className="text-midnight font-mono font-black text-xs">S</span>
              </div>
              <span className="text-base font-bold text-white tracking-wide font-mono">STACS<span className="text-gold">CTF</span></span>
            </div>
            <p className="text-white/20 text-sm leading-relaxed">
              The premier cybersecurity competition by CSE dept at NSS College of Engineering.
            </p>
          </div>

          {/* Contact */}
          <div className="footer-col opacity-0">
            <h4 className="text-[10px] font-mono uppercase tracking-[4px] text-white/25 mb-5">Contact</h4>
            <div className="space-y-2.5 text-sm text-white/25">
              <p>Department of CSE</p>
              <p>NSS College of Engineering</p>
              <p>Palakkad, Kerala 678008</p>
              <a href="mailto:stacs@nssce.ac.in" className="block text-gold/50 hover:text-gold transition-colors mt-3" data-hover>
                stacs@nssce.ac.in
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="footer-col opacity-0">
            <h4 className="text-[10px] font-mono uppercase tracking-[4px] text-white/25 mb-5">Connect</h4>
            <div className="flex gap-3">
              {links.map((l) => (
                <a key={l.name} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.name} id={`social-${l.name.toLowerCase()}`} data-hover
                  className="w-10 h-10 rounded-xl border border-white/[0.04] bg-white/[0.015] flex items-center justify-center text-white/20 hover:text-gold hover:border-gold/15 hover:bg-gold/[0.03] transition-all duration-300"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={l.d} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom mt-16 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 opacity-0">
          <p className="text-[10px] text-white/10 font-mono">© 2026 STACS CTF. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="text-white/10">Powered by</span>
            <span className="font-mono font-bold text-gold/30 tracking-wider">STACS</span>
            <div className="w-1 h-1 rounded-full bg-neon-green/30" />
            <span className="font-mono font-bold text-electric/30 tracking-wider">Solasta</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
