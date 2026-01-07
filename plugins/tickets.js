/**
 * Subway Conductor
 * Dynamic Ticket Pricing
 */

export default () => {
  let mod = window.Conductor
  let config = mod.config.tickets
  const api = window.SubwayBuilderAPI

  if (config.enable) {
    let curr = 0
    let hour = api.gameState.getCurrentHour()

    if      (hour < 5) curr = 0
    else if (hour < 6) curr = 1
    else if (hour < 9) curr = 2
    else if (hour < 16) curr = 1
    else if (hour < 19) curr = 2
    else if (hour < 20) curr = 1
    else curr = 0

    if (curr == mod.__ticket) return
    else mod.__ticket = curr

    let data = parseFloat(config.low)
    if (curr == 1) data = parseFloat(config.medium)
    if (curr == 2) data = parseFloat(config.high)

    api.actions.setTicketPrice(data)

    data = parseFloat(data).toFixed(2) // 3.50 vs 3.5
    api.ui.showNotification('Set Ticket Price To: $' + data)
    console.log('>> Conductor: Set Ticket Price To: $' + data)
  }
}