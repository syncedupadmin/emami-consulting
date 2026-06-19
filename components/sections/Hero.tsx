'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import MagneticButton from '@/components/ui/MagneticButton'

const HERO_VIDEO_DESKTOP = '/videos/hero-desktop.mp4'
const HERO_VIDEO_MOBILE = '/videos/hero-mobile.mp4'

const MARQUEE_ITEMS = [
  'Intraoral Scanners', 'CBCT Imaging', '3D Printing', 'Chairside Milling',
  'Guided Implant Surgery', 'Sedation Workflows', 'Dental AI', 'Digital Dentures',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()
  const [posterSrc, setPosterSrc] = useState('/videos/hero-desktop.mp4')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Overlay fades out as you scroll into video territory
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65], [1, 0.55, 0.1])
  // Hero content slides up and fades on first 35% of scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.38], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0.18, 0.38], [0, -50])

  // Scrub video.currentTime based on scroll progress
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const video = videoRef.current
    if (!video || prefersReducedMotion) return
    if (!video.paused) video.pause()
    const d = video.duration
    if (!d || !Number.isFinite(d)) return
    targetTimeRef.current = Math.min(Math.max(progress, 0), 1) * Math.max(d - 0.05, 0)
  })

  // RAF loop syncs actual currentTime to target
  useEffect(() => {
    if (prefersReducedMotion) return
    let rafId: number
    const tick = () => {
      const video = videoRef.current
      if (video && !video.seeking && Math.abs(video.currentTime - targetTimeRef.current) > 0.001) {
        video.currentTime = targetTimeRef.current
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [prefersReducedMotion])

  // Poster swap for mobile
  useEffect(() => {
    if (window.innerWidth < 768) setPosterSrc(HERO_VIDEO_MOBILE)
  }, [])

  function handleLoadedMetadata(e: React.SyntheticEvent<HTMLVideoElement>) {
    const video = e.currentTarget
    video.play().then(() => {
      video.pause()
      const d = video.duration
      if (d && Number.isFinite(d)) {
        video.currentTime = scrollYProgress.get() * Math.max(d - 0.05, 0)
      }
    }).catch(() => {
      const d = video.duration
      if (d && Number.isFinite(d)) {
        video.currentTime = scrollYProgress.get() * Math.max(d - 0.05, 0)
      }
    })
  }

  return (
    <section ref={sectionRef} style={{ height: '280vh', position: 'relative' }}>
      {/* Sticky viewport container */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'var(--ink)' }}>

        {/* VIDEO */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            muted
            playsInline
            preload="auto"
            poster={posterSrc}
            tabIndex={-1}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={HERO_VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
            <source src={HERO_VIDEO_DESKTOP} type="video/mp4" />
          </video>
        )}

        {/* GRADIENT OVERLAYS */}
        <motion.div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, opacity: overlayOpacity, pointerEvents: 'none', zIndex: 1 }}
        >
          {/* Desktop: left-heavy gradient */}
          <div className="hero-grad-desktop" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(11,26,40,0.97) 22%, rgba(11,26,40,0.78) 46%, rgba(11,26,40,0.18) 72%, transparent 100%)',
          }} />
          {/* Mobile: top+bottom */}
          <div className="hero-grad-mobile" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(11,26,40,0.95) 0%, rgba(11,26,40,0.52) 50%, rgba(11,26,40,0.90) 82%, rgba(11,26,40,1.0) 100%)',
          }} />
          {/* Ambient teal glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 60% 40%, rgba(28,110,98,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
        </motion.div>

        {/* Bottom fade into next section */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '180px',
          background: 'linear-gradient(to top, var(--ink) 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        {/* HERO CONTENT */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, position: 'relative', zIndex: 3, height: '100%' }}
        >
          <div className="wrap" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '80px' }}>
            <div className="hero-grid">
              {/* Left: headline */}
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <span className="hero-eyebrow">
                  <span className="dot" />
                  Dental Technology Roadmap Engine
                </span>
                <h1 style={{
                  fontFamily: 'var(--display)',
                  fontWeight: 330,
                  fontSize: 'clamp(42px, 6.0vw, 78px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.022em',
                  color: 'var(--bone)',
                  margin: '30px 0 0',
                }}>
                  Stop buying dental technology{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--brass-bright)', fontWeight: 360 }}>
                    without a roadmap.
                  </em>
                </h1>
                <p style={{
                  fontSize: 'clamp(17px, 1.7vw, 20px)',
                  color: 'var(--bone-dim)',
                  maxWidth: 540,
                  margin: '28px 0 0',
                  lineHeight: 1.62,
                }}>
                  A software-enabled consulting platform that turns expensive scanner, CBCT, milling, 3D-printing, sedation, and AI decisions into clear, expert-reviewed implementation plans — before the invoice lands.
                </p>
                <div style={{ display: 'flex', gap: 14, marginTop: 38, flexWrap: 'wrap' }}>
                  <MagneticButton href="/intake" className="btn btn-gold">
                    Build my roadmap <span style={{ transition: 'transform 0.3s' }}>→</span>
                  </MagneticButton>
                  <MagneticButton href="#problem" className="btn btn-ghost-d">
                    See the problem
                  </MagneticButton>
                </div>
                <div style={{
                  marginTop: 40, paddingTop: 26,
                  borderTop: '1px solid var(--line-d)',
                  display: 'flex', alignItems: 'center', gap: 16, maxWidth: 540,
                }}>
                  <div style={{
                    flexShrink: 0, width: 46, height: 46, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--brass), var(--brass-deep))',
                    display: 'grid', placeItems: 'center',
                    fontFamily: 'var(--display)', color: '#1a1407', fontSize: 20, fontWeight: 500,
                  }}>E</div>
                  <div style={{ fontSize: 13.5, color: 'var(--bone-dim)', lineHeight: 1.5 }}>
                    An expert decision system led by{' '}
                    <strong style={{ color: 'var(--bone)', fontWeight: 600 }}>Dr. Justin Emami, DDS</strong>{' '}
                    — Fellow, Misch International Implant Institute · Master, ICOI · CEREC same-day &amp; full-arch implant practitioner.
                  </div>
                </div>
              </motion.div>

              {/* Right: deliverable card */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35, type: 'spring', damping: 25, stiffness: 100 }}
                className="hero-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bone-faint)' }}>Dental Tech Implementation Roadmap</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 23, fontWeight: 400, color: 'var(--bone)', marginTop: 6 }}>3D Printing Readiness Plan</div>
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', color: 'var(--teal-soft)', border: '1px solid rgba(47,142,126,0.45)', borderRadius: 100, padding: '5px 10px', display: 'inline-flex', gap: 6, alignItems: 'center' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal-soft)', display: 'inline-block' }} />
                    EXPERT QC
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '4px 0 18px' }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 46, fontWeight: 400, color: 'var(--brass-bright)', lineHeight: 1 }}>72</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--bone-faint)' }}>/ 100 readiness</span>
                </div>
                <div style={{ height: 5, borderRadius: 4, background: 'rgba(244,239,230,0.12)', overflow: 'hidden', marginBottom: 20 }}>
                  <div style={{ height: '100%', width: '72%', background: 'linear-gradient(90deg, var(--teal-soft), var(--brass-bright))', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'grid', gap: 1, background: 'var(--line-d)', border: '1px solid var(--line-d)', borderRadius: 12, overflow: 'hidden' }}>
                  {[
                    { k: 'Hidden dependencies', v: 'Design SW · resin · lab partner · CE' },
                    { k: 'Budget range', v: '$18K – $42K total path' },
                    { k: 'Timeline', v: '30 / 60 / 90 — pilot to production' },
                  ].map((row) => (
                    <div key={row.k} style={{ background: 'var(--ink)', padding: '13px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bone-faint)' }}>{row.k}</span>
                      <span style={{ fontSize: 13, color: 'var(--bone)', textAlign: 'right', fontWeight: 500 }}>{row.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.1em', color: 'var(--bone-faint)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  ◦ AI-ASSISTED &nbsp;·&nbsp; EXPERT-REVIEWED &nbsp;·&nbsp; DEFENSIBLE
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* MARQUEE STRIP — stays visible through scroll */}
        <div className="hero-strip" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4 }}>
          <div className="track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="it">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.18fr 0.92fr;
          gap: 56px;
          align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          font-family: var(--mono);
          font-size: 11.5px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--brass-bright);
          padding: 8px 16px;
          border: 1px solid var(--line-d);
          border-radius: 100px;
          background: rgba(244,239,230,0.03);
        }
        .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--teal-soft);
          box-shadow: 0 0 0 4px rgba(47,142,126,0.25);
          display: inline-block;
        }
        .hero-card {
          background: linear-gradient(165deg, rgba(244,239,230,0.07), rgba(244,239,230,0.02));
          border: 1px solid var(--line-d);
          border-radius: var(--r-lg);
          padding: 26px;
          backdrop-filter: blur(6px);
          box-shadow: var(--shadow-lg);
        }
        .hero-strip {
          border-top: 1px solid var(--line-d);
          border-bottom: 1px solid var(--line-d);
          overflow: hidden;
          background: rgba(0,0,0,0.12);
        }
        .track {
          display: flex;
          white-space: nowrap;
          animation: marq 38s linear infinite;
          width: max-content;
        }
        .it {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--bone-faint);
          padding: 16px 30px;
          display: inline-flex;
          align-items: center;
          gap: 30px;
        }
        .it::after { content: "◦"; color: var(--brass); }
        @keyframes marq { to { transform: translateX(-50%); } }

        /* desktop gradient visible, mobile hidden */
        .hero-grad-desktop { display: block; }
        .hero-grad-mobile { display: none; }

        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr; gap: 34px; }
          .hero-grad-desktop { display: none; }
          .hero-grad-mobile { display: block; }
        }
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none; }
        }
      `}</style>
    </section>
  )
}
