import React, { Component } from 'react'
import Header from './Header'
import axios from 'axios'

export default class AddNewPost extends Component {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount () {
    this.title.focus()
  }

  onSubmit (e) {
    e.preventDefault()
    if (!this.title.value.trim()) {
      return
    }

    axios.post('/api/posts', {
      title: this.title.value,
      text: this.text.value
    })
      .then((response) => {
        this.props.router.push('/')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    return (
      <div>
        <Header />
        <form onSubmit={this.onSubmit}>
          <p>
            <input ref={(input) => { this.title = input }}
              className='form-control' placeholder='Post title' />
          </p>
          <p>
            <textarea ref={(input) => { this.text = input }}
              className='form-control' placeholder='Post content' rows='7' />
          </p>
          <button type='submit' className='btn btn-secondary'>
            Add post
        </button>
        </form>
      </div>
    )
  }
}

AddNewPost.propTypes = {
  addPost: React.PropTypes.func,
  router: React.PropTypes.any
}
