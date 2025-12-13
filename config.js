// Conductor
// Gneral Settings

export default {

  MAIN: { // main mod configs
    // blueprint cost buffer for trains
    TRAIN_BUFFER: 100000000, // default 100000000

    COLORS: { // colors for tracker
      POOR: '#a3a3a3',
      RICH: '#6cbe45',
      WARN: '#fccc0a',
    }
  },


  GAME: { // core game overwrites
    STARTING_MONEY: 3000000000, // default 3000000000
    STARTING_TRAIN_CARS: 30, // default 30
    DEFAULT_TICKET_COST: 3, // default 3

    MIN_TRACK_LENGTH: 10, // default 10
    MIN_TURN_RADIUS: 29, // default 29
    MAX_SLOPE_PERCENTAGE: 4, // default 4

    STUCK_TRAIN_TIMEOUT: 900, // default 900

    CONSTRUCTION_COSTS: { // game cost overrides
      ELEVATION_THRESHOLDS: {
        DEEP_BORE: -100, // default -100
        STANDARD_TUNNEL: -24, // default -24
        CUT_AND_COVER: -10, // default -10
        AT_GRADE: -3, // default -3
        ELEVATED: 4.5, // default 4.5
      }
    }
  },

  TEST: {
    CHECK: 5,
    TEST: 3,
    DEEP: {
      CHECK: 6,
      TEST: 4
    }
  }

}