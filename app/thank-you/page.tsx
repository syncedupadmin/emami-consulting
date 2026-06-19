'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="ty">
      <div className="ty-glow-a" aria-hidden="true" />
      <div className="ty-glow-b" aria-hidden="true" />

      <motion.div
        className="ty-card"
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
      >
        <motion.div
          className="ty-check"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.55, type: 'spring', damping: 20, stiffness: 160 }}
          aria-label="Success"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <motion.path
              d="M6 14.5 L11 20 L22 9"
              stroke="var(--teal-soft)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
            />
          </svg>
        </motion.div>

        <h1 className="ty-head">Intake received.</h1>
        <p className="ty-sub">
          Dr. Emami will review your responses and reach out within <strong>24 hours</strong> to confirm your intake call. Check your inbox — the call confirmation will come from Emami Consulting.
        </p>

        <div className="ty-steps">
          {[
            { n: '01', t: 'Check your inbox for confirmation', s: 'Usually within a few hours' },
            { n: '02', t: '45-min call with Dr. Emami', s: 'Scheduled at your convenience' },
            { n: '03', t: 'Blueprint roadmap delivered', s: 'Within 5 business days of your call' },
          ].map((s) => (
            <div key={s.n} className="ty-step">
              <span className="ty-n">{s.n}</span>
              <div>
                <div className="ty-st">{s.t}</div>
                <div className="ty-ss">{s.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="ty-actions">
          <Link href="/" className="btn btn-primary">Return to Home</Link>
          <a href="mailto:nick@syncedupsolutions.com" className="ty-link">Questions? Email us →</a>
        </div>
      </motion.div>

      <style jsx>{`
        .ty { min-height: 100dvh; background: var(--ink); display: grid; place-items: center; padding: 32px 20px; position: relative; overflow: hidden; }
        .ty-glow-a { position: absolute; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(182,136,63,0.15), transparent 65%); filter: blur(80px); top: -180px; left: -100px; pointer-events: none; }
        .ty-glow-b { position: absolute; width: 450px; height: 450px; border-radius: 50%; background: radial-gradient(circle, rgba(28,110,98,0.12), transparent 65%); filter: blur(70px); bottom: -160px; right: -80px; pointer-events: none; }
        .ty-card { max-width: 560px; width: 100%; background: rgba(244,239,230,0.04); border: 1px solid var(--line-d); border-radius: var(--r-lg); padding: 48px; position: relative; z-index: 2; display: flex; flex-direction: column; gap: 28px; }
        .ty-check { width: 58px; height: 58px; border-radius: 50%; background: rgba(28,110,98,0.12); border: 1px solid rgba(47,142,126,0.4); display: grid; place-items: center; }
        .ty-head { font-family: var(--display); font-weight: 360; font-size: clamp(28px, 4vw, 38px); color: var(--bone); letter-spacing: -0.012em; }
        .ty-sub { font-size: 15.5px; color: var(--bone-dim); line-height: 1.65; }
        .ty-sub strong { color: var(--bone); }
        .ty-steps { display: grid; gap: 1px; background: var(--line-d); border: 1px solid var(--line-d); border-radius: 12px; overflow: hidden; }
        .ty-step { background: rgba(11,26,40,0.4); padding: 14px 18px; display: flex; align-items: flex-start; gap: 14px; }
        .ty-n { font-family: var(--mono); font-size: 11px; color: var(--brass-bright); letter-spacing: 0.08em; flex-shrink: 0; padding-top: 2px; }
        .ty-st { font-size: 14px; color: var(--bone); font-weight: 600; }
        .ty-ss { font-size: 12.5px; color: var(--bone-faint); margin-top: 2px; }
        .ty-actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .ty-link { font-size: 13.5px; color: var(--bone-faint); transition: color 0.22s; }
        .ty-link:hover { color: var(--brass-bright); }
      `}</style>
    </div>
  )
}
