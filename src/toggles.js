// Conductor Toggles
// The Options Menu UI

const toggles = [
  {
    id: 'trackBlueprints', defaultValue: true,
    label: 'Blueprint Tracker', onChange: (val) => {
      console.log('Toggle Blueprints Clicked', val)
    } 
  },
  {
    id: 'trackDemand', defaultValue: true,
    label: 'Demand Tracker', onChange: (val) => {
      console.log('Toggle Demand Clicked', val)
    }
  }
]

export default (API) => {
  toggles.forEach(opt => API.ui.addToggle('settings-menu', opt))
}