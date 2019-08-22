const {WAIT_TIME} = require('./midiControl.js')
const scales = require('./scales.js')
const chords = require('./chords.js')
const intervals = require('./intervals.js')

const s1    = scales.minor
const I     = 52
const I_8vb = 52-intervals.octave
const VI    = I_8vb + intervals.minorSixth
const IV    = I_8vb + intervals.perfectFourth
const III   = I_8vb + intervals.minorThird

const b5 = I + intervals.perfectFifth + intervals.octave*2
const b6 = I + intervals.perfectFifth + intervals.octave*3

const t  = WAIT_TIME
const t2 = t*2
const t3 = t*3
const t4 = t*4
const t5 = t*5
const t7 = t*7
const bar0 = 0
const bar4 = t7*4
const bar8 = t7*5
const bar12 = t7*16

module.exports = {
  s1,
  I,
  I_8vb,
  VI,
  IV,
  III,
  b5,
  b6,
  t,
  t2,
  t3,
  t4,
  t5,
  t7,
  bar0,
  bar4,
  bar8,
  bar12
}
