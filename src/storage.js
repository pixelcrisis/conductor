// Conductor Storage
// Interfacing with the 'database'

const _test = (obj1, obj2, key) => {
  if (!obj1.hasOwnProperty(key)) return false
  return typeof obj1[key] === 'object' && typeof obj2[key] === 'object'
}

const _meld = (obj1, obj2) => {
  for (let key in obj2) {
    if (_test(obj1, obj2, key)) _meld(obj1[key], obj2[key])
    else obj1[key] = obj2[key]
  }
}

export const Load = () => {
  // fetch and parse data from localstorage
  let data = window.localStorage.getItem('conductor')
  if (!data) return false

  console.log(`>> Conductor: Loading DB...`)
  return JSON.parse(data)
}

export const Meld = (conf, save) => {
  _meld(conf, save) // deep merge save data
}

export const Save = (data) => {
  // save our configs to stoarge
  window.localStorage.setItem('conductor', JSON.stringify(data))
  console.log(`>> Conductor: DB Updated.`)
} 