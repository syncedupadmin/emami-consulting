'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProgressBar from './ProgressBar'
import Step1Goal from './steps/Step1Goal'
import Step2Technology from './steps/Step2Technology'
import Step3CurrentSetup from './steps/Step3CurrentSetup'
import Step4Budget from './steps/Step4Budget'
import Step5Timeline from './steps/Step5Timeline'
import Step6Operator from './steps/Step6Operator'
import Step7Contact from './steps/Step7Contact'
import { useRouter } from 'next/navigation'

export interface IntakeData {
  goal: string
  technology: string[]
  currentSetup: string
  budget: string
  timeline: string
  operator: string
  name: string
  practice: string
  email: string
  phone: string
}

const INITIAL: IntakeData = {
  goal: '',
  technology: [],
  currentSetup: '',
  budget: '',
  timeline: '',
  operator: '',
  name: '',
  practice: '',
  email: '',
  phone: '',
}

const TOTAL = 7

export default function WizardShell() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<IntakeData>(INITIAL)
  const [direction, setDirection] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const liveRef = useRef<HTMLDivElement>(null)

  const update = (patch: Partial<IntakeData>) => setData((d) => ({ ...d, ...patch }))

  const next = () => {
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL))
    if (liveRef.current) liveRef.current.textContent = `Step ${Math.min(step + 1, TOTAL)} of ${TOTAL}`
  }
  const back = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
    if (liveRef.current) liveRef.current.textContent = `Step ${Math.max(step - 1, 1)} of ${TOTAL}`
  }

  const submit = async () => {
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Submission failed')
      router.push('/thank-you')
    } catch {
      setError('Something went wrong. Please email nick@syncedupsolutions.com directly.')
      setSubmitting(false)
    }
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -22 }),
  }

  const stepProps = { data, update, onNext: next, onBack: back }

  return (
    <div className="ws">
      <div className="ws-wrap">
        <a href="/" className="ws-logo" aria-label="Return to home">
          <svg width="28" height="28" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <circle cx="17" cy="17" r="16" stroke="#B6883F" strokeWidth="1" />
            <circle cx="9" cy="22" r="2.4" fill="#CDA251" />
            <circle cx="25" cy="12" r="2.4" fill="#2F8E7E" />
            <path d="M9 22 L17 17 L25 12" stroke="#B6883F" strokeWidth="1.1" />
            <path d="M17 17 L17 9" stroke="#B6883F" strokeWidth="1.1" />
            <circle cx="17" cy="9" r="2" fill="#CDA251" />
          </svg>
          <span>Emami Consulting</span>
        </a>

        <div className="ws-prog">
          <ProgressBar step={step} total={TOTAL} />
        </div>

        <div
          ref={liveRef}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        />

        <div className="ws-body">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.27, ease: [0.22, 0.61, 0.36, 1] }}
              className="ws-step"
            >
              {step === 1 && <Step1Goal {...stepProps} />}
              {step === 2 && <Step2Technology {...stepProps} />}
              {step === 3 && <Step3CurrentSetup {...stepProps} />}
              {step === 4 && <Step4Budget {...stepProps} />}
              {step === 5 && <Step5Timeline {...stepProps} />}
              {step === 6 && <Step6Operator {...stepProps} />}
              {step === 7 && (
                <Step7Contact
                  {...stepProps}
                  onSubmit={submit}
                  submitting={submitting}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <div className="ws-error" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .ws { min-height: 100dvh; background: var(--bone); display: flex; flex-direction: column; }
        .ws-wrap { max-width: 720px; margin: 0 auto; padding: 32px 24px 80px; width: 100%; }
        .ws-logo { display: flex; align-items: center; gap: 10px; font-family: var(--display); font-size: 17px; color: var(--ink); font-weight: 400; margin-bottom: 34px; }
        .ws-prog { margin-bottom: 42px; }
        .ws-body { min-height: 480px; }
        .ws-step { width: 100%; }
        .ws-error { margin-top: 18px; padding: 14px 18px; background: rgba(181,86,75,0.08); border: 1px solid rgba(181,86,75,0.3); border-radius: var(--r); font-size: 14px; color: var(--rose); }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      `}</style>
    </div>
  )
}
