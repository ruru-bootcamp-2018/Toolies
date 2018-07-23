import React from 'react'
import {Link} from 'react-router-dom'

export const ItemInline = props => {
  const {name, description, status, id} = props.item
  return (
    <li>
      <Link to={`/item/${id}`}>
        {name} - {description} - {status}
      </Link>
    </li>
  )
}

export default ItemInline