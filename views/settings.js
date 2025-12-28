/* Subway Conductor */
/* Mod Settings */

import * as el from './partials/base'

export default () => {
  let config = window.Conductor.config
  return `
  <div class="mt-1 pt-1 border-t"></div>

  ${ el.toggle({
    key: 'demand-enable',
    name: 'Demand Tracker',
    value: config.demand.enable
  }) }

  <div class="mt-1 pt-1 border-t"></div>

  ${ el.toggle({
    key: 'blueprints-enable',
    name: 'Blueprint Tracker',
    value: config.blueprints.enable
  }) }
  ${ el.number({
    key: 'blueprints-buffer',
    name: 'Train Buffer', cash: true,
    value: config.blueprints.buffer,
    min: 0, max: 1000000000, step: 10000000
  }) }

  <div class="mt-1 pt-1 border-t"></div>

  ${ el.toggle({
    key: 'panning-enable',
    name: 'Map Edge Scrolling',
    value: config.panning.enable
  }) }
  ${ el.number({
    key: 'panning-area',
    name: 'Edge Width (px)',
    value: config.panning.area,
    min: 0, max: 150, step: 5
  }) }
  ${ el.number({
    key: 'panning-distance',
    name: 'Panning Distance (px)',
    value: config.panning.distance,
    min: 0, max: 1000, step: 10
  }) }
  ${ el.number({
    key: 'panning-speed',
    name: 'Panning Speed (ms)',
    value: config.panning.speed,
    min: 0, max: 2000, step: 100
  }) }
  `
}