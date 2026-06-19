'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const HIDDEN_COSTS = [
  { color: 'var(--brass)', title: 'Add-ons', body: 'Accessories & extras the rep forgot to mention.' },
  { color: '#5fa0d6', title: 'Training', body: 'Doctor & team need a real, practical CE path.' },
  { color: 'var(--teal-soft)', title: 'Workflow', body: 'Who does what, when, and how — every case.' },
  { color: 'var(--plum)', title: 'Vendors', body: 'Design, lab, software, and support partners.' },
  { color: 'var(--teal)', title: 'Integration', body: 'CRM, scheduling, imaging & PM systems.' },
  { color: 'var(--rose)', title: 'ROI path', body: 'How — and when — it turns into production.' },
]

export default function Problem() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="sec-pad problem" id="problem">
      <div className="wrap">
        <motion.div
          className="sec-head"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="eyebrow" style={{ color: 'var(--brass-bright)' }}>
            <span style={{ background: 'var(--brass-bright)', display: 'inline-block', width: 26, height: 1 }} />
            &nbsp;<span className="num" style={{ color: 'var(--teal-soft)' }}>02</span>&nbsp; The Expensive Problem
          </span>
          <h2 className="sec-title" style={{ color: 'var(--bone)' }}>
            Dental tech purchases hide the real implementation cost.
          </h2>
          <p className="sec-sub" style={{ color: 'var(--bone-dim)' }}>
            The buyer sees the device on the sales table. The practice later discovers the training, workflow, accessories, vendors, integration, and ROI path — the part nobody quoted.
          </p>
        </motion.div>

        <div className="prob-layout">
          <motion.div
            className="visible-buy"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <span className="vb-tag">What the rep shows you</span>
            <div className="vb-list">
              Scanner.<br />3D&nbsp;Printer.<br />CBCT.<br />Milling&nbsp;Unit.
            </div>
            <div>
              <div className="vb-note">&ldquo;Looks simple at the sales table.&rdquo;</div>
              <div className="vb-price">◦ $5K – $150K+ sticker · 18–36 mo to ROI</div>
            </div>
          </motion.div>

          <div className="hidden-grid">
            {HIDDEN_COSTS.map((c, i) => (
              <motion.div
                key={c.title}
                className="hcost"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.07, ease: [0.22, 0.61, 0.36, 1] }}
                whileHover={{ y: -3, backgroundColor: 'rgba(244,239,230,0.07)' }}
              >
                <span style={{ display: 'block', width: 9, height: 9, borderRadius: '50%', background: c.color, marginBottom: 14 }} />
                <h4 style={{ fontSize: 15, color: 'var(--bone)', fontWeight: 600, marginBottom: 6 }}>{c.title}</h4>
                <p style={{ fontSize: 12.5, color: 'var(--bone-faint)', lineHeight: 1.5 }}>{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="prob-foot"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <span className="pill">The &ldquo;expensive furniture&rdquo; trap</span>
          <span>When the workflow never comes together and the team never gets trained, six-figure equipment becomes furniture. A single wrong $70K outlay compounds to ~$470K in forgone wealth by retirement.</span>
        </motion.div>
      </div>

      <style jsx>{`
        .problem { background: var(--ink); color: var(--bone); }
        .prob-layout { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 30px; margin-top: 56px; align-items: stretch; }
        .visible-buy {
          background: linear-gradient(165deg, rgba(28,110,98,0.16), rgba(244,239,230,0.02));
          border: 1px solid var(--line-d);
          border-radius: var(--r-lg);
          padding: 34px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .vb-tag { font-family: var(--mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--teal-soft); border: 1px solid rgba(47,142,126,0.4); padding: 7px 14px; border-radius: 100px; align-self: flex-start; }
        .vb-list { font-family: var(--display); font-weight: 360; font-size: clamp(28px, 3.6vw, 42px); line-height: 1.18; margin: 26px 0; letter-spacing: -0.015em; }
        .vb-note { font-size: 13.5px; color: var(--bone-faint); font-style: italic; }
        .vb-price { margin-top: 18px; font-family: var(--mono); font-size: 13px; color: var(--brass-bright); letter-spacing: 0.04em; }
        .hidden-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .hcost { background: rgba(244,239,230,0.035); border: 1px solid var(--line-d); border-radius: var(--r); padding: 20px; cursor: default; transition: border-color 0.3s; }
        .hcost:hover { border-color: rgba(244,239,230,0.28); }
        .prob-foot { margin-top: 30px; display: flex; align-items: center; gap: 16px; flex-wrap: wrap; font-size: 14.5px; color: var(--bone-dim); }
        .pill { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--brass-bright); border: 1px solid var(--line-d); border-radius: 100px; padding: 8px 16px; flex-shrink: 0; }
        @media (max-width: 820px) { .prob-layout { grid-template-columns: 1fr; } .hidden-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </section>
  )
}
