import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import EventIntel from './components/EventIntel'
import HackerTerminal from './components/HackerTerminal'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import SuccessOverlay from './components/SuccessOverlay'
import AdminDashboard from './components/AdminDashboard'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [teamCode, setTeamCode] = useState(null)
  const [initializing, setInitializing] = useState(false)

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
        <Hero 
          isInitializing={initializing} 
          onInitialize={() => setInitializing(true)} 
        />
        
        {/* We keep other sections hidden or below depending on initializing state */}
        <div style={{ display: initializing ? 'none' : 'block' }}>
          <EventIntel />
          <HackerTerminal />
          <Footer />
        </div>

        {/* The overlapping Registration form that unfolds in the center */}
        {initializing && (
          <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto max-w-2xl w-full px-5">
              <RegistrationForm onSuccess={(code) => { setTeamCode(code); setSubmitted(true); }} isUnfolding />
            </div>
          </div>
        )}
      </main>

      {submitted && <SuccessOverlay teamCode={teamCode} onClose={() => {
        setSubmitted(false)
        setTeamCode(null)
        setInitializing(false)
      }} />}
    </>
  )
}