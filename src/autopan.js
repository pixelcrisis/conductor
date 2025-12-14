// Conductor AutoPan
// Automatic Edge Scrolling

import config from '../config'
const { PAN_AREA, PAN_SPEED } = config.MAIN

export default (MAP) => {
  const Pan = (dx, dy) => {
    window.AUTOPAN = setTimeout(() => {
      window.AUTOPAN = null
      window.PANNING = setInterval(() => {
        // pan the map by PAN_SPEED pixels
        MAP.panBy([dx * PAN_SPEED, dy * PAN_SPEED])
      }, 50)
    }, 200)
  }

  if (PAN_SPEED) {
    MAP.on('mousemove', e => {
      // get size of the window
      const s = MAP.getCanvas().getBoundingClientRect()
      const x = e.point.x - s.left
      const y = e.point.y - s.top

      // clear any existing loops
      if (window.AUTOPAN) clearTimeout(window.AUTOPAN)
      if (window.PANNING) clearInterval(window.PANNING)

      // check for mouse position
      // top edge, pan up
      if (y < PAN_AREA) Pan(0, -1)
      // bottom edge, pan down
      // the 104 is the height of the bottom bar
      else if (y > s.height - PAN_AREA - 104) Pan(0, 1)
      // left edge, pan left
      else if (x < PAN_AREA) Pan(-1, 0)
      // right edge, pan right
      else if (x > s.width - PAN_AREA) Pan(1, 0)
    })

    MAP.on('mouseout', e => {
      if (window.AUTOPAN) clearTimeout(window.AUTOPAN)
      if (window.PANNING) clearInterval(window.PANNING)
    })
  }
}