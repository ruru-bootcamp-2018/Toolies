import React from 'react'
import {connect} from 'react-redux'

export const GearList = props => (
  <div>
    <ul>
      {props.user.gear.map((item) => {
        return <li key={item.id}>{item.name} - {item.description} - {item.status} - {item.trustframework}</li>
      })}
    </ul>
  </div>
)

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(GearList)