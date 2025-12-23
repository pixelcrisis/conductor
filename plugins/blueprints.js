/* Subway Conductor  */
/* Blueprint Tracker */

const icon = `main > .absolute.bottom-0 .lucide-banknote`

export default api => {
  const mod = window.Conductor
  const cfg = mod.config.blueprints
  // get our default indicator color
  let active = mod.$blueprints || cfg.colors.max

  // get blueprint cost
  const list = api.gameState.getTracks()
  const plan = list.filter(t => t.displayType == 'blueprint')
  const cost = api.gameState.calculateBlueprintCost(plan).totalCost
  const diff = api.gameState.getBudget() - cost

  // update our indicator color
  if (diff < 0) active = cfg.colors.nil
  else if (diff < cfg.buffer) active = cfg.colors.min
  else if (active != cfg.colors.max) {
    // only fire notification on first good check
    active = mod.$blueprints = cfg.colors.max
    api.ui.showNotification(`Blueprints Available!`, 'success')
  }

  // apply the indicator
  let el = document.querySelectorAll(icon)
  if (el && el[0]) el[0].style.color = active
}