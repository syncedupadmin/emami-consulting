import { execFileSync, execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const VID = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/public/videos'
const BAK = path.join(VID, '_original')
fs.mkdirSync(BAK, { recursive: true })

const files = ['hero-desktop.mp4', 'hero-mobile.mp4']

function probe(file) {
  const out = execSync(
    `ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames -of default=noprint_wrappers=1 "${file}"`,
    { encoding: 'utf8' }
  )
  return out.trim()
}

for (const f of files) {
  const src = path.join(VID, f)
  if (!fs.existsSync(src)) { console.log('MISSING', f); continue }

  console.log(`\n=== ${f} (BEFORE) ===`)
  console.log(probe(src))

  // Back up original once
  const bak = path.join(BAK, f)
  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak)

  const tmp = path.join(VID, `__tmp_${f}`)

  // All-keyframe encode: every frame is an I-frame so scroll-scrubbing to ANY
  // currentTime is instant (no decode-from-last-keyframe lag). +faststart puts
  // the moov atom up front for immediate playback start. Audio dropped (-an) —
  // hero is muted, keeps file size down.
  const args = [
    '-y',
    '-i', bak,            // encode from the pristine backup
    '-an',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-pix_fmt', 'yuv420p',
    '-g', '1',
    '-keyint_min', '1',
    '-sc_threshold', '0',
    '-crf', '20',
    '-preset', 'slow',
    '-movflags', '+faststart',
    tmp,
  ]

  console.log(`Re-encoding ${f} (all-keyframe, crf20)...`)
  execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'inherit'] })

  fs.rmSync(src)
  fs.renameSync(tmp, src)

  console.log(`=== ${f} (AFTER) ===`)
  console.log(probe(src))

  // Verify keyframe density
  const kf = execSync(
    `ffprobe -v error -select_streams v:0 -show_entries frame=pict_type -of csv "${src}"`,
    { encoding: 'utf8' }
  )
  const lines = kf.trim().split('\n')
  const iframes = lines.filter((l) => l.includes('I')).length
  const sizeMB = (fs.statSync(src).size / 1048576).toFixed(1)
  console.log(`Total frames: ${lines.length} | I-frames: ${iframes} | size: ${sizeMB} MB`)
}

console.log('\nDONE — all-keyframe re-encode complete.')
