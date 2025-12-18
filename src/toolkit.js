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

export const getCurrentHour = () => {
  const elem = `main > .absolute.bottom-0 div.whitespace-nowrap div`
  const time = document.querySelectorAll(elem)[0]?.textContent
  if (!time) return false
  const hour = parseInt(time.split(':')[0])
  const late = time.indexOf('PM') > -1
  const noon = time.indexOf('12:') == 0
  return late && !noon ? hour + 12 : hour
}