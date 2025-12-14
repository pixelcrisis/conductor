(() => {
  // config.js
  var config_default = {
    // SUBWAY CONDUCTOR CONFIGS
    MAIN: {
      // Blueprint Tracker 
      // Default: 100000000
      TRAIN_BUFFER: 1e8,
      // Auto Pan Area
      // Trigger Area Size
      // Default: 50 (Pixels)
      PAN_AREA: 50,
      // The Pan Speed (pixels moved)
      // Default: 50, Disable: 0
      PAN_SPEED: 50,
      // Tracker Indicators
      COLORS: {
        POOR: "#a3a3a3",
        RICH: "#6cbe45",
        WARN: "#fccc0a"
      }
    },
    // CORE GAME SETTINGS TWEAKS
    GAME: {
      // default 3000000000
      STARTING_MONEY: 3e9,
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
          ELEVATED: 4.5
        }
      }
    }
  };

  // src/connect.js
  var connect_default = (API2, CONF) => {
    console.log(`>> Conductor Booting...`);
    if (!API2 || !API2.version) return false;
    console.log(`>> Conductor Connected: v${API2.version}...`);
    console.log(`>> Conductor: Overwriting Rules...`);
    API2.modifyConstants(CONF.GAME);
    return { CONF };
  };

  // src/tracker.js
  var { COLORS, TRAIN_BUFFER } = config_default.MAIN;
  var icon = `main > .absolute.bottom-0 .lucide-banknote`;
  var tracker_default = (API2) => {
    const list = API2.gameState.getTracks();
    const plan = list.filter((t) => t.displayType == "blueprint");
    let state = window.Conductor.__blueprints || false;
    const fund = API2.gameState.getBudget();
    const cost = API2.gameState.calculateBlueprintCost(plan).totalCost;
    const diff = fund - cost;
    if (diff < 0) state = COLORS.POOR;
    else if (diff < TRAIN_BUFFER) state = COLORS.WARN;
    else if (state != COLORS.RICH) {
      state = window.Conductor.__blueprints = COLORS.RICH;
    }
    let el = document.querySelectorAll(icon);
    if (el && el[0]) el[0].style.color = state;
  };

  // src/autopan.js
  var { PAN_AREA, PAN_SPEED } = config_default.MAIN;
  var autopan_default = (MAP) => {
    const Pan = (dx, dy) => {
      window.AUTOPAN = setTimeout(() => {
        window.AUTOPAN = null;
        window.PANNING = setInterval(() => {
          MAP.panBy([dx * PAN_SPEED, dy * PAN_SPEED]);
        }, 50);
      }, 200);
    };
    if (PAN_SPEED) {
      MAP.on("mousemove", (e) => {
        const s = MAP.getCanvas().getBoundingClientRect();
        const x = e.point.x - s.left;
        const y = e.point.y - s.top;
        if (window.AUTOPAN) clearTimeout(window.AUTOPAN);
        if (window.PANNING) clearInterval(window.PANNING);
        if (y < PAN_AREA) Pan(0, -1);
        else if (y > s.height - PAN_AREA - 104) Pan(0, 1);
        else if (x < PAN_AREA) Pan(-1, 0);
        else if (x > s.width - PAN_AREA) Pan(1, 0);
      });
      MAP.on("mouseout", (e) => {
        if (window.AUTOPAN) clearTimeout(window.AUTOPAN);
        if (window.PANNING) clearInterval(window.PANNING);
      });
    }
  };

  // index.js
  var API = window.SubwayBuilderAPI;
  var Conduct = () => {
    let Conductor = window.Conductor = connect_default(API, config_default);
    if (!Conductor) return console.log(`>> Conductor Failed :: No API Access.`);
    console.log(`>> Conductor Successfully Activated!`);
  };
  Conduct();
  API.hooks.onGameInit(() => {
    if (window.Conductor.Loop) clearInterval(window.Conductor.Loop);
    window.Conductor.Loop = setInterval(() => {
      tracker_default(API);
    }, 2500);
  });
  API.hooks.onMapReady((map) => {
    autopan_default(map);
  });
})();
