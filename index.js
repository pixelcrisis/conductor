/* Subway Conductor */
/* @ Subway Builder */
/*  by pixelcrisis  */

// grab our default settings
import * as config from './config'
// import our utilties
import Connect from './utils/connect'
import AddMenu from './utils/addmenu'
// and then our UI elements
import SettingsView from './views/settings'
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

  AddMenu(api, SettingsView, 'settings-menu') // embed the core menu

  // only run on game start
  api.hooks.onGameInit(() => {
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

// and let's go
initConductor()