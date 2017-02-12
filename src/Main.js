// @flow
/* eslint-env browser */

import React from 'react'
import injectSheet from 'react-jss'
import TherionProtractorMenu from './TherionProtractorMenu'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Print from 'material-ui/svg-icons/action/print'

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

function print() {
  window.frames['preview'].focus()
  window.frames['preview'].print()
}

class Main extends React.Component<void, Props, void> {
  setDefaults({router, location: {pathname, query}}: Props) {
    const defaults = {}
    if (!query.unit) defaults.unit = 'in'
    if (!query.angleUnit) defaults.angleUnit = 'deg'
    if (!query.showLengthLabels) defaults.showLengthLabels = 'true'
    if (query.paperScale == null) defaults.paperScale = '1'
    if (query.worldScale == null) defaults.worldScale = '10'
    if (query.radius == null) defaults.radius = '20'
    if (query.tileX == null) defaults.tileX = '1'
    if (query.tileY == null) defaults.tileY = '1'

    if (query.majorStrokeWidth == null) defaults.majorStrokeWidth = 0.012 * ((query.unit || defaults.unit) === 'in' ? 1 : 2.54)
    if (query.minorStrokeWidth == null) defaults.minorStrokeWidth = (query.majorStrokeWidth || defaults.majorStrokeWidth) / 3
    if (query.tertiaryStrokeWidth == null) defaults.tertiaryStrokeWidth = (query.minorStrokeWidth || defaults.minorStrokeWidth) / 2
    if (query.quaternaryStrokeWidth == null) defaults.quaternaryStrokeWidth = (query.tertiaryStrokeWidth || defaults.tertiaryStrokeWidth) / 4

    if (Object.keys(defaults).length) router.replace({pathname, query: {...query, ...defaults}})
  }

  componentWillMount() {
    this.setDefaults(this.props)
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setDefaults(nextProps)
  }

  render(): React.Element<any> {
    const {router, location: {pathname, query}, sheet: {classes}} = this.props
    const menuOpen = query.showMenu === 'true'

    const previewUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}#/preview/?${convertQuery(query)}`

    return (
      <div className={classes.root}>
        <AppBar
            title="Customizable Therion Protractor"
            iconElementLeft={
            <IconButton onClick={() => router.replace({pathname, query: {...query, showMenu: true}})}>
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
              <IconButton onClick={() => router.replace({pathname, query: {...query, showMenu: false}})}>
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
              {...query}
              onChange={(prop: string, newValue: any) => router.replace({pathname, query: {...query, [prop]: newValue}})}
              onMultiChange={newProps => router.replace({pathname, query: {...query, ...newProps}})}
          />
        </Drawer>
        <iframe
            id="preview"
            name="preview"
            className={classes.preview}
            src={previewUrl}
            width="100%"
            height="100%"
            style={{
              marginLeft: menuOpen ? 256 : 0,
            }}
        />
      </div>
    )
  }
}

export default injectSheet(styles)(Main)

