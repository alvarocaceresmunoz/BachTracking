var midiControl = require('./midiControl.js')
const { types } = require('./types.js')
var { Piano } = require('./instruments/piano.js')
const { pretty } = require('./debugUtils.js')
const { octaveModifiers } = require('./octaveModifiers.js')
const { runtimeError } = require('./runtimeError.js')
const defaults = require('./defaults.js')



var timeSignature
var tempo
var bars = []
var playing = false
var instruments = {
  'piano': new Piano()
}


class Bar {
  constructor() {
    this.instruments = {}
  }

  getMusics() {
    return this.instruments
  }

  getMusic(instrument) {
    return this.instruments[instrument]
  }

  hasInstrument(instrument) {
    return this.instruments.hasOwnProperty(instrument)
  }

  setInstruments(instrument) {
    this.instruments.append(instrument)
  }

  setMusicForInstrument(instrument, music) {
    this.instruments[instrument] = music
  }
}

/*
bars[1] = new Bar()
bars[1].setMusicForInstrument('piano', [
  {
    pitch: 0,
    octave: 0,
    rhythmFigure: null
  },
  {
    pitch: 1,
    octave: 1,
    rhythmFigure: null
  },
  {
    pitch: 6,
    octave: 6,
    rhythmFigure: null
  },
])

bars[3] = new Bar()
bars[3].setMusicForInstrument('bass', [
  {
    pitch: 333,
    octave: 333,
    rhythmFigure: null
  }
])
*/

function isInstrumentDefined(instrument) {
  return instruments.hasOwnProperty(instrument)
}

function handleCode(code) {
  code.forEach(instruction => handleInstruction(instruction))
}

function handleInstruction(instruction) {
  if (instruction.type !== types.instruction)
    runtimeError('The code received is not an instruction')
  // console.log(pretty(instruction))
  switch (instruction.instruction.type) {
    case types.stop:
      stop()
      console.log('Stopped playing score')
      break
    case types.start:
      start()
      console.log('Started playing score')
      break
    case types.restart:
      restart()
      console.log('Restarted playing score')
      break
    case types.help:
      help()
      break
    case types.timeSignature:
      setTimeSignature({
        beatsPerBar: instruction.instruction.beatsPerBar,
        noteValue: instruction.instruction.noteValue
      })
      console.log(`Time signature set to ${timeSignature.beatsPerBar}/${timeSignature.noteValue}`)
      break
    case types.tempo:
      setTempo({
        rhythmFigure: instruction.instruction.rhythmFigure,
        bpm: instruction.instruction.bpm
      })
      console.log(`Tempo set to ${tempo.rhythmFigure.number}=${tempo.bpm}`)
      break
    case types.scheduling:
      scheduleMusic(
        instruction.instruction.timeMarker,
        instruction.instruction.musicInstruction)
      console.log(`Music scheduled`)
      break
  }
}

function stop() {
  playing = false
  midiControl.stop()
}

function start() {
  if (playing)
    runtimeError('Score already started; are you sure you want to restart it? Use restart for that')
  else {
    if (!timeSignature)
      setTimeSignature(defaults.timeSignature)
    if (!tempo)
      setTempo(defaults.tempo)

    playing = true
    midiControl.start()
  }
}

function restart() {
  stop()
  start()
}

/**
 * @TODO provide documentation
*/
function help() {
  error('TODO')
}

function setTimeSignature(newTimeSignature) {
  if (playing)
    runtimeError(`Time signature can't be set after starting playing the score`)
  else {
    timeSignature = newTimeSignature
    midiControl.setTimeSignature(newTimeSignature)
  }
}

function setTempo(newTempo) {
  if (playing)
    runtimeError(`Tempo can't be set after starting playing the score`)
  else {
    tempo = newTempo
    midiControl.setTempo(newTempo)
  }
}

function scheduleMusic(timeMarker, musicInstruction) {
  switch(timeMarker.type) {
    case types.at:
      scheduleMusicAt(timeMarker.bar, musicInstruction)
      break
    default:
      runtimeError('Wrong time marker')
      break
  }
}

function scheduleMusicAt(bar, musicInstruction) {
  if (!bars[bar])
    bars[bar] = new Bar()

  var music
  switch (musicInstruction.music.type) {
    case types.melodySeparatedRhythm:
      music = unfoldMelodySeparatedRhythm(
        musicInstruction.music.notes,
        musicInstruction.music.rhythmFigures)
      music = getMusicAbsoluteOctave(bar, musicInstruction.instrument, music)
      try {
        midiControl.schedule(bar, musicInstruction.instrument, music)
      } catch (error) {
        throw error
      }
      break
  }

  // bars[bar].setMusicForInstrument(musicInstruction.instrument, music)
}

