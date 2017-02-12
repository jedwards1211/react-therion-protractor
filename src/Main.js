// @flow
/* global window */

import React from 'react'
import injectSheet from 'react-jss'
import TherionProtractorMenu from './TherionProtractorMenu'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Print from 'material-ui/svg-icons/action/print'
import type {Props as ProtractorProps} from './TherionProtractorMenu'

const styles = {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  preview: {
    border: 'none',
    padding: 10,
    transition: 'margin ease-out 0.2s',
  },
}

export type Props = {
  router: Object,
  location: {
    pathname: string,
    query: Object,
  },
  sheet: {
    classes: {
      root: string,
      preview: string,
    },
  },
}

function convertQuery(query: Object): string {
  let result = []
  for (let key in query) {
    result.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  }
  return result.join('&')
}

function getProtractorProps({
  unit,
  angleUnit,
  paperScale,
  worldScale,
  minTertiaryTickSpacing,
  minMinorTickSpacing,
  radius,
  majorStrokeWidth,
  minorStrokeWidth,
  tertiaryStrokeWidth,
  quaternaryStrokeWidth,
  azimuthTextSizeAdjustment,
  inclinationTextSizeAdjustment,
  majorLengthTextSizeAdjustment,
  minorLengthTextSizeAdjustment,
}: Object): ProtractorProps {
  return {
    unit: unit || 'in',
    angleUnit: angleUnit || 'deg',
    paperScale: parseFloat(paperScale) || 1,
    worldScale: parseFloat(worldScale) || 10,
    radius: parseFloat(radius) || 20,
  }
}

function print() {
  if (typeof window !== undefined) {
    window.frames['preview'].focus()
    window.frames['preview'].print()
  }
}

const Main = ({router, location: {pathname, query}, sheet: {classes}}: Props): React.Element<any> => {
  const menuOpen = query.showMenu === 'true'
  const protractorProps = getProtractorProps(query)

  return (
    <div className={classes.root}>
      <AppBar
          title="Customizable Therion Protractor"
          iconElementLeft={
            <IconButton onClick={() => router.push({pathname, query: {...query, showMenu: true}})}>
              <NavigationMenu />
            </IconButton>
          }
          iconElementRight={
            <IconButton onClick={print}>
              <Print />
            </IconButton>
          }
      />
      <Drawer open={menuOpen}>
        <AppBar
            title="Options"
            iconElementLeft={
              <IconButton onClick={() => router.push({pathname, query: {...query, showMenu: false}})}>
                <NavigationClose />
              </IconButton>
            }
            iconElementRight={
            <IconButton onClick={print}>
              <Print />
            </IconButton>
          }
        />
        <TherionProtractorMenu
            {...protractorProps}
            onChange={(prop: string, newValue: any) => router.push({pathname, query: {...query, [prop]: newValue}})}
        />
      </Drawer>
      <iframe
          id="preview"
          name="preview"
          className={classes.preview}
          src={`/#/preview/?${convertQuery(protractorProps)}`}
          width="100%"
          height="100%"
          style={{
            marginLeft: menuOpen ? 256 : 0,
          }}
      />
    </div>
  )
}

export default injectSheet(styles)(Main)

