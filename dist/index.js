(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // config.js
  var config_exports = {};
  __export(config_exports, {
    blueprints: () => blueprints,
    demand: () => demand,
    panning: () => panning,
    tweaks: () => tweaks
  });
  var __gray = "#a3a3a3";
  var __green = "#6bce45";
  var __yellow = "#fccc0a";
  var __red = "#ff6319";
  var blueprints = {
    buffer: 1e8,
    colors: {
      nil: __gray,
      min: __yellow,
      max: __green
    }
  };
  var demand = {
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
  };
  var panning = {
    area: 50,
    distance: 100,
    speed: 500
  };
  var tweaks = {
    STARTING_MONEY: 3e9,
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
  };

  // utils/storage.js
  var storage_exports = {};
  __export(storage_exports, {
    load: () => load,
    merge: () => merge,
    save: () => save
  });
  var load = () => {
    let data = window.localStorage.getItem("conductor");
    if (!data) return false;
    console.log(`>> Conductor: Reading Notes...`);
    return JSON.parse(data);
  };
  var save = (cfg) => {
    let data = JSON.stringify(cfg);
    window.localStorage.setItem("conductor", data);
    console.log(`>> Conductor: Updated Notes.`);
  };
  var merge = (cfg, data) => {
    __meld(cfg, data);
    save(cfg);
  };
  var __test = (obj1, obj2, key) => {
    if (!obj1.hasOwnProperty(key)) return false;
    return typeof obj1[key] === "object" && typeof obj2[key] === "object";
  };
  var __meld = (obj1, obj2) => {
    for (let key in obj2) {
      if (__test(obj1, obj2, key)) _meld(obj1[key], obj2[key]);
      else obj1[key] = obj2[key];
    }
  };

  // utils/connect.js
  var connect_default = (api, config) => {
    console.log(`>> Conductor: Checking for API...`);
    if (!api || !api.version) return false;
    console.log(`>> Conductor: Connected to API v${api.version}`);
    let data = load();
    if (data) merge(config, data);
    console.log(`>> Conductor: Tweaking Settings`);
    api.modifyConstants(config.tweaks);
    return { db: storage_exports, config };
  };

  // utils/addmenu.js
  var addmenu_default = (api, menu, target) => {
    if (menu) for (let id in menu) {
      const opt = menu[id], res = { id, ...opt };
      if (opt.type == "button") api.ui.addButton(target, res);
      if (opt.type == "toggle") api.ui.addToggle(target, res);
      if (opt.type == "slider") api.ui.addSlider(target, res);
      if (opt.type == "select") api.ui.addSelect(target, res);
      if (opt.type == "sep") api.ui.addSeparator(target, res);
      if (opt.type == "text") api.ui.addText(target, res);
    }
  };

  // views/settings.js
  var settings_default = {
    trackBlueprints: {
      type: "toggle",
      defaultValue: true,
      label: "Conductor: Track Blueprints",
      onChange: (val) => {
        console.log("Toggle Blueprints Clicked!", val);
      }
    },
    trackDemand: {
      type: "toggle",
      defaultValue: true,
      label: "Conductor: Track Demand",
      onChange: (val) => {
        console.log("Toggle Demand Clicked!", val);
      }
    }
  };

  // plugins/demand.js
  var demand_default = (api) => {
    const cfg = window.Conductor.config.demand;
    let active, hour = api.gameState.getCurrentHour();
    const icon2 = `main > .absolute.bottom-0 .mt-auto .whitespace-nowrap svg`;
    if (hour >= 22) {
      active = cfg.pmOver;
    } else if (hour >= 20) {
      active = cfg.pmNite;
    } else if (hour >= 19) {
      active = cfg.pmLate;
    } else if (hour >= 16) {
      active = cfg.pmPeak;
    } else if (hour >= 15) {
      active = cfg.pmRush;
    } else if (hour >= 10) {
      active = cfg.midDay;
    } else if (hour >= 9) {
      active = cfg.amLate;
    } else if (hour >= 6) {
      active = cfg.amPeak;
    } else if (hour >= 5) {
      active = cfg.amRush;
    } else if (hour >= 4) {
      active = cfg.amNite;
    } else {
      active = cfg.amOver;
    }
    if (!active) return;
    let el = document.querySelectorAll(icon2);
    if (el && el[0]) el[0].style.color = active;
  };

  // plugins/blueprints.js
  var icon = `main > .absolute.bottom-0 .lucide-banknote`;
  var blueprints_default = (api) => {
    const mod = window.Conductor;
    const cfg = mod.config.blueprints;
    let active = mod.$blueprints || cfg.colors.max;
    const list = api.gameState.getTracks();
    const plan = list.filter((t) => t.displayType == "blueprint");
    const cost = api.gameState.calculateBlueprintCost(plan).totalCost;
    const diff = api.gameState.getBudget() - cost;
    if (diff < 0) active = cfg.colors.nil;
    else if (diff < cfg.buffer) active = cfg.colors.min;
    else if (active != cfg.colors.max) {
      active = mod.$blueprints = cfg.colors.max;
      api.ui.showNotification(`Blueprints Available!`, "success");
    }
    let el = document.querySelectorAll(icon);
    if (el && el[0]) el[0].style.color = active;
  };

  // plugins/panning.js
  var panning_default = (map) => {
    const mod = window.Conductor;
    const cfg = mod.config.panning;
    const Pan = (dX, dY) => {
      window.$panning = setInterval(() => {
        map.panBy([dX * cfg.distance, dY * cfg.distance]);
      }, cfg.speed);
    };
    if (!cfg.area || !cfg.distance || !cfg.speed) return;
    map.on("mousemove", (e) => {
      const size = map.getCanvas().getBoundingClientRect();
      const lenX = e.point.x - size.left;
      const lenY = e.point.y - size.top;
      if (window.$panning) clearInterval(window.$panning);
      if (lenY < cfg.area) Pan(0, -1);
      else if (lenY > size.height - cfg.area - 104) Pan(0, 1);
      else if (lenX < cfg.area) Pan(-1, 0);
      else if (lenX > size.width - cfg.area) Pan(1, 0);
    });
    map.on("mouseout", (e) => {
      if (window.$panning) clearInterval(window.$panning);
    });
  };

  // index.js
  var initConductor = () => {
    const api = window.SubwayBuilderAPI;
    let mod = window.Conductor = connect_default(api, config_exports);
    if (!mod) return console.log(`>> Conductor Failed: No API Access.`);
    addmenu_default(api, settings_default, "settings-menu");
    api.hooks.onGameInit(() => {
      if (mod.loop) clearInterval(mod.loop);
      mod.loop = setInterval(() => {
        demand_default(api);
        blueprints_default(api);
      }, 1e3);
    });
    api.hooks.onMapReady((map) => panning_default(map));
    console.log(`>> Conductor: Online.`);
  };
  initConductor();
})();
