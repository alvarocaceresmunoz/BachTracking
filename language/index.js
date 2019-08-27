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
  log.textEditorCode.push({ time: Date.now(), text: req.body.text })

  var parsedCode
  try {
    parsedCode = parser.parse(code)
    log.parsedCode.push({ time: Date.now(), code: parsedCode})
    try {
      score.handleCode(parsedCode)
    } catch(runtimeError) {
      log.errors.push({
        time: Date.now(),
        error: {
          name: runtimeError.name,
          message: runtimeError.message
        }})
      res.status(666).send(runtimeError)
    }
  } catch(syntaxError) {
    log.errors.push({
      time: Date.now(),
      error: {
        name: syntaxError.name,
        message: syntaxError.message
      }
    })
    res.status(667).send(syntaxError)
  }

  // res.end("yes")
})

function writeLog() {
  try {
    fs.writeFileSync('./experiment.json', JSON.stringify(log, 'utf8', 2))
  } catch(error) {
    console.log('error writing json')
  }
}

['exit','SIGINT'].forEach(e => process.on(e, () => writeLog()))
