import React from 'react'
import {connect} from 'react-redux'
import {editGearItem} from '../actions/gear'

export class GearEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.props.item

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(editGearItem(this.state))
    this.props.finish()
  }

  render() {
    return (
      <form className='edit-gear-form' onSubmit={this.handleSubmit}>
        <label>
          Name: 
          <input onChange={this.handleChange} type="text" value={this.state.name} name='name' />
        </label>
        <br />
        <label>
          Availability: 
          <select name='status' onChange={this.handleChange} value={this.state.status}>
            <option value='Available'>Available</option>
            <option value='Not Available'>Not Available</option>
          </select>
        </label>
        <br />
        <label>
          Description: 
          <input onChange={this.handleChange} type="text" value={this.state.description} name='description' />
        </label>
        <br />
        <label>
          Photo url: 
          <input onChange={this.handleChange} type="text" value={this.state.photo_url} name='photo_url' />
        </label>
        <br />
        <label>
          Lending conditions: 
          <select name='trustframework' onChange={this.handleChange} value={this.state.trustframework}>
            <option value='One'>Free Borrowing</option>
            <option value='Two'>Upkeep Koha</option>
            <option value='Three'>Conditional (contact to arrange)</option>
          </select>
        </label>
        <br />
        <input type="submit" value='Submit changes' />
        <button onClick={this.props.finish}>Cancel</button>
      </form>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  }
}

export default connect(mapStateToProps)(GearEdit)