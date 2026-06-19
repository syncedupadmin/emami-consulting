'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  step: number
  total: number
}

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className="pb" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={total} aria-label={`Step ${step} of ${total}`}>
      <div className="pb-track">
        <motion.div
          className="pb-fill"
          animate={{ scaleX: step / total }}
          transition={{ type: 'spring', damping: 28, stiffness: 200 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
      <div className="pb-label">Step {step} of {total}</div>

      <style jsx>{`
        .pb { display: flex; align-items: center; gap: 14px; }
        .pb-track { flex: 1; height: 3px; background: var(--line); border-radius: 3px; overflow: hidden; }
        .pb-fill { height: 100%; background: linear-gradient(90deg, var(--brass-bright), var(--brass)); border-radius: 3px; width: 100%; }
        .pb-label { font-family: var(--mono); font-size: 11px; color: var(--slate); letter-spacing: 0.08em; flex-shrink: 0; }
      `}</style>
    </div>
  )
}
