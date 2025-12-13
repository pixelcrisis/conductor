// Subway Conductor
// for Subway Builder

import configs from './config'

import CONNECT from './src/connect'
import TOGGLES from './src/toggles'
import TRACKER from './src/tracker'

const Conduct = () => {
  // connect to the API
  let API = window.SubwayBuilderAPI
  let Conductor = window.Conductor = CONNECT(API, configs)
  if (!Conductor) return console.log(`>> Conductor Failed :: No API Access.`)

  // embed our menu
  Conductor.MENU = TOGGLES(API)

  // define our loop
  const Loop = () => { TRACKER(API) }
  // clear/apply our loop
  if (Conductor.Loop) clearInterval(Conductor.Loop)
  Conductor.Loop = setInterval(Loop, 2500)
  Loop() // fire loop to start the engine

  // and that's it! we're done!
  console.log(`>> Conductor Successfully Activated!`)
}

// initialize the mod
Conduct()
// window.SubwayBuilderAPI.hooks.onGameInit(Conduct)