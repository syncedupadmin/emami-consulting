'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const PILLARS = [
  { num: '01 · Diagnose', title: 'Decision clarity', body: 'Help the practice understand what they actually need — and in what order — before buying.' },
  { num: '02 · Plan', title: 'Implementation plan', body: 'Translate the goal into cost, dependencies, training, workflow, timeline, and next steps.' },
  { num: '03 · Support', title: 'Ongoing guidance', body: 'Convert the roadmap into monthly support, check-ins, and implementation adjustments.' },
]

export default function CoreRead() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="sec-pad" id="core">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow"><span className="num">01</span>&nbsp; The Core Read</span>
          <h2 className="sec-title">
            The website is the front door.{' '}
            <em style={{ fontFamily: 'var(--display)', fontStyle: 'italic', color: 'var(--brass-deep)' }}>
              The roadmap system is the business.
            </em>
          </h2>
          <p className="sec-sub">
            This is not a generic dental website. It is an expert decision system for practices about to spend serious money on technology — diagnose the goal, draft the plan, review it with expert judgment, deliver it, then support implementation.
          </p>
        </motion.div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.num}
              className="pillar"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -5 }}
            >
              <div className="pillar-num">{p.num}</div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-body">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="quote-band"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="quote-glow" aria-hidden="true" />
          <p>
            Dentists don&apos;t lack technology. They lack a{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brass-bright)' }}>trusted, vendor-neutral plan</em>
            {' '}for buying, sequencing, and actually using it. Emami Consulting sells the one thing the equipment reps can&apos;t:{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brass-bright)' }}>clarity before the spend.</em>
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        .pillars { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; margin-top: 60px; }
        .pillar {
          background: var(--bone-2);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 30px 28px;
          position: relative;
          overflow: hidden;
          cursor: default;
        }
        .pillar::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--brass);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.45s var(--ease);
        }
        .pillar:hover::before { transform: scaleX(1); }
        .pillar:hover { background: #fff; box-shadow: var(--shadow); }
        .pillar-num { font-family: var(--mono); font-size: 12px; color: var(--teal); letter-spacing: 0.1em; }
        .pillar-title { font-family: var(--display); font-weight: 400; font-size: 22px; margin: 16px 0 10px; letter-spacing: -0.01em; }
        .pillar-body { font-size: 14.5px; color: var(--slate); line-height: 1.6; }
        .quote-band {
          margin-top: 58px;
          background: var(--ink);
          color: var(--bone);
          border-radius: var(--r-lg);
          padding: clamp(34px, 5vw, 60px);
          position: relative;
          overflow: hidden;
        }
        .quote-glow {
          position: absolute;
          width: 380px; height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(182,136,63,0.3), transparent 65%);
          filter: blur(70px);
          bottom: -160px; right: -100px;
        }
        .quote-band p {
          font-family: var(--display);
          font-weight: 330;
          font-size: clamp(22px, 3vw, 34px);
          line-height: 1.28;
          letter-spacing: -0.012em;
          position: relative;
          z-index: 2;
          max-width: 880px;
        }
        @media (max-width: 820px) { .pillars { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}
