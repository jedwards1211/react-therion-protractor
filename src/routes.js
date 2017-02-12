// @flow

import React from 'react'
import {Route} from 'react-router'
import Main from './Main'
import Preview from './Preview'

export default (
  <Route>
    <Route path="/" component={Main} />
    <Route path="/preview" component={Preview} />
  </Route>
)

