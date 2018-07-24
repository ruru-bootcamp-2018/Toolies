import React from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import { setAvailability } from '../actions/gear'


export const ItemInGrid = props => {
  const { name, description, status, id, photo_url } = props.item

  return (
    <div key={id} className='column is-4'>
      <Link to={`/item/${id}`}>
        <img src={photo_url} />
      </Link>
      <br />
      <Link to={`/item/${id}`}>
        <h4 className='title is-4'><a>{name}</a></h4>
      </Link>
      <p>{status}</p>
      <a className={`button button-pad has-text-centered ${status == 'Available'
        ? 'is-inverted'
        : 'is-dark'}`}
        onClick={() => props.dispatch(setAvailability(id, status != 'Available'))}
      >
        {status == 'Available'
          ? 'MARK AS AVAILABLE'
          : 'MARK AS BORROWED'}
      </a>
    </div>
  )
}

export default connect()(ItemInGrid)