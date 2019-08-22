class Piano {
  constructor() {
    this.startOctave = 4
    this.startRhythmFigure = {
      number: 4,
      dot: 0
    }
  }

  getStartOctave() {
    return this.startOctave
  }

  getStartRhythmFigure() {
    return this.startRhythmFigure
  }

  setStartOctave(octave) {
    this.startOctave = octave
  }

  setStartRhythmFigure(rhythmFigure) {
    this.startRhythmFigure = rhythmFigure
  }
}

module.exports = { Piano }
