'use strict';

require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes = require('./routes')
const cors = require('./cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/add-patients', { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

cors(app)
routes(app)

app.listen(port)
//process.env.PORT || 3001 ex. PORT=3005 yarn start
console.log(`The clinic server is running on port: ${port}`)