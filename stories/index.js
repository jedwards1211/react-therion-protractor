// @flow

import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TherionProtractor from '../src/TherionProtractor'
import App from '../src/App'

storiesOf('TherionProtractor', module)
  .add('App', App)
  .add('1" = 5, radius = 20', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={5}
        radius={20}
    />
  ))
  .add('1" = 10, radius = 30', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={10}
        radius={30}
    />
  ))
  .add('1" = 20, radius = 40', () => (
    <TherionProtractor
        unit="in"
        paperScale={1}
        worldScale={20}
        radius={40}
    />
  ))
  .add('1" = 25, radius = 50', () => (
    <TherionProtractor
        unit="in"
        paperScale={1}
        worldScale={25}
        radius={50}
    />
  ))
  .add('1" = 40, radius = 80', () => (
    <TherionProtractor
        unit="in"
        paperScale={1}
        worldScale={40}
        radius={80}
    />
  ))
  .add('1" = 10, radius = 30, grad', () => (
    <TherionProtractor
        unit="in"
        angleUnit="grad"
        paperScale={1}
        worldScale={10}
        radius={30}
    />
  ))
  .add('2cm = 10, radius = 30', () => (
    <TherionProtractor
        unit="cm"
        angleUnit="deg"
        paperScale={2}
        worldScale={10}
        radius={30}
    />
  ))
  .add('2cm = 5, radius = 20', () => (
    <TherionProtractor
        unit="cm"
        angleUnit="deg"
        paperScale={2}
        worldScale={5}
        radius={20}
    />
  ))
  .add('2cm = 15, radius = 45', () => (
    <TherionProtractor
        unit="cm"
        angleUnit="deg"
        paperScale={2}
        worldScale={15}
        radius={45}
    />
  ))
  .add('1" = 10, radius = 40', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={10}
        radius={40}
    />
  ))
  .add('1" = 10, radius = 35', () => (
    <TherionProtractor
        unit="in"
        angleUnit="deg"
        paperScale={1}
        worldScale={10}
        radius={35}
    />
  ))

