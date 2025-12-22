(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // config.js
  var config_exports = {};
  __export(config_exports, {
    AUTO_PAN: () => AUTO_PAN,
    TRACKER: () => TRACKER,
    TWEAKS: () => TWEAKS
  });
  var TRACKER = {
    // Default 100000000
    BUFFER: 1e8,
    // Indicator Colors
    COLORS: {
      // Build
      POOR: "#a3a3a3",
      RICH: "#6cbe45",
      WARN: "#fccc0a",
      // Demand
      AM_OVER: "#a3a3a3",
      AM_NITE: "#6cbe45",
      AM_RUSH: "#fccc0a",
      AM_PEAK: "#ff6319",
      AM_LATE: "#fccc0a",
      MID_DAY: "#6cbe45",
      PM_RUSH: "#fccc0a",
      PM_PEAK: "#ff6319",
      PM_LATE: "#fccc0a",
      PM_NITE: "#6cbe45",
      PM_OVER: "#a3a3a3"
    }
  };
  var AUTO_PAN = {
    // Trigger Area Size
    // Default: 50 (Pixels)
    AREA: 50,
    // How many pixels to move
    // Default: 100, Disable: 0
    DISTANCE: 100,
    // How often (ms) to move
    // Default: 500, Disable: 0
    SPEED: 500
  };
  var TWEAKS = {
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
  };

  // src/connect.js
  var connect_default = (API2, CONF) => {
    console.log(`>> Conductor Booting...`);
    if (!API2 || !API2.version) return false;
    console.log(`>> Conductor Connected: v${API2.version}...`);
    console.log(`>> Conductor: Overwriting Rules...`);
    API2.modifyConstants(CONF.TWEAKS);
    return { CONF };
  };

  // src/toolkit.js
  var blueprintCost = (API2) => {
    const list = API2.gameState.getTracks();
    const plan = list.filter((t) => t.displayType == "blueprint");
    const fund = API2.gameState.getBudget();
    const cost = API2.gameState.calculateBlueprintCost(plan).totalCost;
    return fund - cost;
  };
  var getCurrentHour = () => {
    const elem = `main > .absolute.bottom-0 div.whitespace-nowrap div`;
    const time = document.querySelectorAll(elem)[0]?.textContent;
    if (!time) return false;
    const hour = parseInt(time.split(":")[0]);
    const late = time.indexOf("PM") > -1;
    const noon = time.indexOf("12:") == 0;
    return late && !noon ? hour + 12 : hour;
  };

  // src/tracker.js
  var TrackBlueprints = (API2) => {
    let color = window.Conductor.__blueprints || TRACKER.COLORS.RICH;
    const icon = `main > .absolute.bottom-0 .lucide-banknote`;
    const diff = blueprintCost(API2);
    if (diff < 0) color = TRACKER.COLORS.POOR;
    else if (diff < TRACKER.BUFFER) color = TRACKER.COLORS.WARN;
    else if (color != TRACKER.COLORS.RICH) {
      API2.ui.showNotification("Blueprints Available!", "success");
      color = window.Conductor.__blueprints = TRACKER.COLORS.RICH;
    }
    let el = document.querySelectorAll(icon);
    if (el && el[0]) el[0].style.color = color;
  };
  var TrackDemand = (API2) => {
    const icon = `main > .absolute.bottom-0 .mt-auto .whitespace-nowrap svg`;
    let color;
    const hour = getCurrentHour();
    if (hour >= 22) {
      color = TRACKER.COLORS.PM_OVER;
    } else if (hour >= 20) {
      color = TRACKER.COLORS.PM_NITE;
    } else if (hour >= 19) {
      color = TRACKER.COLORS.PM_LATE;
    } else if (hour >= 16) {
      color = TRACKER.COLORS.PM_PEAK;
    } else if (hour >= 15) {
      color = TRACKER.COLORS.PM_RUSH;
    } else if (hour >= 10) {
      color = TRACKER.COLORS.MID_DAY;
    } else if (hour >= 9) {
      color = TRACKER.COLORS.AM_LATE;
    } else if (hour >= 6) {
      color = TRACKER.COLORS.AM_PEAK;
    } else if (hour >= 5) {
      color = TRACKER.COLORS.AM_RUSH;
    } else if (hour >= 4) {
      color = TRACKER.COLORS.AM_NITE;
    } else {
      color = TRACKER.COLORS.AM_OVER;
    }
    if (!icon || !color) return;
    let el = document.querySelectorAll(icon);
    if (el && el[0]) el[0].style.color = color;
  };
  var tracker_default = (API2) => {
    TrackBlueprints(API2);
    TrackDemand(API2);
  };

  // src/autopan.js
  var autopan_default = (MAP) => {
    const Pan = (dx, dy) => {
      window.PANNING = setInterval(() => {
        MAP.panBy([dx * AUTO_PAN.DISTANCE, dy * AUTO_PAN.DISTANCE]);
      }, AUTO_PAN.SPEED);
    };
    if (!AUTO_PAN.AREA || !AUTO_PAN.DISTANCE || !AUTO_PAN.SPEED) return;
    MAP.on("mousemove", (e) => {
      const s = MAP.getCanvas().getBoundingClientRect();
      const x = e.point.x - s.left;
      const y = e.point.y - s.top;
      if (window.PANNING) clearInterval(window.PANNING);
      if (y < AUTO_PAN.AREA) Pan(0, -1);
      else if (y > s.height - AUTO_PAN.AREA - 104) Pan(0, 1);
      else if (x < AUTO_PAN.AREA) Pan(-1, 0);
      else if (x > s.width - AUTO_PAN.AREA) Pan(1, 0);
    });
    MAP.on("mouseout", (e) => {
      if (window.PANNING) clearInterval(window.PANNING);
    });
  };

  // index.js
  var API = window.SubwayBuilderAPI;
  var Conduct = () => {
    let Conductor = window.Conductor = connect_default(API, config_exports);
    if (!Conductor) return console.log(`>> Conductor Failed :: No API Access.`);
    console.log(`>> Conductor Successfully Activated!`);
  };
  Conduct();
  API.hooks.onGameInit(() => {
    if (window.Conductor.Loop) clearInterval(window.Conductor.Loop);
    window.Conductor.Loop = setInterval(() => tracker_default(API), 1e3);
  });
  API.hooks.onMapReady((map) => autopan_default(map));
  API.registerNewspaperTemplates([
    {
      headline: "Montreal Metro Reaches {{STATIONS}} Stations",
      content: "The STM celebrated today...",
      metadata: {
        category: "milestone",
        tone: "celebratory",
        requiredGameState: {
          minStations: 10
        },
        weight: 8
      }
    }
  ]);
})();
