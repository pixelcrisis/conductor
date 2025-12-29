/**
 * Subway Conductor
 * Demand Tracker
 */

export default () => {
  let mod = window.Conductor
  let config = mod.config.demand
  const api = window.SubwayBuilderAPI

  let color = config.pmOver
  let icon = 'main > .absolute.bottom-0 .mt-auto .whitespace-nowrap svg' 
  
  if (config.enable) {
    let hour = api.gameState.getCurrentHour()
    // match hour to correct color
    if      (hour >= 22) { color = config.pmOver }
    else if (hour >= 20) { color = config.pmNite }
    else if (hour >= 19) { color = config.pmLate }
    else if (hour >= 16) { color = config.pmPeak }
    else if (hour >= 15) { color = config.pmRush }
    else if (hour >= 10) { color = config.midDay }
    else if (hour >= 9)  { color = config.amLate }
    else if (hour >= 6)  { color = config.amPeak }
    else if (hour >= 5)  { color = config.amRush }
    else if (hour >= 4)  { color = config.amNite }
    else                 { color = config.amOver }
  }

  // apply our selected color
  let elem = document.querySelectorAll(icon)
  if (elem[0]) elem[0].style.color = color
}