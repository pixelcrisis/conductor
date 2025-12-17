// Conductor Tracker
// Monitors Blueprints

import { TRACKER } from '../config'
import { blueprintCost } from './toolkit'

const TrackBlueprints = (API) => {
  let state = window.Conductor.__blueprints || TRACKER.COLORS.RICH
  const icon = `main > .absolute.bottom-0 .lucide-banknote`
  const diff = blueprintCost(API)

  // define our state changes
  if (diff < 0) state = TRACKER.COLORS.POOR
  else if (diff < TRACKER.BUFFER) state = TRACKER.COLORS.WARN
  else if (state != TRACKER.COLORS.RICH) {
    API.ui.showNotification('Blueprints Available!', 'success')
    state = window.Conductor.__blueprints = TRACKER.COLORS.RICH
  }

  // and apply them
  let el = document.querySelectorAll(icon)
  if (el && el[0]) el[0].style.color = state
}

const TrackDemand = (API) => {
  let icon, state
  const base = `main > .absolute.bottom-0 .lucide`
  
  // figure out what time/demand we're in
  // and select the icon /color associated with it
  const hour = 0 // API.gameState.getCurrentHour()
  if      (hour >= 22) { icon = 'moon';      state = TRACKER.COLORS.PM_OVER }
  else if (hour >= 20) { icon = 'moon';      state = TRACKER.COLORS.PM_NITE }
  else if (hour >= 19) { icon = 'sunset';    state = TRACKER.COLORS.PM_LATE }
  else if (hour >= 16) { icon = 'briefcase'; state = TRACKER.COLORS.PM_PEAK }
  else if (hour >= 15) { icon = 'briefcase'; state = TRACKER.COLORS.PM_RUSH }
  else if (hour >= 10) { icon = 'sun';       state = TRACKER.COLORS.MID_DAY }
  else if (hour >= 9)  { icon = 'briefcase'; state = TRACKER.COLORS.AM_LATE }
  else if (hour >= 6)  { icon = 'briefcase'; state = TRACKER.COLORS.AM_PEAK }
  else if (hour >= 5)  { icon = 'sunrise';   state = TRACKER.COLORS.AM_RUSH }
  else if (hour >= 4)  { icon = 'moon';      state = TRACKER.COLORS.AM_NITE }
  else                 { icon = 'moon';      state = TRACKER.COLORS.AM_OVER }

  if (!icon) return
  let el = document.querySelectorAll(`${base}-${icon}`)
  if (el && el[0]) el[0].style.color = state
}


export default (API) => {
  TrackBlueprints(API)
  TrackDemand(API)
}