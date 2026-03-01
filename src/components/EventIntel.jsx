import { useEffect, useRef, useState } from "react"

const CYAN = "#00f5e4"
const CYAN_DIM = "rgba(0,245,228,0.15)"
const CYAN_GLOW = "rgba(0,245,228,0.08)"
const CYAN_BORDER = "rgba(0,245,228,0.35)"
const CYAN_TEXT_DIM = "rgba(0,245,228,0.45)"

const intelData = [
  {
    id: "01",
    label: "JEOPARDY",
    title: "Multi-Domain Challenges",
    desc: "A diverse gauntlet spanning Web, Crypto, Pwn, and OSINT.",
    icon: "⬡",
  },
  {
    id: "02",
    label: "A/D",
    title: "Attack-Defense",
    desc: "Real-time service hardening vs active opponent exploitation.",
    icon: "◈",
  },
  {
    id: "03",
    label: "REWARDS",
    title: "Prizes & Recognition",
    desc: "Exclusive certifications and a share of the global prize pool.",
    icon: "◎",
  },
  {
    id: "04",
    label: "SCHEDULE",
    title: "12-Hour Intensive",
    desc: "A non-stop marathon from zero-hour to final leaderboard lock.",
    icon: "◷",
  },
]

export default function EventIntel() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const els = containerRef.current.querySelectorAll("[data-animate]")
    els.forEach((el) => {
      const delay = parseInt(el.dataset.delay || 0)
      const type = el.dataset.animate
      el.style.opacity = "0"
      el.style.transform = type === "scale" ? "scale(0.94)" : "translateY(22px)"
      setTimeout(() => {
        el.style.transition =
          "opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1)"
        el.style.opacity = "1"
        el.style.transform = type === "scale" ? "scale(1)" : "translateY(0)"
      }, delay)
    })
  }, [])

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#050a0a",
        padding: "7rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: "'Courier New', Courier, monospace",
      }}
    >
      {/* Scanline overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.12) 2px, rgba(0,0,0,0.12) 4px)",
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        opacity: 0.04,
        backgroundImage: `linear-gradient(${CYAN} 1px, transparent 1px), linear-gradient(90deg, ${CYAN} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Ambient center glow */}
      <div style={{
        position: "absolute", top: "-8rem", left: "50%", transform: "translateX(-50%)",
        width: "700px", height: "500px",
        background: `radial-gradient(ellipse, ${CYAN_GLOW} 0%, transparent 68%)`,
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", position: "relative", zIndex: 10 }}>

        {/* ── HEADER ── */}
        <header style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "6rem", textAlign: "center" }}>

          {/* Badge */}
          <div
            data-animate="up" data-delay="80"
            style={{
              marginBottom: "2.5rem",
              fontSize: "10px",
              letterSpacing: "0.55em",
              color: CYAN_TEXT_DIM,
              textTransform: "uppercase",
              padding: "0.4rem 1.4rem",
              border: `1px solid ${CYAN_BORDER}`,
              borderRadius: "9999px",
              background: CYAN_GLOW,
            }}
          >
            Protocol: Event Intel
          </div>

          {/* DEDSEC big title */}
          <h2
            data-animate="up" data-delay="200"
            style={{
              fontSize: "clamp(3.5rem, 11vw, 7.5rem)",
              fontWeight: "900",
              fontStyle: "bold",
              // fontFamily: "'VT323', 'Space Mono', monospace",
              color: CYAN,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              margin: 0,
              textShadow: `0 0 80px ${CYAN}, 0 0 60px rgba(0,245,228,0.3), 0 0 100px rgba(0,245,228,0.1)`,
            }}
          >
            THE{" "}
            <span style={{ WebkitTextStroke: `1px ${CYAN}`, color: "transparent", textShadow: "none" }}>
              DEDSEC
            </span>
            <br />
            <span style={{ color: CYAN, textShadow: `0 0 80px ${CYAN}, 0 0 60px rgba(0,245,228,0.3)` }}>
              CTF
            </span>{" "}
            <span style={{ color: "rgba(0,245,228,0.4)", textShadow: "none", fontWeight: "300" }}>
              EXPERIENCE
            </span>
          </h2>

          {/* Tags row */}
          <div
            data-animate="up" data-delay="340"
            style={{ display: "flex", gap: "2rem", alignItems: "center", marginTop: "2rem", flexWrap: "wrap", justifyContent: "center" }}
          >
            {["STACS", "SOLASTA TECHFEST", "NSS COLLEGE OF ENGINEERING"].map((tag, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "11px", letterSpacing: "0.15em", color: CYAN_TEXT_DIM }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: CYAN, display: "inline-block", boxShadow: `0 0 6px ${CYAN}` }} />
                {tag}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <p
            data-animate="up" data-delay="460"
            style={{
              marginTop: "2rem",
              color: "rgba(0,245,228,0.3)",
              fontSize: "clamp(0.85rem, 1.8vw, 1.1rem)",
              maxWidth: "40rem",
              fontWeight: "400",
              lineHeight: 1.8,
              letterSpacing: "0.08em",
            }}
          >
            CAPTURE · THE · FLAG
          </p>
        </header>

        {/* ── CARDS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1px",
          border: `1px solid ${CYAN_BORDER}`,
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "5rem",
          background: CYAN_BORDER,
        }}>
          {intelData.map((item, i) => (
            <Card key={item.id} item={item} delay={540 + i * 130} />
          ))}
        </div>

        {/* ── FOOTER ── */}
        <FooterFrame />
      </div>

      <style>{`
        * { box-sizing: border-box; }
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
    </section>
  )
}

function Card({ item, delay }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      data-animate="scale"
      data-delay={delay}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "2.5rem 2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        minHeight: "280px",
        background: hovered ? "rgba(0,245,228,0.05)" : "#050a0a",
        cursor: "default",
        transition: "background 0.4s",
        overflow: "hidden",
      }}
    >
      {/* Top-right corner id */}
      <div style={{
        position: "absolute", top: "1.2rem", right: "1.2rem",
        fontSize: "10px", letterSpacing: "0.3em",
        color: hovered ? CYAN : "rgba(0,245,228,0.15)",
        transition: "color 0.3s",
      }}>
        //{item.id}
      </div>

      {/* Icon */}
      <div style={{
        position: "absolute", top: "2rem", left: "2rem",
        fontSize: "1.6rem",
        color: hovered ? CYAN : "rgba(0,245,228,0.12)",
        textShadow: hovered ? `0 0 14px ${CYAN}` : "none",
        transition: "all 0.4s",
        transform: hovered ? "scale(1.15)" : "scale(1)",
      }}>
        {item.icon}
      </div>

      {/* Radial hover glow */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(circle at top right, rgba(0,245,228,0.07), transparent 65%)`,
        transition: "opacity 0.6s",
        pointerEvents: "none",
      }} />

      {/* Bottom glow line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${CYAN}80, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <p style={{
          fontSize: "9px", letterSpacing: "0.45em",
          color: CYAN, margin: "0 0 0.6rem",
          textShadow: `0 0 10px ${CYAN}`,
        }}>
          {item.label}
        </p>
        <h3 style={{
          fontSize: "1.1rem", fontWeight: "700",
          color: hovered ? "#fff" : "rgba(255,255,255,0.85)",
          margin: "0 0 0.8rem", lineHeight: 1.3,
          transition: "color 0.3s",
          fontFamily: "'Courier New', monospace",
        }}>
          {item.title}
        </h3>
        <p style={{
          color: hovered ? "rgba(0,245,228,0.55)" : "rgba(0,245,228,0.25)",
          fontSize: "0.78rem", lineHeight: 1.8,
          transition: "color 0.3s", margin: 0,
          letterSpacing: "0.04em",
        }}>
          {item.desc}
        </p>
      </div>
    </div>
  )
}

function FooterFrame() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)"
        el.style.opacity = "1"
        el.style.transform = "translateY(0)"
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      {/* Dashed border wrapper — matching the image's dashed button style */}
      <div style={{
        padding: "1px",
        border: `1px dashed ${CYAN_BORDER}`,
        borderRadius: "6px",
        background: "transparent",
      }}>
        <div style={{
          background: "#050a0a",
          borderRadius: "4px",
          padding: "4rem 3rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Inner ambient */}
          <div style={{
            position: "absolute", top: "-4rem", left: "50%", transform: "translateX(-50%)",
            width: "500px", height: "300px",
            background: `radial-gradient(ellipse, ${CYAN_GLOW} 0%, transparent 70%)`,
            pointerEvents: "none",
          }} />

          <p style={{
            fontSize: "9px", letterSpacing: "0.7em",
            color: "rgba(0,245,228,0.2)",
            textTransform: "uppercase", marginBottom: "2.5rem",
          }}>
            // Sustaining Innovation Since Inception
          </p>

          <p style={{
            color: "rgba(0,245,228,0.4)",
            fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
            fontWeight: "400",
            lineHeight: 1.7,
            maxWidth: "52rem",
            margin: "0 auto",
            letterSpacing: "0.04em",
          }}>
            <span style={{
              color: CYAN, fontWeight: "700",
              textShadow: `0 0 20px ${CYAN}, 0 0 40px rgba(0,245,228,0.2)`,
            }}>
              DEDSEC CTF
            </span>{" "}
            — NSSCE&apos;s premier cybersecurity competition, part of the{" "}
            <span style={{ color: "rgba(0,245,228,0.75)", fontWeight: "600" }}>
              Solasta
            </span>{" "}
            tech-fest. Shaping the next generation of security professionals.
          </p>

          {/* Terminal prompt line */}
          {/* <div style={{
            marginTop: "3rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "12px",
            color: CYAN,
            letterSpacing: "0.3em",
            border: `1px dashed ${CYAN_BORDER}`,
            padding: "0.6rem 2rem",
            borderRadius: "4px",
            background: CYAN_GLOW,
            textShadow: `0 0 10px ${CYAN}`,
          }}>
            $ ~/ INITIALIZE
            <span style={{ animation: "blink 1s step-end infinite" }}>_</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}