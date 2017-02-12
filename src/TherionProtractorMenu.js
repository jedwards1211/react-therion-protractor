// @flow

import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

export type Props = {
  unit?: 'in' | 'cm',
  angleUnit?: 'deg' | 'grad',
  paperScale?: number,
  worldScale?: number,
  minTertiaryTickSpacing?: number,
  minMinorTickSpacing?: number,
  radius?: number,
  majorStrokeWidth?: number,
  minorStrokeWidth?: number,
  tertiaryStrokeWidth?: number,
  quaternaryStrokeWidth?: number,
  azimuthTextSizeAdjustment?: number,
  inclinationTextSizeAdjustment?: number,
  majorLengthTextSizeAdjustment?: number,
  minorLengthTextSizeAdjustment?: number,
  onChange?: (prop: string, newValue: any) => any,
}

export const sectionStyle = {margin: 8}

const TherionProtractorMenu = (props: Props): React.Element<any> => {
  const {unit, angleUnit, paperScale, worldScale, radius} = props
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
            style={{width: 30}}
            inputStyle={{textAlign: 'center'}}
               />
        <FlatButton label={unit} onClick={() => onChange('unit', unit === 'in' ? 'cm' : 'in')}
            style={{width: 30, minWidth: 'initial'}}
            labelStyle={{fontWeight: 'bold', textTransform: 'none', padding: 0}}
        />
        <span> = </span>
        <TextField value={worldScale} onChange={e => onChange('worldScale', e.target.value)}
            name="worldScale"
            style={{width: 80}}
            inputStyle={{textAlign: 'center'}}
        />
      </div>
      <div style={sectionStyle}>
        Radius: <TextField value={radius} onChange={e => onChange('radius', e.target.value)}
            name="radius"
            style={{width: 80}}
            inputStyle={{textAlign: 'center'}}
                />
      </div>
    </div>
  )
}

export default TherionProtractorMenu

