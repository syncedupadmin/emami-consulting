'use client'

import type { IntakeData } from '../WizardShell'

interface Props {
  data: IntakeData
  update: (p: Partial<IntakeData>) => void
  onNext: () => void
  onBack: () => void
}

export default function Step3CurrentSetup({ data, update, onNext, onBack }: Props) {
  return (
    <div className="step-wrap">
      <div className="step-q">
        <div className="step-num">03 / 07</div>
        <h2 className="step-title">Describe your current technology setup.</h2>
        <p className="step-hint">
          What equipment do you already have? What are you still doing the analog way? Any detail helps — even &ldquo;we have an older Dexis sensor and a used pano&rdquo; is useful.
        </p>
      </div>

      <div className="ta-wrap">
        <label htmlFor="cs-field" className="ta-label">Current setup</label>
        <textarea
          id="cs-field"
          className="ta"
          rows={6}
          value={data.currentSetup}
          onChange={(e) => update({ currentSetup: e.target.value })}
          placeholder="e.g. We have a Dexis digital X-ray sensor and a 2019 pano but no 3D imaging. Still taking PVS impressions and sending to an off-site lab for all crowns. Looking to bring milling in-house."
          aria-required="false"
          aria-describedby="cs-hint"
        />
        <div id="cs-hint" className="ta-hint">Optional — skip if you prefer to share on the call with Dr. Emami.</div>
      </div>

      <div className="step-nav">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <button className="btn btn-primary step-btn" onClick={onNext}>Continue →</button>
      </div>

      <style jsx>{`
        .step-wrap { display: flex; flex-direction: column; gap: 32px; }
        .step-q { display: flex; flex-direction: column; gap: 10px; }
        .step-num { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.2em; }
        .step-title { font-family: var(--display); font-weight: 380; font-size: clamp(24px, 3vw, 32px); line-height: 1.15; letter-spacing: -0.01em; }
        .step-hint { font-size: 14.5px; color: var(--slate-strong); line-height: 1.55; }
        .ta-wrap { display: flex; flex-direction: column; gap: 8px; }
        .ta-label { font-size: 13px; font-weight: 600; color: var(--ink); }
        .ta { width: 100%; padding: 16px; border: 1.5px solid var(--line-strong); border-radius: var(--r); font-family: var(--ui); font-size: 16px; color: var(--ink); resize: vertical; background: #fff; line-height: 1.6; transition: border-color 0.2s; min-height: 140px; }
        .ta:focus { outline: none; border-color: var(--brass); }
        .ta-hint { font-size: 12.5px; color: var(--slate-strong); }
        .step-nav { display: flex; align-items: center; gap: 16px; }
        .step-btn { min-height: 48px; }
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
