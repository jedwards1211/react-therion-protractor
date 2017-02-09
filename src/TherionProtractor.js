// @flow

import React from 'react'
import injectSheet from 'react-jss'
import range from 'lodash.range'

type OutlinedTextProps = {
  transform?: string,
  children?: string,
  fontSize: number,
}

const OutlinedText = ({transform, children, fontSize, ...props}: OutlinedTextProps) => (
  <g transform={transform}>
    <text
        {...props}
        fontSize={fontSize}
        stroke="white"
        strokeWidth={fontSize * 0.2}
    >
      {children}
    </text>
    <text
        {...props}
        fontSize={fontSize}
    >
      {children}
    </text>
  </g>
)

const styles = {
  lengthText: {
    fontFamily: 'arial',
    textAnchor: 'middle',
    dominantBaseline: 'hanging',
  },
  azimuthText: {
    fontFamily: 'arial',
    textAnchor: 'middle',
    dominantBaseline: 'alphabetic',
  },
  inclinationText: {
    fontFamily: 'arial',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
  },
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
    major: number,
    minor: number,
    tertiary: number,
    quaternary: number,
  },
}

export type Props = InputProps & {
  sheet: {
    classes: {
      lengthText: string,
      azimuthText: string,
      inclinationText: string,
    },
  },
}

