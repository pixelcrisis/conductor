// Conductor AutoPan
// Automatic Edge Scrolling

import { AUTO_PAN } from '../config'

export default (MAP) => {
  const Pan = (dx, dy) => {
    window.PANNING = setInterval(() => {
      // pan the map by DISTANCE pixels
      MAP.panBy([dx * AUTO_PAN.DISTANCE, dy * AUTO_PAN.DISTANCE])
    }, AUTO_PAN.SPEED)
  }

  if (!AUTO_PAN.AREA || !AUTO_PAN.DISTANCE || !AUTO_PAN.SPEED) return

  MAP.on('mousemove', e => {
    // get size of the window
    const s = MAP.getCanvas().getBoundingClientRect()
    const x = e.point.x - s.left
    const y = e.point.y - s.top

    // clear any existing loops
    if (window.PANNING) clearInterval(window.PANNING)

    // check for mouse position
    // top edge, pan up
    if (y < AUTO_PAN.AREA) Pan(0, -1)
    // bottom edge, pan down
    // the 104 is the height of the bottom bar
    else if (y > s.height - AUTO_PAN.AREA - 104) Pan(0, 1)
    // left edge, pan left
    else if (x < AUTO_PAN.AREA) Pan(-1, 0)
    // right edge, pan right
    else if (x > s.width - AUTO_PAN.AREA) Pan(1, 0)
  })

  MAP.on('mouseout', e => {
    if (window.PANNING) clearInterval(window.PANNING)
  })
}