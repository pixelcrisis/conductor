/* Subway Conductor */
/* General Settings */

// Color Confiigs
const __gray    = '#a3a3a3'
const __green   = '#6bce45'
const __yellow  = '#fccc0a'
const __red     = '#ff6319'

// Blueprint Tracking
export const blueprints = {
  buffer: 100000000,
  colors: {
    nil: __gray,
    min: __yellow,
    max: __green
  }
}

// Demand Tracking
export const demand = {
  amOver: __gray,
  amNite: __green,
  amRush: __yellow,
  amPeak: __red,
  amLate: __yellow,
  midDay: __green,
  pmRush: __yellow,
  pmPeak: __red,
  pmLate: __yellow,
  pmNite: __green,
  pmOver: __gray
}

// Edge Panning
export const panning = {
  area: 50,
  distance: 100,
  speed: 500
}

// Game Tweaks
export const tweaks = {
  STARTING_MONEY: 3000000000,
  STARTING_TRAIN_CARS: 30,
  DEFAULT_TICKET_COST: 3,

  MIN_TRACK_LENGTH: 10,
  MIN_TURN_RADIUS: 29,
  MAX_SLOPE_PERCENTAGE: 4,

  CONSTRUCTION_COSTS: {
    ELEVATION_THRESHOLDS: {
      DEEP_BORE: -100,
      STANDARD_TUNNEL: -24,
      CUT_AND_COVER: -10,
      AT_GRADE: -3,
      ELEVATED: 4.5
    }
  }
}