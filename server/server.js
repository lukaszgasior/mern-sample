const config = require('./config/config')
const api = require('./api/api')
const auth = require('./auth/routes')
const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient

const app = express()

require('./middleware/appMiddleware')(app)

app.use('/api', api)
app.use('/auth', auth)

if (process.env.NODE_ENV === config.dev) {
  require('./middleware/devMiddleware')(app)
}

app.use(express.static('./public'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

MongoClient.connect(config.database.url, { promiseLibrary: Promise }, (err, db) => {
  if (err) {
    console.warn(`Failed to connect to the database. ${err.stack}`)
  }

  app.locals.db = db

  app.listen(config.port, function () {
    console.log('Express running at localhost: ' + config.port)
  })

  if (config.seed) {
    require('./util/seed')(db)
  }
})

app.use(function (err, req, res, next) {
  console.error(err.message)
  res.status(500).send('Oops')
})
