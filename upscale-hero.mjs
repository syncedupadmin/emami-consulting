import { execFileSync, execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const VID = 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/public/videos'
const BAK = path.join(VID, '_original')

// Upscale pristine 720p source -> 1080p (Eterno bar), lanczos + light sharpen,
// all-keyframe (-g 1) + faststart for buttery scroll-scrubbing.
const JOBS = [
  { src: 'hero-desktop.mp4', scale: '1920:1080' },
  { src: 'hero-mobile.mp4', scale: '1080:1920' },
]

for (const j of JOBS) {
  const src = path.join(BAK, j.src)
  if (!fs.existsSync(src)) { console.log('MISSING SOURCE', src); continue }
  const out = path.join(VID, j.src)
  const tmp = path.join(VID, `__up_${j.src}`)

  console.log(`Upscaling ${j.src} -> ${j.scale} (all-keyframe)...`)
  execFileSync('ffmpeg', [
    '-y', '-i', src, '-an',
    '-vf', `scale=${j.scale}:flags=lanczos,unsharp=5:5:0.45:5:5:0.0`,
    '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    '-g', '1', '-keyint_min', '1', '-sc_threshold', '0',
    '-crf', '19', '-preset', 'slow', '-movflags', '+faststart',
    tmp,
  ], { stdio: ['ignore', 'ignore', 'inherit'] })

  fs.rmSync(out)
  fs.renameSync(tmp, out)

  const probe = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height,nb_frames -of default=noprint_wrappers=1 "${out}"`, { encoding: 'utf8' }).trim()
  const kf = execSync(`ffprobe -v error -select_streams v:0 -show_entries frame=pict_type -of csv "${out}"`, { encoding: 'utf8' }).trim().split('\n')
  const iframes = kf.filter((l) => l.includes('I')).length
  const mb = (fs.statSync(out).size / 1048576).toFixed(1)
  console.log(`${j.src}: ${probe} | I-frames ${iframes}/${kf.length} | ${mb} MB`)
}

// refresh posters from the new 1080p frame 0
for (const [src, poster] of [['hero-desktop.mp4', 'hero-desktop-poster.jpg'], ['hero-mobile.mp4', 'hero-mobile-poster.jpg']]) {
  execFileSync('ffmpeg', ['-y', '-ss', '0', '-i', path.join(VID, src), '-frames:v', '1', '-q:v', '3', path.join(VID, poster)], { stdio: 'ignore' })
}
console.log('DONE — upscaled to 1080p all-keyframe + refreshed posters.')
