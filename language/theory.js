const tonalities = require('./tonalities.js')
const buildChord = require('./midiControl.js')
const notes = require('./notes.js')
const {tonalityModes} = require('./tonalities.js')

var tonality = {
  fundamental: notes.c,
  mode: tonalityModes.major
}

const setTonality = (fundamental, mode) => {
  tonality.fundamental = fundamental
  tonality.mode = mode

  console.log(tonality)
}

const getChordFromDegree = degree => {
  return buildChord(tonalities[tonality.mode][degree])
}

module.exports = {setTonality, getChordFromDegree}
