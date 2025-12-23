/* Subway Conductor */
/*  API Connection  */

import * as db from './storage'

export default (api, config) => {
  // make sure the API is valid
  console.log(`>> Conductor: Checking for API...`)
  if (!api || !api.version) return false
  console.log(`>> Conductor: Connected to API v${ api.version }`)

  // load/update data
  let data = db.load()
  if (data) db.merge(config, data)

  // overwrite game settings
  console.log(`>> Conductor: Tweaking Settings`)
  api.modifyConstants(config.tweaks)

  // add utilities into object
  return { db, config }
}