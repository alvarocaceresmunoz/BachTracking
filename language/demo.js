const {play, at, playScale, playChord, playChordProgression, loop, WAIT_TIME, stop, start, restart, help} = require('./midiControl.js')
const scales = require('./scales.js')
const chords = require('./chords.js')
const intervals = require('./intervals.js')
const {bar0, bar4, bar8, bar12, I, III, IV, VI, I_8vb, t7, t2, t3, t4, t5, s1, b5, b6} = require('./constants.js')
const {setTonality, getChordFromDegree} = require('./theory.js')
const notes = require('./notes.js')
const {tonalityModes, test} = require('./tonalities.js')
const tonality = require('./theory.js')

function demo() {
  at(bar0, () => loop(() => playScale(I, s1), t7))

  at(bar4, () =>
    loop(() => playScale(I+intervals.perfectFifth, s1), t7))

  at(bar8, () => {
    loop(() => {
      playChordProgression([
        [VI,    chords.majorSeventh],
        [IV,    chords.minorSeventh],
        [III,   chords.majorSeventh],
        [I_8vb, chords.minorSeventh]
      ], t7)
    }, t7*4)
  })

  at(bar12, () => {
    loop(() => {
      at(0,  () => play(b5))
      at(t2, () => play(b5))
      at(t3, () => play(b6))
    }, t5)
  })
}

module.exports = demo
