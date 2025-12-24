/* Subway Conductor  */
/* Batch UI Registry */

import panel from '../views/panel'
import * as toggles from '../views/toggles'

export default () => {
  // start by defining our toggles
  if (!window.showTab) window.showTab = toggles.showTab
  if (!window.showConductor) window.showConductor = toggles.showConductor
  // and injecting the  trigger to the top bar
  let main = document.querySelector('#mainConduct')
  let game = document.querySelector('#gameConduct')
  if (!main && !game) {
    main = document.querySelectorAll(toggles.mTop)[0]
    game = document.querySelectorAll(toggles.gTop)[0]
    if (main) main.insertAdjacentHTML('afterbegin', toggles.main)
    if (game) game.insertAdjacentHTML('afterbegin', toggles.game)
  }

  // and then adding our menu
  let root = document.querySelector('#root')
  let menu = document.querySelector('#conductMenu')
  if (!menu) root.insertAdjacentHTML('beforeend', panel)
}