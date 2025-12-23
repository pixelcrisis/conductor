/* Subway Conductor */
/* User Settings UI */

export default {
  trackBlueprints: {
    type: 'toggle', defaultValue: true,
    label: 'Conductor: Track Blueprints', onChange: val => {
      console.log('Toggle Blueprints Clicked!', val)
    }
  },
  trackDemand: {
    type: 'toggle', defaultValue: true,
    label: 'Conductor: Track Demand', onChange: val => {
      console.log('Toggle Demand Clicked!', val)
    }
  }
}