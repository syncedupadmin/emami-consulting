'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

const FEATURES = [
  { icon: '◎', title: 'Vendor-neutral diagnosis', body: 'No equipment affiliation — the recommendation comes from your goals, not their margin.' },
  { icon: '◈', title: 'Expert-reviewed roadmap', body: 'AI drafts the first pass; Dr. Emami reviews and signs off. 5 business days.' },
  { icon: '◇', title: 'Full implementation plan', body: 'Sequenced: what first, what second, why. With budget, workflow, training, and ROI path.' },
  { icon: '◉', title: 'Ongoing managed support', body: 'Optional monthly support to adjust the plan as the practice evolves.' },
]

export default function Offer() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="sec-pad" id="offer" style={{ background: 'var(--bone)' }}>
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow"><span className="num">04</span>&nbsp; What You Receive</span>
          <h2 className="sec-title">
            The Blueprint Sprint:{' '}
            <em style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--brass-deep)' }}>
              your complete dental technology roadmap.
            </em>
          </h2>
          <p className="sec-sub">
            A focused engagement that produces a single deliverable — a defensible, sequenced, expert-reviewed plan for the technology your practice actually needs.
          </p>
        </motion.div>

        <div className="offer-grid">
          <motion.div
            className="offer-main"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="om-glow" aria-hidden="true" />
            <div className="om-top">
              <span className="om-badge">Blueprint Sprint</span>
              <div className="om-price">
                <span className="om-dollar">$</span>8,500
              </div>
              <div className="om-note">One-time engagement · No retainer required</div>
            </div>
            <ul className="om-includes">
              {[
                '45-minute intake call with Dr. Emami',
                'Written technology roadmap (sequenced by priority)',
                'Budget ranges for each item with financing context',
                'Workflow + training plan per technology',
                'AI-assisted first draft, expert-reviewed final',
                'Delivered in 5 business days',
                '30-day Q&A window after delivery',
              ].map((item) => (
                <li key={item}>
                  <span style={{ color: 'var(--teal-soft)', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <MagneticButton href="/intake" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              Start Your Roadmap
            </MagneticButton>
          </motion.div>

          <div className="features-col">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                className="feat"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.09, ease: [0.22, 0.61, 0.36, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="feat-icon">{f.icon}</div>
                <div>
                  <h4 className="feat-title">{f.title}</h4>
                  <p className="feat-body">{f.body}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="managed-pill"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal-soft)' }}>
                Managed Support (optional)
              </span>
              <div style={{ fontSize: 22, fontFamily: 'var(--display)', fontWeight: 400, margin: '8px 0 4px' }}>
                $750 <span style={{ fontSize: 15, color: 'var(--slate)' }}>/ month</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--slate)', lineHeight: 1.5 }}>
                Monthly check-ins, plan adjustments, vendor negotiations, and direct access to Dr. Emami.
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .offer-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 28px; margin-top: 54px; align-items: start; }
        .offer-main {
          background: var(--ink);
          border-radius: var(--r-lg);
          padding: 40px;
          color: var(--bone);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .om-glow {
          position: absolute;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(182,136,63,0.24), transparent 65%);
          filter: blur(60px);
          bottom: -130px; right: -80px;
        }
        .om-top { position: relative; z-index: 2; }
        .om-badge {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brass-bright);
          border: 1px solid rgba(205,162,81,0.35);
          padding: 6px 14px;
          border-radius: 100px;
          display: inline-block;
          margin-bottom: 24px;
        }
        .om-price { font-family: var(--display); font-size: clamp(46px, 6vw, 62px); font-weight: 360; line-height: 1; margin-bottom: 8px; }
        .om-dollar { font-size: 0.45em; vertical-align: top; margin-top: 0.28em; color: var(--brass-bright); }
        .om-note { font-size: 12.5px; color: var(--bone-faint); font-family: var(--mono); letter-spacing: 0.04em; margin-bottom: 30px; }
        .om-includes { position: relative; z-index: 2; list-style: none; display: grid; gap: 1px; background: var(--line-d); border: 1px solid var(--line-d); border-radius: 12px; overflow: hidden; margin-bottom: 30px; }
        .om-includes li { background: rgba(11,26,40,0.6); padding: 12px 16px; display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: var(--bone-dim); }

        .features-col { display: grid; gap: 16px; }
        .feat { background: var(--bone-2); border: 1px solid var(--line); border-radius: var(--r); padding: 22px 24px; display: flex; align-items: flex-start; gap: 18px; cursor: default; transition: box-shadow 0.3s, border-color 0.3s; }
        .feat:hover { box-shadow: var(--shadow); border-color: rgba(11,26,40,0.22); }
        .feat-icon { font-size: 22px; color: var(--brass); flex-shrink: 0; width: 36px; }
        .feat-title { font-weight: 600; font-size: 15px; margin-bottom: 6px; }
        .feat-body { font-size: 13.5px; color: var(--slate); line-height: 1.55; }
        .managed-pill { background: #fff; border: 1px solid var(--line); border-radius: var(--r); padding: 22px 24px; }

        @media (max-width: 880px) { .offer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
