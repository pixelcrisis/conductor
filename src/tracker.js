// Conductor Tracker
// Monitors Blueprints

import CONFIG from "../config"
const _sel = `main > .absolute.bottom-0 .lucide-banknote`


export default (API) => {
  // get blueprints
  const list = API.gameState.getTracks()
  const plan = list.filter(t => t.displayType == 'blueprint')
  // calculate costs
  const fund = API.gameState.getBudget()
  const cost = API.gameState.calculateBlueprintCost(plan).totalCost
  const diff = fund - cost

  let color // define our color changes
  if (diff > CONFIG.MAIN.TRAIN_BUFFER) color = CONFIG.MAIN.COLOR_RICH
  else if (diff > 0) color = CONFIG.MAIN.COLOR_WARN
  else color = CONFIG.MAIN.COLOR_POOR

  // and apply them
  let icon = document.querySelectorAll(_sel) 
  if (icon && icon[0]) icon[0].style.color = color
}