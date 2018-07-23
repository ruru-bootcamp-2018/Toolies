import React from 'react'
import {connect} from 'react-redux'

import {sendRequest} from '../actions/mailing'

export const GearRequest = props => {
  return (
      <button onClick={() => props.sendRequestForItem(props.id)}>Email Owner</button>
  )
}

const mapDispatchToProps = dispatch => ({
  sendRequestForItem: id => {dispatch(sendRequest(id))}
})

export default connect(null, mapDispatchToProps)(GearRequest)