import React from 'react'
import { shallow, mount } from 'enzyme';

require('./enzyme-setup.js')

import {NewGearForm} from '../../../client/components/NewGearForm'

describe('<NewGearForm />', () => {
  let wrapper;

  it('test suite is WOW', () =>{
    expect(true).toBeTruthy()
  })
  
  describe('unconnected', () => {
    beforeEach(() => {
      wrapper = shallow(<NewGearForm />)
    })

    it('renders', () => {
      expect(wrapper).toBeDefined()
    })
  })
})