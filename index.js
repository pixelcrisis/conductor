// Subway Conductor
// for Subway Builder

import configs from './config'

import CONNECT from './src/connect'
import TOGGLES from './src/toggles'
import TRACKER from './src/tracker'

let API = window.SubwayBuilderAPI

const Conduct = () => {
  // connect to the API
  let Conductor = window.Conductor = CONNECT(API, configs)
  if (!Conductor) return console.log(`>> Conductor Failed :: No API Access.`)

  // embed our menu
  Conductor.MENU = TOGGLES(API)

  // and that's it! we're done!
  console.log(`>> Conductor Successfully Activated!`)
}

// initialize the mod
Conduct()

// start the loop on gameInit
API.hooks.onGameInit(() => {
  // clear the loop if it exists
  if (window.Conductor.Loop) clearInterval(window.Conductor.Loop)
  // then define the loop
  window.Conductor.Loop = setInterval(() => { 
    TRACKER(API) 
  }, 2500)

})