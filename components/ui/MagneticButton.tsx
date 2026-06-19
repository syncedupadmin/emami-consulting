'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  style?: React.CSSProperties
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 18 })
  const springY = useSpring(y, { stiffness: 180, damping: 18 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  const motionProps = {
    ref,
    style: { x: springX, y: springY, display: 'inline-block', ...style },
    onMouseMove,
    onMouseLeave,
    whileTap: { scale: 0.96 },
  }

  if (href) {
    return (
      <motion.div {...motionProps}>
        <a href={href} className={className}>
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.div {...motionProps}>
      <button onClick={onClick} className={className} type="button">
        {children}
      </button>
    </motion.div>
  )
}
