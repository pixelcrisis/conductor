/* Subway Conductor */
/* @ Subway Builder */
/*  by pixelcrisis  */

// grab our default settings
import * as config from './config'
// import our utilties
import Connect from './utils/connect'
import AddView from './utils/addview'
// and finally the plugins
import TrackDemand from './plugins/demand'
import TrackBlueprints from './plugins/blueprints'
import AutoPanning from './plugins/panning'

// define the everything
const initConductor = () => {
  // api connection attempt
  const api = window.SubwayBuilderAPI
  let mod = window.Conductor = Connect(api, config)
  if (!mod) return console.log(`>> Conductor Failed: No API Access.`)

  AddView() // embed on main menu

  // only run on game start
  api.hooks.onGameInit(() => {
    AddView() // embed on game start
    if (mod.loop) clearInterval(mod.loop)
    // define our main loop
    mod.loop = setInterval(() => {
      TrackDemand(api)
      TrackBlueprints(api)
    }, 1000)
  })

  // only run on map ready
  api.hooks.onMapReady(map => AutoPanning(map))

  // and that's all she wrote
  console.log(`>> Conductor: Online.`)
}

initConductor() // and let's go