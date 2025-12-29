/**
 * Subway Conductor
 * Game API Connection
 * Storage Injection
 */

// grab database for injection
import * as $db from './storage'
import * as $ui from './addmenu'

export default (api, config) => {
  // make sure we're actually connected
  console.log('>> Conductor: Checking or API...')
  if (!api || !api.version) return false // no API
  console.log('>> Conductor: Found API v' + api.version)

  // load data
  let data = $db.$load()
  if (data)  $db.$migrate(config, data)

  // overwrite game settings
  console.log('>> Conductor: Tweaking Settings...')
  api.modifyConstants(config.tweaks)

  // return our mod
  return { ...$db, ...$ui, config }
}