'use client'

import OptionCard from '../OptionCard'
import type { IntakeData } from '../WizardShell'

const OPTIONS = [
  { label: 'Intraoral scanner', description: 'iTero, 3Shape, Medit, etc.' },
  { label: 'CBCT / 3D cone-beam imaging', description: 'Carestream, Planmeca, i-CAT, etc.' },
  { label: 'Milling unit (chairside CAD/CAM)', description: 'CEREC, Planmill, Roland, etc.' },
  { label: '3D printer', description: 'Formlabs, SprintRay, Stratasys, etc.' },
  { label: 'Soft tissue laser', description: 'Biolase, Fotona, Solea, etc.' },
  { label: 'Digital X-ray / sensors', description: 'Upgrade from film or phosphor plates' },
  { label: 'Practice management software', description: 'Dentrix, Eaglesoft, Curve, Carestack' },
  { label: 'Not sure — need guidance', description: 'The roadmap will help define this' },
]

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step2Technology({ data, update, onNext, onBack }: Props) {
  const toggle = (label: string) => {
    const arr = data.technology
    update({ technology: arr.includes(label) ? arr.filter((x) => x !== label) : [...arr, label] })
  }

  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">02 / 07</div>
        <h2 className="step-title">Which technologies are you considering? <span style={{ fontWeight: 400, fontFamily: 'var(--ui)' }}>(select all that apply)</span></h2>
        <p className="step-hint">Even a rough idea helps us build the right sequencing plan.</p>
      </div>

      <div className="opts-grid">
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.label}
            label={o.label}
            description={o.description}
            selected={data.technology.includes(o.label)}
            onSelect={() => toggle(o.label)}
          />
        ))}
      </div>

      <div className="step-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary step-btn" onClick={onNext} disabled={data.technology.length === 0}>
          Continue →
        </button>
      </div>

      <style jsx>{`
        .step-wrap { display: flex; flex-direction: column; gap: 32px; }
        .step-q { display: flex; flex-direction: column; gap: 10px; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.2em; }
        .step-title { font-family: var(--display); font-weight: 380; font-size: clamp(22px, 2.8vw, 30px); line-height: 1.18; letter-spacing: -0.01em; }
        .step-hint { font-size: 14.5px; color: var(--slate-strong); line-height: 1.55; }
        .opts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .step-nav { display: flex; align-items: center; gap: 16px; }
        .step-btn { min-height: 48px; }
        .step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .back-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 8px; background: none; border: none; cursor: pointer; font-size: 14px; color: var(--slate-strong); font-family: var(--ui); transition: color 0.2s; }
        .back-btn:hover { color: var(--ink); }
        @media (max-width: 600px) { .opts-grid { grid-template-columns: 1fr; } }
        @media (max-width: 520px) {
          .step-nav { flex-direction: column-reverse; align-items: stretch; gap: 12px; }
          .step-btn, .back-btn { width: 100%; }
        }
      `}</style>
    </div>
  )
}
