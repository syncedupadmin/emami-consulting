'use client'

import { motion, useInView } from 'framer-motion'
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

export default function RevenueLadder() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="sec-pad rl-sec" id="pricing">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow" style={{ color: 'var(--brass-bright)' }}>
            <span className="num" style={{ color: 'var(--teal-soft)' }}>06</span>&nbsp; The Revenue Ladder
          </span>
          <h2 className="sec-title" style={{ color: 'var(--bone)' }}>
            Every engagement level is designed to earn back its cost.
          </h2>
          <p className="sec-sub" style={{ color: 'var(--bone-dim)' }}>
            Start with the Blueprint Sprint. Graduate to managed support. The ladder exists — practices simply climb it at their own pace.
          </p>
        </motion.div>

        <div className="rl-grid">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.label}
              className="rl-card"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.09, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -8 }}
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
                {t.ctaLabel} →
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .rl-sec { background: var(--ink); }
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
        .rl-unit { font-size: 0.55em; color: var(--bone-faint); }
        .rl-body { font-size: 13.5px; color: var(--bone-dim); line-height: 1.6; flex: 1; }
        .rl-cta { font-size: 13px; font-weight: 600; border: 1px solid; border-radius: 100px; padding: 8px 16px; align-self: flex-start; transition: all 0.25s; letter-spacing: 0.01em; }
        .rl-cta:hover { filter: brightness(1.2); }
        @media (max-width: 1024px) { .rl-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .rl-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
