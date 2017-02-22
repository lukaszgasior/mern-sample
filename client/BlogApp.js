import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Posts from './Posts'
import PostDetails from './PostDetails'
import AddNewPost from './AddNewPost'

ReactDOM.render(
  <Router history={browserHistory} >
    <Route path='/' component={Posts} />
    <Route path='/posts/:title' component={PostDetails} />
    <Route path='/admin/add' component={AddNewPost} />
  </Router>,
  document.getElementById('app')
)
