// @flow

import React from 'react'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mount} from 'enzyme'

import TherionProtractor from '../src/TherionProtractor'

describe('TherionProtractor', () => {
  it('sizes itself correctly', () => {
    const comp = mount(
      <TherionProtractor
          scale={20}
          minTickSpacing={0.1}
          unit="in"
          radius={40}
          strokeWidths={{
            minorRadius: 0.01
          }}
      />
    )

    const svg = comp.find('svg')

    expect(svg.prop('width')).to.equal('4.02in')
    expect(svg.prop('height')).to.equal('2.01in')
    expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
    expect(svg.prop('viewBox')).to.equal('-2.01 0 4.02 2.01')
  })
})

