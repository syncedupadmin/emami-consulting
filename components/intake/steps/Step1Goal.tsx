'use client'

import OptionCard from '../OptionCard'
import type { IntakeData } from '../WizardShell'

const OPTIONS = [
  { label: 'Add in-house crown milling (CEREC / mill)', description: 'Same-day crowns, chairside CAD/CAM' },
  { label: 'Implement 3D imaging (CBCT)', description: 'Implant planning, airway, full-arch diagnostics' },
  { label: 'Digital impressions (intraoral scanner)', description: 'Replace PVS, speed up lab workflow' },
  { label: 'Full-arch implants & guided surgery', description: 'All-on-X, surgical guides, implant protocol' },
  { label: 'Bone grafting & regeneration', description: 'Expand implant candidacy in-house' },
  { label: 'Practice-wide digital workflow', description: 'Integrate scanner, imaging, CAD/CAM, lab' },
]

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step1Goal({ data, update, onNext }: Props) {
  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">01 / 07</div>
        <h2 className="step-title">What is your primary technology goal right now?</h2>
        <p className="step-hint">Select the one that best describes your situation. You can add context later.</p>
      </div>

      <div className="opts-grid">
        {OPTIONS.map((o) => (
          <OptionCard
            key={o.label}
            label={o.label}
            description={o.description}
            selected={data.goal === o.label}
            onSelect={() => update({ goal: o.label })}
          />
        ))}
      </div>

      <div className="step-nav">
        <button
          className="btn btn-primary step-btn"
          onClick={onNext}
          disabled={!data.goal}
          aria-disabled={!data.goal}
        >
          Continue →
        </button>
      </div>

      <style jsx>{`
        .step-wrap { display: flex; flex-direction: column; gap: 32px; }
        .step-q { display: flex; flex-direction: column; gap: 10px; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.2em; }
        .step-title { font-family: var(--display); font-weight: 380; font-size: clamp(24px, 3vw, 32px); line-height: 1.15; letter-spacing: -0.01em; }
        .step-hint { font-size: 14.5px; color: var(--slate); line-height: 1.55; }
        .opts-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .step-nav { padding-top: 8px; }
        .step-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        @media (max-width: 600px) { .opts-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  )
}
