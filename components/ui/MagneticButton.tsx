'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  style?: React.CSSProperties
  block?: boolean
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  style,
  block,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [isCoarse, setIsCoarse] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.4 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsCoarse(window.matchMedia('(hover: none), (pointer: coarse)').matches)
  }, [])

  const magneticEnabled = !prefersReducedMotion && !isCoarse

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!magneticEnabled) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.18)
    y.set((e.clientY - cy) * 0.18)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const isBlock = block || style?.width === '100%' || style?.display === 'block'
  const display = isBlock ? 'block' : 'inline-block'

  const motionProps = {
    ref,
    style: {
      x: magneticEnabled ? springX : 0,
      y: magneticEnabled ? springY : 0,
      display,
      touchAction: 'manipulation' as const,
      ...style,
    },
    onMouseMove,
    onMouseLeave,
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
  }

  const innerStyle: React.CSSProperties = isBlock ? { width: '100%' } : {}

  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={className} style={innerStyle}>
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div {...motionProps}>
      <button onClick={onClick} className={className} type="button" style={innerStyle}>
        {children}
      </button>
    </motion.div>
  )
}
