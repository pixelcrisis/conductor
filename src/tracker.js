// Conductor Tracker
// Monitors Blueprints

import { TRACKER } from '../config'
import { blueprintCost, getCurrentHour } from './toolkit'

const TrackBlueprints = (API) => {
  let color = window.Conductor.__blueprints || TRACKER.COLORS.RICH
  const icon = `main > .absolute.bottom-0 .lucide-banknote`
  const diff = blueprintCost(API)

  // define our color changes
  if (diff < 0) color = TRACKER.COLORS.POOR
  else if (diff < TRACKER.BUFFER) color = TRACKER.COLORS.WARN
  else if (color != TRACKER.COLORS.RICH) {
    API.ui.showNotification('Blueprints Available!', 'success')
    color = window.Conductor.__blueprints = TRACKER.COLORS.RICH
  }

  // and apply them
  let el = document.querySelectorAll(icon)
  if (el && el[0]) el[0].style.color = color
}

const TrackDemand = (API) => {
  const icon = `main > .absolute.bottom-0 .mt-auto > div > button > svg`
  
  // figure out what time/demand we're in
  // and select the icon /color associated with it
  let color
  // const hour = API.gameState.getCurrentHour()
  const hour = getCurrentHour()
  if      (hour >= 22) { color = TRACKER.COLORS.PM_OVER }
  else if (hour >= 20) { color = TRACKER.COLORS.PM_NITE }
  else if (hour >= 19) { color = TRACKER.COLORS.PM_LATE }
  else if (hour >= 16) { color = TRACKER.COLORS.PM_PEAK }
  else if (hour >= 15) { color = TRACKER.COLORS.PM_RUSH }
  else if (hour >= 10) { color = TRACKER.COLORS.MID_DAY }
  else if (hour >= 9)  { color = TRACKER.COLORS.AM_LATE }
  else if (hour >= 6)  { color = TRACKER.COLORS.AM_PEAK }
  else if (hour >= 5)  { color = TRACKER.COLORS.AM_RUSH }
  else if (hour >= 4)  { color = TRACKER.COLORS.AM_NITE }
  else                 { color = TRACKER.COLORS.AM_OVER }

  if (!icon || !color) return
  let el = document.querySelectorAll(icon)
  if (el && el[0]) for (let i = 0; i < el.length; i++) {
    el[i].style.fill = color
  }
}


export default (API) => {
  TrackBlueprints(API)
  TrackDemand(API)
}