const TherionProtractor = ({
  unit, scale, minTickSpacing, radius, sheet: {classes}, strokeWidths,
}: Props): React.Element<any> => {
  const paperRadius = radius / scale
  const height = paperRadius + strokeWidths.minor
  const minorSpacing = 1 / 5
  const tertiarySpacing = minorSpacing / 2
  const minorLengthTextSize = minorSpacing * 0.5
  const majorLengthTextSize = minorSpacing * 0.7
  const azimuthTextSize = minorSpacing * 0.75
  const inclinationTextSize = minorSpacing * 0.5

  return (
    <svg
        width={`${height * 2}${unit}`}
        height={`${height + strokeWidths.minor}${unit}`}
        viewBox={`${-height} 0 ${height * 2} ${height + strokeWidths.minor}`}
        preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <clipPath id="outline">
          <path
              d={`M ${-paperRadius} 0 A ${paperRadius} ${paperRadius} 0 0 0 ${paperRadius} 0 Z`}
              stroke="none"
              fill="none"
          />
        </clipPath>
        <clipPath id="spoke-clip">
          <path
              d={`M ${-paperRadius} 0 A ${paperRadius} ${paperRadius} 0 0 0 ${paperRadius} 0 L ${minorSpacing} 0 A ${minorSpacing} ${minorSpacing} 0 0 1 ${-minorSpacing} 0 Z`}
              stroke="none"
              fill="none"
          />
        </clipPath>
      </defs>
      {/* center vertical */}
      <path
          d={`M 0 0 L 0 ${paperRadius}`}
          stroke="black"
          strokeWidth={strokeWidths.tertiary}
          fill="none"
      />
      {/* tertiary verticals */}
      <path
          d={range(tertiarySpacing, paperRadius, minorSpacing).map(
            radius => `M ${-radius} 0 L ${-radius} ${paperRadius} M ${radius} 0 L ${radius} ${paperRadius}`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.quaternary}
          fill="none"
          clipPath="url(#outline)"
      />
      {/* tertiary length ticks */}
      <path
          d={range(tertiarySpacing, paperRadius, minorSpacing).map(
            radius => `M ${-radius} 0 L ${-radius} ${tertiarySpacing} M ${radius} 0 L ${radius} ${tertiarySpacing}`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.tertiary}
          fill="none"
          clipPath="url(#outline)"
      />
      {/* minor verticals */}
      <path
          d={range(minorSpacing, paperRadius, minorSpacing).map(
            radius => `M ${-radius} 0 L ${-radius} ${paperRadius} M ${radius} 0 L ${radius} ${paperRadius}`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.tertiary}
          fill="none"
          clipPath="url(#outline)"
      />
      {/* minor arcs */}
      <path
          d={range(minorSpacing, paperRadius, minorSpacing).map(
            radius => `M ${-radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.minor}
          fill="none"
      />
      {/* major arcs */}
      <path
          d={range(1, paperRadius, 1).map(
            radius => `M ${-radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.major}
          fill="none"
      />
      {/* 1-degree ticks */}
      <path
          d={range(1, 180, 1).map((angle: number): string => {
            const s = Math.sin(angle * Math.PI / 180)
            const c = Math.cos(angle * Math.PI / 180)
            const ir = paperRadius - tertiarySpacing / 2
            return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
          }).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.tertiary}
          fill="none"
          clipPath="url(#spoke-clip)"
      />
      {/* 5 degree ticks */}
      <path
          d={range(5, 180, 10).map((angle: number): string => {
            const s = Math.sin(angle * Math.PI / 180)
            const c = Math.cos(angle * Math.PI / 180)
            const ir = paperRadius - tertiarySpacing
            return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
          }).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.minor}
          fill="none"
          clipPath="url(#spoke-clip)"
      />
      {/* 10-degree spokes */}
      <path
          d={range(10, 180, 10).map(
            angle => `M 0 0 L ${paperRadius * Math.cos(angle * Math.PI / 180)} ${paperRadius * Math.sin(angle * Math.PI / 180)}`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.minor}
          fill="none"
          clipPath="url(#spoke-clip)"
      />
      {/* 30-degree spokes */}
      <path
          d={range(30, 180, 30).map(
            angle => `M 0 0 L ${paperRadius * Math.cos(angle * Math.PI / 180)} ${paperRadius * Math.sin(angle * Math.PI / 180)}`
          ).join(' ')}
          stroke="black"
          strokeWidth={strokeWidths.major}
          fill="none"
          clipPath="url(#spoke-clip)"
      />

      {/* minor lengths on left side */}
      <g>
      {range(minorSpacing, paperRadius, minorSpacing).map(radius =>
        <OutlinedText
            key={radius}
            className={classes.lengthText}
            x={-radius}
            y={minorSpacing}
            fontSize={minorLengthTextSize}
        >
          {(radius * scale).toFixed(0)}
        </OutlinedText>
      )}
      </g>
      {/* minor lengths on left side */}
      <g>
      {range(minorSpacing, paperRadius, minorSpacing).map(radius =>
        <OutlinedText
            key={radius}
            className={classes.lengthText}
            x={radius}
            y={minorSpacing}
            fontSize={minorLengthTextSize}
        >
          {(radius * scale).toFixed(0)}
        </OutlinedText>
      )}
      </g>
      {/* major lengths on left side */}
      <g>
      {range(1, paperRadius, 1).map(radius =>
        <OutlinedText
            key={radius}
            className={classes.lengthText}
            x={-radius}
            y={minorSpacing}
            fontSize={majorLengthTextSize}
        >
          {(radius * scale).toFixed(0)}
        </OutlinedText>
      )}
      </g>
      {/* major lengths on left side */}
      <g>
      {range(1, paperRadius, 1).map(radius =>
        <OutlinedText
            key={radius}
            className={classes.lengthText}
            x={radius}
            y={minorSpacing}
            fontSize={majorLengthTextSize}
        >
          {(radius * scale).toFixed(0)}
        </OutlinedText>
      )}
      </g>
      {/* inclinations on left side */}
      <g>
      {range(10, 90, 10).map(angle =>
        <OutlinedText
            key={angle}
            transform={`rotate(${90 - angle} 0,0)`}
            className={classes.inclinationText}
            x={0}
            y={1.5}
            fontSize={inclinationTextSize}
        >
          {angle.toFixed(0)}
        </OutlinedText>
      )}
      </g>
      {/* inclinations on right side */}
      <g>
      {range(10, 90, 10).map(angle =>
        <OutlinedText
            key={angle}
            transform={`rotate(${angle - 90} 0,0)`}
            className={classes.inclinationText}
            x={0}
            y={1.5}
            fontSize={inclinationTextSize}
        >
          {angle.toFixed(0)}
        </OutlinedText>
      )}
      </g>
      {/* azimuths 10 - 180 */}
      <g>
        {range(10, 180, 10).map(angle =>
          <OutlinedText
              key={angle}
              transform={`rotate(${90 - angle} 0,0)`}
              className={classes.azimuthText}
              x={0}
              y={paperRadius - tertiarySpacing}
              fontSize={azimuthTextSize}
          >
            {angle.toFixed(0)}
          </OutlinedText>
        )}
      </g>
      {/* azimuths 190 - 360 */}
      <g>
        {range(190, 360, 10).map(angle =>
          <OutlinedText
              key={angle}
              transform={`rotate(${270 - angle} 0,0)`}
              className={classes.azimuthText}
              x={0}
              y={paperRadius - tertiarySpacing - minorSpacing}
              fontSize={azimuthTextSize}
          >
            {angle.toFixed(0)}
          </OutlinedText>
        )}
      </g>
      {/* outline */}
      <path
          d={`M ${-paperRadius} 0 A ${paperRadius} ${paperRadius} 0 0 0 ${paperRadius} 0 Z`}
          stroke="black"
          strokeWidth={strokeWidths.minor}
          fill="none"
      />
    </svg>
  )
}

export default injectSheet(styles)(TherionProtractor)

