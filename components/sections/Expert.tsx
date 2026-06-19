'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

function CheckIcon() {
  return (
    <svg
      className="check-svg"
      width="18"
      height="18"
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

const CREDS = [
  { text: <><strong>CEREC same-day crowns</strong> with in-house chairside milling</> },
  { text: <><strong>Full-arch &amp; guided implant</strong> surgery — dedicated implant brand</> },
  { text: <><strong>3D imaging / CBCT</strong>, CAD/CAM, digital impressions, laser dentistry</> },
  { text: <><strong>IV &amp; sedation dentistry</strong> — Am. Dental Society of Anesthesiology</> },
  { text: <><strong>Fellow,</strong> Misch International Implant Institute · <strong>Master,</strong> ICOI · LVI</> },
]

const POINTS = [
  { n: '01', text: <><strong>Lived experience is the moat.</strong> <span style={{ color: 'var(--slate)' }}>Dr. Emami has personally navigated the scanner, mill, CBCT, sedation, and full-arch decisions other practices are agonizing over. The platform productizes that judgment.</span></> },
  { n: '02', text: <><strong>Vendor-neutral by design.</strong> <span style={{ color: 'var(--slate)' }}>He doesn&apos;t sell the box. That independence is the wedge no equipment dealer or product-tied &ldquo;advisor&rdquo; can claim.</span></> },
  { n: '03', text: <><strong>Expert review is the guarantee.</strong> <span style={{ color: 'var(--slate)' }}>AI drafts the first pass; Dr. Emami reviews, edits, and signs off. Every roadmap is defensible against generic, copy-paste AI output.</span></> },
]

export default function Expert() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="sec-pad" id="expert" style={{ background: 'var(--bone)' }}>
      <span className="sec-index" aria-hidden="true">03</span>
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: 'spring', damping: 25, stiffness: 110 }}
        >
          <span className="eyebrow"><span className="num">03</span>&nbsp; The Expert Behind The Engine</span>
          <h2 className="sec-title">
            The roadmaps are credible because{' '}
            <em style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--brass-deep)' }}>
              the expert has already lived them.
            </em>
          </h2>
        </motion.div>

        <div className="expert-grid">
          <motion.div
            className="expert-card"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 110, delay: 0.06 }}
          >
            <div className="eg" aria-hidden="true" />
            <div className="ec-mono">
              <div className="ring" aria-hidden="true">E</div>
              <div>
                <strong style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 22, color: 'var(--bone)', display: 'block' }}>Dr. Justin Emami, DDS</strong>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bone-quiet)' }}>Galleria of Smiles · Diamond Smile Implants</span>
              </div>
            </div>
            <div className="cred-list">
              {CREDS.map((c, i) => (
                <motion.div
                  key={i}
                  className="cr"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ type: 'spring', damping: 25, stiffness: 110, delay: 0.18 + i * 0.06 }}
                >
                  <span className="cr-check" style={{ color: 'var(--teal-soft)', flexShrink: 0, display: 'inline-flex' }}>
                    <CheckIcon />
                  </span>
                  <span>{c.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="expert-points"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 110, delay: 0.12 }}
          >
            <h3 style={{ fontFamily: 'var(--display)', fontWeight: 400, fontSize: 'clamp(24px,3vw,34px)', lineHeight: 1.2, letterSpacing: '-0.012em', marginBottom: 20 }}>
              He&apos;s not learning this category.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--brass-deep)' }}>He&apos;s mastered it</em> — across two practices.
            </h3>
            {POINTS.map((p, i) => (
              <motion.div
                key={p.n}
                className="ep"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: 'spring', damping: 25, stiffness: 110, delay: 0.18 + i * 0.06 }}
              >
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--brass-deep)', flexShrink: 0, paddingTop: 2 }}>{p.n}</span>
                <p style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.55 }}>{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .expert-grid { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 54px; align-items: center; margin-top: 30px; }
        .expert-card { background: var(--ink); border-radius: var(--r-lg); padding: 40px; color: var(--bone); position: relative; overflow: hidden; box-shadow: var(--shadow-lg); }
        .eg { position: absolute; width: 340px; height: 340px; border-radius: 50%; background: radial-gradient(circle, rgba(28,110,98,0.4), transparent 65%); filter: blur(60px); top: -120px; right: -100px; }
        .ec-mono { position: relative; z-index: 2; display: flex; align-items: center; gap: 16px; margin-bottom: 26px; }
        .ring { width: 64px; height: 64px; border-radius: 50%; border: 1px solid var(--brass); display: grid; place-items: center; font-family: var(--display); font-size: 30px; color: var(--brass-bright); font-weight: 400; flex-shrink: 0; }
        .cred-list { position: relative; z-index: 2; display: grid; gap: 1px; background: var(--line-d); border: 1px solid var(--line-d); border-radius: 12px; overflow: hidden; }
        .cr { background: var(--ink); padding: 13px 16px; display: flex; align-items: flex-start; gap: 12px; font-size: 13.5px; color: var(--bone-dim); }
        .cr-check { padding-top: 1px; }
        .ep { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--line); }
        .ep:last-child { border-bottom: none; }
        @media (max-width: 880px) { .expert-grid { grid-template-columns: 1fr; gap: 34px; } }
        @media (max-width: 480px) { .expert-card { padding: 28px 22px; } }
      `}</style>
    </section>
  )
}
