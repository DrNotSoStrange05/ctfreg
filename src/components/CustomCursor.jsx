import { useEffect, useRef } from 'react'
import anime from 'animejs'

export default function CustomCursor() {
  const cursor = useRef(null)
  const dot = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY }
      // Dot follows immediately
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX - 2.5}px, ${e.clientY - 2.5}px)`
      }
    }

    // Lerp loop for outer ring
    const lerp = (a, b, t) => a + (b - a) * t
    let raf
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12)
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12)
      if (cursor.current) {
        cursor.current.style.transform = `translate(${pos.current.x - cursor.current.offsetWidth / 2}px, ${pos.current.y - cursor.current.offsetHeight / 2}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    // Hover detection
    const onOver = (e) => {
      const el = e.target.closest('button, a, input, select, [data-hover]')
      if (el && cursor.current) {
        cursor.current.classList.add('hovering')
        // Ripple
        const ripple = document.createElement('div')
        ripple.className = 'cursor-ripple'
        ripple.style.transform = `translate(${target.current.x - 24}px, ${target.current.y - 24}px)`
        document.body.appendChild(ripple)
        anime({
          targets: ripple,
          scale: [0.5, 2],
          opacity: [0.5, 0],
          duration: 600,
          easing: 'easeOutExpo',
          complete: () => ripple.remove(),
        })
      }
    }
    const onOut = (e) => {
      const el = e.target.closest('button, a, input, select, [data-hover]')
      if (el && cursor.current) cursor.current.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursor} className="custom-cursor" />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}
