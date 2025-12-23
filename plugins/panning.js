/* Subway Conductor */
/* Auto Map Panning */

export default map => {
  const mod = window.Conductor
  const cfg = mod.config.panning

  const Pan = (dX, dY) => {
    window.$panning = setInterval(() => {
      map.panBy([ dX * cfg.distance, dY * cfg.distance ])
    }, cfg.speed)
  }

  if (!cfg.area || !cfg.distance || !cfg.speed) return

  map.on('mousemove', e => {
    const size = map.getCanvas().getBoundingClientRect()
    const lenX = e.point.x - size.left
    const lenY = e.point.y - size.top

    if (window.$panning) clearInterval(window.$panning)

    // top edge, pan up
    if (lenY < cfg.area) Pan(0, -1)
    // bottom edge (104 for bottom bar), pan down
    else if (lenY > (size.height - cfg.area - 104)) Pan(0, 1)
    // left edge, pan left
    else if (lenX < cfg.area) Pan (-1, 0)
    // right edge, pan right
    else if (lenX > size.width - cfg.area) Pan(1, 0)
  })

  map.on('mouseout', e => {
    if (window.$panning) clearInterval(window.$panning)
  })
}