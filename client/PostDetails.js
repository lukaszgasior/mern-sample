import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'

export default class PostDetails extends Component {
  remove (slug) {
    console.log(slug)

    const token = window.localStorage.token

    // axios.delete('/api/posts/' + slug + '?access_token=' + token)
    axios.delete('/api/posts/' + slug, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        this.props.router.push('/')
      })
      .catch(e => console.log(e))
  }

  render () {
    return (
      <div>
        <Header />
        Post details
      <p>
        <a href='#' onClick={() => this.remove(this.props.params.title)}>remove {this.props.params.title}</a>
      </p>
        <pre>{JSON.stringify(this.props, null, 4)}</pre>
      </div>
    )
  }
}

PostDetails.propTypes = {
  params: React.PropTypes.any,
  location: React.PropTypes.any,
  router: React.PropTypes.any
}
