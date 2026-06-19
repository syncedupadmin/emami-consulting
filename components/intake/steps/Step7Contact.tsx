'use client'

import { motion } from 'framer-motion'
import type { IntakeData } from '../WizardShell'

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onBack: () => void
  onNext: () => void
  onSubmit: () => void
  submitting: boolean
}

export default function Step7Contact({ data, update, onBack, onSubmit, submitting }: Props) {
  const valid = data.name.trim() && data.practice.trim() && data.email.includes('@')

  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">07 / 07</div>
        <h2 className="step-title">Where should we send your roadmap?</h2>
        <p className="step-hint">Dr. Emami will reach out within 24 hours to confirm your intake call. No spam — ever.</p>
      </div>

      <div className="fields">
        <div className="field">
          <label htmlFor="f-name" className="field-label">Full name <span aria-hidden="true">*</span></label>
          <input
            id="f-name"
            type="text"
            className="fi"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Dr. Jane Smith"
            autoComplete="name"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="f-practice" className="field-label">Practice name <span aria-hidden="true">*</span></label>
          <input
            id="f-practice"
            type="text"
            className="fi"
            value={data.practice}
            onChange={(e) => update({ practice: e.target.value })}
            placeholder="Sunshine Family Dentistry"
            autoComplete="organization"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="f-email" className="field-label">Email address <span aria-hidden="true">*</span></label>
          <input
            id="f-email"
            type="email"
            className="fi"
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="jane@sunshinedental.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="f-phone" className="field-label">Phone number <span style={{ color: 'var(--slate)', fontWeight: 400 }}>(optional)</span></label>
          <input
            id="f-phone"
            type="tel"
            className="fi"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="(555) 867-5309"
            autoComplete="tel"
          />
        </div>
      </div>

      <p className="consent">By submitting, you agree to be contacted by Emami Consulting about your roadmap. No equipment vendors are shared your information.</p>

      <div className="step-nav">
        <button className="back-btn" onClick={onBack} disabled={submitting}>← Back</button>
        <button
          className="btn btn-gold submit-btn"
          onClick={onSubmit}
          disabled={!valid || submitting}
          aria-busy={submitting}
        >
          {submitting ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(26,20,7,0.25)', borderTopColor: '#1a1407', borderRadius: '50%' }}
            />
          ) : 'Submit Intake →'}
        </button>
      </div>

      <style jsx>{`
        .step-wrap { display: flex; flex-direction: column; gap: 32px; }
        .step-q { display: flex; flex-direction: column; gap: 10px; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.2em; }
        .step-title { font-family: var(--display); font-weight: 380; font-size: clamp(24px, 3vw, 32px); line-height: 1.15; letter-spacing: -0.01em; }
        .step-hint { font-size: 14.5px; color: var(--slate); line-height: 1.55; }
        .fields { display: grid; gap: 20px; }
        .field { display: flex; flex-direction: column; gap: 7px; }
        .field-label { font-size: 13.5px; font-weight: 600; color: var(--ink); }
        .fi { width: 100%; padding: 13px 16px; border: 1.5px solid var(--line-strong); border-radius: var(--r); font-family: var(--ui); font-size: 15px; color: var(--ink); background: #fff; transition: border-color 0.2s; height: 50px; }
        .fi:focus { outline: none; border-color: var(--brass); }
        .fi::placeholder { color: var(--slate); opacity: 0.7; }
        .consent { font-size: 12px; color: var(--slate); line-height: 1.6; }
        .step-nav { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        button:disabled { opacity: 0.45; cursor: not-allowed; }
        .submit-btn { min-width: 180px; justify-content: center; }
        .back-btn { background: none; border: none; cursor: pointer; font-size: 13.5px; color: var(--slate); font-family: var(--ui); transition: color 0.2s; }
        .back-btn:hover { color: var(--ink); }
      `}</style>
    </div>
  )
}
