const chords = require('./chords.js')
const modes = require('./modes.js')

const tonalityModes = {
  major: 'major',
  minor: 'minor'
}

const chordsForDegrees = {
  major: [
    chords.majorSeventh,
    chords.minorSeventh,
    chords.minorSeventh,
    chords.majorSeventh,
    chords.dominantSeventh,
    chords.minorSeventh,
    chords.halfDiminishedSeventh
  ],

  minor: [
    chords.minorSeventh,
    chords.halfDiminishedSeventh,
    chords.majorSeventh,
    chords.minorSeventh,
    chords.minorSeventh,
    chords.majorSeventh,
    chords.dominantSeventh
  ]
}

module.exports = {chordsForDegrees, tonalityModes}
