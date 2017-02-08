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
            major: 0.3,
            minor: 0.125,
            tertiary: 0.05,
            quaternary: 0.02,
          }}
      />
    )

    const svg = comp.find('svg')

    expect(svg.prop('width')).to.equal('4.25in')
    expect(svg.prop('height')).to.equal('2.25in')
    expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
    expect(svg.prop('viewBox')).to.equal('-2.125 -2.125 4.25 2.25')
  })
})

