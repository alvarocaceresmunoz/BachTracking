/**
* ------------------------------------------------------------------------------
* Utility scripts
* ------------------------------------------------------------------------------
*/
{
  const currentDirectory = `${__dirname}/../../../../`
  var requireLocal = file => require(`${currentDirectory}/${file}`)

  var score                 = requireLocal('score.js')
  const { types }           = requireLocal('types.js')
  const { accidentals }     = requireLocal('accidentals.js')
  const { pitches }         = requireLocal('pitches.js')
  const { octaveModifiers } = requireLocal('octaveModifiers.js')
  const { dynamicMarkings } = requireLocal('dynamicMarkings.js')
  const { dynamicChanges }  = requireLocal('dynamicChanges.js')

  var code = []
}
/* -------------------------------------------------------------------------- */







/**
* ------------------------------------------------------------------------------
* Start symbol
* ------------------------------------------------------------------------------
*/

Program = Debug {
  return(code)
}

/* -------------------------------------------------------------------------- */








/**
* ------------------------------------------------------------------------------
* TERMINAL SYMBOLS
* ------------------------------------------------------------------------------
*/

// Characters
equalSign = '='
space = ' '
newLine = [\n\r\u2028\u2029]
tab = [\t]
leftParenthesis  = '('
rightParenthesis = ')'
slash = '/'

// For debugging
TODO = 'TODO'       { return('TODO') }

// Environment setup instructions
stop = 'stop'       { return({ type: types.stop    } )}
start = 'start'     { return({ type: types.start   } )}
restart = 'restart' { return({ type: types.restart } )}
help = 'help'       { return({ type: types.help    } )}
exit = 'exit'       { return({ type: types.exit    } )}

// Dynamic marks
pianississimo = '.ppp'
pianissimo    = '.pp'
piano         = '.p'
mezzoPiano    = '.mp'
mezzoForte    = '.mf'
forte         = '.f'
fortissimo    = '.ff'
fortississimo = '.fff'

// Dynamic changes
crescendo     = '<'
diminuendo    = '>'

// Alterations
sharp = '#'
flat = 'b'

// Rhythm
dot = '.'

at = 'at'
bar = 'bar'
melody = 'melody'
times = 'x'
time = 'time'
tempo = 'tempo'

// Notes and pitches
pitch =
    [aA] { return(pitches.A) }
  / [bB] { return(pitches.B) }
  / [cC] { return(pitches.C) }
  / [dD] { return(pitches.D) }
  / [eE] { return(pitches.E) }
  / [fF] { return(pitches.F) }
  / [gG] { return(pitches.G) }

absoluteOctave = value:naturalNumber {
  return({ type: octaveModifiers.absolute, value })
}

relativeOctave =  "'"+ {
                    return({
                      type:  octaveModifiers.relative,
                      value: text().length
                    })
                  }
               /  ","+ {
                    return({
                      type:   octaveModifiers.relative,
                      value: -text().length
                    })
                  }

// Numbers
naturalNumber = [0-9]+ {
  return(parseInt(text()))
}


/* -------------------------------------------------------------------------- */








/**
* ------------------------------------------------------------------------------
* NON-TERMINAL SYMBOLS
* ------------------------------------------------------------------------------
*/

Instruction = instruction:(EnvironmentSetup / VariableAssignment / Scheduling) {
  return({ type: types.instruction, instruction })
}




EnvironmentSetup =  stop / start / restart / help / exit / Time / Tempo




Time = time space+ beatsPerBar:naturalNumber slash noteValue:PowerOfTwo {
  return({ type: types.timeSignature, beatsPerBar, noteValue })
}




Tempo = tempo space+ rhythmFigure:RhythmFigure space+ bpm:naturalNumber {
  return({ type: types.tempo, rhythmFigure, bpm})
}




VariableAssignment = TODO { return({ type: types.variableAssignment }) }




Scheduling = timeMarker:TimeMarker space+ musicInstruction:MusicInstruction {
  return ({
    type: types.scheduling,
    timeMarker,
    musicInstruction
  })
}




TimeMarker = AtMarker / AfterMarker / BetweenMarker




AtMarker = at space+ bar:BarMarker {
  return ({
    type: types.at,
    bar
  })
}




AfterMarker = TODO




BetweenMarker = TODO




BarMarker = bar space* barNumber:naturalNumber {
  return(barNumber)
}




MusicInstruction = InstrumentScheduleMusic / ScoreScheduleMusic




InstrumentScheduleMusic = instrument:InstrumentName space+ music:Music {
  return({ instrument, music })
}




InstrumentName = instrument:VariableName {
  if (score.isInstrumentDefined(instrument))
    return(instrument)
  else
    error(`Instrument ${instrument} not defined`) // TODO: look for similar instruments and suggest same instruction with correct name
}




VariableName = [a-zA-Z]+[a-zA-Z0-9]* {
  return(text())
}




Music = Melody / Phrase / ChordProgression




