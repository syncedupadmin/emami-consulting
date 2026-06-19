'use client'

import OptionCard from '../OptionCard'
import type { IntakeData } from '../WizardShell'

const OPTIONS = [
  { label: 'Solo general dentist', description: 'Single doctor, general practice' },
  { label: 'Group practice (2–5 providers)', description: 'Multi-doctor or multi-specialty' },
  { label: 'Implant / oral surgery specialist', description: 'Primarily implants, extractions, surgery' },
  { label: 'Cosmetic & restorative focused', description: 'Veneers, crowns, full-mouth reconstruction' },
  { label: 'DSO / multi-location group', description: 'Three or more locations under shared ownership' },
]

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step6Operator({ data, update, onNext, onBack }: Props) {
  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">06 / 07</div>
        <h2 className="step-title">What best describes your practice?</h2>
        <p className="step-hint">Helps us calibrate the roadmap to your clinical context and scale.</p>
      </div>

      <div className="opts-col">
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.label}
            label={o.label}
            description={o.description}
            selected={data.operator === o.label}
            onSelect={() => update({ operator: o.label })}
          />
        ))}
      </div>

      <div className="step-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!data.operator}>Continue →</button>
      </div>

      <style jsx>{`
        .step-wrap { display: flex; flex-direction: column; gap: 32px; }
        .step-q { display: flex; flex-direction: column; gap: 10px; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.2em; }
        .step-title { font-family: var(--display); font-weight: 380; font-size: clamp(24px, 3vw, 32px); line-height: 1.15; letter-spacing: -0.01em; }
        .step-hint { font-size: 14.5px; color: var(--slate); line-height: 1.55; }
        .opts-col { display: grid; gap: 10px; }
        .step-nav { display: flex; align-items: center; gap: 16px; }
        button:disabled { opacity: 0.45; cursor: not-allowed; }
        .back-btn { background: none; border: none; cursor: pointer; font-size: 13.5px; color: var(--slate); font-family: var(--ui); transition: color 0.2s; }
        .back-btn:hover { color: var(--ink); }
      `}</style>
    </div>
  )
}
