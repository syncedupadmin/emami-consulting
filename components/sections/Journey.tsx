'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const STEPS = [
  { n: '01', title: 'Complete the intake form', sub: '7 focused questions about your practice, goals, and current setup.' },
  { n: '02', title: '45-min call with Dr. Emami', sub: 'A live conversation to validate your goals and fill in context.' },
  { n: '03', title: 'AI-assisted first draft', sub: 'Our system generates a first-pass roadmap from your intake data.' },
  { n: '04', title: 'Expert review & edit', sub: 'Dr. Emami reviews every line. Adds clinical judgment, edits for your practice.' },
  { n: '05', title: 'Roadmap delivered', sub: 'PDF + written summary delivered in 5 business days. Vendor-neutral.' },
  { n: '06', title: '30-day Q&A window', sub: 'Direct access to ask follow-up questions about your roadmap.' },
  { n: '07', title: 'Optional: go managed', sub: 'Continue with monthly support, check-ins, and implementation guidance.' },
  { n: '08', title: 'Technology you actually use', sub: 'The goal: tech that fits your workflow, pays for itself, and your team loves.' },
]

export default function Journey() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] })
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="sec-pad" id="journey" style={{ background: 'var(--bone)' }}>
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow"><span className="num">05</span>&nbsp; How It Works</span>
          <h2 className="sec-title">From intake to implementation — a complete path.</h2>
          <p className="sec-sub">Eight steps from first form to technology that actually earns its place in your practice.</p>
        </motion.div>

        <div className="journey-wrap">
          <div className="jline-outer" aria-hidden="true">
            <motion.div
              className="jline-fill"
              style={{ scaleY: lineProgress, transformOrigin: 'top' }}
            />
          </div>

          <div className="steps">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                className="step"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="step-dot" aria-hidden="true">
                  <span className="step-n">{s.n}</span>
                </div>
                <div className="step-content">
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-sub">{s.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .journey-wrap { display: flex; gap: 48px; margin-top: 60px; position: relative; }
        .jline-outer { width: 2px; background: var(--line); position: relative; flex-shrink: 0; border-radius: 2px; align-self: stretch; }
        .jline-fill { position: absolute; inset: 0; background: linear-gradient(to bottom, var(--brass-bright), var(--teal)); border-radius: 2px; }
        .steps { display: grid; gap: 0; flex: 1; }
        .step { display: flex; align-items: flex-start; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--line); position: relative; }
        .step:last-child { border-bottom: none; }
        .step-dot {
          width: 42px; height: 42px;
          border-radius: 50%;
          border: 2px solid var(--line);
          background: var(--bone);
          display: grid; place-items: center;
          flex-shrink: 0;
          transition: border-color 0.3s, background 0.3s;
        }
        .step:hover .step-dot { border-color: var(--brass); background: #fff; }
        .step-n { font-family: var(--mono); font-size: 11px; color: var(--brass-deep); letter-spacing: 0.04em; }
        .step-title { font-weight: 600; font-size: 16px; margin-bottom: 6px; }
        .step-sub { font-size: 14px; color: var(--slate); line-height: 1.55; }
        @media (max-width: 820px) { .jline-outer { display: none; } .journey-wrap { gap: 0; } .step { padding: 22px 0; } }
      `}</style>
    </section>
  )
}
