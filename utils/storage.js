/**
 * Subway Conductor
 * The Storage Functions
 */

export const $load = () => {
  console.log('>> Conductor: Reading Database...')
  let res = window.localStorage.getItem('conductor')
  if (!res) return console.log('>> Conductor: No Database Found.')
  
  console.log('>> Conductor: Found Database...')
  return JSON.parse(res)
}

export const $save = config => {
  let res = JSON.stringify(config)
  window.localStorage.setItem('conductor', res)
  console.log('>> Conductor: Updated Database.')
}

export const $migrate = (config, res) => {
  merge(config, res)
  $save(config)
}

export const $update = (key, val) => {
  let target = key.split('-')
  let nested = target.length == 3
  let config = window.Conductor.config
  const  api = window.SubwayBuilderAPI
  
  // find and update our option
  if (!nested) config[target[0]][target[1]] = val 
  else config[target[0]][target[1]][target[2]] = val

  // define any new game tweaks
  let result = !nested ? val : { [target[2]]: val }
  if (target[0] == 'tweaks' || target[0] == 'costs') {
    api.modifyConstants({ [target[1]]: result })
  }

  // save the updated config
  console.log('>> Conductor: Set ' + target.join('.') + ' to ' + val)
  window.Conductor.$save(config)
}

// check if properties are objects
// so we can clone nested properties
const test = (objA, objB, key) => {
  if (!objA.hasOwnProperty(key)) return false
  return typeof objA[key] === 'object' && typeof objB[key] === 'object'
}

// update nested properties
const merge = (objA, objB) => {
  for (let key in objB) {
    if (test(objA, objB, key)) merge(objA[key], objB[key])
    else objA[key] = objB[key]
  }
}