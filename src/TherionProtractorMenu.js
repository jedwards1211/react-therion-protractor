// @flow

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'

export type Props = {
  unit?: 'in' | 'cm',
  angleUnit?: 'deg' | 'grad',
  paperScale?: string,
  worldScale?: string,
  minTertiaryTickSpacing?: string,
  minMinorTickSpacing?: string,
  radius?: string,
  majorStrokeWidth?: string,
  minorStrokeWidth?: string,
  tertiaryStrokeWidth?: string,
  quaternaryStrokeWidth?: string,
  azimuthTextSizeAdjustment?: string,
  inclinationTextSizeAdjustment?: string,
  majorLengthTextSizeAdjustment?: string,
  minorLengthTextSizeAdjustment?: string,
  showLengthLabels?: string,
  tileX?: string,
  tileY?: string,
  onChange?: (prop: string, newValue: any) => any,
  onMultiChange?: (newProps: Object) => any,
}

export const sectionStyle = {margin: 8}

function selectAll(e: any) {
  const {target} = e
  setTimeout(() => target.select(), 17)
}

const TherionProtractorMenu = (props: Props): React.Element<any> => {
  const {unit, angleUnit, paperScale, worldScale, radius, tileX, tileY, showLengthLabels,
    majorStrokeWidth, minorStrokeWidth, tertiaryStrokeWidth, quaternaryStrokeWidth,
    onMultiChange,
  } = props
  const onChange = props.onChange || (() => {})
  return (
    <div>
      <div style={sectionStyle}>
        <RaisedButton label="Degrees" primary={angleUnit === 'deg'} onClick={() => onChange('angleUnit', 'deg')} />
        <RaisedButton label="Gradians" primary={angleUnit === 'grad'} onClick={() => onChange('angleUnit', 'grad')} />
      </div>
      <div style={sectionStyle}>
        Scale: <TextField value={paperScale} onChange={e => onChange('paperScale', e.target.value)}
            name="paperScale"
            onFocus={selectAll}
            style={{width: 30}}
            inputStyle={{textAlign: 'center'}}
               />
        <FlatButton label={unit}
            onClick={() => {
              if (!onMultiChange) {
                onChange('unit', unit === 'in' ? 'cm' : 'in')
                return
              }

              const conv = unit === 'in' ? 2.54 : 1 / 2.54
              const newProps: Object = {
                unit: unit === 'in' ? 'cm' : 'in'
              }
              if (parseFloat(majorStrokeWidth)) newProps.majorStrokeWidth = String(parseFloat(majorStrokeWidth) * conv)
              if (parseFloat(minorStrokeWidth)) newProps.minorStrokeWidth = String(parseFloat(minorStrokeWidth) * conv)
              if (parseFloat(tertiaryStrokeWidth)) newProps.tertiaryStrokeWidth = String(parseFloat(tertiaryStrokeWidth) * conv)
              if (parseFloat(quaternaryStrokeWidth)) newProps.quaternaryStrokeWidth = String(parseFloat(quaternaryStrokeWidth) * conv)

              onMultiChange(newProps)
            }}
            style={{width: 30, minWidth: 'initial'}}
            labelStyle={{fontWeight: 'bold', textTransform: 'none', padding: 0}}
        />
        <span> = </span>
        <TextField value={worldScale} onChange={e => onChange('worldScale', e.target.value)}
            name="worldScale"
            onFocus={selectAll}
            style={{width: 80}}
            inputStyle={{textAlign: 'center'}}
        />
      </div>
      <div style={sectionStyle}>
        <Toggle label="Length labels" toggled={showLengthLabels !== 'false'}
            onToggle={(e, checked) => onChange('showLengthLabels', String(checked))}
        />
      </div>
      <div style={sectionStyle}>
        {'Radius: '}
        <TextField value={radius}
            onChange={e => onChange('radius', e.target.value)}
            name="radius"
            onFocus={selectAll}
            style={{width: 80}}
            inputStyle={{textAlign: 'center'}}
        />
      </div>
      <div style={sectionStyle}>
        {'Tiling: '}
        <TextField value={tileX}
            onChange={e => onChange('tileX', e.target.value)}
            name="tileX"
            onFocus={selectAll}
            style={{width: 40}}
            inputStyle={{textAlign: 'center'}}
        />
        {' by '}
        <TextField value={tileY}
            onChange={e => onChange('tileY', e.target.value)}
            name="tileY"
            onFocus={selectAll}
            style={{width: 40}}
            inputStyle={{textAlign: 'center'}}
        />
      </div>
      <div style={sectionStyle}>
        {'Major stroke width: '}
        <TextField value={majorStrokeWidth} onChange={e => onChange('majorStrokeWidth', e.target.value)}
            name="majorStrokeWidth"
            onFocus={selectAll}
            style={{width: 60}}
            inputStyle={{textAlign: 'center'}}
        /> {unit}
      </div>
      <div style={sectionStyle}>
        {'Minor stroke width: '}
        <TextField value={minorStrokeWidth} onChange={e => onChange('minorStrokeWidth', e.target.value)}
            name="minorStrokeWidth"
            onFocus={selectAll}
            style={{width: 60}}
            inputStyle={{textAlign: 'center'}}
        /> {unit}
      </div>
      <div style={sectionStyle}>
        {'3ary stroke width: '}
        <TextField value={tertiaryStrokeWidth} onChange={e => onChange('tertiaryStrokeWidth', e.target.value)}
            name="tertiaryStrokeWidth"
            onFocus={selectAll}
            style={{width: 60}}
            inputStyle={{textAlign: 'center'}}
        /> {unit}
      </div>
      <div style={sectionStyle}>
        {'4ary stroke width: '}
        <TextField value={quaternaryStrokeWidth} onChange={e => onChange('quaternaryStrokeWidth', e.target.value)}
            name="quaternaryStrokeWidth"
            onFocus={selectAll}
            style={{width: 60}}
            inputStyle={{textAlign: 'center'}}
        /> {unit}
      </div>
    </div>
  )
}

export default TherionProtractorMenu

