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
          paperScale={1}
          unit="in"
          worldScale={20}
          radius={40}
          majorStrokeWidth={0.3}
          minorStrokeWidth={0.125}
          tertiaryStrokeWidth={0.05}
          quaternaryStrokeWidth={0.02}
      />
    )

    const svg = comp.find('svg')

    expect(svg.prop('width')).to.equal('4.25in')
    expect(svg.prop('height')).to.equal('2.25in')
    expect(svg.prop('preserveAspectRatio')).to.equal('xMidYMid meet')
    expect(svg.prop('viewBox')).to.equal('-2.125 0 4.25 2.25')
  })
})

