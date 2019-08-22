import pegjs from 'pegjs'
import fs from 'fs'
import score from './score'
import { pretty } from './debugUtils'

var grammarFile = fs.readFileSync('./grammar.pegjs', {encoding: 'utf8'})
var parser = pegjs.generate(grammarFile)

import express from 'express'
import bodyParser from 'body-parser'
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('[SERVER] initialized'))
app.listen(port, () => console.log(`[SERVER] listening on port ${port}`))

var log = {
  textEditorCode: [],
  parsedCode: [],
  errors: []
}

app.post('/', (req, res) => {
  var code = req.body.text.trim()
  // console.log(`[SERVER] Received text:\n${code}`)
  log.textEditorCode.push({time: Date.now(), text: req.body.text })

  var parsedCode
  try {
    parsedCode = parser.parse(code)
    log.parsedCode.push({time: Date.now(), code: parsedCode})
    console.log(pretty(log))
    try {
      score.handleCode(parsedCode)
    } catch(runtimeError) {
      log.errors.push({time: Date.now(), error: runtimeError })
      console.log(pretty(log))
      res.status(666).send(runtimeError)
    }
  } catch(syntaxError) {
    log.errors.push({time: Date.now(), error: syntaxError })
    console.log(pretty(log))
    res.status(667).send(syntaxError)
  }

  // apply the result from parser to the score TODO

  // res.end("yes")
})

function writeLog() {
  const jsonContent = JSON.stringify({a:1,b:2,c:3}, null, 2)

  fs.writeFile('./experiment.json', jsonContent, 'utf8', err => {
    if (err) console.error(err)
    else     console.log('Experiment file has been saved.')
  })
}

process.on('exit', function () {
  writeLog()
});

// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  console.log('Ctrl-C...');
  writeLog()
  process.exit(2);
});

//catch uncaught exceptions, trace, then exit normally
process.on('uncaughtException', function(e) {
  console.log('Uncaught Exception...');
  writeLog()
  process.exit(99);
});
