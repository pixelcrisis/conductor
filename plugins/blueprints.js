/**
 * Subway Conductor
 * The Blueprint Tracker
 */

export default () => {
  let mod = window.Conductor
  let config = mod.config.blueprints
  const api = window.SubwayBuilderAPI
  // grab default indicator color
  let color = mod.__blueprints || config.colors.max
  // define our icon location
  let icon = 'main > .absolute.bottom-0 .lucide-banknote'
  
  if (config.enable) {
    // calculate blueprint cost
    let list = api.gameState.getTracks()
    let plan = list.filter(t => t.displayType == 'blueprint')
    let cost = api.gameState.calculateBlueprintCost(plan).totalCost
    let diff = api.gameState.getBudget() - cost

    // update our indicator color
    if (diff < 0) color = mod.__blueprints = config.colors.nil
    // not enough to pass the buffer
    else if (diff < config.buffer) color = mod.__blueprints = config.colors.min
    // only run success if first success
    else if (color != config.colors.max) {
      color = mod.__blueprints = config.colors.max
      api.ui.showNotification('Blueprints Available!', 'success')
    }

    // apply the indicator color
    let elem = document.querySelectorAll(icon)
    if (elem[0]) elem[0].style.color = color
  }
  
  else {
    // cleanup if disabled
    if (!mod.__blueprints) return
    let elem = document.querySelectorAll(icon)
    if (elem[0]) elem[0].style.color = config.colors.max
    delete mod.__blueprints
  }

}