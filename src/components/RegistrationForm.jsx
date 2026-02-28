import { useState, useEffect, useRef, useCallback } from 'react'
import anime from 'animejs'

const DEPARTMENTS = [
  'Computer Science & Engineering', 'Electronics & Communication',
  'Electrical & Electronics', 'Mechanical Engineering',
  'Civil Engineering', 'Information Technology', 'Other',
]
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

const blank = {
  leaderName: '', email: '', phone: '', department: '', year: '',
  teamName: '', member2: '', member3: '',
  collegeName: '', transactionId: '', paymentScreenshot: null,
}

function check(step, d) {
  const e = {}
  if (step === 0) {
    if (!d.leaderName.trim()) e.leaderName = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = 'Invalid email'
    if (!/^\d{10}$/.test(d.phone.replace(/\s/g, ''))) e.phone = '10-digit number'
    if (!d.department) e.department = 'Required'
    if (!d.year) e.year = 'Required'
  }
  if (step === 1 && !d.teamName.trim()) e.teamName = 'Required'
  if (step === 2) {
    if (!d.collegeName.trim()) e.collegeName = 'Required'
    if (!d.paymentScreenshot) e.paymentScreenshot = 'Payment screenshot required'
  }
  return e
}

export default function RegistrationForm({ onSuccess, isUnfolding }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(blank)
  const [errs, setErrs] = useState({})
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  const steps = ['Leader', 'Team', 'College']

  // Scroll or Unfold triggered entrance
  useEffect(() => {
    const startEntrance = () => {
      anime({
        targets: '.reg-header',
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutQuart',
      })
      anime({
        targets: '.step-pip',
        scale: [0, 1],
        opacity: [0, 1],
        delay: anime.stagger(80, { start: 300 }),
        duration: 600,
        easing: 'easeOutElastic(1, .6)',
      })
      anime({
        targets: formRef.current,
        scaleY: isUnfolding ? [0.01, 1] : 1,
        scaleX: isUnfolding ? [0.5, 1] : 1,
        translateY: isUnfolding ? [0, 0] : [30, 0],
        opacity: [0, 1],
        duration: isUnfolding ? 1200 : 800,
        delay: isUnfolding ? 100 : 500,
        easing: 'easeOutElastic(1, .6)',
      })
    }

    if (isUnfolding) {
      startEntrance()
    } else {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startEntrance()
            obs.disconnect()
          }
        },
        { threshold: 0.15 }
      )
      if (sectionRef.current) obs.observe(sectionRef.current)
      return () => obs.disconnect()
    }
  }, [isUnfolding])

  // Animate fields on step change
  useEffect(() => {
    anime({
      targets: '.form-field-row',
      translateX: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(50),
      duration: 500,
      easing: 'easeOutQuart',
    })
  }, [step])

  // Kinetic field focus — spring border animation
  const onFieldFocus = useCallback((e) => {
    anime({
      targets: e.target,
      borderColor: ['rgba(255,255,255,0.04)', 'rgba(255,215,0,0.4)'],
      boxShadow: ['0 0 0 0px rgba(255,215,0,0)', '0 0 0 4px rgba(255,215,0,0.06), 0 0 20px rgba(255,215,0,0.08)'],
      duration: 600,
      easing: 'easeOutElastic(1, .5)',
    })
  }, [])

  const onFieldBlur = useCallback((e) => {
    anime({
      targets: e.target,
      borderColor: 'rgba(255,255,255,0.04)',
      boxShadow: '0 0 0 0px rgba(255,215,0,0)',
      duration: 400,
      easing: 'easeOutQuart',
    })
  }, [])

  const upd = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.value }))
    setErrs((p) => ({ ...p, [k]: undefined }))
  }

  const updFile = (k) => (e) => {
    setForm((p) => ({ ...p, [k]: e.target.files[0] }))
    setErrs((p) => ({ ...p, [k]: undefined }))
  }

  const next = () => {
    const e = check(step, form)
    if (Object.keys(e).length) {
      setErrs(e)
      // Shake error fields
      anime({
        targets: '.error-state',
        translateX: [-6, 6, -4, 4, 0],
        duration: 400,
        easing: 'easeInOutQuad',
      })
      return
    }
    setStep((s) => Math.min(s + 1, 2))
  }
  const prev = () => setStep((s) => Math.max(s - 1, 0))

  const submit = async () => {
    const e = check(step, form)
    if (Object.keys(e).length) {
      setErrs(e)
      anime({ targets: '.error-state', translateX: [-6, 6, -4, 4, 0], duration: 400, easing: 'easeInOutQuad' })
      return
    }
    setLoading(true)
    setErrs({}) // Clear global error if any

    // Map to backend schema ENUMS
    const deptMap = {
      'Computer Science & Engineering': 'CSE',
      'Electronics & Communication': 'ECE',
      'Electrical & Electronics': 'EEE',
      'Mechanical Engineering': 'ME',
      'Civil Engineering': 'CE',
      'Information Technology': 'IT',
      'Other': 'Other'
    };
    const yearMap = {
      '1st Year': '1st',
      '2nd Year': '2nd',
      '3rd Year': '3rd',
      '4th Year': '4th'
    };

    const formData = new FormData()
    formData.append('leaderName', form.leaderName)
    formData.append('email', form.email)
    formData.append('phone', form.phone)
    formData.append('department', deptMap[form.department] || form.department)
    formData.append('year', yearMap[form.year] || form.year)
    formData.append('teamName', form.teamName)
    formData.append('collegeName', form.collegeName)
    if (form.member2) formData.append('members[]', form.member2)
    if (form.member3) formData.append('members[]', form.member3)
    if (form.transactionId) formData.append('transactionId', form.transactionId)
    formData.append('paymentScreenshot', form.paymentScreenshot)

    try {
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        body: formData,
      })

      // Safely parse JSON or text to avoid "Unexpected token <" error
      let data = {}
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        console.error("Non-JSON Server Error:", text)
        throw new Error(response.ok ? 'Unexpected response format' : `Server Error: ${response.status}`)
      }

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed with the server')
      }

      // Animate form out
      anime({
        targets: formRef.current,
        scale: [1, 0.95],
        opacity: [1, 0.5],
        duration: 400,
        easing: 'easeInQuart',
        complete: () => {
          setTimeout(() => {
            setLoading(false)
            onSuccess(data.teamCode)
            setForm(blank)
            setStep(0)
            // Reset form appearance
            anime({
              targets: formRef.current,
              scale: 1,
              opacity: 1,
              duration: 300,
              easing: 'easeOutQuart',
            })
          }, 1200)
        },
      })
    } catch (err) {
      setLoading(false)
      setErrs({ global: err.message })
      anime({ targets: formRef.current, translateX: [-6, 6, -4, 4, 0], duration: 400, easing: 'easeInOutQuad' })
    }
  }

  const ic = (k) => `cyber-field ${errs[k] ? 'error-state' : ''}`

  const Label = ({ children }) => (
    <label className="block text-[10px] font-mono uppercase tracking-[2px] text-white/20 mb-2">{children}</label>
  )
  const Err = ({ f }) => errs[f] ? <p className="text-hot-pink text-[10px] mt-1.5 font-mono">{errs[f]}</p> : null

  return (
    <section ref={sectionRef} id="registration" className="relative py-28 sm:py-36 px-5 flex flex-col items-center overflow-hidden">
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full">
        {/* Header */}
        <div className="reg-header text-center mb-12 opacity-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.05] bg-white/[0.015] mb-6">
            <span className="text-[10px] font-mono uppercase tracking-[4px] text-gold/60">Registration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Join the <span className="text-gold">Arena</span>
          </h2>
        </div>
    
        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-10 px-2">
          {steps.map((s, i) => (
            <div key={s} className="contents">
              <div className="flex flex-col items-center gap-2">
                <div className={`step-pip ${i < step ? 'done' : i === step ? 'active' : 'wait'}`} style={{ opacity: 0 }}>
                  {i < step ? '✓' : `0${i + 1}`}
                </div>
                <span className="text-[8px] uppercase tracking-[2px] text-white/15 hidden sm:block font-mono">{s}</span>
              </div>
              {i < 2 && <div className={`step-bar ${i < step ? 'filled' : 'empty'}`} />}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div ref={formRef} className="glass p-6 sm:p-8 opacity-0">
          <div className="min-h-[340px]">

            {step === 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-lg bg-gold/[0.06] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Team Leader</h3>
                </div>
                <div className="space-y-4">
                  <div className="form-field-row">
                    <Label>Full Name *</Label>
                    <input id="leader-name" className={ic('leaderName')} placeholder="Your full name"
                      value={form.leaderName} onChange={upd('leaderName')} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                    <Err f="leaderName" />
                  </div>
                  <div className="form-field-row">
                    <Label>Email *</Label>
                    <input id="leader-email" type="email" className={ic('email')} placeholder="you@example.com"
                      value={form.email} onChange={upd('email')} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                    <Err f="email" />
                  </div>
                  <div className="form-field-row">
                    <Label>Phone *</Label>
                    <input id="leader-phone" type="tel" className={ic('phone')} placeholder="9876543210"
                      value={form.phone} onChange={upd('phone')} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                    <Err f="phone" />
                  </div>
                  <div className="form-field-row grid grid-cols-2 gap-4">
                    <div>
                      <Label>Department *</Label>
                      <select id="leader-dept" className={`cyber-field cyber-field-select ${errs.department ? 'error-state' : ''}`}
                        value={form.department} onChange={upd('department')} onFocus={onFieldFocus} onBlur={onFieldBlur}>
                        <option value="">Select</option>
                        {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <Err f="department" />
                    </div>
                    <div>
                      <Label>Year *</Label>
                      <select id="leader-year" className={`cyber-field cyber-field-select ${errs.year ? 'error-state' : ''}`}
                        value={form.year} onChange={upd('year')} onFocus={onFieldFocus} onBlur={onFieldBlur}>
                        <option value="">Select</option>
                        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                      <Err f="year" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-lg bg-electric/[0.06] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-electric">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">Team Composition</h3>
                </div>
                <div className="space-y-4">
                  <div className="form-field-row">
                    <Label>Team Name *</Label>
                    <input id="team-name" className={ic('teamName')} placeholder="e.g. CyberPhantoms"
                      value={form.teamName} onChange={upd('teamName')} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                    <Err f="teamName" />
                  </div>
                  <p className="text-[9px] font-mono uppercase tracking-[2px] text-white/15 mt-4 mb-2">Additional Members (optional)</p>
                  <div className="flex flex-col gap-4">
                    {['member2', 'member3'].map((k, i) => (
                      <div key={k} className="form-field-row">
                        <input id={`member-${i + 2}`} className="cyber-field" placeholder={`Member ${i + 2} name`}
                          value={form[k]} onChange={upd(k)} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-lg bg-neon-green/[0.06] flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-neon-green">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 3 4 6 4s6-2 6-4v-5" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-white">College Info</h3>
                </div>
                <div className="space-y-4">
                  <div className="form-field-row">
                    <Label>College Name *</Label>
                    <input id="college-name" className={ic('collegeName')} placeholder="NSS College of Engineering, Palakkad"
                      value={form.collegeName} onChange={upd('collegeName')} onFocus={onFieldFocus} onBlur={onFieldBlur} list="colleges" />
                    {/* <datalist id="colleges">
                      <option value="NSS College of Engineering, Palakkad" />
                      <option value="Government Engineering College, Thrissur" />
                      <option value="College of Engineering, Trivandrum" />
                      <option value="NIT Calicut" />
                    </datalist> */}
                    <Err f="collegeName" />
                  </div>

                  <div className="form-field-row">
                    <Label>Transaction ID</Label>
                    <input id="transaction-id" className={ic('transactionId')} placeholder="Optional"
                      value={form.transactionId} onChange={upd('transactionId')} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                    <Err f="transactionId" />
                  </div>
                  
                  {/* Payment Instructions & QR Integration */}
                  <div className="form-field-row mt-6 p-5 rounded-xl bg-white/[0.01] border border-gold/[0.1] relative overflow-hidden group">
                     {/* Animated glow effect on hover */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-gold/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                     
                     <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* QR Code Container */}
                        <div className="w-40 h-40 shrink-0 rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_0_15px_rgba(0,0,0,0.5)] relative">
                          <img 
                            src="/Athulsmenon-upi.jpg" 
                            alt="UPI QR Code" 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gold/10 mix-blend-overlay pointer-events-none z-10"></div>
                        </div>

                        {/* Payment Text */}
                        <div className="flex-1 text-center sm:text-left">
                           <h4 className="text-sm font-bold text-gold mb-2 font-mono flex items-center justify-center sm:justify-start gap-2">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                              PAYMENT REQUIRED
                           </h4>
                           <p className="text-white/60 text-xs leading-relaxed mb-3">
                              Scan the QR code to complete your registration payment. Please ensure you pay the exact amount required by the organizers.
                           </p>
                           <p className="text-[10px] uppercase font-mono tracking-widest text-white/30">
                              Upload the successful confirmation screenshot below.
                           </p>
                        </div>
                     </div>
                  </div>
                  
                  <div className="form-field-row mt-6">
                    <Label>Payment Screenshot *</Label>
                    <input id="payment-screenshot" type="file" accept="image/*" className={`${ic('paymentScreenshot')} py-2.5 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-mono file:bg-gold/20 file:text-gold hover:file:bg-gold/30 cursor-pointer text-white/50 text-xs`}
                      onChange={updFile('paymentScreenshot')} onFocus={onFieldFocus} onBlur={onFieldBlur} />
                    <Err f="paymentScreenshot" />
                  </div>

                  {errs.global && (
                    <div className="p-3 rounded-xl bg-hot-pink/10 border border-hot-pink/20 form-field-row">
                      <p className="text-hot-pink text-xs font-mono">{errs.global}</p>
                    </div>
                  )}

                  {/* Review */}
                  <div className="form-field-row mt-4 p-5 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                    <p className="text-[9px] font-mono text-gold/40 uppercase tracking-[4px] mb-4">Review</p>
                    <div className="space-y-2">
                      {[
                        ['Leader', form.leaderName],
                        ['Email', form.email],
                        ['Team', form.teamName],
                        ['Members', [form.member2, form.member3 ].filter(Boolean).join(', ') || 'Solo'],
                      ].map(([l, v]) => (
                        <div key={l} className="flex gap-3 text-xs">
                          <span className="text-white/15 min-w-[55px] font-mono">{l}</span>
                          <span className="text-white/50 font-mono">{v || '—'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.03]">
            <button
              onClick={prev} disabled={step === 0} id="btn-prev"
              className={`px-5 py-3 rounded-xl text-[10px] font-mono uppercase tracking-[2px] font-bold transition-all ${
                step === 0 ? 'text-white/8' : 'text-white/30 hover:text-white hover:bg-white/[0.03] border border-white/[0.05]'
              }`}
              data-hover
            >
              ← Back
            </button>

            {step < 2 ? (
              <button onClick={next} className="neon-cta !text-[10px] !py-3 !px-6" id="btn-next" data-hover>
                Continue →
              </button>
            ) : (
              <button
                onClick={submit} disabled={loading} id="btn-submit" data-hover
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[10px] font-mono uppercase tracking-[2px] font-black bg-gradient-to-r from-gold to-amber-400 text-midnight transition-all hover:shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <><svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Submit</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
