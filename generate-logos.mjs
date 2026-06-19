import fs from 'node:fs'

const ENV = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/SyncedUpWebsites/.env.local'
const key = (fs.readFileSync(ENV, 'utf8').match(/GEMINI_API_KEY\s*=\s*"?([^"\r\n]+)"?/) || [])[1]
if (!key) { console.log('NO GEMINI_API_KEY'); process.exit(1) }
const redact = (s) => String(s).split(key).join('[KEY]')

const OUT = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/public/logos'
fs.mkdirSync(OUT, { recursive: true })

const MODELS = ['gemini-3-pro-image-preview', 'gemini-2.5-flash-image']

const BRAND = `Brand: "EMAMI CONSULTING", a premium, vendor-neutral DENTAL TECHNOLOGY ADVISORY firm founded by Dr. Justin Emami, DDS. It helps dental practices decide what technology to buy before spending six figures. Brand colors: royal/azure blue #0A84E6 plus polished silver/chrome. Aesthetic: high-end medical-device / dental-surgical luxury, precise, clinical, trustworthy. Deliverable is a professional, balanced, production-ready logo with crisp clean edges and generous negative space. Spell text EXACTLY and correctly. No mockup hands, no clutter, no extra words.`

const PROMPTS = [
  { slug: '1-diamond', text: `${BRAND}\n\nDesign a minimalist emblem logo. Centered mark: a refined geometric faceted DIAMOND, left half royal blue #0A84E6, right half brushed silver/chrome, subtle gradient, on a deep near-black navy background (#0A0D11). Centered beneath the mark: clean modern uppercase sans-serif wordmark "EMAMI CONSULTING" in white with wide letter-spacing, and a small tagline "DENTAL TECHNOLOGY ADVISORY" in silver-grey. Flat vector style, luxury surgical brand, perfectly balanced, square 1:1.` },
  { slug: '2-monogram', text: `${BRAND}\n\nDesign a premium monogram logo on a clean WHITE background. A precise geometric capital letter "E" built from clean parallel bars with a subtle chrome bevel, royal blue #0A84E6 with silver/chrome highlights, enclosed in a thin elegant circular ring. Beneath: refined uppercase wordmark "EMAMI" in deep navy #0B1A28 with a thin spaced "CONSULTING" below it in grey. Flat modern vector, high-end medical brand, sharp, lots of whitespace, square 1:1.` },
  { slug: '3-roadmap', text: `${BRAND}\n\nDesign a modern emblem logo around a technology ROADMAP idea, on a deep navy background (#0A0D11). Mark: an elegant abstract route/path line with small circular node waypoints ascending left-to-right, ending in a small royal-blue #0A84E6 diamond node, the path rendered in a royal-blue to chrome gradient. Centered beneath: clean uppercase wordmark "EMAMI CONSULTING" in white with a small "DENTAL TECHNOLOGY ADVISORY" tagline in silver-grey. Precise technical luxury med-tech feel, flat vector, minimal, square 1:1.` },
  { slug: '4-clarity', text: `${BRAND}\n\nDesign a sophisticated logo around the idea of CLARITY before technology, on a clean WHITE background. Mark: a precise aperture/lens made of clean concentric facets converging to one sharp focal point, royal blue #0A84E6 with brushed silver/chrome. Centered beneath: modern uppercase wordmark "EMAMI CONSULTING" in deep navy #0B1A28 and a small grey tagline "DENTAL TECHNOLOGY ADVISORY". Optical-precision premium feel, flat vector, balanced, generous negative space, square 1:1.` },
  { slug: '5-crest', text: `${BRAND}\n\nDesign a luxury emblem logo on a deep near-black background (#0A0D11). A refined faceted diamond that also reads as an upward arrow / path (precision + direction), polished chrome/silver facets with royal blue #0A84E6 highlights and a subtle gradient, a thin chrome hairline frame. Centered beneath: elegant uppercase wordmark "EMAMI CONSULTING" in white with wide tracking and a thin hairline divider above a small "DENTAL TECHNOLOGY ADVISORY" tagline. Premium dental-surgical / medical-device identity, flat modern vector, symmetrical, square 1:1.` },
]

async function gen(model, prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '1:1' } },
    }),
  })
  const j = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error('HTTP ' + res.status + ' ' + redact(JSON.stringify(j)).slice(0, 280))
  const parts = j?.candidates?.[0]?.content?.parts || []
  const img = parts.find((p) => p.inlineData || p.inline_data)
  const data = img && (img.inlineData || img.inline_data)
  if (!data?.data) throw new Error('no image part: ' + redact(JSON.stringify(j)).slice(0, 280))
  return Buffer.from(data.data, 'base64')
}

for (const p of PROMPTS) {
  let done = false
  for (const m of MODELS) {
    try {
      const buf = await gen(m, p.text)
      fs.writeFileSync(`${OUT}/${p.slug}.png`, buf)
      console.log(`${p.slug}: OK via ${m} (${(buf.length / 1024).toFixed(0)}KB)`)
      done = true
      break
    } catch (e) {
      console.log(`${p.slug} via ${m}: ${e.message}`)
    }
  }
  if (!done) console.log(`${p.slug}: FAILED`)
}
console.log('DONE')
