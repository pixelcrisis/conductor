/**
 * Subway Conductor
 * Game Tweaks Panel
 */

import * as el from './partials/base'

export default () => {
  let config = window.Conductor.config
  return `
    ${ el.toggle({
      key: 'paused-error',
      name: 'Pause On Errors',
      value: config.paused.error
    }) }
    ${ el.toggle({
      key: 'paused-warning',
      name: 'Pause On Warnings',
      value: config.paused.warning
    }) }
  
    <div class="mt-1 pt-1 border-t"></div>

    ${ el.number({
      key: 'tweaks-STARTING_MONEY',
      name: 'Starting Money (Default $3b)',
      value: config.tweaks.STARTING_MONEY, cash: true,
      min: 1000000000, max: 10000000000, step: 500000000
    }) }
    ${ el.number({
      key: 'tweaks-STARTING_TRAIN_CARS',
      name: 'Starting Train Cars (Default 30)',
      value: config.tweaks.STARTING_TRAIN_CARS,
      min: 0, max: 100, step: 5
    }) }
    ${ el.number({
      key: 'tweaks-DEFAULT_TICKET_COST',
      name: 'Default Ticket Cost (Default $3)',
      value: config.tweaks.DEFAULT_TICKET_COST,
      min: 0.5, max: 10, step: 0.5, cash: true
    }) }
  
    <div class="mt-1 pt-1 border-t"></div>
  
    ${ el.number({
      key: 'tweaks-MIN_TRACK_LENGTH',
      name: 'Min Track Length (Default 10)',
      value: config.tweaks.MIN_TRACK_LENGTH,
      min: 0, max: 50, step: 1
    }) }
    ${ el.number({
      key: 'tweaks-MIN_TURN_RADIUS',
      name: 'Min Turn Radius (Default 29)',
      value: config.tweaks.MIN_TURN_RADIUS,
      min: 0, max: 50, step: 1
    }) }
    ${ el.number({
      key: 'tweaks-MAX_SLOPE_PERCENTAGE',
      name: 'Max Slope % (Default 4)',
      value: config.tweaks.MAX_SLOPE_PERCENTAGE,
      min: 0, max: 10, step: 1
    }) }
  `
}