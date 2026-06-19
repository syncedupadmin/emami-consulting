import fs from 'node:fs'

const ENV = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/SyncedUpWebsites/.env.local'
const key = (fs.readFileSync(ENV, 'utf8').match(/GEMINI_API_KEY\s*=\s*"?([^"\r\n]+)"?/) || [])[1]
if (!key) { console.log('NO KEY'); process.exit(1) }
const redact = (s) => String(s).split(key).join('[KEY]')

const DIR = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/public/logos'
const OUT = DIR + '/lockups'
fs.mkdirSync(OUT, { recursive: true })
const REF = fs.readFileSync(DIR + '/1-diamond.png').toString('base64')
const MODEL = 'gemini-3-pro-image-preview'

const TRANSPARENT = 'CRITICAL BACKGROUND: fill the ENTIRE background behind the logo with a single SOLID FLAT pure magenta color #FF00FF (RGB 255,0,255), like a chroma-key green screen. Do NOT draw a transparency checkerboard pattern. Do NOT use white, grey, or black for the background. The magenta must be a perfectly uniform solid fill edge to edge, with no gradient and no shadow. Keep the logo colors exactly (royal blue, silver/chrome, and the text). Crisp clean anti-aliased edges. Spell all text EXACTLY.'

const JOBS = [
  { slug: 'mark', ar: '1:1', text: `Using ONLY the faceted blue-and-silver DIAMOND from the attached logo (ignore and remove all text), output that diamond mark alone, centered, large. ${TRANSPARENT}` },
  { slug: 'horizontal-light', ar: '16:9', text: `Create a clean HORIZONTAL logo lockup using the diamond from the attached logo: the faceted blue/silver diamond mark on the LEFT, and to its right the wordmark "EMAMI CONSULTING" in a modern uppercase sans-serif in WHITE, with a smaller "DENTAL TECHNOLOGY ADVISORY" tagline in light silver-grey beneath the wordmark, left-aligned, vertically centered with the mark. Balanced spacing. This version is for DARK backgrounds. ${TRANSPARENT}` },
  { slug: 'horizontal-dark', ar: '16:9', text: `Create a clean HORIZONTAL logo lockup using the diamond from the attached logo: the faceted blue/silver diamond mark on the LEFT, and to its right the wordmark "EMAMI CONSULTING" in a modern uppercase sans-serif in DEEP NAVY (#0B1A28), with a smaller "DENTAL TECHNOLOGY ADVISORY" tagline in medium grey beneath, left-aligned, vertically centered with the mark. This version is for LIGHT/WHITE backgrounds. ${TRANSPARENT}` },
  { slug: 'vertical-light', ar: '3:4', text: `Create a clean VERTICAL (stacked) logo lockup using the diamond from the attached logo: the faceted blue/silver diamond mark on TOP, centered, and below it the wordmark "EMAMI CONSULTING" in modern uppercase sans-serif WHITE, centered, with a smaller "DENTAL TECHNOLOGY ADVISORY" tagline in light silver-grey centered beneath. For DARK backgrounds. ${TRANSPARENT}` },
  { slug: 'vertical-dark', ar: '3:4', text: `Create a clean VERTICAL (stacked) logo lockup using the diamond from the attached logo: the faceted blue/silver diamond mark on TOP, centered, and below it the wordmark "EMAMI CONSULTING" in modern uppercase sans-serif DEEP NAVY (#0B1A28), centered, with a smaller "DENTAL TECHNOLOGY ADVISORY" tagline in medium grey centered beneath. For LIGHT/WHITE backgrounds. ${TRANSPARENT}` },
]

async function gen(job) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`
  const res = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ inlineData: { mimeType: 'image/png', data: REF } }, { text: job.text }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: job.ar } },
    }),
  })
  const j = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + redact(JSON.stringify(j)).slice(0, 280))
  const parts = j?.candidates?.[0]?.content?.parts || []
  const img = parts.find((p) => p.inlineData || p.inline_data)
  const data = img && (img.inlineData || img.inline_data)
  if (!data?.data) throw new Error('no image: ' + redact(JSON.stringify(j)).slice(0, 280))
  return Buffer.from(data.data, 'base64')
}

for (const job of JOBS) {
  try {
    const buf = await gen(job)
    fs.writeFileSync(`${OUT}/${job.slug}.png`, buf)
    console.log(`${job.slug}: OK (${(buf.length / 1024).toFixed(0)}KB)`)
  } catch (e) { console.log(`${job.slug}: ${e.message}`) }
}
console.log('DONE')
