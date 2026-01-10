/**
 * Subway Conductor
 * Game Tweaks Panel
 */

import * as el from './partials/base'

export default () => {
  let config = window.Conductor.config
  return `
    <div class="flex flex-col gap-2 px-1" style="width: 275px">
      ${ el.toggle({
        key: 'tickets-enable',
        name: 'DYNAMIC TICKET PRICING',
        value: config.tickets.enable,
        desc: "Automatically change the ticket price based on the current demand level. (May require manually setting ticket price after disable.)"
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
    </div>
  
    <div class="flex flex-col gap-2 px-1" style="width: 275px">
      ${ el.label('COST MULTIPLIERS') }
      
            
      ${ el.number({
        key: 'costs-CONSTRUCTION_COSTS-ELEVATION_MULTIPLIERS-ELEVATED',
        name: 'Elevated Tracks: (Default: 0.8)',
        value: config.costs.CONSTRUCTION_COSTS.ELEVATION_MULTIPLIERS.ELEVATED,
        min: 0.2, max: 10, step: 0.2, float: true
      }) }
      ${ el.number({
        key: 'costs-CONSTRUCTION_COSTS-ELEVATION_MULTIPLIERS-AT_GRADE',
        name: 'At Grade Tracks: (Default: 0.3)',
        value: config.costs.CONSTRUCTION_COSTS.ELEVATION_MULTIPLIERS.AT_GRADE,
        min: 0.2, max: 10, step: 0.2, float: true
      }) }
      ${ el.number({
        key: 'costs-CONSTRUCTION_COSTS-ELEVATION_MULTIPLIERS-CUT_AND_COVER',
        name: 'Cut/Cover Tracks: (Default: 1)',
        value: config.costs.CONSTRUCTION_COSTS.ELEVATION_MULTIPLIERS.CUT_AND_COVER,
        min: 0.2, max: 10, step: 0.2, float: true
      }) }
      ${ el.number({
        key: 'costs-CONSTRUCTION_COSTS-ELEVATION_MULTIPLIERS-STANDARD_TUNNEL',
        name: 'Standard Tunnel: (Default: 2)',
        value: config.costs.CONSTRUCTION_COSTS.ELEVATION_MULTIPLIERS.STANDARD_TUNNEL,
        min: 0.2, max: 10, step: 0.2, float: true
      }) }
      ${ el.number({
        key: 'costs-CONSTRUCTION_COSTS-ELEVATION_MULTIPLIERS-DEEP_BORE',
        name: 'Deep Bore: (Default: 4.5)',
        value: config.costs.CONSTRUCTION_COSTS.ELEVATION_MULTIPLIERS.DEEP_BORE,
        min: 0.2, max: 10, step: 0.2, float: true
      }) }
    </div>`
}