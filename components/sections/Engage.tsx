'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

export default function Engage() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="engage-sec sec-pad">
      <div className="eg-glow-a" aria-hidden="true" />
      <div className="eg-glow-b" aria-hidden="true" />

      <div className="wrap">
        <div className="engage-inner">
          <motion.div
            className="engage-content"
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span className="eyebrow" style={{ color: 'var(--brass-bright)' }}>
              <span className="num" style={{ color: 'var(--teal-soft)' }}>09</span>&nbsp; The Next Step
            </span>
            <h2 className="sec-title" style={{ color: 'var(--bone)' }}>
              Buy clarity{' '}
              <em style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--brass-bright)' }}>
                before
              </em>{' '}
              you buy technology.
            </h2>
            <p className="sec-sub" style={{ color: 'var(--bone-dim)', maxWidth: 580 }}>
              The Blueprint Sprint takes 5 business days. The alternative is spending six figures on a guess. Start with 7 questions about your practice.
            </p>

            <div className="engage-btns">
              <MagneticButton href="/intake" className="btn btn-gold">
                Start Your Blueprint Sprint
              </MagneticButton>
              <MagneticButton href="mailto:nick@syncedupsolutions.com" className="btn btn-ghost-d">
                Talk to Dr. Emami
              </MagneticButton>
            </div>

            <div className="engage-meta">
              <span>$8,500 · 5 business days</span>
              <span className="dot" aria-hidden="true">·</span>
              <span>Expert-reviewed · Vendor-neutral</span>
              <span className="dot" aria-hidden="true">·</span>
              <span>No retainer required</span>
            </div>
          </motion.div>

          <motion.div
            className="sprint-card"
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, type: 'spring', damping: 22, stiffness: 90 }}
          >
            <div className="sc-glow" aria-hidden="true" />
            <div className="sc-badge">Blueprint Sprint · $8,500</div>
            <ul className="sc-list">
              {[
                '45-min intake call with Dr. Emami',
                'AI-assisted roadmap draft',
                'Expert clinical review & edit',
                'Vendor-neutral recommendations',
                'Sequenced budget + ROI path',
                'Delivered in 5 business days',
                '30-day Q&A window',
              ].map((item) => (
                <li key={item}>
                  <span style={{ color: 'var(--teal-soft)' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="sc-tagline">
              &ldquo;The one thing the equipment rep can&apos;t sell you: clarity.&rdquo;
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .engage-sec { background: var(--ink); position: relative; overflow: hidden; }
        .eg-glow-a { position: absolute; width: 600px; height: 600px; border-radius: 50%; background: radial-gradient(circle, rgba(182,136,63,0.18), transparent 65%); filter: blur(80px); top: -200px; left: -100px; pointer-events: none; }
        .eg-glow-b { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(28,110,98,0.14), transparent 65%); filter: blur(70px); bottom: -180px; right: -80px; pointer-events: none; }
        .engage-inner { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 60px; align-items: center; position: relative; z-index: 2; }
        .engage-content { display: flex; flex-direction: column; gap: 28px; }
        .engage-btns { display: flex; gap: 14px; flex-wrap: wrap; }
        .engage-meta { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; font-family: var(--mono); font-size: 11px; color: var(--bone-faint); letter-spacing: 0.06em; }
        .dot { opacity: 0.4; }

        .sprint-card { background: rgba(244,239,230,0.04); border: 1px solid var(--line-d); border-radius: var(--r-lg); padding: 34px; position: relative; overflow: hidden; }
        .sprint-card:hover { background: rgba(244,239,230,0.07); }
        .sc-glow { position: absolute; width: 280px; height: 280px; border-radius: 50%; background: radial-gradient(circle, rgba(182,136,63,0.2), transparent 65%); filter: blur(50px); top: -100px; right: -80px; }
        .sc-badge { font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--brass-bright); border: 1px solid rgba(205,162,81,0.35); border-radius: 100px; padding: 7px 16px; display: inline-block; margin-bottom: 24px; position: relative; z-index: 2; }
        .sc-list { list-style: none; display: grid; gap: 12px; position: relative; z-index: 2; margin-bottom: 24px; }
        .sc-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--bone-dim); }
        .sc-tagline { font-family: var(--display); font-weight: 330; font-size: 16px; color: var(--bone-faint); font-style: italic; line-height: 1.4; border-top: 1px solid var(--line-d); padding-top: 20px; position: relative; z-index: 2; }

        @media (max-width: 900px) { .engage-inner { grid-template-columns: 1fr; gap: 40px; } }
      `}</style>
    </section>
  )
}
