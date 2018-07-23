import React from 'react'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'

import GearList from './GearList'
import NewGearForm from './NewGearForm'
import StarRatingComponent from 'react-star-rating-component';

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      addingItem: false,
      rating: 4,
      hovering: false,
      hoverRating: null
    }

    this.cancelAdd = this.cancelAdd.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.rate = this.rate.bind(this)
    this.endHover = this.endHover.bind(this)
    this.changeHoverRating = this.changeHoverRating.bind(this)
  }

  endHover() {
    this.setState({hoverRating: null})
  }

  changeHoverRating(hoverRating) {
    this.setState({hoverRating})
  }

  rate(rating) {
    this.setState({rating, hoverRating: null})
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
  }

  render() {
    const {hoverRating, rating} = this.state
    return (
      <div className='profile-display'>

        {!this.props.auth.isAuthenticated && <Redirect to='/login'/>}

        {this.props.user.message && <span className="has-text-danger is-large">{this.props.user.message}</span>}
        <img className='tempimgcss' src='http://getdrawings.com/img/person-silhouette-standing-4.jpg' />
        <h2>{this.props.user.firstName}</h2>
        <h2>{this.props.user.lastName}</h2>
        <p>{this.props.user.email}</p>
        <h2>Trust rating</h2>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={hoverRating || rating}
          onStarClick={this.rate}
          onStarHover={this.changeHoverRating}
          onStarHoverOut={this.endHover}
          starColor={hoverRating ? 'blue' : 'yellow'}
        />
      <GearList />
      {!this.state.addingItem && <button onClick={() => this.renderForm()}>Add Gear Item</button>}
      {this.state.addingItem && <NewGearForm finish={() => this.cancelAdd()}/>}
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
