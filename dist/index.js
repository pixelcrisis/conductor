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
    enable: true,
    buffer: 1e8,
    colors: {
      nil: __gray,
      min: __yellow,
      max: __green
    }
  };
  var demand = {
    enable: true,
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
    enable: true,
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
    save: () => save,
    update: () => update
  });
  var load = () => {
    let data = window.localStorage.getItem("conductor");
    if (!data) return false;
    console.log(`>> Conductor: Reading DB...`);
    return JSON.parse(data);
  };
  var save = (cfg) => {
    let data = JSON.stringify(cfg);
    window.localStorage.setItem("conductor", data);
    console.log(`>> Conductor: Updated DB.`);
  };
  var merge = (cfg, data) => {
    __meld(cfg, data);
    save(cfg);
  };
  var update = (key, val) => {
    key = key.split("-");
    let api = window.SubwayBuilderAPI;
    let cfg = window.Conductor.config;
    if (key.length == 2) {
      cfg[key[0]][key[1]] = val;
      if (key[0] == "tweaks") api.modifyConstants({ [key[1]]: val });
    } else {
      cfg[key[0]][key[1]] = val;
      if (key[0] == "tweaks") api.modifyConstants({ [key[1]]: { [key[2]]: val } });
    }
    console.log(`>> Conductor: Set ${key.join(".")} to ${val}`);
    window.Conductor.db.save(cfg);
  };
  var __test = (obj1, obj2, key) => {
    if (!obj1.hasOwnProperty(key)) return false;
    return typeof obj1[key] === "object" && typeof obj2[key] === "object";
  };
  var __meld = (obj1, obj2) => {
    for (let key in obj2) {
      if (__test(obj1, obj2, key)) __meld(obj1[key], obj2[key]);
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

  // views/partials/box.js
  var box_default = (data) => {
    return `
  <div class="pointer-events-auto backdrop-blur-sm border border-border/50 h-fit rounded-lg text-sm items-center justify-center shadow-lg overflow-hidden bg-transparent w-full max-h-full flex flex-col">
    <div class="flex h-9 min-h-9 w-full p-1 border-b border-primary/15 items-center justify-between bg-primary-foreground">
      <div class="flex items-center h-full w-full"></div>
      <div class="flex items-center h-full w-full">
        <h1 class="font-semibold whitespace-nowrap"> ${data.head} </h1>
      </div>
      <div class="flex items-center h-full w-full gap-1 justify-end">
        <div class="flex items-center h-full w-fit">
          <button onclick="window.showConductor()"
          class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-6 w-6 p-0.5 ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-4 w-4"
            ><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
          </button>
        </div>
      </div>
    </div>
    <div class="max-h-full overflow-auto">
      <div class="p-2 flex bg-primary-foreground/60 backdrop-blur-sm max-h-auto overflow-auto min-w-80 justify-center">
        <div class="flex flex-col gap-3 w-full max-w-full">
          ${data.body}

          <div class="pt-2 border-t"></div>
        </div>
      </div>
    </div>
  </div>
`;
  };

  // views/partials/tabs.js
  var tabs_default = (tabA2, tabB2) => `
  <div class="flex gap-1">
    <button id="tabbedA" style="border: 1px solid hsl(var(--foreground))" onclick="window.showTab(true)"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
      ${tabA2.name}
    </button>
    <button id="tabbedB" onclick="window.showTab()"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
      ${tabB2.name}
    </button>
  </div>

  <div id="tabA" class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 w-full px-1">
      ${tabA2.body()}
    </div>
  </div>

  <div id="tabB" class="flex flex-col gap-4 hidden">
    <div class="flex flex-col gap-2 w-full px-1">
      ${tabB2.body()}
    </div>
  </div>
`;

  // views/partials/base.js
  var toggle = (data) => {
    const str = data.value ? "Enabled" : "Disabled";
    return `<div class="flex items-center justify-between gap-2">
    <span class="text-xs font-bold uppercase text-muted-foreground">${data.name}</span>
    <span class="text-xs cursor-pointer hover:underline" 
      onclick="this.nextElementSibling.checked = !this.nextElementSibling.checked;
      this.innerText = this.nextElementSibling.checked ? 'Enabled' : 'Disabled'; 
      window.Conductor.db.update('${data.key}', this.nextElementSibling.checked);">
      ${str}
    </span>
    <input type="checkbox" class="sr-only" checked="${data.value}">
  </div>`;
  };
  var number = (data) => {
    const str = data.cash ? "$" : "";
    return `<span class="text-xs font-bold text-muted-foreground pt-1">${data.name}</span>
  <div class="flex items-center justify-between gap-2" style="margin-top: -0.75rem">
    <input type="range" 
      value="${data.value}" 
      min="${data.min}" max="${data.max}" step="${data.step}"
      onchange="window.Conductor.db.update('${data.key}', parseInt(this.value))"
      oninput="this.nextElementSibling.value = '${str}' + parseInt(this.value).toLocaleString()"
      class="rounded-md border border-input px-3 py-2 bg-background text-right text-xs" />
    <output class="text-xs font-bold text-muted-foreground">
      ${str}${data.value.toLocaleString()}
    </output>
  </div>`;
  };

  // views/settings.js
  var settings_default = () => {
    let config = window.Conductor.config;
    return `
  <div class="mt-1 pt-1 border-t"></div>

  ${toggle({
      key: "demand-enable",
      name: "Demand Tracker",
      value: config.demand.enable
    })}

  <div class="mt-1 pt-1 border-t"></div>

  ${toggle({
      key: "blueprints-enable",
      name: "Blueprint Tracker",
      value: config.blueprints.enable
    })}
  ${number({
      key: "blueprints-buffer",
      name: "Train Buffer",
      cash: true,
      value: config.blueprints.buffer,
      min: 0,
      max: 1e9,
      step: 1e7
    })}

  <div class="mt-1 pt-1 border-t"></div>

  ${toggle({
      key: "panning-enable",
      name: "Map Edge Scrolling",
      value: config.panning.enable
    })}
  ${number({
      key: "panning-area",
      name: "Edge Width (px)",
      value: config.panning.area,
      min: 0,
      max: 150,
      step: 5
    })}
  ${number({
      key: "panning-distance",
      name: "Panning Distance (px)",
      value: config.panning.distance,
      min: 0,
      max: 1e3,
      step: 10
    })}
  ${number({
      key: "panning-speed",
      name: "Panning Speed (ms)",
      value: config.panning.speed,
      min: 0,
      max: 2e3,
      step: 100
    })}
  `;
  };

  // views/tweaks.js
  var tweaks_default = () => {
    let config = window.Conductor.config;
    return `
  <div class="mt-1 pt-1 border-t"></div>

  ${number({
      key: "tweaks-STARTING_MONEY",
      name: "Starting Money (Default $3b)",
      value: config.tweaks.STARTING_MONEY,
      cash: true,
      min: 1e9,
      max: 1e10,
      step: 5e8
    })}
  ${number({
      key: "tweaks-STARTING_TRAIN_CARS",
      name: "Starting Train Cars (Default 30)",
      value: config.tweaks.STARTING_TRAIN_CARS,
      min: 0,
      max: 100,
      step: 5
    })}
  ${number({
      key: "tweaks-DEFAULT_TICKET_COST",
      name: "Default Ticket Cost (Default $3)",
      value: config.tweaks.DEFAULT_TICKET_COST,
      min: 0.5,
      max: 10,
      step: 0.5,
      cash: true
    })}

  <div class="mt-1 pt-1 border-t"></div>

  ${number({
      key: "tweaks-MIN_TRACK_LENGTH",
      name: "Min Track Length (Default 10)",
      value: config.tweaks.MIN_TRACK_LENGTH,
      min: 0,
      max: 50,
      step: 1
    })}
  ${number({
      key: "tweaks-MIN_TURN_RADIUS",
      name: "Min Turn Radius (Default 29)",
      value: config.tweaks.MIN_TURN_RADIUS,
      min: 0,
      max: 50,
      step: 1
    })}
  ${number({
      key: "tweaks-MAX_SLOPE_PERCENTAGE",
      name: "Max Slope % (Default 4)",
      value: config.tweaks.MAX_SLOPE_PERCENTAGE,
      min: 0,
      max: 10,
      step: 1
    })}
  `;
  };

  // views/panel.js
  var tabA = { name: "Mod Options", body: settings_default };
  var tabB = { name: "Game Tweaks", body: tweaks_default };
  var panel_default = () => `
  <div id="conductMenu" class="hidden absolute" 
    style="top:65px; right:16px; width: 322px; max-width: 50%;">

    ${box_default({
    head: `Subway Conductor Options`,
    body: tabs_default(tabA, tabB)
  })}
    
  </div>
`;

  // views/toggles.js
  var icon = (size) => `
  <svg style="width: ${size}; height: ${size};" 
  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-network-icon lucide-chart-network"><path d="m13.11 7.664 1.78 2.672"/><path d="m14.162 12.788-3.324 1.424"/><path d="m20 4-6.06 1.515"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="15" r="2"/></svg>
`;
  var main = `
  <button id="mainConduct" onclick="window.showConductor()"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:text-accent-foreground pointer-events-auto focus-visible:ring-transparent outline-none hover:bg-secondary border-none size-10 shadow-none bg-background/95" type="button">
    ${icon("1.3rem")}
  </button>
`;
  var game = `
  <div id="gameConduct" onclick="window.showConductor()" class="pointer-events-auto bg-primary-foreground backdrop-blur-sm border border-border/50 rounded-lg text-sm flex items-center justify-center shadow-lg overflow-hidden w-10 h-10 p-2 cursor-pointer hover:bg-secondary">
    ${icon("1.5rem")}
  </div>
`;
  var mTop = ".absolute.top-4.right-4.z-20";
  var gTop = "main > .absolute.bottom-0 .max-h-full .max-h-full .ml-auto";
  var showConductor = () => {
    let menu = document.querySelector("#conductMenu");
    let icon3 = document.querySelector("#gameConduct");
    if (!icon3) icon3 = document.querySelector("#mainConduct");
    if (menu) menu.classList.toggle("hidden");
    let show = menu.classList.contains("hidden");
    icon3.setAttribute("style", `filter: invert(${show ? 0 : 1})`);
  };
  var showTab = (left) => {
    let tabA2 = document.querySelector("#tabA");
    let tabB2 = document.querySelector("#tabB");
    let curT = left ? tabA2 : tabB2;
    if (!curT.classList.contains("hidden")) return;
    tabA2.classList.toggle("hidden");
    tabB2.classList.toggle("hidden");
    let btnA = document.querySelector("#tabbedA");
    let btnB = document.querySelector("#tabbedB");
    let curB = left ? btnA : btnB, oldB = left ? btnB : btnA;
    curB.setAttribute("style", "border: 1px solid hsl(var(--foreground))");
    oldB.setAttribute("style", "");
  };

  // utils/addview.js
  var addview_default = () => {
    if (!window.showTab) window.showTab = showTab;
    if (!window.showConductor) window.showConductor = showConductor;
    let main2 = document.querySelector("#mainConduct");
    let game2 = document.querySelector("#gameConduct");
    if (!main2 && !game2) {
      main2 = document.querySelectorAll(mTop)[0];
      game2 = document.querySelectorAll(gTop)[0];
      if (main2) main2.insertAdjacentHTML("afterbegin", main);
      if (game2) game2.insertAdjacentHTML("afterbegin", game);
    }
    let root = document.querySelector("#root");
    let menu = document.querySelector("#conductMenu");
    if (!menu) root.insertAdjacentHTML("beforeend", panel_default());
  };

  // plugins/demand.js
  var demand_default = (api) => {
    const cfg = window.Conductor.config.demand;
    if (!cfg.enable) return;
    let active, hour = getCurrentHour();
    const icon3 = `main > .absolute.bottom-0 .mt-auto .whitespace-nowrap svg`;
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
    let el = document.querySelectorAll(icon3);
    if (el && el[0]) el[0].style.color = active;
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

  // plugins/blueprints.js
  var icon2 = `main > .absolute.bottom-0 .lucide-banknote`;
  var blueprints_default = (api) => {
    const mod = window.Conductor;
    const cfg = mod.config.blueprints;
    if (!cfg.enable) return;
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
    let el = document.querySelectorAll(icon2);
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
    if (!cfg.enable || !cfg.area || !cfg.distance || !cfg.speed) return;
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
    addview_default();
    api.hooks.onGameInit(() => {
      addview_default();
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
