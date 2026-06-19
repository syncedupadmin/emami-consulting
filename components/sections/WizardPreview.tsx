'use client'

import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'

const GOALS = [
  'Add in-house crown milling (CEREC/mill)',
  'Implement 3D imaging (CBCT)',
  'Digital impressions (scanner)',
  'Full-arch implants & guided surgery',
  'Bone grafting & regeneration',
  'Practice-wide digital workflow',
]

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function WizardPreview() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<string | null>(null)
  const [phase, setPhase] = useState<'select' | 'result'>('select')

  const handleSelect = (goal: string) => {
    setSelected(goal)
    setTimeout(() => setPhase('result'), 400)
  }

  return (
    <section ref={ref} className="sec-pad wiz-sec" style={{ background: 'var(--ink)' }}>
      <div className="wrap">
        <div className="head-wrap">
          <span className="sec-index sec-index--dark" aria-hidden="true">07</span>
          <motion.div
            className="sec-head"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 110 }}
          >
            <span className="eyebrow eyebrow--dark">
              <span className="num">07</span>&nbsp; Try It Now
            </span>
            <h2 className="sec-title" style={{ color: 'var(--bone)' }}>
              What is your primary technology goal?
            </h2>
            <p className="sec-sub" style={{ color: 'var(--bone-dim)' }}>
              The full intake takes 4 minutes. Start here to see the kind of question we ask — and how quickly we can orient toward a recommendation.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="wizard-shell"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 25, stiffness: 110, delay: 0.06 }}
        >
          <div className="wiz-bar">
            <div className="wiz-bar-fill" style={{ width: phase === 'result' ? '14%' : '0%' }} />
          </div>
          <div className="wiz-step-meta">Step 1 of 7 · Primary Goal</div>

          <AnimatePresence mode="wait">
            {phase === 'select' ? (
              <motion.div
                key="select"
                initial={reduce ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="goal-grid"
              >
                {GOALS.map((g) => (
                  <motion.button
                    key={g}
                    type="button"
                    aria-pressed={selected === g}
                    className={`goal-opt${selected === g ? ' selected' : ''}`}
                    onClick={() => handleSelect(g)}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                  >
                    <span className="go-dot" aria-hidden="true" />
                    {g}
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={reduce ? false : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="result-panel"
              >
                <div className="rp-check" aria-label="Goal noted"><CheckIcon /></div>
                <p className="rp-note">
                  Got it. &ldquo;<strong>{selected}</strong>&rdquo; — 6 more questions and Dr. Emami will have what he needs to build your roadmap.
                </p>
                <div className="rp-btns">
                  <a href="/intake" className="btn btn-gold">Continue Full Intake →</a>
                  <button type="button" className="rp-back" onClick={() => { setPhase('select'); setSelected(null) }}>
                    ← Change answer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style jsx>{`
        .head-wrap { position: relative; }
        .head-wrap :global(.sec-index) { top: -0.32em; }
        .wizard-shell { background: rgba(244,239,230,0.04); border: 1px solid var(--line-d); border-radius: var(--r-lg); padding: 36px; margin-top: 50px; max-width: 820px; }
        .wiz-bar { height: 3px; background: var(--line-d); border-radius: 3px; margin-bottom: 18px; overflow: hidden; }
        .wiz-bar-fill { height: 100%; background: var(--brass); border-radius: 3px; transition: width 0.5s var(--ease); }
        .wiz-step-meta { font-family: var(--mono); font-size: 11px; color: var(--bone-quiet); letter-spacing: 0.1em; margin-bottom: 28px; }
        .goal-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
        .goal-opt { background: rgba(244,239,230,0.04); border: 1px solid var(--line-d); border-radius: var(--r); padding: 14px 18px; min-height: 56px; text-align: left; cursor: pointer; font-size: 14px; color: var(--bone-dim); font-family: var(--ui); display: flex; align-items: center; gap: 12px; transition: background 0.22s, border-color 0.22s, color 0.22s; }
        .goal-opt:hover { background: rgba(244,239,230,0.09); border-color: rgba(244,239,230,0.3); color: var(--bone); }
        .goal-opt.selected { background: rgba(182,136,63,0.1); border-color: var(--brass); color: var(--bone); }
        .go-dot { width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid currentColor; flex-shrink: 0; opacity: 0.5; transition: all 0.2s; }
        .goal-opt.selected .go-dot { background: var(--brass); border-color: var(--brass); opacity: 1; }
        .result-panel { display: flex; flex-direction: column; gap: 22px; }
        .rp-check { width: 48px; height: 48px; border-radius: 50%; background: rgba(47,142,126,0.18); border: 1px solid rgba(47,142,126,0.4); display: grid; place-items: center; color: var(--teal-soft); }
        .rp-note { font-size: 16px; color: var(--bone-dim); line-height: 1.65; }
        .rp-note strong { color: var(--bone); }
        .rp-btns { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .rp-back { background: transparent; border: none; cursor: pointer; color: var(--bone-dim); font-size: 14px; font-family: var(--ui); min-height: 44px; padding: 0 4px; transition: color 0.2s; }
        .rp-back:hover { color: var(--bone); }
        @media (max-width: 620px) {
          .wizard-shell { padding: 26px; }
          .goal-grid { grid-template-columns: 1fr; }
          .rp-btns { gap: 14px; }
          .rp-btns :global(.btn) { width: 100%; }
        }
      `}</style>
    </section>
  )
}
