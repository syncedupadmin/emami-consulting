'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const TIERS = [
  {
    label: 'Blueprint Sprint',
    price: '$8,500',
    note: 'One-time',
    color: 'var(--brass)',
    body: 'The diagnostic engagement. Full roadmap delivered in 5 business days. No retainer required.',
    cta: '/intake',
    ctaLabel: 'Start Sprint',
  },
  {
    label: 'Advisory Managed',
    price: '$750',
    note: '/month',
    color: 'var(--teal-soft)',
    body: 'Monthly check-ins, plan adjustments, vendor management support, and implementation guidance.',
    cta: 'mailto:nick@syncedupsolutions.com',
    ctaLabel: 'Inquire',
  },
  {
    label: 'MVP Build',
    price: '$25K–45K',
    note: 'scoped',
    color: 'var(--plum)',
    body: 'Full implementation assistance — vendor negotiation, team training, workflow design, integration.',
    cta: 'mailto:nick@syncedupsolutions.com',
    ctaLabel: 'Inquire',
  },
  {
    label: 'Custom Engagement',
    price: 'Custom',
    note: '',
    color: 'var(--brass-bright)',
    body: 'DSO-level advisory, multi-practice rollouts, or complex technology transformation projects.',
    cta: 'mailto:nick@syncedupsolutions.com',
    ctaLabel: 'Contact',
  },
]

function ArrowIcon() {
  return (
    <svg
      className="rl-arrow"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export default function RevenueLadder() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()

  return (
    <section ref={ref} className="sec-pad rl-sec" id="pricing">
      <div className="wrap">
        <div className="head-wrap">
          <span className="sec-index sec-index--dark" aria-hidden="true">06</span>
          <motion.div
            className="sec-head"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', damping: 25, stiffness: 110 }}
          >
            <span className="eyebrow eyebrow--dark">
              <span className="num">06</span>&nbsp; The Revenue Ladder
            </span>
            <h2 className="sec-title" style={{ color: 'var(--bone)' }}>
              Every engagement level is designed to earn back its cost.
            </h2>
            <p className="sec-sub" style={{ color: 'var(--bone-dim)' }}>
              Start with the Blueprint Sprint. Graduate to managed support. The ladder exists — practices simply climb it at their own pace.
            </p>
          </motion.div>
        </div>

        <div className="rl-grid">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.label}
              className="rl-card"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', damping: 25, stiffness: 110, delay: i * 0.06 }}
              whileHover={reduce ? undefined : { y: -8 }}
            >
              <div className="rl-accent" style={{ background: t.color }} />
              <div className="rl-top">
                <span className="rl-label" style={{ color: t.color }}>{t.label}</span>
                <div className="rl-price">
                  {t.price}
                  {t.note && <span className="rl-unit"> {t.note}</span>}
                </div>
              </div>
              <p className="rl-body">{t.body}</p>
              <a href={t.cta} className="rl-cta" style={{ borderColor: t.color, color: t.color }}>
                {t.ctaLabel} <ArrowIcon />
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rl-sec { background: var(--ink); }
        .head-wrap { position: relative; }
        .head-wrap :global(.sec-index) { top: -0.32em; }
        .rl-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 56px; }
        .rl-card {
          background: rgba(244,239,230,0.04);
          border: 1px solid var(--line-d);
          border-radius: var(--r-lg);
          padding: 28px;
          display: flex; flex-direction: column; gap: 16px;
          cursor: default;
          transition: background 0.3s, border-color 0.3s;
          position: relative;
          overflow: hidden;
        }
        .rl-card:hover { background: rgba(244,239,230,0.07); border-color: rgba(244,239,230,0.28); }
        .rl-accent { position: absolute; top: 0; left: 0; right: 0; height: 2px; border-radius: 2px 2px 0 0; }
        .rl-top { padding-top: 12px; }
        .rl-label { font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; display: block; margin-bottom: 10px; }
        .rl-price { font-family: var(--display); font-size: clamp(22px, 2.4vw, 28px); color: var(--bone); font-weight: 380; line-height: 1; }
        .rl-unit { font-size: 0.55em; color: var(--bone-quiet); }
        .rl-body { font-size: 13.5px; color: var(--bone-dim); line-height: 1.6; flex: 1; }
        .rl-cta {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          min-height: 44px;
          font-size: 13px; font-weight: 600;
          border: 1px solid; border-radius: 100px;
          padding: 8px 18px; align-self: flex-start;
          transition: all 0.25s; letter-spacing: 0.01em;
        }
        .rl-cta :global(.rl-arrow) { transition: transform 0.25s var(--ease); }
        .rl-cta:hover { filter: brightness(1.2); }
        .rl-cta:hover :global(.rl-arrow) { transform: translateX(3px); }
        @media (max-width: 1024px) { .rl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) {
          .rl-grid { grid-template-columns: 1fr; }
          .rl-cta { align-self: stretch; width: 100%; }
        }
      `}</style>
    </section>
  )
}
