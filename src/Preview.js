// @flow

import React from 'react'
import TherionProtractor from './TherionProtractor'

export type Props = {
  location: {
    query: Object,
  },
}

const Preview = ({location: {query}}: Props): React.Element<any> => (
  <TherionProtractor {...query} />
)

export default Preview

