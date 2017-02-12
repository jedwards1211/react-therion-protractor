// @flow

import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Router, hashHistory} from 'react-router'
import routes from './routes'

export type Props = {

}

const App = (props: Props): React.Element<any> => (
  <MuiThemeProvider>
    <Router routes={routes} history={hashHistory} />
  </MuiThemeProvider>
)

export default App

