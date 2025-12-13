// Conductor Toggles
// The Options Menu UI

const Options = () => {
  return `(
    <div className="p-4 bg-white dark:bg-gray-800 rounded">
      <h3>My Mod Settings</h3>
      <button onClick={() => console.log('Clicked!')}>
        Do Something
      </button>
    </div>
  )`;
};

export default (API) => {
  API.ui.registerComponent('settings-menu', {
    id: 'conductor-menu', component: Options
  })
}