import React, { Component } from 'react'
import Header from './Header'
import Post from './Post'
import axios from 'axios'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: []
    }
  }

  componentWillMount () {
    console.log('component will mount')

    axios.get('/api/posts')
      .then((response) => {
        console.log(response)

        this.setState(
          {
            posts: response.data
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <Header />
        {this.state.posts.map(post =>
          <Post key={post.title} {...post} />
        )}
      </div>
    )
  }
}
