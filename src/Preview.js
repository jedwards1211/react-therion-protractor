// @flow

import React from 'react'
import TherionProtractor from './TherionProtractor'
import range from 'lodash.range'

export type Props = {
  location: {
    query: Object,
  },
}

const Preview = ({location: {query: {
  unit, tileX, tileY, paperScale, worldScale, radius, showLengthLabels,
  majorStrokeWidth, minorStrokeWidth, tertiaryStrokeWidth, quaternaryStrokeWidth,
  minMinorTickSpacing, ...query
}}}: Props): React.Element<any> => {
  const protractorRadius = parseFloat(radius) * parseFloat(paperScale) / parseFloat(worldScale)
  const protractorHeight = protractorRadius + parseFloat(minorStrokeWidth)
  const protractorWidth = protractorRadius * 2 + parseFloat(minorStrokeWidth)

  const lengthConv = unit === 'in' ? 1 : 2.54
  const width = 8.5 * lengthConv
  const height = 11 * lengthConv

  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={`${width}${unit}`}
        height={`${height}${unit}`}
        viewBox={`0 0 ${width} ${height}`}
    >
      {range(0, tileX).map(x =>
        <g key={x} transform={`translate(${0.25 + protractorWidth * 1.01 * (x + 0.5)}, 0.25)`}>
          {range(0, tileY).map(y =>
            <TherionProtractor
                key={y}
                {...query}
                unit={unit}
                paperScale={parseFloat(paperScale)}
                worldScale={parseFloat(worldScale)}
                radius={parseFloat(radius)}
                minMinorTickSpacing={parseFloat(minMinorTickSpacing)}
                showLengthLabels={showLengthLabels !== 'false'}
                majorStrokeWidth={parseFloat(majorStrokeWidth)}
                minorStrokeWidth={parseFloat(minorStrokeWidth)}
                tertiaryStrokeWidth={parseFloat(tertiaryStrokeWidth)}
                quaternaryStrokeWidth={parseFloat(quaternaryStrokeWidth)}
                transform={`translate(0, ${protractorHeight * y * 1.01})`}
            />
          )}
        </g>
      )}
    </svg>
  )
}

export default Preview