/**
* Definition:
* -----------
* Group of notes (pitches) with a specific rhythm
*
*
* Specification:
* --------------
* - Write notes and rhythm separatedly (allows to define any of them
*   separatedly, i.e. in variables)
* - Write notes and rhythm together (shorter)
*/
Melody = MelodySeparatedRhythm / MelodyIntegratedRhythm




MelodySeparatedRhythm = MelodyWithRhythm / MelodyWithoutRhythm




MelodyWithRhythm =  melody newLine
                     tab notes:NoteGroup newLine
                     tab rhythmFigures:RhythmFigures {
                       return({
                         type: types.melodySeparatedRhythm,
                         notes,
                         rhythmFigures
                       })
                     }




MelodyWithoutRhythm = melody (space+ / newLine tab) notes:NoteGroup {
  return({
    type: types.melodySeparatedRhythm,
    notes,
    rhythmFigures: null
  })
}




MelodyIntegratedRhythm = TODO




/**
* Definition:
* -----------
* A phrase is a melody with dynamics
*
* Specification:
* --------------
* - Write melody and intensities separatedly (more programmatic)
* - Write melody and dynamics together (shorter)
*/
Phrase = TODO




// Dynamics = DynamicsByNote / DynamicsByRhythm




DynamicMark = pianississimo   { return(dynamicMarkings.pianississimo) }
            / pianissimo      { return(dynamicMarkings.pianissimo)    }
            / piano           { return(dynamicMarkings.piano)         }
            / mezzoPiano      { return(dynamicMarkings.mezzoPiano)    }
            / mezzoForte      { return(dynamicMarkings.mezzoForte)    }
            / forte           { return(dynamicMarkings.forte)         }
            / fortissimo      { return(dynamicMarkings.fortissimo)    }
            / fortississimo   { return(dynamicMarkings.fortississimo) }




DynamicChange =   crescendo  { return(dynamicChanges.crescendo)  }
                / diminuendo { return(dynamicChanges.diminuendo) }




ChordProgression = TODO




Notes = firstNote:NoteOrRest remainingNotes:(space+ NoteOrRest)* {
  return([firstNote].concat(remainingNotes.map(note => note[1])))
}




NoteGroup = note:NoteOrRest times:TimesRepetition {
              return({type:types.noteGroup, notes:[note], times})
            }
          / leftParenthesis notes:SeveralNotesOrRests rightParenthesis times:TimesRepetition {
              return({type:types.noteGroup, notes, times})
          }
          / Notes




SeveralNotesOrRests = firstNote:NoteOrRest remainingNotes:(space+ NoteOrRest)* {
  return([firstNote].concat(remainingNotes.map(note => note[1])))
}




TimesRepetition = times number:naturalNumber {
  if (number < 2)
    error('Times operator (x) is used for repeating more than once')
  else
    return(number)
}




NoteOrRest = Note / rest




Note = pitch:pitch accidental:Accidental? octave:Octave? {
  return({
    type: types.note,
    pitch,
    octave: octave? octave : { type: octaveModifiers.relative, value: 0 },
    accidental: accidental? accidental : 0 })
}



rest = 'r' {
  return({
    type: types.rest,
    pitch: null,
    octave: null,
    accidental: null
  })
}




Octave = absoluteOctave / relativeOctave




/**
* Definition:
* -----------
* An accidental changes a note pitch by a positive amount (sharp, double sharp,
* triple sharp...) or by a negative amount (flat, double flat...)
*
* Specification:
* --------------
* Write as many sharps or flats as required (e.g. a double sharp is ##, a triple
* sharp is bbb)
*/
Accidental =  sharp+ { return( text().length) }
            / flat+  { return(-text().length) }




/**
* Definition:
* -----------
* RhythmFigures is a group of one or more rhythmic figures
*
* Specification:
* --------------
* Write as many rhythmic figures as required, separated by spaces
*/
RhythmFigures = firstRhythmFigure:RhythmFigure remainingRhythmFigures:(space+ RhythmFigure)* {
  return(
    [firstRhythmFigure]
    .concat(remainingRhythmFigures.map(rhythm => rhythm[1]))
  )
}




/**
* Definition:
* -----------
* A rhythm figure represents duration for a note / chord / dynamic
*
* Specification:
* --------------
* Specify duration as a power of two (1 being a whole note, 2 being a half note,
* 4 being a quarter note...), with as many dots as required to add dot duration
* (optional).
*
* TODO:
* -----
* - Add support for triplets
*/
RhythmFigure = number:PowerOfTwo dot:dot* {
  return({ number, dot: dot.length })
}




PowerOfTwo = number:naturalNumber {
  if(Math.log2(number) % 1 === 0)
    return(number)
  else
    error('The number must be a power of two')
}




ScoreScheduleMusic = TODO




Debug = instruction:Instruction { code.push(instruction) }




/*
VariableAssignment =
  v:VariableName space equalSign space '2'
  { return(v.) }
*/

/* -------------------------------------------------------------------------- */
