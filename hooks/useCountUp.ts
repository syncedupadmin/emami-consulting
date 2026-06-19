'use client'

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion'

export function useCountUp(target: number, duration = 1.4) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, target, {
      duration,
      ease: [0.22, 0.61, 0.36, 1],
    })
    return () => controls.stop()
  }, [isInView, target, duration, count])

  return { ref, rounded }
}
