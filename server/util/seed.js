
const posts = [
  { title: 'My first post 1', text: 'some content' },
  { title: 'My first post 2', text: 'some content' },
  { title: 'My first post 3', text: 'some content' }
]

var createPosts = async function (db) {
  console.log('running seed method')

  await posts.map((post) => {
    post.slug = post.title.replace(/ /g, '-')

    db.collection('posts').update(
      { title: post.title },
      post,
      { upsert: true }
    )
  })
}

module.exports = (db) => {
  createPosts(db)
}
