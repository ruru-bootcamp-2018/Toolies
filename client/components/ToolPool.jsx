import React from 'react'
import {connect} from 'react-redux'

import ItemInline from './ItemInline'

export const ToolPool = props => (
  <div className='toolpool-wrapper'>
    <h1>TOOL POOL</h1>
    {props.err && <span className="has-text-danger is-large">{props.err}</span>}
    <ul>
      {props.gear.map(item => {
        return <ItemInline item={item} key={item.id}/>
      })}
    </ul>
  </div>
)

const mapStateToProps = (state) => ({gear: state.gear.gear, err: state.gear.errorMessage})

export default connect(mapStateToProps)(ToolPool)