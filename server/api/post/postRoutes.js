var router = require('express').Router()
var controller = require('./postController')
var auth = require('../../auth/auth')

var checkUser = [auth.decodeToken(), auth.getFreshUser()]

router.param('slug', controller.params)

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post)

router.route('/:slug')
  .get(controller.getOne)
  .delete(checkUser, controller.delete)

module.exports = router
