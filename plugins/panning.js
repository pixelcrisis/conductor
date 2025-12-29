/**
 * Subway Conductor
 * Auto Map Panning
 * at Edge Detection
 */

export default map => {
  let mod = window.Conductor
  let config = mod.config.panning

  if (!config.enable) return
  if (!config.area || !config.distance) return

  // define our panning function
  const Pan = (dX, dY) => {
    window.__panning = setInterval(() => {
      map.panBy([ dX * config.distance, dY * config.distance ])
    }, config.delay)
  }

  map.on('mousemove', e => {
    let size = map.getCanvas().getBoundingClientRect()
    let lenX = e.point.x - size.left
    let lenY = e.point.y - size.top

    if (window.__panning) clearInterval(window.__panning)

    if (lenY < config.area) Pan(0, -1)
    else if (lenY > (size.height - config.area - 104)) Pan(0, 1)
    else if (lenX < config.area) Pan(-1, 0)
    else if (lenX > size.width - config.area) Pan(1, 0)
  })

  map.on('mouseout', () => {
    if (window.__panning) clearInterval(window.__panning)
  })
}