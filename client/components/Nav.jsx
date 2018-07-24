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
    return (
      <nav className="navbar is-fixed-top has-text-black">
        <div className="container">
          <div id="navbarMenuHeroA" className='navbar-brand'>
            <div className="navbar-end">
              {this.props.auth.isAuthenticated
                ? [
                  <Link key='logout-nav' to="/" onClick={this.props.logout} className="navbar-item is-large">Logout</Link>,
                  <Link key='profile-nav' to="/profile" className="navbar-item is-large">Profile</Link>
                ]
                : [
                  <Link key='login-nav' className="navbar-item is-large" to='/login'>Login</Link>,
                  <Link key='register-nav' className="navbar-item" to='/register'>Register</Link>,
                ]
              }
              <Link className="navbar-item" to='/toolpool'>ToolPool</Link>
            </div>
          <Link className="navbar-item is-half is-narrow" to='/'>Home Logo</Link>
          </div>
        </div>
      </nav>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser())
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
