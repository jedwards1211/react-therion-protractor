// @flow

import React from 'react'
import TherionProtractor from './TherionProtractor'
import range from 'lodash.range'

export type Props = {
  location: {
    query: Object,
  },
}

const Preview = ({location: {query: {tileX, tileY, paperScale, worldScale, radius, showLengthLabels, ...query}}}: Props): React.Element<any> => (
  <table>
    <tbody>
      {range(0, parseInt(tileY)).map(index =>
        <tr key={index}>
          {range(0, parseInt(tileX)).map(index =>
            <td key={index}>
              <TherionProtractor
                  {...query}
                  paperScale={parseFloat(paperScale)}
                  worldScale={parseFloat(worldScale)}
                  radius={parseFloat(radius)}
                  showLengthLabels={showLengthLabels !== 'false'}
              />
            </td>
          )}
        </tr>
      )}
    </tbody>
  </table>
)

export default Preview

