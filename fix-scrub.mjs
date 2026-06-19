import fs from 'node:fs'

const FILES = [
  'public/concepts/onyx.html',
  'public/concepts/clinic.html',
  'public/concepts/precision.html',
].map((f) => 'C:/Users/nicho/OneDrive/Desktop/CURRENT PROJECTS/emami-consulting/' + f)

// Eterno-exact scrub: prime the decoder with play()->pause() so seeked frames
// actually PAINT, set currentTime DIRECTLY to target (no lerp), pause on change.
const REPLACEMENTS = [
  [
    'var d=target-video.currentTime; if(Math.abs(d)>0.001){ try{ video.currentTime = video.currentTime + d*0.25; }catch(e){} }',
    'if(Math.abs(video.currentTime-target)>0.001){ try{ video.currentTime=target; }catch(e){} }',
  ],
  [
    "video.addEventListener('loadedmetadata',function(){ try{video.currentTime=0;}catch(e){} update(); });",
    "video.addEventListener('loadedmetadata',function(){ prime(); update(); });",
  ],
  [
    'if(video.readyState>=1){ try{video.currentTime=0;}catch(e){} update(); }',
    'if(video.readyState>=1){ prime(); update(); }',
  ],
  [
    'function dur(){ var d=video&&video.duration; return (d&&isFinite(d))?d:0; }',
    'function dur(){ var d=video&&video.duration; return (d&&isFinite(d))?d:0; }\n  var __primed=false;\n  function prime(){ if(__primed||!video) return; var D=dur(); if(!D) return; __primed=true; var pr=video.play(); if(pr&&pr.then){ pr.then(function(){ video.pause(); }).catch(function(){ try{video.pause();}catch(e){} }); } }',
  ],
  [
    'var D=dur(); if(D) target=p*(D-0.05);',
    'var D=dur(); if(D){ if(!video.paused){ try{video.pause();}catch(e){} } target=p*(D-0.05); }',
  ],
]

for (const f of FILES) {
  let s = fs.readFileSync(f, 'utf8')
  let ok = true
  for (const [from, to] of REPLACEMENTS) {
    if (!s.includes(from)) { console.log(`  ! NOT FOUND in ${f.split('/').pop()}: ${from.slice(0, 40)}...`); ok = false; continue }
    s = s.split(from).join(to)
  }
  fs.writeFileSync(f, s)
  console.log(`${f.split('/').pop()}: ${ok ? 'all 5 patches applied' : 'SOME PATCHES MISSED'}`)
}
console.log('DONE — Eterno-exact scrub (prime + direct seek).')
