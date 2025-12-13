// Conductor
// Gneral Settings

export default {

  // SUBWAY CONDUCTOR CONFIGS
  MAIN: {
    // Blueprint Tracker 
    // Default: 100000000
    TRAIN_BUFFER: 100000000,

    // Tracker Indicators
    COLORS: {
      POOR: '#a3a3a3',
      RICH: '#6cbe45',
      WARN: '#fccc0a',
    }
  },

  // CORE GAME SETTINGS TWEAKS
  GAME: {
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

}