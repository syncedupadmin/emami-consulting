'use client'

import { useState } from 'react'
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Step7Contact({ data, update, onBack, onSubmit, submitting }: Props) {
  const valid = data.name.trim() && data.practice.trim() && EMAIL_RE.test(data.email.trim())

  const [touched, setTouched] = useState<{ name: boolean; practice: boolean; email: boolean }>({
    name: false,
    practice: false,
    email: false,
  })

  const nameError = touched.name && !data.name.trim() ? 'Please enter your full name.' : ''
  const practiceError = touched.practice && !data.practice.trim() ? 'Please enter your practice name.' : ''
  const emailError = touched.email
    ? !data.email.trim()
      ? 'Please enter your email address.'
      : !EMAIL_RE.test(data.email.trim())
        ? 'Please enter a valid email address.'
        : ''
    : ''

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
            className={`fi${nameError ? ' fi-err' : ''}`}
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Dr. Jane Smith"
            autoComplete="name"
            inputMode="text"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'f-name-err' : undefined}
            required
          />
          {nameError && (
            <span id="f-name-err" className="field-err" role="alert">{nameError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="f-practice" className="field-label">Practice name <span aria-hidden="true">*</span></label>
          <input
            id="f-practice"
            type="text"
            className={`fi${practiceError ? ' fi-err' : ''}`}
            value={data.practice}
            onChange={(e) => update({ practice: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, practice: true }))}
            placeholder="Sunshine Family Dentistry"
            autoComplete="organization"
            inputMode="text"
            aria-invalid={!!practiceError}
            aria-describedby={practiceError ? 'f-practice-err' : undefined}
            required
          />
          {practiceError && (
            <span id="f-practice-err" className="field-err" role="alert">{practiceError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="f-email" className="field-label">Email address <span aria-hidden="true">*</span></label>
          <input
            id="f-email"
            type="email"
            className={`fi${emailError ? ' fi-err' : ''}`}
            value={data.email}
            onChange={(e) => update({ email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            placeholder="jane@sunshinedental.com"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'f-email-err' : undefined}
            required
          />
          {emailError && (
            <span id="f-email-err" className="field-err" role="alert">{emailError}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="f-phone" className="field-label">Phone number <span style={{ color: 'var(--slate-strong)', fontWeight: 400 }}>(optional)</span></label>
          <input
            id="f-phone"
            type="tel"
            className="fi"
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="(555) 867-5309"
            autoComplete="tel"
            inputMode="tel"
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
        .step-hint { font-size: 14.5px; color: var(--slate-strong); line-height: 1.55; }
        .fields { display: grid; gap: 20px; }
        .field { display: flex; flex-direction: column; gap: 7px; }
        .field-label { font-size: 13.5px; font-weight: 600; color: var(--ink); }
        .fi { width: 100%; padding: 13px 16px; border: 1.5px solid var(--line-strong); border-radius: var(--r); font-family: var(--ui); font-size: 16px; color: var(--ink); background: #fff; transition: border-color 0.2s; min-height: 48px; }
        .fi:focus { outline: none; border-color: var(--brass); }
        .fi::placeholder { color: var(--slate-strong); opacity: 0.7; }
        .fi-err { border-color: var(--rose); }
        .fi-err:focus { border-color: var(--rose); }
        .field-err { font-size: 12.5px; color: var(--rose); line-height: 1.5; }
        .consent { font-size: 12.5px; color: var(--slate-strong); line-height: 1.6; }
        .step-nav { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        button:disabled { opacity: 0.45; cursor: not-allowed; }
        .submit-btn { min-width: 180px; min-height: 48px; justify-content: center; }
        .back-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 8px; background: none; border: none; cursor: pointer; font-size: 14px; color: var(--slate-strong); font-family: var(--ui); transition: color 0.2s; }
        .back-btn:hover { color: var(--ink); }
        @media (max-width: 520px) {
          .step-nav { flex-direction: column-reverse; align-items: stretch; gap: 12px; }
          .submit-btn, .back-btn { width: 100%; min-width: 0; }
        }
      `}</style>
    </div>
  )
}
