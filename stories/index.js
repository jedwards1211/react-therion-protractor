// @flow

import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TherionProtractor from '../src/TherionProtractor'

storiesOf('TherionProtractor', module)
  .add('1" = 20, radius = 40', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={20}
        radius={40}
        minTertiaryTickSpacing={0.05}
        minMinorTickSpacing={0.2}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('1" = 10, radius = 30', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={10}
        radius={30}
        minTertiaryTickSpacing={0.1}
        minMinorTickSpacing={0.2}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('1" = 10, radius = 30, grad', () => (
    <TherionProtractor
        unit="in"
        angleUnit="grad"
        paperScale={1}
        worldScale={10}
        radius={30}
        minTertiaryTickSpacing={0.1}
        minMinorTickSpacing={0.2}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('2cm = 10, radius = 30', () => (
    <TherionProtractor
        unit="cm"
        angleUnit="deg"
        paperScale={2}
        worldScale={10}
        radius={30}
        minTertiaryTickSpacing={0.15}
        minMinorTickSpacing={0.3}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('2cm = 5, radius = 20', () => (
    <TherionProtractor
        unit="cm"
        angleUnit="deg"
        paperScale={2}
        worldScale={5}
        radius={20}
        minTertiaryTickSpacing={0.15}
        minMinorTickSpacing={0.3}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('2cm = 15, radius = 45', () => (
    <TherionProtractor
        unit="cm"
        angleUnit="deg"
        paperScale={2}
        worldScale={15}
        radius={45}
        minTertiaryTickSpacing={0.1}
        minMinorTickSpacing={0.4}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('1" = 10, radius = 40', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={10}
        radius={40}
        minTertiaryTickSpacing={0.1}
        minMinorTickSpacing={0.2}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))
  .add('1" = 10, radius = 35', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={10}
        radius={35}
        minTertiaryTickSpacing={0.1}
        minMinorTickSpacing={0.2}
        strokeWidths={{
          major: 0.03,
          minor: 0.01,
          tertiary: 0.005,
          quaternary: 0.002,
        }}
    />
  ))

