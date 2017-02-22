import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Header extends Component {
  render () {
    return (
      <header>
        <h1>Hello on my blog.</h1>

        <div className='container-fluid'>
          <ul className='nav navbar-nav'>
            <li><Link to='/' activeClassName='active'>Home</Link></li>
            <li><Link to='/admin/add' activeClassName='active'>Add post</Link></li>
          </ul>
        </div>
      </header>
    )
  }
}
