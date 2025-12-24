/* Subway Conductor */
/* User Settings UI */

import box from './partials/box'
import tabs from './partials/tabs'

const tabA = { name: 'Mod Options', body: `Mod` }
const tabB = { name: 'Game Tweaks', body: `Game` }

export default `
  <div id="conductMenu" class="hidden absolute" 
    style="top:65px; right:16px; width: 322px; max-width: 50%;">
    
    ${ box('Subway Conductor', tabs(tabA, tabB)) }

  </div>
`