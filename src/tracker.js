// Conductor Tracker
// Monitors Blueprints

import CONFIG from "../config"
const { COLORS, TRAIN_BUFFER } = CONFIG.MAIN

const icon = `main > .absolute.bottom-0 .lucide-banknote`

export default (API) => {
  // get blueprints
  const list = API.gameState.getTracks()
  const plan = list.filter(t => t.displayType == 'blueprint')
  let state = window.Conductor.__blueprints || false

  // calculate costs
  const fund = API.gameState.getBudget()
  const cost = API.gameState.calculateBlueprintCost(plan).totalCost
  const diff = fund - cost

  // define our state changes
  if (diff < 0) state = COLORS.POOR
  else if (diff < TRAIN_BUFFER) state = COLORS.WARN
  else if (state != COLORS.RICH) {
    // API.ui.showNotification('Blueprints Available!', 'success')
    state = window.Conductor.__blueprints = COLORS.RICH
  }

  // and apply them
  let el = document.querySelectorAll(icon)
  if (el && el[0]) el[0].style.color = state
}