/**
 * Subway Conductor
 * Game Tweaks Panel
 */

import * as el from './partials/base'

export default () => {
  let config = window.Conductor.config
  return `
    <div class="flex flex-col gap-2 px-1" style="width: 275px">
      ${ el.number({
        key: 'game-speed',
        name: 'Game Speed Multiplier',
        value: config.game.speed,
        min: 1, max: 10, step: 1,
        func: "window.Conductor.$setSpeed()",
        desc: "Increase the speed of all in-game toggles."
      }) }
    
      <div class="mt-1 pt-1 border-t"></div>
      
      ${ el.number({
        key: 'tweaks-MIN_TRACK_LENGTH',
        name: 'Min Track Length (Default 10)',
        value: config.tweaks.MIN_TRACK_LENGTH,
        min: 0, max: 50, step: 1,
        desc: "Change how long a valid track can be."
      }) }
      ${ el.number({
        key: 'tweaks-MIN_TURN_RADIUS',
        name: 'Min Turn Radius (Default 29)',
        value: config.tweaks.MIN_TURN_RADIUS,
        min: 0, max: 50, step: 1,
        desc: "Controls the turn sharpness of tracks."
      }) }
      ${ el.number({
        key: 'tweaks-MAX_SLOPE_PERCENTAGE',
        name: 'Max Slope % (Default 4)',
        value: config.tweaks.MAX_SLOPE_PERCENTAGE,
        min: 0, max: 50, step: 1,
        desc: "Changes how steep your tracks can run."
      }) }
    </div>
  
    <div class="flex flex-col gap-2 px-1" style="width: 275px">
      ${ el.label('ELEVATION TWEAKS') }
      
      ${ el.number({
        key: 'tweaks-CONSTRUCTION_COSTS-ELEVATION_THRESHOLDS-ELEVATED',
        name: 'Elevated Tracks Start At: (Default 4.5)',
        value: config.tweaks.CONSTRUCTION_COSTS.ELEVATION_THRESHOLDS.ELEVATED,
        min: -40, max: 10, step: 1,
        desc: "Anything below becomes At Grade."
      }) }
      ${ el.number({
        key: 'tweaks-CONSTRUCTION_COSTS-ELEVATION_THRESHOLDS-AT_GRADE',
        name: 'At Grade Tracks Start At: (Default -3)',
        value: config.tweaks.CONSTRUCTION_COSTS.ELEVATION_THRESHOLDS.AT_GRADE,
        min: -40, max: 10, step: 1,
        desc: "Anything below becomes Cut and Cover."
      }) }
      ${ el.number({
        key: 'tweaks-CONSTRUCTION_COSTS-ELEVATION_THRESHOLDS-CUT_AND_COVER',
        name: 'Cut/Cover Starts At: (Default -10)',
        value: config.tweaks.CONSTRUCTION_COSTS.ELEVATION_THRESHOLDS.CUT_AND_COVER,
        min: -50, max: 0, step: 1,
        desc: "Anything below becomes a Standard Tunnel."
      }) }
      ${ el.number({
        key: 'tweaks-CONSTRUCTION_COSTS-ELEVATION_THRESHOLDS-STANDARD_TUNNEL',
        name: 'Standard Tunnels Start At: (Default -24)',
        value: config.tweaks.CONSTRUCTION_COSTS.ELEVATION_THRESHOLDS.STANDARD_TUNNEL,
        min: -70, max: -20, step: 1,
        desc: "Anything below becomes a Deep Bore."
      }) }
    </div>`
}