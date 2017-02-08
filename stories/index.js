// @flow

import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TherionProtractor from '../src/TherionProtractor'

storiesOf('TherionProtractor', module)
  .add('1" = 20, radius = 40', () => (
    <TherionProtractor
        unit="in"
        scale={20}
        radius={40}
        minTickSpacing={0.1}
        strokeWidths={{
          minorRadius: 0.01
        }}
    />
  ))
  .add('1" = 10, radius = 40', () => (
    <TherionProtractor
        unit="in"
        scale={10}
        radius={40}
        minTickSpacing={0.1}
        strokeWidths={{
          minorRadius: 0.01
        }}
    />
  ))
  .add('1" = 10, radius = 35', () => (
    <TherionProtractor
        unit="in"
        scale={10}
        radius={35}
        minTickSpacing={0.1}
        strokeWidths={{
          minorRadius: 0.01
        }}
    />
  ))

