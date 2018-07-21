import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Profile from './Profile'
import ToolPool from './ToolPool'

import { getGear } from "../actions/gear";
import {fetchUser} from '../actions/login'



class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(getGear())
    this.props.auth.isAuthenticated && this.props.dispatch(fetchUser())
  }

  render() {
    return (
      <Router>
        <div className="container has-text-centered">
          <div className="hero is-small is-success">
            <div className="hero-body has-text-centered">
              <Link to='/'><h1 className="title is-1">Home</h1></Link>
              <Nav />
            </div>
          </div>

          <Route exact path='/toolpool' component={ToolPool}/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {this.props.auth.isAuthenticated && <Route exact path='/profile' component={Profile}/>}
       </div>
      </Router>
    )
  }
} 

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(App)