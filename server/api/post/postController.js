// var ObjectId = require('mongodb').ObjectID

exports.params = async function (req, res, next, slug) {
  const db = req.app.locals.db

  await db.collection('posts')
    .findOne({ slug: slug })
    .then((post) => {
      if (!post) {
        next(new Error('No post with that slug'))
      } else {
        req.post = post
        next()
      }
    })
    .catch((e) => next(e))
}

exports.get = async function (req, res, next) {
  const db = req.app.locals.db

  await db.collection('posts')
    .find()
    .toArray()
    .then((posts) => {
      res.json(posts)
    })
    .catch((e) => next(e))
}

exports.getOne = function (req, res, next) {
  var post = req.post
  res.json(post)
}

exports.post = async function (req, res, next) {
  var newpost = req.body
  newpost.slug = newpost.title.replace(/ /g, '-')

  const db = req.app.locals.db

  await db.collection('posts')
    .insert(newpost)
    .then((post) => {
      res.json(post)
    })
    .catch((e) => next(e))
}

exports.delete = async function (req, res, next) {
  const db = req.app.locals.db

  await db.collection('posts')
    .remove(req.post)
    .then((post) => {
      res.json(post)
    })
    .catch((e) => next(e))
}
