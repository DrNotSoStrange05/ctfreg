import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import EventIntel from './components/EventIntel'
import HackerTerminal from './components/HackerTerminal'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'

// REGISTRATION IS CLOSED — no registration state needed
export default function App() {
  // Simple routing for Admin Dashboard
  if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
    return (
      <>
        <CustomCursor />
        <ParticleBackground />
        <div className="grid-bg" />
        <div className="scanline-overlay" />
        <AdminDashboard />
      </>
    )
  }

  return (
    <>
      <CustomCursor />

      {/* Background layer */}
      <ParticleBackground />
      <div className="grid-bg" />
      <div className="scanline-overlay" />

      <main className="relative z-10 w-full min-h-screen">
        {/* Registration is permanently closed — Hero shows closed banner */}
        <Hero />

        <EventIntel />
        <HackerTerminal />
        <Footer />
      </main>
    </>
  )
}