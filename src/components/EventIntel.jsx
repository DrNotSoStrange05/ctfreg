import { useEffect, useRef, useState } from "react"

const intelData = [
  {
    id: "01",
    label: "JEOPARDY",
    title: "Multi-Domain Challenges",
    desc: "A diverse gauntlet spanning Web, Crypto, Pwn, and OSINT. Every discipline tested.",
    color: "#FF2D20",
    stat: "4 DOMAINS",
  },
  {
    id: "02",
    label: "A/D",
    title: "Attack-Defense",
    desc: "Real-time service hardening vs active opponent exploitation. No room to breathe.",
    color: "#FF2D20",
    stat: "LIVE OPS",
  },
  {
    id: "03",
    label: "REWARDS",
    title: "Prizes & Recognition",
    desc: "Exclusive certifications and a share of the global prize pool. Earn your rank.",
    color: "#FF2D20",
    stat: "TOP POOL",
  },
  {
    id: "04",
    label: "SCHEDULE",
    title: "24-Hour Intensive",
    desc: "A non-stop marathon from zero-hour to final leaderboard lock. Endurance is a skill.",
    color: "#FF2D20",
    stat: "24 HRS",
  },
]

function useAnimateIn(ref) {
  useEffect(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll("[data-animate]")
    els.forEach((el, i) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(24px)"
      el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }, 80)
      })
    })
  }, [])
}

function Card({ item, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      data-animate
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderLeft: hovered ? "3px solid #FF2D20" : "3px solid #222",
        background: hovered ? "#0d0d0d" : "transparent",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        cursor: "default",
      }}
      className="group relative p-8 flex flex-col gap-6"
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            letterSpacing: "0.35em",
            color: hovered ? "#FF2D20" : "#444",
            transition: "color 0.3s",
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "10px",
            color: "#333",
            letterSpacing: "0.2em",
          }}
        >
          #{item.id}
        </span>
      </div>

      {/* Stat number */}
      <div
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
          fontWeight: "900",
          fontStyle: "italic",
          color: hovered ? "#FF2D20" : "#1a1a1a",
          lineHeight: 1,
          transition: "color 0.4s",
          letterSpacing: "-0.03em",
        }}
      >
        {item.stat}
      </div>

      {/* Divider */}
      <div style={{ width: "100%", height: "1px", background: "#1c1c1c" }} />

      {/* Title */}
      <h3
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "1.1rem",
          fontWeight: "700",
          color: "#e8e8e8",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h3>

      {/* Desc */}
      <p
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "0.72rem",
          color: hovered ? "#888" : "#444",
          lineHeight: 1.9,
          transition: "color 0.3s",
          letterSpacing: "0.02em",
        }}
      >
        {item.desc}
      </p>

      {/* Arrow indicator */}
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "10px",
          color: hovered ? "#FF2D20" : "transparent",
          transition: "color 0.3s",
          letterSpacing: "0.3em",
        }}
      >
        READ MORE →
      </div>
    </div>
  )
}

export default function EventIntel() {
  const containerRef = useRef(null)
  useAnimateIn(containerRef)

  return (
    <section
      ref={containerRef}
      style={{
        background: "#050505",
        minHeight: "100vh",
        padding: "0",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* ── MASTHEAD ── */}
        <div
          style={{
            borderBottom: "1px solid #1a1a1a",
            padding: "1.2rem 3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            data-animate
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "9px",
              letterSpacing: "0.45em",
              color: "#333",
              textTransform: "uppercase",
            }}
          >
            CLASSIFIED // STACS CTF DOSSIER
          </span>
          <span
            data-animate
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "#333",
            }}
          >
            SOLASTA TECH-FEST
          </span>
        </div>

        {/* ── HERO ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            padding: "6rem 3rem 0",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Overline */}
          <div
            data-animate
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2.5rem",
            }}
          >
            <div style={{ width: "2.5rem", height: "1px", background: "#FF2D20" }} />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "9px",
                letterSpacing: "0.55em",
                color: "#FF2D20",
                textTransform: "uppercase",
              }}
            >
              Event Intelligence
            </span>
          </div>

          {/* Giant Title */}
          <h1
            data-animate
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(4.5rem, 13vw, 11rem)",
              fontWeight: "900",
              fontStyle: "italic",
              color: "#fff",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              margin: 0,
            }}
          >
            THE
            <br />
            <span style={{ color: "#FF2D20" }}>STACS</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "1px #fff",
                color: "transparent",
              }}
            >
              CTF
            </span>
          </h1>

          {/* Subhead row */}
          <div
            data-animate
            style={{
              marginTop: "3.5rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "2rem",
              paddingBottom: "5rem",
              borderBottom: "1px solid #1a1a1a",
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(0.75rem, 1.4vw, 1rem)",
                color: "#555",
                lineHeight: 2,
                maxWidth: "42ch",
                letterSpacing: "0.04em",
                margin: 0,
              }}
            >
              NSSCE's premier cybersecurity showdown.
              <br />
              Part of the{" "}
              <span style={{ color: "#aaa", letterSpacing: "0.2em" }}>SOLASTA</span> tech-fest
              ecosystem.
            </p>
            <div
              style={{
                display: "flex",
                gap: "3rem",
              }}
            >
              {["WEB", "CRYPTO", "PWN", "OSINT"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "9px",
                    letterSpacing: "0.4em",
                    color: "#2e2e2e",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CARDS ── */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            borderBottom: "1px solid #1a1a1a",
          }}
        >
          {intelData.map((item, i) => (
            <div
              key={item.id}
              style={{
                borderRight: i < intelData.length - 1 ? "1px solid #1a1a1a" : "none",
              }}
            >
              <Card item={item} index={i} />
            </div>
          ))}
        </div>

        {/* ── FOOTER MANIFESTO ── */}
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "5rem 3rem 6rem",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div data-animate>
            <div
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(5rem, 10vw, 8rem)",
                fontWeight: "900",
                fontStyle: "italic",
                color: "#0f0f0f",
                lineHeight: 1,
                letterSpacing: "-0.04em",
                userSelect: "none",
              }}
            >
              STACS
            </div>
          </div>

          <div data-animate style={{ borderLeft: "1px solid #1a1a1a", paddingLeft: "4rem" }}>
            <p
              style={{
                fontFamily: "'Georgia', serif",
                fontSize: "clamp(1.05rem, 2vw, 1.55rem)",
                color: "#888",
                lineHeight: 1.75,
                fontWeight: "300",
                margin: 0,
              }}
            >
              <em style={{ color: "#e0e0e0", fontWeight: "700" }}>Student Association of Computer Science</em>
              {" "}— a legacy of engineering excellence at NSSCE.
              Shaping the next generation of security professionals
              through adversarial learning and elite competition.
            </p>

            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <div style={{ width: "3rem", height: "1px", background: "#FF2D20" }} />
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "9px",
                  color: "#333",
                  letterSpacing: "0.5em",
                }}
              >
                SUSTAINING INNOVATION SINCE INCEPTION
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          data-animate
          style={{
            borderTop: "1px solid #1a1a1a",
            padding: "1.2rem 3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "9px",
              color: "#2a2a2a",
              letterSpacing: "0.35em",
            }}
          >
            © NSSCE // STACS CTF
          </span>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#FF2D20",
                animation: "pulse 2s infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "9px",
                color: "#FF2D20",
                letterSpacing: "0.35em",
              }}
            >
              LIVE EVENT
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          section > div > div:nth-child(5) {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          section > div > div:nth-child(5) > div:last-child {
            border-left: none !important;
            border-top: 1px solid #1a1a1a !important;
            padding-left: 0 !important;
            padding-top: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}