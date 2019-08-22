function buildScale(root, steps) {
  var total = root
  var result = [root]

  steps.forEach(step => {
    total = total+step
    result.push(total)
  })

  return result
}

function chord(root, intervals) {
  const result = intervals.map(interval => root+interval)
  return result//.unshift(root)
}

function playScale(root, scaleName, times) {
  var scheduledTime = 0

  const scale = buildScale(root, scaleName)

  // no time has been provided, time it
  if (times == null || times == undefined)
    times = Array(scale.length).fill(WAIT_TIME)
  else if (times.length < scale.length)
    times = Array(scale.length-times.length).fill(times[times.length-1])

  scale.forEach((note, i) => {
    setTimeout(() => play(note), scheduledTime)
    scheduledTime += times[i]
  })
}

function playChord(root, chordName) {
  setTimeout(() => {
    for (let note of chord(root, chordName))
      play(note)
  }, 0)
}

const playChordProgression = (progression, time) => {
  var scheduledTime = 0

  progression.forEach(chord  => {
    const chordRoot = chord[0]
    const chordType = chord[1]
    setTimeout(() => playChord(chordRoot, chordType), scheduledTime)
    scheduledTime += time
  })
}


function iterate(obj) {
  var walked = []
  var stack = [{ obj: obj, stack: '' }]
  while (stack.length > 0) {
    var item = stack.pop()
    var obj = item.obj
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          var alreadyFound = false;
          for (var i = 0; i < walked.length; i++) {
            if (walked[i] === obj[property]) {
              alreadyFound = true
              break
            }
          }
          if (!alreadyFound) {
            walked.push(obj[property])
            stack.push({ obj: obj[property], stack: item.stack + '.' + property })
          }
        }
        else {
          console.log(item.stack + '.' + property + "=" + obj[property])
        }
      }
    }
  }
}
