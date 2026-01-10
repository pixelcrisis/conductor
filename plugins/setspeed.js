/**
 * Subway Conductor
 * Modifying The Game Speeds
 */

export default () => {
  let mod = window.Conductor
  const api = window.SubwayBuilderAPI
  let speed = mod.config.game.speed

  api.actions.setSpeedMultiplier('slow', speed) // default 1
  api.actions.setSpeedMultiplier('normal', speed) // default 25
  api.actions.setSpeedMultiplier('fast', speed) // default 250
  api.actions.setSpeedMultiplier('ultrafast', speed) // default 500
}