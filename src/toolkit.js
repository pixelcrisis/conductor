// Subway Builder
// The Toolkit lol

export const blueprintCost = (API) => {
  // get blueprints
  const list = API.gameState.getTracks()
  const plan = list.filter(t => t.displayType == 'blueprint')
  // calculate costs
  const fund = API.gameState.getBudget()
  const cost = API.gameState.calculateBlueprintCost(plan).totalCost
  return fund - cost
}