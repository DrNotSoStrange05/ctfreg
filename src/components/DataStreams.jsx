import { useEffect, useRef } from 'react'
import anime from 'animejs'

const PATHS = [
  'M0,200 C200,180 400,300 600,250 S1000,200 1400,280 S1800,150 2000,220',
  'M0,500 C300,480 500,600 800,520 S1200,450 1500,550 S1800,400 2000,480',
  'M0,350 C250,320 450,420 700,380 S1100,320 1400,400 S1700,300 2000,360',
  'M0,650 C200,630 500,720 750,670 S1100,600 1400,700 S1700,580 2000,650',
  'M0,100 C300,120 600,60 900,130 S1300,80 1600,160 S1900,100 2000,140',
]

export default function DataStreams() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!svgRef.current) return
    const packets = svgRef.current.querySelectorAll('.data-packet')
    const paths = svgRef.current.querySelectorAll('.data-stream-line')

    packets.forEach((packet, i) => {
      const path = anime.path(paths[i])
      anime({
        targets: packet,
        translateX: path('x'),
        translateY: path('y'),
        easing: 'linear',
        duration: 8000 + i * 2000,
        loop: true,
        direction: i % 2 === 0 ? 'normal' : 'reverse',
      })
    })
  }, [])

  return (
    <svg ref={svgRef} className="data-streams" viewBox="0 0 2000 800" preserveAspectRatio="none">
      {PATHS.map((d, i) => (
        <g key={i}>
          <path className="data-stream-line" d={d} />
          <circle className="data-packet" r={2 + (i % 2)} cx="0" cy="0" />
        </g>
      ))}
    </svg>
  )
}
