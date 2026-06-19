'use client'

import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const TIMELINE = [
  { n: '01', phase: 'Intake', days: 'Day 1', title: 'Complete the 7-question form', detail: 'Defines your practice stage, goals, budget range, and existing technology — takes ~4 minutes.' },
  { n: '02', phase: 'Call', days: 'Day 2–3', title: '45-minute call with Dr. Emami', detail: 'A live conversation to validate intake data and add clinical judgment about your specific situation.' },
  { n: '03', phase: 'Draft', days: 'Day 3–4', title: 'AI-assisted roadmap draft', detail: 'Our system generates a sequenced first pass from your intake, refined to your practice type and goal.' },
  { n: '04', phase: 'Review', days: 'Day 4–5', title: 'Expert review and edit', detail: 'Dr. Emami reads, edits, and annotates every line. The final is his judgment, not just a template.' },
  { n: '05', phase: 'Deliver', days: 'Day 5', title: 'Roadmap delivered', detail: 'PDF delivery with written summary, vendor-neutral recommendations, sequenced budget, and timeline.' },
]

export default function BuildPlan() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineScaleY = reduce ? 1 : lineProgress

  return (
    <section ref={ref} className="sec-pad" style={{ background: 'var(--bone)', position: 'relative', overflow: 'hidden' }}>
      <span className="sec-index" aria-hidden="true">08</span>
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 25, stiffness: 110 }}
        >
          <span className="eyebrow"><span className="num">08</span>&nbsp; Blueprint Sprint Timeline</span>
          <h2 className="sec-title">Five business days from intake to roadmap.</h2>
          <p className="sec-sub">The entire engagement is designed to get you a defensible, expert-reviewed plan before you buy anything.</p>
        </motion.div>

        <div className="bp-wrap">
          <div className="bp-line-outer" aria-hidden="true">
            <motion.div className="bp-line-fill" style={{ scaleY: lineScaleY, transformOrigin: 'top' }} />
          </div>

          <div className="bp-steps">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.n}
                className="bp-step"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', damping: 25, stiffness: 110, delay: i * 0.06 }}
              >
                <div className="bp-node">
                  <span className="bp-n">{t.n}</span>
                </div>
                <div className="bp-content">
                  <div className="bp-meta">
                    <span className="bp-phase">{t.phase}</span>
                    <span className="bp-days">{t.days}</span>
                  </div>
                  <h3 className="bp-title">{t.title}</h3>
                  <p className="bp-detail">{t.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bp-wrap { display: flex; gap: 48px; margin-top: 60px; }
        .bp-line-outer { width: 2px; background: var(--line); position: relative; flex-shrink: 0; border-radius: 2px; }
        .bp-line-fill { position: absolute; inset: 0; background: linear-gradient(to bottom, var(--brass), var(--brass-deep)); border-radius: 2px; }
        .bp-steps { display: grid; flex: 1; gap: 0; }
        .bp-step { display: flex; gap: 26px; align-items: flex-start; padding: 30px 0; border-bottom: 1px solid var(--line); }
        .bp-step:last-child { border-bottom: none; }
        .bp-node { width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--brass); background: #fff; display: grid; place-items: center; flex-shrink: 0; transition: background 0.3s; }
        .bp-step:hover .bp-node { background: var(--brass); }
        .bp-n { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.04em; transition: color 0.3s; }
        .bp-step:hover .bp-n { color: #fff; }
        .bp-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .bp-phase { font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--teal); }
        .bp-days { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--slate-strong); }
        .bp-title { font-weight: 600; font-size: 16px; margin-bottom: 6px; }
        .bp-detail { font-size: 14px; color: var(--slate-strong); line-height: 1.6; max-width: 620px; }
        @media (max-width: 700px) {
          .bp-line-outer { display: none; }
          .bp-wrap { gap: 0; flex-direction: column; }
          .bp-step { padding: 22px 0; gap: 16px; }
        }
      `}</style>
    </section>
  )
}
