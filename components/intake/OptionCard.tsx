'use client'

import { motion } from 'framer-motion'

interface OptionCardProps {
  label: string
  description?: string
  selected: boolean
  onSelect: () => void
}

export default function OptionCard({ label, description, selected, onSelect }: OptionCardProps) {
  return (
    <motion.button
      className={`opt${selected ? ' opt-sel' : ''}`}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
    >
      <motion.div
        className="opt-highlight"
        initial={false}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <div className="opt-check">
        <motion.span
          initial={false}
          animate={{ scale: selected ? 1 : 0, opacity: selected ? 1 : 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
        >
          ✓
        </motion.span>
      </div>
      <div className="opt-text">
        <span className="opt-label">{label}</span>
        {description && <span className="opt-desc">{description}</span>}
      </div>

      <style jsx>{`
        .opt {
          background: var(--bone-2);
          border: 1.5px solid var(--line);
          border-radius: var(--r);
          padding: 18px 20px;
          text-align: left;
          cursor: pointer;
          font-family: var(--ui);
          display: flex;
          align-items: flex-start;
          gap: 14px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.22s, background 0.22s;
          width: 100%;
        }
        .opt:hover { border-color: var(--brass); background: #fff; }
        .opt-sel { border-color: var(--brass) !important; background: #fff !important; }
        .opt-highlight {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(182,136,63,0.07), transparent 60%);
          pointer-events: none;
        }
        .opt-check {
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 1.5px solid var(--line-strong);
          display: grid; place-items: center;
          flex-shrink: 0;
          background: var(--bone-2);
          transition: border-color 0.22s, background 0.22s;
          font-size: 13px;
          color: var(--ink);
        }
        .opt-sel .opt-check { background: var(--brass); border-color: var(--brass); color: #fff; }
        .opt-label { font-weight: 600; font-size: 14.5px; color: var(--ink); display: block; }
        .opt-desc { font-size: 12.5px; color: var(--slate); margin-top: 3px; display: block; line-height: 1.5; }
      `}</style>
    </motion.button>
  )
}
