'use client'

import OptionCard from '../OptionCard'
import type { IntakeData } from '../WizardShell'

const OPTIONS = [
  { label: 'Actively shopping now', description: 'Have quotes, demoing, or ready to sign in the next 30–60 days' },
  { label: 'Within 3–6 months', description: 'Planning phase — need the roadmap to move forward' },
  { label: '6–12 months out', description: 'Exploring options, building the plan for later this year' },
  { label: 'Just researching for now', description: 'Not on a specific timeline — want clarity before committing' },
]

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step5Timeline({ data, update, onNext, onBack }: Props) {
  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">05 / 07</div>
        <h2 className="step-title">Where are you in the decision timeline?</h2>
        <p className="step-hint">This helps Dr. Emami prioritize the roadmap to match your window.</p>
      </div>

      <div className="opts-col">
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.label}
            label={o.label}
            description={o.description}
            selected={data.timeline === o.label}
            onSelect={() => update({ timeline: o.label })}
          />
        ))}
      </div>

      <div className="step-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onNext} disabled={!data.timeline}>Continue →</button>
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
