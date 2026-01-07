/**
 * Subway Conductor
 * Main Settings UI
 */

import mod from '../package.json'

import card from './partials/card'
import tabs from './partials/tabs'

import options from './options'
import tweaks from './tweaks'
import costs from './costs'

export default () => {
  // positioning / styling of our box
  const style = "top: 65px; right: 16px; width: 322px;"

  const head = `Subway Conductor v${ mod.version }`

  const tabA = { id: 'cOptions', name: 'Options', body: options }
  const tabB = { id: 'cTweaks',  name: 'Tweaks', body: tweaks }
  const tabC = { id: 'cCosts',  name: 'Costs', body: costs }

  const body = tabs(tabA, tabB, tabC)

  return `
    <div id="conductMenu" class="hidden absolute z-20" style="${ style }">
      ${ card({ head, body }) }
    </div>
  `
}