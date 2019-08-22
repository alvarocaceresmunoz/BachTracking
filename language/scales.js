const {wholeTone, semiTone, minorThird} = require('./intervals.js')

const scales = {
   superLocrian: [semiTone, wholeTone, semiTone, wholeTone, wholeTone, wholeTone, wholeTone],
   bebop: [wholeTone, wholeTone, semiTone, wholeTone, semiTone, semiTone, wholeTone, semiTone],
   minorBebop: [wholeTone, semiTone, semiTone, semiTone, wholeTone, wholeTone, semiTone, wholeTone],
   nineTone: [wholeTone, semiTone, semiTone, wholeTone, semiTone, semiTone, semiTone, wholeTone, semiTone],
   augmented: [minorThird, semiTone, minorThird, semiTone, minorThird, semiTone],
   diminished: [wholeTone, semiTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone, semiTone],
   dominantDiminished: [semiTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone],
   lydianDominant: [wholeTone, wholeTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone],
   octatonicHalfWhole: [semiTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone],
   octatonicWholeHalf: [wholeTone, semiTone, wholeTone, semiTone, wholeTone, semiTone, wholeTone, semiTone],
   wholeTone: [wholeTone, wholeTone, wholeTone, wholeTone, wholeTone, wholeTone],
   jazzMinor: [wholeTone, semiTone, wholeTone, wholeTone, wholeTone, wholeTone, semiTone],
   ionian: [wholeTone, wholeTone, semiTone, wholeTone, wholeTone, wholeTone, semiTone],
   major: [wholeTone, wholeTone, semiTone, wholeTone, wholeTone, wholeTone, semiTone],
   dorian: [wholeTone, semiTone, wholeTone, wholeTone, wholeTone, semiTone, wholeTone],
   phrygian: [semiTone, wholeTone, wholeTone, wholeTone, semiTone, wholeTone, wholeTone],
   lydian: [wholeTone, wholeTone, wholeTone, semiTone, wholeTone, wholeTone, semiTone],
   mixolydian: [wholeTone, wholeTone, semiTone, wholeTone, wholeTone, semiTone, wholeTone],
   aeolian: [wholeTone, semiTone, wholeTone, wholeTone, semiTone, wholeTone, wholeTone],
   minor: [wholeTone, semiTone, wholeTone, wholeTone, semiTone, wholeTone, wholeTone],
   locrian: [semiTone, wholeTone, wholeTone, semiTone, wholeTone, wholeTone, wholeTone]
}

module.exports = scales
