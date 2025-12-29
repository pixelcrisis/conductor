/**
 * Subway Conductor
 * Main Settings UI
 */

import mod from '../package.json'

import card from './partials/card'
import tabs from './partials/tabs'

import settings from './settings'
import tweaks from './tweaks'

export default () => {
  // positioning / styling of our box
  const style = "top: 65px; right: 16px; width: 322px;"

  const head = `Subway Conductor v${ mod.version }`

  const tabA = { id: 'cOptions', name: 'Mod Options', body: settings }
  const tabB = { id: 'cTweaks',  name: 'Game Tweaks', body: tweaks }

  const body = tabs(tabA, tabB)

  return `
    <div id="conductMenu" class="hidden absolute z-20" style="${ style }">
      ${ card({ head, body }) }
    </div>
  `
}