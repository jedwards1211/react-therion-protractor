// @flow

import React from 'react'
import injectSheet from 'react-jss'
import range from 'lodash.range'

const styles = {

}

export type InputProps = {
  /**
   * The unit for protractor sizing (not the length unit being used to survey the cave)
   */
  unit: 'in' | 'cm',
  /**
   * Ratio between actual units and paper units.  For example, if the `scale` is 20 and the `unit` is 'in', the
   * protractor scale will be 1 in = 20 ft (or 20 m, since the ruler isn't labeled with units)
   */
  scale: number,
  /**
   * The minimum spacing between ticks on the protractor, in `unit`.  For example, if `unit` is 'in' and
   * `minTickSpacing` is 0.1, ticks will be at least 0.1 in apart.
   */
  minTickSpacing: number,
  /**
   * Radius in *actual* units, not paper units.  For instance, if the `unit` is 'in', the `scale` is 10, and the
   * `radius` is 40, the protractor will have a radius of 4 inches, and the outer edge of the protractor will
   * represent an actual distance of 40 actual units.
   */
  radius: number,
  strokeWidths: {
    minorRadius: number,
  },
}

export type Props = InputProps & {
  sheet: {
    classes: {

    },
  },
}

const TherionProtractor = ({
  unit, scale, minTickSpacing, radius, sheet: {classes}, strokeWidths,
}: Props): React.Element<any> => {
  const paperRadius = radius / scale + strokeWidths.minorRadius

  return (
    <svg
        width={`${paperRadius * 2}${unit}`}
        height={`${paperRadius}${unit}`}
        viewBox={`${-paperRadius} 0 ${paperRadius * 2} ${paperRadius}`}
        preserveAspectRatio="xMidYMid meet"
    >
      <path
          d={range(1, radius / scale + 0.5, 1).map(
            radius => `M ${-radius} ${0} A ${radius} ${radius} 0 0 0 ${radius} 0`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.minorRadius}
          fill="none"
      />
    </svg>
  )
}

export default injectSheet(styles)(TherionProtractor)

