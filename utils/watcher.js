/**
 * Subway Conductor
 * Dom Event Watchers
 */

export const $startWatch = () => {
  console.log('>> Conductor: Loading Events...')
  window.Conductor.__errors = watchErrors()
  window.Conductor.__warnings = watchWarnings()
}

export const $endWatch = () => {
  window.Conductor.__errors.disconnect()
  window.Conductor.__warnings.disconnect()
  delete window.Conductor.__errors
  delete window.Conductor.__warnings
}

const watchWarnings = () => {
  let sel = 'main > .absolute.bottom-0 .h-full .h-full .ml-auto .flex-col .flex-col'
  let elem  = document.querySelector(sel)

  let watch = new MutationObserver(changes => {
    if (changes[0].target?.innerText != 'Warnings') return
    let cfg = window.Conductor.config.paused.warning
    if (cfg) window.SubwayBuilderAPI.actions.setPause(true)
  })

  watch.observe(elem, { childList: true })
  console.log('>> Conductor: Warning Event Active')
  return watch
}

const watchErrors = () => {
  let sel = 'main > div[role="region"] ol'
  let elem = document.querySelector(sel)

  let watch = new MutationObserver(changes => {
    if (changes[0].target?.innerText.indexOf('remove') < 0) return
    let cfg = window.Conductor.config.paused.error
    if (cfg) window.SubwayBuilderAPI.actions.setPause(true)
  })

  watch.observe(elem, { childList: true })
  console.log('>> Conductor: Error Event Active')
  return watch
}