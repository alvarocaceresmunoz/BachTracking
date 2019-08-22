function RuntimeError(errorText) {
  this.message  = errorText,
  this.name     = 'RuntimeError'
  this.toString = () => `${this.name}: ${this.message}`
}

function runtimeError(errorText) {
  throw new RuntimeError(errorText)
}

module.exports = {
  runtimeError
}
