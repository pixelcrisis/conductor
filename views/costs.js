/**
 * Subway Conductor
 * Game Tweaks Panel
 */

import * as el from './partials/base'

export default () => {
  let config = window.Conductor.config
  return `
    ${ el.number({
      key: 'tweaks-STARTING_MONEY',
      name: 'Starting Money (Default $3b)',
      value: config.tweaks.STARTING_MONEY, cash: true,
      min: 1000000000, max: 10000000000, step: 500000000
    }) }
    ${ el.number({
      key: 'tweaks-DEFAULT_TICKET_COST',
      name: 'Starting Ticket Cost (Default $3)',
      value: config.tweaks.DEFAULT_TICKET_COST,
      min: 0.5, max: 10, step: 0.5, cash: true
    }) }
  
    <div class="mt-1 pt-1 border-t"></div>

    ${ el.toggle({
      key: 'tickets-enable',
      name: 'DYNAMIC TICKET PRICING',
      value: config.tickets.enable
    }) }
    ${ el.number({
      key: 'tickets-low',
      name: 'Low Demand Price',
      value: config.tickets.low,
      cash: true, float: true,
      min: 0.25, max: 10, step: 0.25
    }) }
    ${ el.number({
      key: 'tickets-medium',
      name: 'Medium Demand Price',
      value: config.tickets.medium,
      cash: true, float: true,
      min: 0.25, max: 10, step: 0.25
    }) }
    ${ el.number({
      key: 'tickets-high',
      name: 'High Demand Price',
      value: config.tickets.high,
      cash: true, float: true,
      min: 0.25, max: 10, step: 0.25
    }) }
    
    <div class="mt-1 pt-1 border-t"></div>

    <div class="flex gap-1">
      ${ el.button({
        text: 'Add $100m',
        func: 'window.SubwayBuilderAPI.actions.addMoney(100000000)'
      }) }
      ${ el.button({
        text: 'Add $500m',
        func: 'window.SubwayBuilderAPI.actions.addMoney(500000000)'
      }) }
    </div>
  `
}