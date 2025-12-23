/* Subway Conductor */
/*  Demand Tracker  */

export default api => {
  const cfg = window.Conductor.config.demand
  let active, hour = api.gameState.getCurrentHour()
  const icon = `main > .absolute.bottom-0 .mt-auto .whitespace-nowrap svg`
  
  if      (hour >= 22) { active = cfg.pmOver }
  else if (hour >= 20) { active = cfg.pmNite }
  else if (hour >= 19) { active = cfg.pmLate }
  else if (hour >= 16) { active = cfg.pmPeak }
  else if (hour >= 15) { active = cfg.pmRush }
  else if (hour >= 10) { active = cfg.midDay }
  else if (hour >= 9)  { active = cfg.amLate }
  else if (hour >= 6)  { active = cfg.amPeak }
  else if (hour >= 5)  { active = cfg.amRush }
  else if (hour >= 4)  { active = cfg.amNite }
  else                 { active = cfg.amOver }

  if (!active) return
  let el = document.querySelectorAll(icon)
  if (el && el[0]) el[0].style.color = active
}