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
}

export const sectionStyle = {margin: 8}

const TherionProtractorMenu = (props: Props): React.Element<any> => {
  const {unit, angleUnit, paperScale, worldScale, radius, tileX, tileY, showLengthLabels} = props
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
        <Toggle label="Length labels" toggled={showLengthLabels !== 'false'}
                onToggle={(e, checked) => onChange('showLengthLabels', String(checked))}
        />
      </div>
      <div style={sectionStyle}>
        Radius: <TextField value={radius} onChange={e => onChange('radius', e.target.value)}
            name="radius"
            style={{width: 80}}
            inputStyle={{textAlign: 'center'}}
                />
      </div>
      <div style={sectionStyle}>
        Tiling: <TextField value={tileX} onChange={e => onChange('tileX', e.target.value)}
            name="tileX"
            style={{width: 40}}
            inputStyle={{textAlign: 'center'}}
                /> by <TextField value={tileY} onChange={e => onChange('tileY', e.target.value)}
                    name="tileY"
                    style={{width: 40}}
                    inputStyle={{textAlign: 'center'}}
                      />
      </div>
    </div>
  )
}

export default TherionProtractorMenu

