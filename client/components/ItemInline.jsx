import React from 'react'

export const ItemInline = props => {
  const {name, description, status, id} = props.item
  return (
    <li>{name} - {description} - {status}</li>
  )
}

export default ItemInline