// Conductor
// Gneral Settings

// Icon Tracking
// Blueprint & Demand
export const TRACKER = {
// Default 100000000
  BUFFER: 100000000,
  // Indicator Colors
  COLORS: {
    // Build
    POOR: '#a3a3a3',
    RICH: '#6cbe45',
    WARN: '#fccc0a',
    // Demand
    AM_OVER: '#a3a3a3',
    AM_NITE: '#6cbe45',
    AM_RUSH: '#fccc0a',
    AM_PEAK: '#ff6319',
    AM_LATE: '#fccc0a',
    MID_DAY: '#6cbe45',
    PM_RUSH: '#fccc0a',
    PM_PEAK: '#ff6319',
    PM_LATE: '#fccc0a',
    PM_NITE: '#6cbe45',
    PM_OVER: '#a3a3a3',
  }
}

// Edge Scrolling
export const AUTO_PAN = {
  // Trigger Area Size
  // Default: 50 (Pixels)
  AREA: 50,
  // How many pixels to move
  // Default: 100, Disable: 0
  DISTANCE: 100,
  // How often (ms) to move
  // Default: 500, Disable: 0
  SPEED: 500
}

// Game Tweaks
export const TWEAKS = {
  // default 3000000000
  STARTING_MONEY: 3000000000,
  // default 30
  STARTING_TRAIN_CARS: 30,
  // default 3
  DEFAULT_TICKET_COST: 3,

  // default 10
  MIN_TRACK_LENGTH: 10,
  // default 29
  MIN_TURN_RADIUS: 29,
  // default 4
  MAX_SLOPE_PERCENTAGE: 4,
  
  // default 900
  STUCK_TRAIN_TIMEOUT: 900,

  // GAME COST OVERRIDES
  CONSTRUCTION_COSTS: {
    ELEVATION_THRESHOLDS: {
      // default -100
      DEEP_BORE: -100,
      // default -24
      STANDARD_TUNNEL: -24,
      // default -10
      CUT_AND_COVER: -10,
      // default -3
      AT_GRADE: -3,
      // default 4.5
      ELEVATED: 4.5,
    }
  }
}