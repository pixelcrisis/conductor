// Subway Conductor
// for Subway Builder

import * as CONF from './config'

import CONNECT from './src/connect'
// import TOGGLES from './src/toggles'
import TRACKER from './src/tracker'
import AUTOPAN from './src/autopan'

let API = window.SubwayBuilderAPI

const Conduct = () => {
  // connect to the API
  let Conductor = window.Conductor = CONNECT(API, CONF)
  if (!Conductor) return console.log(`>> Conductor Failed :: No API Access.`)

  // embed our menu
  // Conductor.MENU = TOGGLES(API)

  // and that's it! we're done!
  console.log(`>> Conductor Successfully Activated!`)
}

// initialize the mod
Conduct()

API.hooks.onGameInit(() => {
  // start the loop on gameInit
  // clear the loop if it exists
  if (window.Conductor.Loop) clearInterval(window.Conductor.Loop)
  // then define the loop
  window.Conductor.Loop = setInterval(() => { 
    TRACKER(API) 
  }, 2500)
})

API.hooks.onMapReady((map) => {
  AUTOPAN(map)
})