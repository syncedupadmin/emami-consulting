'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from '@/components/ui/MagneticButton'

export default function TwoTracks() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="sec-pad" style={{ background: 'var(--bone-2)' }}>
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow"><span className="num">07</span>&nbsp; Two Ways to Engage</span>
          <h2 className="sec-title">
            Practices in motion.{' '}
            <em style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--brass-deep)' }}>
              Practices already running.
            </em>
          </h2>
        </motion.div>

        <div className="tracks">
          <motion.div
            className="track track-a"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="tg ta-glow" aria-hidden="true" />
            <div className="track-head">
              <span className="track-badge">Track A</span>
              <h3>About to buy technology</h3>
              <p>You&apos;re evaluating a scanner, CBCT, mill, or full-arch system. You have quotes but no confidence. The Blueprint Sprint is a diagnostic engagement — it gives you a defensible plan before you spend.</p>
            </div>
            <ul className="track-list">
              <li>Pre-purchase clarity before a $10K–$150K decision</li>
              <li>Sequenced roadmap — what first, what to defer</li>
              <li>Vendor-neutral: no affiliation, no conflict of interest</li>
              <li>ROI modeling included</li>
            </ul>
            <MagneticButton href="/intake" className="btn btn-gold track-cta">
              Start your Blueprint Sprint →
            </MagneticButton>
          </motion.div>

          <motion.div
            className="track track-b"
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
            whileHover={{ y: -4 }}
          >
            <div className="tg tb-glow" aria-hidden="true" />
            <div className="track-head">
              <span className="track-badge" style={{ borderColor: 'rgba(47,142,126,0.4)', color: 'var(--teal-soft)' }}>Track B</span>
              <h3>Technology you own, but it&apos;s not earning</h3>
              <p>You bought the equipment. It&apos;s in the practice. But the workflow never came together, the team isn&apos;t using it consistently, or the ROI hasn&apos;t appeared. Managed Support can fix this.</p>
            </div>
            <ul className="track-list">
              <li>Monthly check-ins and plan adjustments</li>
              <li>Team training and workflow design support</li>
              <li>Vendor coordination on integration issues</li>
              <li>Direct access to Dr. Emami</li>
            </ul>
            <a href="mailto:nick@syncedupsolutions.com" className="btn btn-ghost-d track-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
              Inquire about Managed Support →
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; margin-top: 54px; }
        .track {
          border-radius: var(--r-lg);
          padding: 38px;
          display: flex; flex-direction: column; gap: 24px;
          position: relative; overflow: hidden;
          cursor: default;
        }
        .track-a { background: var(--ink); color: var(--bone); box-shadow: var(--shadow-lg); }
        .track-b { background: var(--ink-soft); color: var(--bone); border: 1px solid var(--line-d); }
        .tg { position: absolute; width: 360px; height: 360px; border-radius: 50%; filter: blur(70px); }
        .ta-glow { background: radial-gradient(circle, rgba(182,136,63,0.3), transparent 65%); bottom: -150px; right: -100px; }
        .tb-glow { background: radial-gradient(circle, rgba(28,110,98,0.28), transparent 65%); bottom: -120px; right: -80px; }
        .track-badge {
          font-family: var(--mono);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brass-bright);
          border: 1px solid rgba(205,162,81,0.35);
          border-radius: 100px;
          padding: 6px 14px;
          display: inline-block;
          position: relative; z-index: 2;
          margin-bottom: 18px;
        }
        .track-head { position: relative; z-index: 2; }
        .track-head h3 { font-family: var(--display); font-weight: 380; font-size: clamp(22px, 2.4vw, 28px); line-height: 1.18; letter-spacing: -0.012em; margin-bottom: 14px; }
        .track-head p { font-size: 14.5px; color: var(--bone-dim); line-height: 1.65; }
        .track-list { position: relative; z-index: 2; list-style: none; display: grid; gap: 10px; }
        .track-list li { font-size: 14px; color: var(--bone-dim); padding-left: 20px; position: relative; }
        .track-list li::before { content: "→"; position: absolute; left: 0; color: var(--brass); }
        .track-cta { position: relative; z-index: 2; align-self: flex-start; }
        @media (max-width: 860px) { .tracks { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
