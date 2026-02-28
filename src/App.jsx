import { useState } from 'react'
import CustomCursor from './components/CustomCursor'
import ParticleBackground from './components/ParticleBackground'
import Hero from './components/Hero'
import EventIntel from './components/EventIntel'
import HackerTerminal from './components/HackerTerminal'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import SuccessOverlay from './components/SuccessOverlay'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const [initializing, setInitializing] = useState(false)

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
              <RegistrationForm onSuccess={() => setSubmitted(true)} isUnfolding />
            </div>
          </div>
        )}
      </main>

      {submitted && <SuccessOverlay onClose={() => {
        setSubmitted(false)
        setInitializing(false)
      }} />}
    </>
  )
}
