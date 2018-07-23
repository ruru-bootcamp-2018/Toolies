import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

export const GearList = props => (
  <div>
    <ul>
      {props.user.gear.map((item) => {
        return (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}> 
              {item.name} - {item.description} - {item.status} - {item.trustframework}
            </Link>
          </li>
        )
      })}
    </ul>
  </div>
)

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(GearList)