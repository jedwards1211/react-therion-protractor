// @flow
'no babel-plugin-flow-react-proptypes'

import React from 'react'
import injectSheet from 'react-jss'
import range from 'lodash.range'

import {niceCeiling, largerNiceIncrement, smallerNiceIncrement, modFloor, modCeiling} from './GridMath'

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
    // dominantBaseline: 'hanging',
  },
  azimuthText: {
    fontFamily: 'arial',
    textAnchor: 'middle',
    // dominantBaseline: 'middle',
  },
  inclinationText: {
    fontFamily: 'arial',
    textAnchor: 'middle',
    // dominantBaseline: 'middle',
  },
}

export type InputProps = {
  /**
   * The unit for protractor sizing (not the length unit being used to survey the cave)
   */
  unit: 'in' | 'cm',
  angleUnit?: 'deg' | 'grad',
  paperScale: number,
  worldScale: number,
  minTertiaryTickSpacing?: number,
  minMinorTickSpacing?: number,
  radius: number,
  showLengthLabels?: boolean,
  majorStrokeWidth?: number,
  minorStrokeWidth?: number,
  tertiaryStrokeWidth?: number,
  quaternaryStrokeWidth?: number,
  azimuthTextSizeAdjustment?: number,
  inclinationTextSizeAdjustment?: number,
  majorLengthTextSizeAdjustment?: number,
  minorLengthTextSizeAdjustment?: number,
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

let nextId = 0

class TherionProtractor extends React.Component<void, Props, void> {
  id: number = nextId++
  render(): React.Element<any> {
    let {
      unit, angleUnit, paperScale, worldScale, minMinorTickSpacing, minTertiaryTickSpacing, radius, sheet: {classes},
      azimuthTextSizeAdjustment, inclinationTextSizeAdjustment, majorLengthTextSizeAdjustment, minorLengthTextSizeAdjustment,
      majorStrokeWidth, minorStrokeWidth, tertiaryStrokeWidth, quaternaryStrokeWidth, showLengthLabels,
    } = this.props
    const lengthConv = unit === 'cm' ? 2.54 : 1
    if (!angleUnit) angleUnit = 'deg'
    if (!minMinorTickSpacing) minMinorTickSpacing = 0.15 * lengthConv
    if (!minTertiaryTickSpacing) minTertiaryTickSpacing = minMinorTickSpacing / 2.1
    if (!majorStrokeWidth) majorStrokeWidth = 0.012 * lengthConv
    if (!minorStrokeWidth) minorStrokeWidth = majorStrokeWidth / 3
    if (!tertiaryStrokeWidth) tertiaryStrokeWidth = minorStrokeWidth / 2
    if (!quaternaryStrokeWidth) quaternaryStrokeWidth = tertiaryStrokeWidth / 4

    const paperRadius = radius * paperScale / worldScale
    const height = paperRadius + minorStrokeWidth
    const minorIncrement = niceCeiling(minMinorTickSpacing * worldScale / paperScale)
    const minorSpacing = minorIncrement * paperScale / worldScale
    const tertiaryIncrement = smallerNiceIncrement(minorIncrement, minTertiaryTickSpacing * worldScale / paperScale)
    const tertiarySpacing = tertiaryIncrement * paperScale / worldScale
    const majorIncrement = largerNiceIncrement(minorIncrement)
    const majorSpacing = majorIncrement * paperScale / worldScale
    const majorLengthTextSize = Math.min(minorSpacing, paperRadius * 0.06) * (majorLengthTextSizeAdjustment || 1)
    const minorLengthTextSize = Math.min(minorSpacing * 0.6, majorLengthTextSize * 0.8) * (minorLengthTextSizeAdjustment || 1)
    const azimuthTextSize = Math.min(minorSpacing * 0.8, paperRadius * 0.06) * (azimuthTextSizeAdjustment || 1)
    const inclinationTextSize = Math.min(minorSpacing * 0.6, paperRadius * 0.045) * (inclinationTextSizeAdjustment || 1)
    const inclinationLabelRadius = Math.min(modFloor(paperRadius / 2, majorSpacing) + majorSpacing / 2, paperRadius - minorSpacing * 3.5)

    const isMajor = (value: number): boolean => {
      const diff = value - modFloor(value, majorSpacing)
      return diff < minorSpacing / 2 || diff > majorSpacing - minorSpacing / 2
    }

    const smallestTickSize = minorSpacing / 4

    const wholeTurn = angleUnit === 'grad' ? 400 : 360
    const halfTurn = wholeTurn / 2
    const quarterTurn = wholeTurn / 4

    const majorTurn = angleUnit === 'grad' ? 50 : 30

    const toDegrees = angle => angle * 180 / halfTurn

    const sin = angle => Math.sin(angle * Math.PI / halfTurn)
    const cos = angle => Math.cos(angle * Math.PI / halfTurn)

    const outlineId = `outline-${this.id}`
    const spokeClipId = `spoke-clip-${this.id}`

    const fiveDegSpokeClipRadius = modCeiling(1.5 * lengthConv, minorSpacing)
    const lengthLabelSpacing = minorIncrement < 1 ? majorSpacing : minorSpacing

    return (
      <svg
          width={`${height * 2}${unit}`}
          height={`${height + minorStrokeWidth}${unit}`}
          viewBox={`${-height} 0 ${height * 2} ${height + minorStrokeWidth}`}
          preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id={outlineId}>
            <path
                d={`M ${-paperRadius} 0 A ${paperRadius} ${paperRadius} 0 0 0 ${paperRadius} 0 Z`}
                stroke="none"
                fill="none"
            />
          </clipPath>
        </defs>
        {/* center vertical */}
        <path
            d={`M 0 0 L 0 ${paperRadius}`}
            stroke="black"
            strokeWidth={tertiaryStrokeWidth}
            fill="none"
        />
        {/* tertiary verticals */}
        <path
            d={range(tertiarySpacing, paperRadius, tertiarySpacing).map(
            radius => `M ${-radius} 0 L ${-radius} ${paperRadius} M ${radius} 0 L ${radius} ${paperRadius}`
          ).join(' ')}
            stroke="black"
            strokeWidth={quaternaryStrokeWidth}
            fill="none"
            clipPath={`url(#${outlineId})`}
        />
        {/* tertiary length ticks */}
        <path
            d={range(tertiarySpacing, paperRadius, tertiarySpacing).map(
            radius => `M ${-radius} 0 L ${-radius} ${smallestTickSize} M ${radius} 0 L ${radius} ${smallestTickSize}`
          ).join(' ')}
            stroke="black"
            strokeWidth={tertiaryStrokeWidth}
            fill="none"
            clipPath={`url(#${outlineId})`}
        />
        {/* minor verticals */}
        <path
            d={range(minorSpacing, paperRadius, minorSpacing).map(
            radius => `M ${-radius} 0 L ${-radius} ${paperRadius} M ${radius} 0 L ${radius} ${paperRadius}`
          ).join(' ')}
            stroke="black"
            strokeWidth={tertiaryStrokeWidth}
            fill="none"
            clipPath={`url(#${outlineId})`}
        />
        {/* minor arcs */}
        <path
            d={range(minorSpacing, paperRadius, minorSpacing).map(
            radius => `M ${-radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0`
          ).join(' ')}
            stroke="black"
            strokeWidth={minorStrokeWidth}
            fill="none"
        />
        {/* major arcs */}
        <path
            d={range(majorSpacing, paperRadius, majorSpacing).map(
            radius => `M ${-radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0`
          ).join(' ')}
            stroke="black"
            strokeWidth={majorStrokeWidth}
            fill="none"
        />
        {/* 1-degree ticks */}
        <path
            d={range(1, halfTurn, 1).map((angle: number): string => {
              const s = sin(angle)
              const c = cos(angle)
              const ir = paperRadius - smallestTickSize
              return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
            }).join(' ')}
            stroke="black"
            strokeWidth={tertiaryStrokeWidth}
            fill="none"
            clipPath={`url(#${spokeClipId})`}
        />
        {/* 5 degree ticks */}
        <path
            d={range(5, halfTurn, 10).map((angle: number): string => {
              const s = sin(angle)
              const c = cos(angle)
              const ir = paperRadius - smallestTickSize * 2
              return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
            }).join(' ')}
            stroke="black"
            strokeWidth={minorStrokeWidth}
            fill="none"
            clipPath={`url(#${spokeClipId})`}
        />
        {/* 5-degree spokes */}
        {fiveDegSpokeClipRadius < paperRadius ? <path
            d={range(5, halfTurn, 10).map((angle: number): string => {
              const s = sin(angle)
              const c = cos(angle)
              const ir = fiveDegSpokeClipRadius
              return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
            }).join(' ')}
            stroke="black"
            strokeWidth={minorStrokeWidth}
            strokeDasharray={`0, ${0.03 * lengthConv}`}
            strokeLinecap="round"
            fill="none"
                                                /> : undefined}
        {/* 10-degree spokes */}
        <path
            d={range(10, halfTurn, 10).map((angle: number): string => {
              const s = sin(angle)
              const c = cos(angle)
              const ir = minorSpacing
              return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
            }).join(' ')}
            stroke="black"
            strokeWidth={minorStrokeWidth}
            fill="none"
        />
        {/* major spokes */}
        <path
            d={range(majorTurn, halfTurn, majorTurn).map((angle: number): string => {
              const s = sin(angle)
              const c = cos(angle)
              const ir = minorSpacing
              return `M ${ir * c} ${ir * s} L ${paperRadius * c} ${paperRadius * s}`
            }).join(' ')}
            stroke="black"
            strokeWidth={majorStrokeWidth}
            fill="none"
        />
        {/* inclinations on left side */}
        <g>
          {range(10, quarterTurn, 10).map(angle =>
            <OutlinedText
                key={angle}
                transform={`rotate(${toDegrees(quarterTurn - angle)} 0,0)`}
                className={classes.inclinationText}
                x={0}
                y={inclinationLabelRadius + inclinationTextSize / 2}
                fontSize={inclinationTextSize}
            >
              {angle.toFixed(0)}
            </OutlinedText>
          )}
        </g>
        {/* inclinations on right side */}
        <g>
          {range(10, quarterTurn, 10).map(angle =>
            <OutlinedText
                key={angle}
                transform={`rotate(${toDegrees(angle - quarterTurn)} 0,0)`}
                className={classes.inclinationText}
                x={0}
                y={inclinationLabelRadius + inclinationTextSize / 2}
                fontSize={inclinationTextSize}
            >
              {angle.toFixed(0)}
            </OutlinedText>
          )}
        </g>
        {/* lengths on left side */}
        {showLengthLabels === false ? undefined : <g>
          {range(lengthLabelSpacing, paperRadius, lengthLabelSpacing).map(radius =>
            <OutlinedText
                key={radius}
                className={classes.lengthText}
                x={-radius}
                y={smallestTickSize + (isMajor(radius) ? majorLengthTextSize * 0.85 : minorLengthTextSize)}
                fontSize={isMajor(radius) ? majorLengthTextSize : minorLengthTextSize}
            >
              {(radius * worldScale / paperScale).toFixed(0)}
            </OutlinedText>
          )}
        </g>}
        {/* lengths on right side */}
        {showLengthLabels === false ? undefined : <g>
          {range(lengthLabelSpacing, paperRadius, lengthLabelSpacing).map(radius =>
            <OutlinedText
                key={radius}
                className={classes.lengthText}
                x={radius}
                y={smallestTickSize + (isMajor(radius) ? majorLengthTextSize * 0.85 : minorLengthTextSize)}
                fontSize={isMajor(radius) ? majorLengthTextSize : minorLengthTextSize}
            >
              {(radius * worldScale / paperScale).toFixed(0)}
            </OutlinedText>
          )}
        </g>}
        {/* azimuths 10 - 180 */}
        <g>
          {range(10, halfTurn, 10).map(angle =>
            <OutlinedText
                key={angle}
                transform={`rotate(${toDegrees(quarterTurn - angle)} 0,0)`}
                className={classes.azimuthText}
                x={0}
                y={paperRadius - azimuthTextSize / 2}
                fontSize={azimuthTextSize}
            >
              {angle.toFixed(0)}
            </OutlinedText>
          )}
        </g>
        {/* azimuths 190 - 360 */}
        <g>
          {range(halfTurn + 10, wholeTurn, 10).map(angle =>
            <OutlinedText
                key={angle}
                transform={`rotate(${toDegrees(quarterTurn * 3 - angle)} 0,0)`}
                className={classes.azimuthText}
                x={0}
                y={paperRadius - minorSpacing - azimuthTextSize / 2}
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
            strokeWidth={minorStrokeWidth}
            fill="none"
        />
      </svg>
    )
  }
}

export default injectSheet(styles)(TherionProtractor)

