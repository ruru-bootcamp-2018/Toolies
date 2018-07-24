import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../actions/logout'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {
    console.log("path",this.props.location.pathname);
    return (
      <div className='section' id='navbar'>
        <div className='columns is-centered has-text-centered navLink'>
          <div className='column is-3'>
            <p><Link className={this.props.location.pathname === "/toolpool" ? 'active' : ""} to="/toolpool">ALL TOOLS</Link></p>
          </div>
          <div className='column is-6'>
            <h1 className={this.props.location.pathname === "/login" ? 'active title is-3' : "title is-3"}><Link to="/">TOOLPOOL</Link></h1>
          </div>
          <div className='column is-3'>
            {console.log(this.props)}
            {this.props.auth.isAuthenticated
              ? [
                <div>
                <Link className={this.props.location.pathname === "/profile" ? 'active' : ""} to="/profile">PROFILE</Link>
                <Link className='navSpace' to="/" onClick={this.props.logout}>LOGOUT</Link>
                </div>
                ]
                : [
                  <Link className={this.props.location.pathname === "/login" ? 'active' : ""} to='/login'>LOGIN</Link>
                ]
              }
          </div>
          </div>
          <hr/>
        </div>
      )
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      logout: () => dispatch(logoutUser())
    }
  }

  const mapStateToProps = (state) => {
    console.log(state);
    return {
      auth: state.auth
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(Nav)
