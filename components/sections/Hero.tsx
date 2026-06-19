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
const POSTER_DESKTOP = '/videos/hero-desktop-poster.jpg'
const POSTER_MOBILE = '/videos/hero-mobile-poster.jpg'
const FPS = 24

const MARQUEE_ITEMS = [
  'Intraoral Scanners', 'CBCT Imaging', '3D Printing', 'Chairside Milling',
  'Guided Implant Surgery', 'Sedation Workflows', 'Dental AI', 'Digital Dentures',
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  const [poster, setPoster] = useState(POSTER_DESKTOP)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.65], [1, 0.85, 0.5])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.38], [1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0.18, 0.38], [0, -50])

  // Detect viewport class + reduced-motion to decide scrub vs ambient-loop
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 880px)')
    const apply = () => setIsMobile(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    if (window.innerWidth < 768) setPoster(POSTER_MOBILE)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const scrubEnabled = !prefersReducedMotion && !isMobile
  const ambientLoop = !prefersReducedMotion && isMobile

  // Map scroll progress → target video time (quantized to frame boundaries)
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!scrubEnabled) return
    const video = videoRef.current
    if (!video) return
    const d = video.duration
    if (!d || !Number.isFinite(d)) return
    const raw = Math.min(Math.max(progress, 0), 1) * Math.max(d - 0.05, 0)
    targetTimeRef.current = Math.round(raw * FPS) / FPS
  })

  // RAF loop: ease currentTime toward target. All-keyframe encode makes each
  // seek instant; lerp + half-frame deadband keeps it buttery, no per-event pause.
  useEffect(() => {
    if (!scrubEnabled) return
    let rafId: number
    const tick = () => {
      const video = videoRef.current
      if (video && video.readyState >= 1 && !video.seeking) {
        const d = video.duration
        if (d && Number.isFinite(d)) {
          const cur = video.currentTime
          const target = targetTimeRef.current
          const delta = target - cur
          if (Math.abs(delta) > 1 / FPS / 2) {
            video.currentTime = cur + delta * 0.22
          } else if (cur !== target) {
            video.currentTime = target
          }
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [scrubEnabled])

  function handleLoadedMetadata(e: React.SyntheticEvent<HTMLVideoElement>) {
    if (!scrubEnabled) return
    const video = e.currentTarget
    const d = video.duration
    if (d && Number.isFinite(d)) {
      video.currentTime = scrollYProgress.get() * Math.max(d - 0.05, 0)
    }
  }

  return (
    <section ref={sectionRef} className="hero-section">
      <div className="hero-sticky">

        {/* MEDIA */}
        {prefersReducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
        ) : (
          <video
            ref={videoRef}
            className="hero-video"
            muted
            playsInline
            preload="auto"
            poster={poster}
            tabIndex={-1}
            autoPlay={ambientLoop}
            loop={ambientLoop}
            onLoadedMetadata={handleLoadedMetadata}
          >
            <source src={HERO_VIDEO_MOBILE} type="video/mp4" media="(max-width: 767px)" />
            <source src={HERO_VIDEO_DESKTOP} type="video/mp4" />
          </video>
        )}

        {/* GRADIENT OVERLAYS — lighter so the footage reads as cinematic */}
        <motion.div
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, opacity: scrubEnabled ? overlayOpacity : 1, pointerEvents: 'none', zIndex: 1 }}
        >
          <div className="hero-grad-desktop" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(11,26,40,0.93) 0%, rgba(11,26,40,0.72) 36%, rgba(11,26,40,0.34) 62%, rgba(11,26,40,0.08) 86%, rgba(11,26,40,0) 100%)',
          }} />
          <div className="hero-grad-mobile" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(11,26,40,0.86) 0%, rgba(11,26,40,0.48) 42%, rgba(11,26,40,0.80) 78%, rgba(11,26,40,0.96) 100%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 64% 42%, rgba(28,110,98,0.18) 0%, transparent 68%)',
            filter: 'blur(80px)',
          }} />
        </motion.div>

        {/* Bottom fade into next section */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
          background: 'linear-gradient(to top, var(--ink) 0%, transparent 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />

        {/* HERO CONTENT */}
        <motion.div
          style={{
            opacity: scrubEnabled ? contentOpacity : 1,
            y: scrubEnabled ? contentY : 0,
            position: 'relative', zIndex: 3, height: '100%',
          }}
        >
          <div className="wrap-wide hero-inner">
            <div className="hero-grid">
              {/* Left: headline */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <span className="hero-eyebrow">
                  <span className="dot" />
                  Dental Technology Roadmap Engine
                </span>
                <h1 className="hero-h1">
                  Stop buying dental technology{' '}
                  <em>without a roadmap.</em>
                </h1>
                <p className="hero-sub">
                  A software-enabled consulting platform that turns expensive scanner, CBCT, milling, 3D-printing, sedation, and AI decisions into clear, expert-reviewed implementation plans — before the invoice lands.
                </p>
                <div className="hero-ctas">
                  <MagneticButton href="/intake" className="btn btn-gold">
                    Build my roadmap <span aria-hidden="true">→</span>
                  </MagneticButton>
                  <MagneticButton href="#problem" className="btn btn-ghost-d">
                    See the problem
                  </MagneticButton>
                </div>
                <div className="hero-trust">
                  <div className="hero-trust-mark" aria-hidden="true">E</div>
                  <div className="hero-trust-text">
                    An expert decision system led by{' '}
                    <strong>Dr. Justin Emami, DDS</strong>{' '}
                    — Fellow, Misch International Implant Institute · Master, ICOI · CEREC same-day &amp; full-arch implant practitioner.
                  </div>
                </div>
              </motion.div>

              {/* Right: deliverable card (desktop only) */}
              <div className="hero-card-wrap">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.35, type: 'spring', damping: 25, stiffness: 100 }}
                className="hero-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bone-quiet)' }}>Dental Tech Implementation Roadmap</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 23, fontWeight: 400, color: 'var(--bone)', marginTop: 6 }}>3D Printing Readiness Plan</div>
                  </div>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.16em', color: 'var(--teal-soft)', border: '1px solid rgba(47,142,126,0.45)', borderRadius: 100, padding: '5px 10px', display: 'inline-flex', gap: 6, alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--teal-soft)', display: 'inline-block' }} />
                    EXPERT QC
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '4px 0 18px' }}>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 46, fontWeight: 400, color: 'var(--brass-bright)', lineHeight: 1 }}>72</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--bone-quiet)' }}>/ 100 readiness</span>
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
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--bone-quiet)' }}>{row.k}</span>
                      <span style={{ fontSize: 13, color: 'var(--bone)', textAlign: 'right', fontWeight: 500 }}>{row.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '0.1em', color: 'var(--bone-quiet)', display: 'flex', gap: 8, alignItems: 'center' }}>
                  ◦ AI-ASSISTED &nbsp;·&nbsp; EXPERT-REVIEWED &nbsp;·&nbsp; DEFENSIBLE
                </div>
              </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* MARQUEE STRIP */}
        <div className="hero-strip" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4 }}>
          <div className="track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span key={i} className="it">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section { height: 280vh; position: relative; }
        .hero-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          background: var(--ink);
        }
        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(1.06) contrast(1.04) brightness(0.97);
        }
        .hero-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
        }
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
        .hero-h1 {
          font-family: var(--display);
          font-weight: 420;
          font-variation-settings: "opsz" 144, "SOFT" 0, "WONK" 0;
          font-size: clamp(38px, 6.4vw, 86px);
          line-height: 0.98;
          letter-spacing: -0.024em;
          color: var(--bone);
          margin: 28px 0 0;
        }
        .hero-h1 em {
          font-style: italic;
          color: var(--brass-bright);
          font-weight: 460;
          font-variation-settings: "opsz" 144, "WONK" 1;
        }
        .hero-sub {
          font-size: clamp(16.5px, 1.6vw, 20px);
          color: var(--bone-dim);
          max-width: 540px;
          margin: 26px 0 0;
          line-height: 1.62;
        }
        .hero-ctas { display: flex; gap: 14px; margin-top: 36px; flex-wrap: wrap; }
        .hero-trust {
          margin-top: 38px; padding-top: 26px;
          border-top: 1px solid var(--line-d);
          display: flex; align-items: center; gap: 16px; max-width: 540px;
        }
        .hero-trust-mark {
          flex-shrink: 0; width: 46px; height: 46px; border-radius: 50%;
          background: linear-gradient(135deg, var(--brass), var(--brass-deep));
          display: grid; place-items: center;
          font-family: var(--display); color: #1a1407; font-size: 20px; font-weight: 500;
        }
        .hero-trust-text { font-size: 13.5px; color: var(--bone-dim); line-height: 1.5; }
        .hero-trust-text strong { color: var(--bone); font-weight: 600; }
        .hero-card {
          background: linear-gradient(165deg, rgba(244,239,230,0.08), rgba(244,239,230,0.02));
          border: 1px solid var(--line-d);
          border-radius: var(--r-lg);
          padding: 26px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: var(--shadow-lg);
        }
        .hero-strip {
          border-top: 1px solid var(--line-d);
          border-bottom: 1px solid var(--line-d);
          overflow: hidden;
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
        .track {
          display: flex;
          white-space: nowrap;
          animation: marq 90s linear infinite;
          width: max-content;
        }
        .it {
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--bone-quiet);
          padding: 16px 30px;
          display: inline-flex;
          align-items: center;
          gap: 30px;
        }
        .it::after { content: "◦"; color: var(--brass); }
        @keyframes marq { to { transform: translateX(-50%); } }

        .hero-grad-desktop { display: block; }
        .hero-grad-mobile { display: none; }

        @media (max-width: 880px) {
          .hero-section { height: auto; }
          .hero-sticky { position: relative; height: auto; min-height: 100vh; min-height: 100dvh; }
          .hero-inner {
            justify-content: center;
            padding-top: max(88px, calc(env(safe-area-inset-top) + 80px));
            padding-bottom: 76px;
          }
          .hero-grid { grid-template-columns: 1fr; gap: 0; }
          .hero-card-wrap { display: none; }
          .hero-grad-desktop { display: none; }
          .hero-grad-mobile { display: block; }
          .hero-sub { max-width: 100%; }
          .hero-trust { max-width: 100%; }
        }
        @media (max-width: 420px) {
          .hero-trust-text { font-size: 12.5px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .track { animation: none; transform: none; }
        }
      `}</style>
    </section>
  )
}
