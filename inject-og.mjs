import fs from 'node:fs'
const BASE = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/public/concepts/'
const SITE = 'https://emami-consulting.vercel.app'
const TITLE = 'Emami Consulting — Buy clarity before you buy technology'
const DESC = 'Vendor-neutral dental technology advisory. Know exactly what to buy, in what order, and why, before you spend $10K to $150K+ on scanners, CBCT, milling and full-arch systems.'

const SLUGS = ['onyx', 'clinic', 'precision']

for (const slug of SLUGS) {
  const path = BASE + slug + '.html'
  let s = fs.readFileSync(path, 'utf8')
  // strip any prior injected block (idempotent)
  s = s.replace(/\n?\s*<!-- OG:START -->[\s\S]*?<!-- OG:END -->\n?/g, '\n')
  const img = `${SITE}/og/${slug}.jpg`
  const url = `${SITE}/concepts/${slug}.html`
  const block = `  <!-- OG:START -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Emami Consulting" />
  <meta property="og:title" content="${TITLE}" />
  <meta property="og:description" content="${DESC}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${img}" />
  <meta property="og:image:secure_url" content="${img}" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Emami Consulting — Dental Technology Advisory" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${TITLE}" />
  <meta name="twitter:description" content="${DESC}" />
  <meta name="twitter:image" content="${img}" />
  <!-- OG:END -->
`
  if (!/<\/head>/i.test(s)) { console.log(slug, 'NO </head>'); continue }
  s = s.replace(/<\/head>/i, block + '</head>')
  fs.writeFileSync(path, s)
  console.log(`${slug}: OG injected -> ${img}`)
}
console.log('DONE')
