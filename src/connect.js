// Conductor Connect
// API / Storage Connection

import DB from './storage'

export default (API, CONF) => {
  // connect to the API
  console.log(`>> Conductor Booting...`)
  if (!API || !API.version) return false
  console.log(`>> Conductor Connected: v${ API.version }...`)

  // load/update data
  let data = DB.Load()
  if (data) {
    DB.Meld(CONF, data)
    DB.Save(CONF)
  }

  // overwrite game settings
  console.log(`>> Conductor: Overwriting Rules...`)
  API.modifyConstants(CONF.GAME)
  
  return { CONF }
}