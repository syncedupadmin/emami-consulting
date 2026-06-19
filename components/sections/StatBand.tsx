'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '@/hooks/useCountUp'

interface StatProps {
  value: number
  unit: string
  prefix?: string
  label: string
  delay: number
}

function Stat({ value, unit, prefix, label, delay }: StatProps) {
  const { ref, rounded } = useCountUp(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={containerRef}
      className="stat"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="stat-n">
        {prefix && <span className="stat-u">{prefix}</span>}
        <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
          <motion.span>{rounded}</motion.span>
        </span>
        <span className="stat-u">{unit}</span>
      </div>
      <div className="stat-l">{label}</div>

      <style jsx>{`
        .stat { padding: 44px 30px; border-right: 1px solid var(--line); position: relative; }
        .stat:last-child { border-right: none; }
        .stat-n {
          font-family: var(--display);
          font-weight: 380;
          font-size: clamp(34px, 4vw, 50px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        .stat-u { color: var(--brass-deep); font-size: 0.62em; }
        .stat-l { margin-top: 12px; font-size: 13.5px; color: var(--slate); line-height: 1.5; max-width: 230px; }
        @media (max-width: 820px) { .stat { border-right: none; border-bottom: 1px solid var(--line); } .stat:last-child { border-bottom: none; } }
        @media (max-width: 820px) { .stat:nth-child(odd) { border-right: 1px solid var(--line); } .stat:nth-child(4) { border-bottom: none; } }
      `}</style>
    </motion.div>
  )
}

export default function StatBand() {
  return (
    <section style={{ background: 'var(--bone-2)', borderBottom: '1px solid var(--line)' }}>
      <div className="wrap">
        <div className="stats-grid">
          <Stat value={150} unit="K" prefix="$" label="A single CBCT can run $50K–$150K — before training, integration, or ROI." delay={0} />
          <Stat value={129} unit="K" label="A chairside CEREC milling system ≈ $129,000, typically financed over ~4 years." delay={0.08} />
          <Stat value={34} unit="%" label="Only ~34% of technology buyers achieve a smooth purchase and rollout." delay={0.16} />
          <Stat value={60} unit="%" label="~60% of buyers regret a major tech purchase; most cite cost and integration." delay={0.24} />
        </div>
      </div>
      <style jsx>{`
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 820px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  )
}
