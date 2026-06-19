'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function NavBar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.88])
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1])
  const py = useTransform(scrollY, [0, 60], [20, 13])
  const bgColor = useTransform(bgOpacity, (v) => `rgba(11,26,40,${v})`)
  const borderColor = useTransform(borderOpacity, (v) => `1px solid rgba(244,239,230,${v * 0.15})`)

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900, maxWidth: '100vw', overflowX: 'clip' }}>
      <motion.div
        style={{
          backgroundColor: bgColor,
          backdropFilter: 'blur(16px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
          borderBottom: borderColor,
        }}
      >
        <motion.div
          style={{ paddingTop: py, paddingBottom: py }}
          className="nav-inner"
        >
          <a href="#main" className="brand" aria-label="Emami Consulting home">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true" className="brand-mark">
              <circle cx="17" cy="17" r="16" stroke="#B6883F" strokeWidth="1" />
              <circle cx="9" cy="22" r="2.4" fill="#CDA251" />
              <circle cx="25" cy="12" r="2.4" fill="#2F8E7E" />
              <path d="M9 22 L17 17 L25 12" stroke="#B6883F" strokeWidth="1.1" />
              <path d="M17 17 L17 9" stroke="#B6883F" strokeWidth="1.1" />
              <circle cx="17" cy="9" r="2" fill="#CDA251" />
            </svg>
            <span className="brand-text">
              <span className="brand-name">Emami Consulting</span>
              <span className="brand-sub">Dental Tech Advisory</span>
            </span>
          </a>
          <div className="nav-links">
            <a href="#problem" className="nav-link">The Problem</a>
            <a href="#expert" className="nav-link">The Expert</a>
            <a href="#offer" className="nav-link">The Offer</a>
            <a href="#journey" className="nav-link">How It Works</a>
            <MagneticButton href="/intake" className="nav-cta">
              <span className="cta-full">Book a Roadmap Call</span>
              <span className="cta-short">Book a Call</span>
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>
    </nav>
  )
}
