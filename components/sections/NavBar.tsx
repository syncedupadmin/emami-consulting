'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

export default function NavBar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.86])
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1])
  const py = useTransform(scrollY, [0, 60], [20, 13])
  const bgColor = useTransform(bgOpacity, (v) => `rgba(11,26,40,${v})`)
  const borderColor = useTransform(borderOpacity, (v) => `1px solid rgba(244,239,230,${v * 0.15})`)

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900 }}>
      <motion.div
        style={{
          backgroundColor: bgColor,
          backdropFilter: 'blur(16px) saturate(1.3)',
          borderBottom: borderColor,
        }}
      >
        <motion.div
          style={{ paddingTop: py, paddingBottom: py }}
          className="nav-inner"
        >
          <a href="#top" className="brand" aria-label="Emami Consulting home">
            <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
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
            <a href="#problem">The Problem</a>
            <a href="#expert">The Expert</a>
            <a href="#offer">The Offer</a>
            <a href="#journey">How It Works</a>
            <MagneticButton href="/intake" className="nav-cta">
              Book a Roadmap Call
            </MagneticButton>
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .nav-inner {
          max-width: var(--maxw);
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 13px;
          color: var(--bone);
        }
        .brand-text { line-height: 1; }
        .brand-name {
          font-family: var(--display);
          font-weight: 400;
          font-size: 19px;
          letter-spacing: 0.01em;
          display: block;
          color: var(--bone);
        }
        .brand-sub {
          font-family: var(--mono);
          font-size: 9.5px;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: var(--bone-faint);
          margin-top: 3px;
          display: block;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
        }
        .nav-links a {
          font-size: 13.5px;
          color: var(--bone-dim);
          font-weight: 500;
          transition: color 0.25s;
          position: relative;
        }
        .nav-links a:hover { color: var(--bone); }
        .nav-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 1px;
          width: 0;
          background: var(--brass);
          transition: width 0.3s var(--ease);
        }
        .nav-links a:hover::after { width: 100%; }
        .nav-cta {
          padding: 10px 20px !important;
          border: 1px solid var(--line-d) !important;
          border-radius: 100px !important;
          color: var(--bone) !important;
          font-weight: 600 !important;
          transition: all 0.3s !important;
          font-size: 13.5px !important;
        }
        .nav-cta:hover {
          background: var(--brass) !important;
          color: var(--ink) !important;
          border-color: var(--brass) !important;
        }
        @media (max-width: 880px) {
          .nav-inner { padding-left: 20px; padding-right: 20px; }
          .nav-links a:not(.nav-cta) { display: none; }
          .brand-sub { display: none; }
          .brand-name { font-size: 16px; }
        }
      `}</style>
    </nav>
  )
}
