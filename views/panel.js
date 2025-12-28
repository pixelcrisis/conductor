/* Subway Conductor */
/* User Settings UI */

import box from './partials/box'
import tabs from './partials/tabs'

import mod from '../package.json'
import settings from './settings'
import tweaks from './tweaks'

const tabA = { name: 'Mod Options', body: settings }
const tabB = { name: 'Game Tweaks', body: tweaks }

export default () => `
  <div id="conductMenu" class="hidden absolute" 
    style="top:65px; right:16px; width: 322px; max-width: 50%;">

    ${ box({
      head: `Subway Conductor Options`,
      body: tabs(tabA, tabB)
    }) }
    
  </div>
`