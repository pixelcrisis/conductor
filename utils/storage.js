/* Subway Conductor */
/*  The 'Database'  */

export const load = () => {
  let data = window.localStorage.getItem('conductor')
  if (!data) return false
  console.log(`>> Conductor: Reading DB...`)
  return JSON.parse(data)
}

export const save = cfg => {
  let data = JSON.stringify(cfg)
  window.localStorage.setItem('conductor', data)
  console.log(`>> Conductor: Updated DB.`)
}

export const merge = (cfg, data) => {
  __meld(cfg, data) // deep merge
  save(cfg)
}

export const update = (key, val) => {
  key = key.split('-')
  let api = window.SubwayBuilderAPI
  let cfg = window.Conductor.config
  
  if (key.length == 2) {
    cfg[key[0]][key[1]] = val
    if (key[0] == 'tweaks') api.modifyConstants({ [key[1]]: val })
  } else {
    cfg[key[0]][key[1]] = val
    if (key[0] == 'tweaks') api.modifyConstants({ [key[1]]: { [key[2]]: val } })
  }
  
  console.log(`>> Conductor: Set ${ key.join('.') } to ${ val }`)
  window.Conductor.db.save(cfg)
}

const __test = (obj1, obj2, key) => {
  if (!obj1.hasOwnProperty(key)) return false
  return typeof obj1[key] === 'object' && typeof obj2[key] === 'object'
}

const __meld = (obj1, obj2) => {
  for (let key in obj2) {
    if (__test(obj1, obj2, key)) __meld(obj1[key], obj2[key])
    else obj1[key] = obj2[key]
  }
}