const intervals = require('./intervals.js')

const chords = {
  majorTriad: [intervals.unison, intervals.majorThird, intervals.perfectFifth],
  minorTriad: [intervals.unison, intervals.minorThird, intervals.perfectFifth],
  sus2Triad: [intervals.unison, intervals.majorSecond, intervals.perfectFifth],
  sus4Triad: [intervals.unison, intervals.perfectFourth, intervals.perfectFifth],
  diminishedTriad: [intervals.unison, intervals.minorThird, intervals.diminishedFifth],
  majorSeventh: [intervals.unison, intervals.majorThird, intervals.perfectFifth, intervals.majorSeventh],
  minorSeventh: [intervals.unison, intervals.minorThird, intervals.perfectFifth, intervals.minorSeventh],
  diminishedSeventh: [intervals.unison, intervals.minorThird, intervals.diminishedFifth, intervals.diminishedSeventh],
  dominantSeventh: [intervals.unison, intervals.majorThird, intervals.perfectFifth, intervals.minorSeventh],
  halfDiminishedSeventh: [intervals.unison, intervals.minorThird, intervals.diminishedFifth, intervals.minorSeventh],
}

module.exports = chords
