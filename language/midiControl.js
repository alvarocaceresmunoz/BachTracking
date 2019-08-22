// http://www.multiplayerpiano.com/bachtracking
const easymidi = require('easymidi')
const scales = require('./scales.js')
const { runtimeError } = require('./runtimeError.js')
const { pretty } = require('./debugUtils.js')
const { performance } = require('perf_hooks')

const WAIT_TIME = 200
const STOP_TIME = 100
const DEFAULT_VELOCITY = 60
const DEFAULT_CHANNEL = 3
const DEFAULT_PORT_NAME = 'Midi Through 14:0'

var isMIDIOpen = false
var MIDIOutput = new easymidi.Output(DEFAULT_PORT_NAME)
var scoreStartTime
var timeSignature
var tempo
var timeouts = []

function play(pitch) {
  MIDIOutput.send('noteon', {
    note: pitch,
    velocity: DEFAULT_VELOCITY,
    channel: DEFAULT_CHANNEL
  })
}

function off(pitch) {
  MIDIOutput.send('noteoff', {
    note: pitch,
    velocity: 0,
    channel:0
  })
}

function mute() {
  for(var i=0; i<88; i++) {
    MIDIOutput.send('noteoff', {
      note: i,
      velocity: 0,
      channel: 0
    })
  }
}

function openMIDI() {
  MIDIOutput = new easymidi.Output(DEFAULT_PORT_NAME)
  isMIDIOpen = true
}

function closeMIDI() {
  MIDIOutput.close()
}

function setTimeSignature(newTimeSignature) {
  timeSignature = newTimeSignature
}

function setTempo(newTempo) {
  tempo = newTempo
}

/**
 * Clears all timeouts from the scheduler
 * @return {Void}
*/
function stop() {
  setTimeout(() => mute(), 1)
  timeouts.forEach(timeout => clearTimeout(timeout))
  timeouts = []
  scoreStartTime = null
}

function start() {
  if (!isMIDIOpen)
    openMIDI()
  scoreStartTime = performance.now()

  // console.log('MIDI input ports:')
  // console.log(easymidi.getInputs())
  // console.log('MIDI output ports:')
  // console.log(easymidi.getOutputs())
}

function exit() {
  stop()
  closeMIDI()
}

/**
 * Returns the duration of a rhythmic figure considering dots
 * @param  {Object} rhythmFigure      the rhythmic figure to be converted
 * @param  {Number} wholeNoteDuration the duration of a whole note
 * @return {Number} result            the duration of the rhythmic figure
 *                                    considering dots
*/
function undotRhythm(rhythmFigure, wholeNoteDuration) {
  let result

  // A rhythmic figure without a dot doesn't follow the formula
  if (!rhythmFigure.dot)
    result = getRhythmDuration(rhythmFigure.number, wholeNoteDuration)

  // Let d(x,n) be the duration of a rhythmic figure of denominator x with n
  // dots:
  // d(x, n) = d(2*x, 0) - d((2^n)*x, 0)
  else {
    result =
      getRhythmDuration(
        (rhythmFigure.number / 2),
        wholeNoteDuration
      )
      -
      getRhythmDuration(
        (Math.pow(2,rhythmFigure.dot) * rhythmFigure.number),
        wholeNoteDuration
      )
  }

  return result
}

function getRhythmDuration(rhythmNumber, wholeNoteDuration) {
  return wholeNoteDuration / rhythmNumber
}

/**
 * @TODO include dots
*/
function schedule(barNumber, instrument, music) {
  let wholeNotesPerMinute = tempo.bpm / tempo.rhythmFigure.number
  const minuteDuration    = 60
  let wholeNoteDuration   = minuteDuration / wholeNotesPerMinute

  let timePerBeat  = wholeNoteDuration / timeSignature.noteValue
  let timePerBar   = timeSignature.beatsPerBar * timePerBeat
  let barStartTime = timePerBar * barNumber

  let scheduledMusic = []
  for (let i = 0; i < music.length; i++) {
    let s = (i == 0)
        ? barStartTime
        : scheduledMusic[i-1].startTime +
          undotRhythm(music[i-1].rhythmFigure, wholeNoteDuration)

    let e = s + undotRhythm(music[i].rhythmFigure, wholeNoteDuration)

    scheduledMusic[i] = {
      MIDIPitch: music[i].pitch + 12*music[i].octave + music[i].accidental,
      startTime: s,
      endTime: e
    }
  }

  scheduledMusic.forEach(note => {
    if ((note.startTime*1000 - (performance.now()-scoreStartTime)) <= 0)
      runtimeError('Too late to play this!')

    timeouts.push(
      setTimeout(
        () => play(note.MIDIPitch),
        note.startTime*1000 - (performance.now()-scoreStartTime)
      )
    )

    // if (i != scheduledMusic.length) {
     timeouts.push(
       setTimeout(
         () => off(note.MIDIPitch),
         note.endTime*1000 - (performance.now()-scoreStartTime)
       )
     )
    // }
  })
}

module.exports = {
  stop,
  start,
  schedule,
  setTimeSignature,
  setTempo
}
