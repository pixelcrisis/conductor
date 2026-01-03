/**
 * Subway Conductor
 * For Subway Builder
 * A mod by pixelcrisis
 */

// we'll need our default configs
import * as config from './config'
import { version } from './package.json'
// and we'll have to grab our utils
import $connect from './utils/connect'
// the plugins are the important bits
import $trackDemand from './plugins/demand'
import $trackBlueprints from './plugins/blueprints'
import $handlePanning from './plugins/panning'

// let's go
(function(){
  // api connection attempt
  const api = window.SubwayBuilderAPI
  let   mod = window.Conductor = $connect(api, config)
  if   (mod)  mod.version = version
  else return console.log('>> Conductor Err: No API Access.')

  mod.$addUI() // embed on main page

  api.hooks.onGameInit(() => {
    mod.$addUI() // embed on game page
    mod.$startWatch() // custom events
    if (mod.loop) clearInterval(mod.loop)
    // define our game loop
    mod.loop = setInterval(() => {
      // looping plugins
      $trackDemand()
      $trackBlueprints()
    }, 1000)
  })

  api.hooks.onMapReady(map => {
    $handlePanning(map)
  })

  // clean up game time loops
  api.hooks.onGameEnd(() => {
    mod.$endWatch()
    if (mod.loop) clearInterval(mod.loop)
  })
})()