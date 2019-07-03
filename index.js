const express = require('express')

const app = express()
const http = require('http')
const path = require('path')
const morgan = require('morgan')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const Controllers = require('./controllers')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(Controllers.Errors.rest404)
app.use(Controllers.Errors.restErrorsHandler)

server.listen(process.env.PORT || 3000, () => {
    console.log(`ellamore listens on ${server.address().port}`)
})
