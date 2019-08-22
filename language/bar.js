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

module.exports = {
  Bar
}
