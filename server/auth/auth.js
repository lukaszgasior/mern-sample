var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var config = require('../config/config')
var checkToken = expressJwt({ secret: config.secrets.jwt })
var ObjectId = require('mongodb').ObjectID

exports.decodeToken = function () {
  return function (req, res, next) {
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = 'Bearer ' + req.query.access_token
    }

    checkToken(req, res, next)
  }
}

exports.getFreshUser = function () {
  return async function (req, res, next) {
    const db = req.app.locals.db

    await db.collection('user')
      .findOne({ _id: new ObjectId(req.user._id) })
      .then((user) => {
        if (!user) {
          res.status(401).send('Unauthorized')
        } else {
          req.user = user
          next()
        }
      })
      .catch((e) => next(e))
  }
}

exports.verifyUser = function () {
  return async function (req, res, next) {
    // var username = req.body.username
    // var password = req.body.password
    var username = req.query.u
    var password = req.query.p

    if (!username || !password) {
      res.status(400).send('You need a username and password')
      return
    }

    const db = req.app.locals.db

    await db.collection('user')
      .findOne({ login: username, password: password })
      .then((user) => {
        if (!user) {
          res.status(401).send('Wrong login or password')
        } else {
          req.user = user
          next()
        }
      })
      .catch((e) => next(e))
  }
}

exports.signToken = function (id) {
  return jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  )
}
