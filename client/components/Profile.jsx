import React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import scrollToComponent from 'react-scroll-to-component'

import GearList from './GearList'
import NewGearForm from './NewGearForm'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addingItem: false
    }

    this.cancelAdd = this.cancelAdd.bind(this)
    this.renderForm = this.renderForm.bind(this)
  }

  cancelAdd() {
    this.setState({
      addingItem: false
    })
  }

  renderForm() {
    this.setState({
      addingItem: true
    })
    scrollToComponent(this.refs.form,{
      align: 'top',
      duration: 1000
    })
  }

  render() {
    return (
        <div className='profile-display'>
        
          {!this.props.auth.isAuthenticated && <Redirect to='/login'/>}

          {this.props.user.message && <span className="has-text-danger is-large">{this.props.user.message}</span>}
          <img className='tempimgcss' src='http://getdrawings.com/img/person-silhouette-standing-4.jpg' />
          <h2>{this.props.user.firstName}</h2>
          <h2>{this.props.user.lastName}</h2>
          <p>{this.props.user.email}</p>
          <GearList />
          {!this.state.addingItem 
            && <button onClick={() => this.renderForm()}>Add Gear Item</button>}
          <div ref='form'>
            {this.state.addingItem 
              && <NewGearForm finish={() => this.cancelAdd()}/>}
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => (
    {
        auth: state.auth,
        user: state.user
    }
)

export default connect(mapStateToProps)(Profile)