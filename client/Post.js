import React, { Component } from 'react'
import { Link } from 'react-router'

export default class App extends Component {
  render () {
    return (
      <div>
        <Link to={'/posts/' + this.props.slug}>
          <h2>{this.props.title}</h2>
        </Link>
        <p>{this.props.text}</p>
      </div>
    )
  }
}

App.propTypes = {
  title: React.PropTypes.string,
  text: React.PropTypes.string,
  slug: React.PropTypes.string
}
