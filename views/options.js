/**
 * Subway Conductor
 * Mod Settings Panel
 */

import * as el from './partials/base'

export default () => {
  let config = window.Conductor.config
  return `
    <div class="flex flex-col gap-2 px-1" style="width: 275px">
      ${ el.toggle({
        key: 'paused-warning',
        name: 'Pause For Warnings',
        value: config.paused.warning,
        desc: "Automatically pauses the game for any detected train capacity warnings."
      }) }
      ${ el.toggle({
        key: 'paused-error',
        name: 'Pause For Errors',
        value: config.paused.error,
        desc: "Automatically pauses the game for any detected train removal errors."
      }) }
    
      <div class="mt-1 pt-1 border-t"></div>
    
      ${ el.toggle({
        key: 'blueprints-enable',
        name: 'BLUEPRINT TRACKER',
        value: config.blueprints.enable,
        desc: "Tracks blueprint cost vs funds and adds color to the cash icon to indicate blueprint availability."
      }) }
      ${ el.toggle({
        key: 'blueprints-pause',
        name: 'Pause When Available',
        value: config.blueprints.pause,
        desc: "Automatically pauses the game when blueprints + buffer become available."
      }) }
      ${ el.number({
        key: 'blueprints-buffer',
        name: 'Train Buffer', cash: true,
        value: config.blueprints.buffer,
        min: 0, max: 1000000000, step: 10000000,
        desc: "A yellow icon means you can afford the blueprints but not your train buffer. Used to ensure you can add trains to any new lines."
      }) }
    </div>

    <div class="flex flex-col gap-2 px-1" style="width: 275px">
      ${ el.toggle({
        key: 'demand-enable',
        name: 'DEMAND TRACKER',
        value: config.demand.enable,
        desc: "Tracks the current demand level and adds color to the demand icon for ease of demand identification."
      }) }
    
      <div class="mt-1 pt-1 border-t"></div>

      ${ el.toggle({
        key: 'panning-enable',
        name: 'MAP EDGE SCROLLING',
        value: config.panning.enable,
        desc: "Automatically pan the map when the cursor is near the map edge."
      }) }
      ${ el.number({
        key: 'panning-area',
        name: 'Edge Width (px)',
        value: config.panning.area,
        min: 0, max: 150, step: 5,
        desc: "The size of the panning detection area: how close to the edge before panning begins."
      }) }
      ${ el.number({
        key: 'panning-distance',
        name: 'Panning Distance (px)',
        value: config.panning.distance,
        min: 0, max: 1000, step: 10,
        desc: "How far the map pans per eachdelay."
      }) }
      ${ el.number({
        key: 'panning-delay',
        name: 'Panning Delay (ms)',
        value: config.panning.delay,
        min: 0, max: 2000, step: 100,
        desc: "The delay between each map pan."
      }) }
    </div>`
}