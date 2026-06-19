import fs from 'node:fs'
const BASE = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/public/concepts/'
const FILES = ['onyx.html', 'clinic.html', 'precision.html']

// Map old periwinkle/cobalt/cyan/gold -> Dr. Emami logo royal blue #0A84E6 + silver/chrome
const SWEEPS = [
  [/#6E8FFF/gi, '#0A84E6'],
  [/rgba\(110,\s*143,\s*255,/gi, 'rgba(10,132,230,'],
  [/#2F80ED/gi, '#0A84E6'],
  [/rgba\(47,\s*128,\s*237,/gi, 'rgba(10,132,230,'],
  [/#00D4FF/gi, '#3BC6FF'],
  [/rgba\(0,\s*212,\s*255,/gi, 'rgba(59,198,255,'],
  // gold -> silver/chrome
  [/#C9A24B/gi, '#C7CBD3'],
  [/rgba\(201,\s*162,\s*75,/gi, 'rgba(199,203,211,'],
]

for (const f of FILES) {
  const path = BASE + f
  let s = fs.readFileSync(path, 'utf8')
  let n = 0
  for (const [re, to] of SWEEPS) { const before = s; s = s.replace(re, to); if (s !== before) n++ }
  // clinic: accent TEXT on white needs a deeper blue for contrast
  if (f === 'clinic.html') {
    s = s.replace(/--accent-text:#0A84E6/gi, '--accent-text:#0A6FC4')
    s = s.replace(/--accent-deep:#0A84E6/gi, '--accent-deep:#0A6FC4')
  }
  fs.writeFileSync(path, s)
  console.log(`${f}: ${n}/${SWEEPS.length} sweep groups applied`)
}
console.log('DONE — royal blue #0A84E6 + silver/chrome.')
