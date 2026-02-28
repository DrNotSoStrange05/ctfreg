import { useEffect, useRef, useCallback } from 'react'
import anime from 'animejs'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Responsive canvas sizing
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle class
    class Particle {
      constructor() {
        this.reset()
        this.y = Math.random() * canvas.height // Initial random position
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = canvas.height + 20
        this.baseX = this.x
        this.baseY = this.y
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = -(Math.random() * 0.6 + 0.15)
        this.size = Math.random() * 6 + 2
        this.opacity = Math.random() * 0.25 + 0.05
        this.maxOpacity = this.opacity
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        this.sides = Math.random() > 0.5 ? 6 : 3 // hexagon or triangle
        this.color = Math.random() > 0.6
          ? { r: 0, g: 255, b: 255 }   // cyan
          : Math.random() > 0.5
            ? { r: 0, g: 170, b: 255 }  // blue
            : { r: 0, g: 255, b: 136 }  // green
        this.pushX = 0
        this.pushY = 0
        this.friction = 0.92
        this.springBack = 0.04
        this.pulsePhase = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.005
      }

      update(mouse) {
        // Drift upward
        this.x += this.vx
        this.y += this.vy
        this.rotation += this.rotationSpeed

        // Pulse opacity
        this.pulsePhase += this.pulseSpeed
        this.opacity = this.maxOpacity * (0.6 + 0.4 * Math.sin(this.pulsePhase))

        // Mouse repulsion with spring physics
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 180

        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius
          const angle = Math.atan2(dy, dx)
          this.pushX += Math.cos(angle) * force * 6
          this.pushY += Math.sin(angle) * force * 6
        }

        // Apply push with friction and spring back
        this.pushX *= this.friction
        this.pushY *= this.friction

        // Reset if off-screen
        if (this.y < -20) this.reset()
        if (this.x < -50 || this.x > canvas.width + 50) this.reset()
      }

      draw(ctx) {
        const drawX = this.x + this.pushX
        const drawY = this.y + this.pushY
        
        ctx.save()
        ctx.translate(drawX, drawY)
        ctx.rotate(this.rotation)
        ctx.globalAlpha = this.opacity

        // Draw shape
        ctx.beginPath()
        for (let i = 0; i < this.sides; i++) {
          const angle = (Math.PI * 2 / this.sides) * i - Math.PI / 2
          const x = Math.cos(angle) * this.size
          const y = Math.sin(angle) * this.size
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()

        // Glow fill
        const { r, g, b } = this.color
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.4})`
        ctx.fill()

        // Glow stroke
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Outer glow
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.8})`
        ctx.shadowBlur = 8
        ctx.stroke()

        ctx.restore()
      }
    }

    // Create particles
    const numParticles = Math.min(60, Math.floor(window.innerWidth / 25))
    for (let i = 0; i < numParticles; i++) {
      particlesRef.current.push(new Particle())
    }

    // Connection lines between nearby particles
    const drawConnections = (particles) => {
      const maxDist = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = (particles[i].x + particles[i].pushX) - (particles[j].x + particles[j].pushX)
          const dy = (particles[i].y + particles[i].pushY) - (particles[j].y + particles[j].pushY)
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.08
            ctx.beginPath()
            ctx.moveTo(particles[i].x + particles[i].pushX, particles[i].y + particles[i].pushY)
            ctx.lineTo(particles[j].x + particles[j].pushX, particles[j].y + particles[j].pushY)
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const particles = particlesRef.current
      const mouse = mouseRef.current

      particles.forEach(p => p.update(mouse))
      drawConnections(particles)
      particles.forEach(p => p.draw(ctx))

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse tracking
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      particlesRef.current = []
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  )
}
