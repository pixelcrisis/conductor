/**
 * Subway Conductor
 * Adding The Menu Panel
 */

import panel from '../views/panel'
import * as toggles from './toggles'

export const $addUI = () => {
  let root = document.querySelector('#root')
  let main = document.querySelector('#conductMain')
  let game = document.querySelector('#conductGame')
  let menu = document.querySelector('#conductMenu')

  // inject our menu
  if (!menu) root.insertAdjacentHTML('beforeend', panel())

  if (!main && !game) {
    // add buttons to the game's top bar
    main = document.querySelectorAll(toggles.mainTop)[0]
    game = document.querySelectorAll(toggles.gameTop)[0]
    if (main) main.insertAdjacentHTML('afterbegin', toggles.main())
    if (game) game.insertAdjacentHTML('afterbegin', toggles.game())
  }
}

export const $showUI = () => {
  let menu = document.querySelector('#conductMenu')
  if (menu) menu.classList.toggle('hidden')
}

export const $showTab = id => {
  // hide currently active tab
  let cur = document.querySelector('.c-tab:not(.hidden)')
  if (cur) cur.classList.toggle('hidden')
  // reset currently active button
  document.querySelectorAll('.c-tab-btn')
    .forEach(b => b.setAttribute('style', ''))
  // and show the new tab target
  let bor = 'border-bottom: 1px solid hsl(var(--foreground))'
  document.querySelector(id).classList.toggle('hidden')
  document.querySelector(id + 'Btn').setAttribute('style', bor)
}