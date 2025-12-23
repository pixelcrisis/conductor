/* Subway Conductor */
/* @ Subway Builder */
/*  by pixelcrisis  */

// grab our default settings
import * as config from './config'
// import our utilties
import Connect from './utils/connect'
import ApplyUI from './utils/visuals'
// and finally the plugins
import Demand from './plugins/demand'
import Blueprints from './plugins/blueprints'
import Panning from './plugins/panning'

// define the everything
const initConductor = () => {
  // api connection attempt
  const api = window.SubwayBuilderAPI
  let mod = window.Conductor = Connect(api, config)
  if (!mod) return console.log(`>> Conductor Failed :: No API Access.`)

  // embed the visuals
  mod.menu = ApplyUI(api)

  // only run on game start
  api.hooks.onGameInit(() => {
    if (mod.loop) clearInterval(mod.loop)
    // define our main loop
    mod.loop = setInterval(() => {
      Demand(api)
      Blueprints(api)
    }, 1000)
  })

  // only run on map ready
  api.hooks.onMapReady(map => Panning(map))

  // and that's all she wrote
  console.log(`>> Conductor: Online.`)
}

// and let's go
initConductor()