/**
 * Get music with absolute octave number for every note
 * @param  {Number} bar           Bar number where the specified music starts
 * @param  {String} instrument    Instrument name for which the music is being
 *                                written.
 * @return {Array}  absoluteMusic music after making octaves absolute
 */
function getMusicAbsoluteOctave(bar, instrument, music) {
  // Notice that "first note" here means "first note that is not a rest"

  let firstNote
  for(let i=0; i<music.length; i++) {
    if (music[1].type == types.note) {
      firstNote = i
      break
    }
  }

  // 1) If the first note has either no octave or an octave increment (') /
  // decrement (,), set that note's octave to an absolute octave
  if (music[0].octave.type == octaveModifiers.relative) {
    // 1.1) If the score (before the specified bar) doesn't contain any
    // previous music for that instrument, set the octave of the first note to
    // the default octave for that instrument.
    if (!bars.slice(0,bar).some(b => b.hasInstrument(instrument))) {
      music[0].octave.value = applyOctaveModifier(
        instruments[instrument].getStartOctave(),
        music[0].octave.value
      )
    }

    // 1.2) If the score (before the specified bar) contain some previous music
    // for that instrument, set the octave of the first note to the octave of
    // the last note written for that instrument (before the specified bar).
    else {
      for (let i=bar-1; i>=0; i--) {
        if (bars[i] && bars[i].hasInstrument(instrument)) {
          let lastMusic = bars[i].getMusic(instrument)

          music[0].octave.value = applyOctaveModifier(
            lastMusic[lastMusic.length-1].octave,
            music[0].octave.value
          )
          break
        }
      }
    }
  }

  // 2) Once the octave for the first note in the list is written, if there is
  // any note in the list without an octave, set it to an octave relative to the
  // previous note (starting from the first note in the list).
  for (let i=1; i<music.length; i++) {
    if (music[i].octave.type == octaveModifiers.relative) {
      music[i].octave.value = applyOctaveModifier(
        music[i-1].octave.value,
        music[i].octave.value
      )
    }
  }

  let absoluteMusic = music.map(note => note = {
    type:         note.type,
    pitch:        note.pitch,
    octave:       note.octave.value,
    accidental:   note.accidental,
    rhythmFigure: note.rhythmFigure
  })

  return absoluteMusic
}

/**
 * Raises or lowers an octave value as specified by the modifier. If the value
 * is lowered to a negative number, 0 is returned.
 * @param  {Number} octaveValue         The octave number
 * @param  {Number} octaveAfterModifier The octave modifier
 * @return {Number} absoluteOctave      Octave after applying the modifier
*/
function applyOctaveModifier(octaveValue, octaveModifier) {
  let absoluteOctave = octaveValue + octaveModifier
  return absoluteOctave >= 0 ? absoluteOctave : 0
}

/**
 * Get a set of notes with durations from notes and rhythms
 * @param  {Array} notes           The notes (including octave modifiers)
 * @param  {Array} rhythmFigures   Rhythmic figures for tnose notes
 * @return {Array} notesWithRhythm Notes with rhythmic figures
 */
function unfoldMelodySeparatedRhythm(notes, rhythmFigures) {
  var notesWithRhythm

  // If there are no rhythmic figures, set them to null
  if (!rhythmFigures)
    rhythmFigures = Array(notes.length).fill(defaults.rhythmFigure)

  // If there are more rhythmic figures than notes, trim them to fit the notes
  // length
  if (notes.length < rhythmFigures.length)
    rhythmFigures.splice(notes.length)

  // If there are less rhythmic figures than notes, fill those missing with the
  // last rhythmic figure
  if (notes.length > rhythmFigures.length) {
    rhythmFigures = rhythmFigures
      .concat(Array(notes.length-rhythmFigures.length)
      .fill(rhythmFigures[rhythmFigures.length-1]))
  }

  notesWithRhythm = notes.map((note, i) => ({
    type:         note.type,
    pitch:        note.pitch,
    octave:       note.octave,
    accidental:   note.accidental,
    rhythmFigure: rhythmFigures[i]
  }))

  return(notesWithRhythm)
}

module.exports = {
  isInstrumentDefined,
  handleCode
}
