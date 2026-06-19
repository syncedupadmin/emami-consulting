'use client'

import OptionCard from '../OptionCard'
import type { IntakeData } from '../WizardShell'

const OPTIONS = [
  { label: 'Under $25,000', description: 'Sensors, software, lower-cost peripherals' },
  { label: '$25,000 – $75,000', description: 'Scanner, soft-tissue laser, 2D/3D pano' },
  { label: '$75,000 – $150,000', description: 'CBCT, chairside mill, high-end scanner' },
  { label: 'Over $150,000', description: 'Full digital suite or multiple systems' },
]

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step4Budget({ data, update, onNext, onBack }: Props) {
  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">04 / 07</div>
        <h2 className="step-title">What is your approximate budget range?</h2>
        <p className="step-hint">Rough estimate is fine. This helps us sequence the roadmap to what&apos;s realistic now vs. phased over 12–24 months.</p>
      </div>

      <div className="opts-col">
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.label}
            label={o.label}
            description={o.description}
            selected={data.budget === o.label}
            onSelect={() => update({ budget: o.label })}
          />
        ))}
      </div>

      <div className="step-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary step-btn" onClick={onNext} disabled={!data.budget}>Continue →</button>
      </div>

      <style jsx>{`
        .step-wrap { display: flex; flex-direction: column; gap: 32px; }
        .step-q { display: flex; flex-direction: column; gap: 10px; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.2em; }
        .step-title { font-family: var(--display); font-weight: 380; font-size: clamp(24px, 3vw, 32px); line-height: 1.15; letter-spacing: -0.01em; }
        .step-hint { font-size: 14.5px; color: var(--slate-strong); line-height: 1.55; }
        .opts-col { display: grid; gap: 10px; }
        .step-nav { display: flex; align-items: center; gap: 16px; }
        .step-btn { min-height: 48px; }
        button:disabled { opacity: 0.45; cursor: not-allowed; }
        .back-btn { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; padding: 0 8px; background: none; border: none; cursor: pointer; font-size: 14px; color: var(--slate-strong); font-family: var(--ui); transition: color 0.2s; }
        .back-btn:hover { color: var(--ink); }
        @media (max-width: 520px) {
          .step-nav { flex-direction: column-reverse; align-items: stretch; gap: 12px; }
          .step-btn, .back-btn { width: 100%; }
        }
      `}</style>
    </div>
  )
}
