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
    paused: () => paused,
    tickets: () => tickets,
    tweaks: () => tweaks
  });
  var __gray = "#a3a3a3";
  var __green = "#6bce45";
  var __yellow = "#fccc0a";
  var __red = "#ff6319";
  var blueprints = {
    enable: true,
    buffer: 1e8,
    pause: false,
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
    delay: 500
  };
  var tickets = {
    enable: false,
    low: 3,
    medium: 3,
    high: 3
  };
  var paused = {
    warning: false,
    error: false
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

  // package.json
  var version = "0.8.0";
  var package_default = {
    name: "conductor",
    version,
    description: "Minor tweaks to enhance gameplay.",
    main: "index.js",
    author: "crisis",
    license: "MIT",
    dependencies: {
      esbuild: "^0.27.1"
    },
    scripts: {
      build: "esbuild index.js --bundle --outdir=dist"
    }
  };

  // utils/storage.js
  var storage_exports = {};
  __export(storage_exports, {
    $load: () => $load,
    $migrate: () => $migrate,
    $save: () => $save,
    $update: () => $update
  });
  var $load = () => {
    console.log(">> Conductor: Reading Database...");
    let res = window.localStorage.getItem("conductor");
    if (!res) return console.log(">> Conductor: No Database Found.");
    console.log(">> Conductor: Found Database...");
    return JSON.parse(res);
  };
  var $save = (config) => {
    let res = JSON.stringify(config);
    window.localStorage.setItem("conductor", res);
    console.log(">> Conductor: Updated Database.");
  };
  var $migrate = (config, res) => {
    merge(config, res);
    $save(config);
  };
  var $update = (key, val) => {
    let target = key.split("-");
    let nested = target.length == 3;
    let config = window.Conductor.config;
    const api = window.SubwayBuilderAPI;
    if (!nested) config[target[0]][target[1]] = val;
    else config[target[0]][target[1]][target[2]] = val;
    let result = !nested ? val : { [target[2]]: val };
    if (target[0] == "tweaks") api.modifyConstants({ [target[1]]: result });
    console.log(">> Conductor: Set " + target.join(".") + " to " + val);
    window.Conductor.$save(config);
  };
  var test = (objA, objB, key) => {
    if (!objA.hasOwnProperty(key)) return false;
    return typeof objA[key] === "object" && typeof objB[key] === "object";
  };
  var merge = (objA, objB) => {
    for (let key in objB) {
      if (test(objA, objB, key)) merge(objA[key], objB[key]);
      else objA[key] = objB[key];
    }
  };

  // utils/addmenu.js
  var addmenu_exports = {};
  __export(addmenu_exports, {
    $addUI: () => $addUI,
    $getNum: () => $getNum,
    $showTab: () => $showTab,
    $showUI: () => $showUI
  });

  // views/partials/card.js
  var card_default = (data) => {
    return `
    <div class="pointer-events-auto backdrop-blur-sm border border-border/50 h-fit rounded-lg text-sm items-center justify-center shadow-lg overflow-hidden bg-transparent w-full max-h-full flex flex-col">
      <div class="flex h-9 min-h-9 w-full p-1 border-b border-primary/15 items-center justify-between bg-primary-foreground">
        <div class="flex items-center h-full w-full"></div>
        <div class="flex items-center h-full w-full">
          <h1 class="font-semibold whitespace-nowrap">
            
            ${data.head} 
            
          </h1>
        </div>
        <div class="flex items-center h-full w-full gap-1 justify-end">
          <div class="flex items-center h-full w-fit">
            <button onclick="window.Conductor.$showUI()"
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
  var tabs_default = (tabA, tabB, tabC) => {
    const style = "border-bottom: 1px solid hsl(var(--foreground))";
    return `
    <div class="flex gap-1">
      <button id="${tabA.id}Btn" style="${style}"
        onclick="window.Conductor.$showTab('#${tabA.id}')" 
        class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
        ${tabA.name}
      </button>
      
      <button id="${tabB.id}Btn"
        onclick="window.Conductor.$showTab('#${tabB.id}')" 
        class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
        ${tabB.name}
      </button>
      
      <button id="${tabC.id}Btn"
        onclick="window.Conductor.$showTab('#${tabC.id}')" 
        class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
        ${tabC.name}
      </button>
    </div>

    <div class="border-t"></div>

    <div id="${tabA.id}" class="c-tab flex flex-col gap-4">
      <div class="flex flex-col gap-2 w-full px-1">
        ${tabA.body()}
      </div>
    </div>
    <div id="${tabB.id}" class="c-tab flex flex-col gap-4 hidden">
      <div class="flex flex-col gap-2 w-full px-1">
        ${tabB.body()}
      </div>
    </div>
    <div id="${tabC.id}" class="c-tab flex flex-col gap-4 hidden">
      <div class="flex flex-col gap-2 w-full px-1">
        ${tabC.body()}
      </div>
    </div>
  `;
  };

  // views/partials/base.js
  var toggle = (data) => {
    return `
    <div class="${_grid}">
      <span class="${_label}">${data.name}</span>
      <span class="text-xs cursor-pointer hover:underline" 
        onclick="this.nextElementSibling.checked = !this.nextElementSibling.checked;
          this.innerText = this.nextElementSibling.checked ? 'Enabled' : 'Disabled';
          window.Conductor.$update('${data.key}', this.nextElementSibling.checked);">
        ${data.value ? "Enabled" : "Disabled"}
      </span>
      <input type="checkbox" class="sr-only" checked="${data.value}" />
    </div>`;
  };
  var number = (data) => {
    const str = data.cash ? "$" : "";
    return `
  <span class="${_label} pt-1">${data.name}</span>
  <div class="${_grid}" style="margin-top: -0.75rem">
    <input type="range" 
      value="${data.value}"
      min="${data.min}" max="${data.max}" step="${data.step}"
      onchange="window.Conductor.$update('${data.key}', 
                  window.Conductor.$getNum(this.value, ${data.float}))"
      oninput="this.nextElementSibling.value = '${str}' + 
        window.Conductor.$getNum(this.value, ${data.float}).toLocaleString()"
      class="rounded-md border border-input px-3 py-2 bg-background text-right text-xs" />
    <output class="text-xs font-bold text-muted-foreground">
      ${str}${window.Conductor.$getNum(data.value, data.float).toLocaleString()}
    </output>
  </div>`;
  };
  var button = (data) => {
    return `
    <button onclick="${data.func}" 
      class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
      ${data.text}
    </button>`;
  };
  var _grid = "flex items-center justify-between gap-2";
  var _label = "text-xs font-bold text-muted-foreground select-none";

  // views/options.js
  var options_default = () => {
    let config = window.Conductor.config;
    return `
    ${toggle({
      key: "demand-enable",
      name: "DEMAND TRACKER",
      value: config.demand.enable
    })}
  
    <div class="mt-1 pt-1 border-t"></div>
  
    ${toggle({
      key: "blueprints-enable",
      name: "BLUEPRINT TRACKER",
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
    ${toggle({
      key: "blueprints-pause",
      name: "Pause When Available",
      value: config.blueprints.pause
    })}
  
    <div class="mt-1 pt-1 border-t"></div>
  
    ${toggle({
      key: "panning-enable",
      name: "MAP EDGE SCROLLING",
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
      key: "panning-delay",
      name: "Panning Delay (ms)",
      value: config.panning.delay,
      min: 0,
      max: 2e3,
      step: 100
    })}`;
  };

  // views/tweaks.js
  var tweaks_default = () => {
    let config = window.Conductor.config;
    return `
    ${toggle({
      key: "paused-error",
      name: "Pause On Errors",
      value: config.paused.error
    })}
    ${toggle({
      key: "paused-warning",
      name: "Pause On Warnings",
      value: config.paused.warning
    })}
  
    <div class="mt-1 pt-1 border-t"></div>
    
    ${number({
      key: "tweaks-STARTING_TRAIN_CARS",
      name: "Starting Train Cars (Default 30)",
      value: config.tweaks.STARTING_TRAIN_CARS,
      min: 0,
      max: 100,
      step: 5
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

  // views/costs.js
  var costs_default = () => {
    let config = window.Conductor.config;
    return `
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
      key: "tweaks-DEFAULT_TICKET_COST",
      name: "Starting Ticket Cost (Default $3)",
      value: config.tweaks.DEFAULT_TICKET_COST,
      min: 0.5,
      max: 10,
      step: 0.5,
      cash: true
    })}
  
    <div class="mt-1 pt-1 border-t"></div>

    ${toggle({
      key: "tickets-enable",
      name: "DYNAMIC TICKET PRICING",
      value: config.tickets.enable
    })}
    ${number({
      key: "tickets-low",
      name: "Low Demand Price",
      value: config.tickets.low,
      cash: true,
      float: true,
      min: 0.25,
      max: 10,
      step: 0.25
    })}
    ${number({
      key: "tickets-medium",
      name: "Medium Demand Price",
      value: config.tickets.medium,
      cash: true,
      float: true,
      min: 0.25,
      max: 10,
      step: 0.25
    })}
    ${number({
      key: "tickets-high",
      name: "High Demand Price",
      value: config.tickets.high,
      cash: true,
      float: true,
      min: 0.25,
      max: 10,
      step: 0.25
    })}
    
    <div class="mt-1 pt-1 border-t"></div>

    <div class="flex gap-1">
      ${button({
      text: "Add $100m",
      func: "window.SubwayBuilderAPI.actions.addMoney(100000000)"
    })}
      ${button({
      text: "Add $500m",
      func: "window.SubwayBuilderAPI.actions.addMoney(500000000)"
    })}
    </div>
  `;
  };

  // views/panel.js
  var panel_default = () => {
    const style = "top: 65px; right: 16px; width: 322px;";
    const head = `Subway Conductor v${package_default.version}`;
    const tabA = { id: "cOptions", name: "Options", body: options_default };
    const tabB = { id: "cTweaks", name: "Tweaks", body: tweaks_default };
    const tabC = { id: "cCosts", name: "Costs", body: costs_default };
    const body = tabs_default(tabA, tabB, tabC);
    return `
    <div id="conductMenu" class="hidden absolute z-20" style="${style}">
      ${card_default({ head, body })}
    </div>
  `;
  };

  // utils/toggles.js
  var mainTop = ".absolute.top-4.right-4.z-20";
  var gameTop = 'div[data-mod-id="top-bar"]:first-child .ml-auto';
  var main = () => {
    return `<button id="conductMain" onclick="window.Conductor.$showUI()"
    class="inline-flex items-center justify-center gap-2 mr-1 whitespace-nowrap rounded-md hover:bg-secondary size-10" type="button">
    ${icon("1.3rem")}
  </button>`;
  };
  var game = () => {
    return `<div id="conductGame" onclick="window.Conductor.$showUI()" 
    class="pointer-events-auto bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg text-sm flex items-center justify-center shadow-lg overflow-hidden w-10 h-10 p-2 cursor-pointer hover:bg-secondary">
    ${icon("1.5rem")}
  </div>`;
  };
  var icon = (size) => `
  <svg style="width: ${size}; height: ${size};" 
  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-network-icon lucide-chart-network"><path d="m13.11 7.664 1.78 2.672"/><path d="m14.162 12.788-3.324 1.424"/><path d="m20 4-6.06 1.515"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="15" r="2"/></svg>
`;

  // utils/addmenu.js
  var $addUI = () => {
    let root = document.querySelector("#root");
    let main2 = document.querySelector("#conductMain");
    let game2 = document.querySelector("#conductGame");
    let menu = document.querySelector("#conductMenu");
    if (!menu) root.insertAdjacentHTML("beforeend", panel_default());
    if (!main2 && !game2) {
      main2 = document.querySelectorAll(mainTop)[0];
      game2 = document.querySelectorAll(gameTop)[0];
      if (main2) main2.insertAdjacentHTML("afterbegin", main());
      if (game2) game2.insertAdjacentHTML("afterbegin", game());
    }
  };
  var $showUI = () => {
    let menu = document.querySelector("#conductMenu");
    if (menu) menu.classList.toggle("hidden");
  };
  var $showTab = (id) => {
    let cur = document.querySelector(".c-tab:not(.hidden)");
    if (cur) cur.classList.toggle("hidden");
    document.querySelectorAll(".c-tab-btn").forEach((b) => b.setAttribute("style", ""));
    let bor = "border-bottom: 1px solid hsl(var(--foreground))";
    document.querySelector(id).classList.toggle("hidden");
    document.querySelector(id + "Btn").setAttribute("style", bor);
  };
  var $getNum = (amt, float) => {
    if (!float) return parseInt(amt);
    return parseFloat(amt).toFixed(2);
  };

  // utils/watcher.js
  var watcher_exports = {};
  __export(watcher_exports, {
    $endWatch: () => $endWatch,
    $startWatch: () => $startWatch
  });
  var $startWatch = () => {
    console.log(">> Conductor: Loading Events...");
    window.Conductor.__errors = watchErrors();
    window.Conductor.__warnings = watchWarnings();
  };
  var $endWatch = () => {
    window.Conductor.__errors.disconnect();
    window.Conductor.__warnings.disconnect();
    delete window.Conductor.__errors;
    delete window.Conductor.__warnings;
  };
  var watchWarnings = () => {
    let sel = "main > .absolute.bottom-0 .h-full .h-full .ml-auto .flex-col .flex-col";
    let elem = document.querySelector(sel);
    let watch = new MutationObserver((changes) => {
      if (changes[0].target?.innerText != "Warnings") return;
      let cfg = window.Conductor.config.paused.warning;
      if (cfg) window.SubwayBuilderAPI.actions.setPause(true);
    });
    watch.observe(elem, { childList: true });
    console.log(">> Conductor: Warning Event Active");
    return watch;
  };
  var watchErrors = () => {
    let sel = 'main > div[role="region"] ol';
    let elem = document.querySelector(sel);
    let watch = new MutationObserver((changes) => {
      if (changes[0].target?.innerText.indexOf("remove") < 0) return;
      let cfg = window.Conductor.config.paused.error;
      if (cfg) window.SubwayBuilderAPI.actions.setPause(true);
    });
    watch.observe(elem, { childList: true });
    console.log(">> Conductor: Error Event Active");
    return watch;
  };

  // utils/connect.js
  var connect_default = (api, config) => {
    console.log(">> Conductor: Checking or API...");
    if (!api || !api.version) return false;
    console.log(">> Conductor: Found API v" + api.version);
    let data = $load();
    if (data) $migrate(config, data);
    console.log(">> Conductor: Tweaking Settings...");
    api.modifyConstants(config.tweaks);
    return { ...storage_exports, ...addmenu_exports, ...watcher_exports, config };
  };

  // plugins/demand.js
  var demand_default = () => {
    let mod = window.Conductor;
    let config = mod.config.demand;
    const api = window.SubwayBuilderAPI;
    let color = config.pmOver;
    let icon2 = "main > .absolute.bottom-0 .mt-auto .whitespace-nowrap svg";
    if (config.enable) {
      let hour = api.gameState.getCurrentHour();
      if (hour >= 22) {
        color = config.pmOver;
      } else if (hour >= 20) {
        color = config.pmNite;
      } else if (hour >= 19) {
        color = config.pmLate;
      } else if (hour >= 16) {
        color = config.pmPeak;
      } else if (hour >= 15) {
        color = config.pmRush;
      } else if (hour >= 10) {
        color = config.midDay;
      } else if (hour >= 9) {
        color = config.amLate;
      } else if (hour >= 6) {
        color = config.amPeak;
      } else if (hour >= 5) {
        color = config.amRush;
      } else if (hour >= 4) {
        color = config.amNite;
      } else {
        color = config.amOver;
      }
    }
    let elem = document.querySelectorAll(icon2);
    if (elem[0]) elem[0].style.color = color;
  };

  // plugins/blueprints.js
  var blueprints_default = () => {
    let mod = window.Conductor;
    let config = mod.config.blueprints;
    const api = window.SubwayBuilderAPI;
    let color = mod.__blueprints || config.colors.max;
    let icon2 = "main > .absolute.bottom-0 .lucide-banknote";
    if (config.enable) {
      let list = api.gameState.getTracks();
      let plan = list.filter((t) => t.displayType == "blueprint");
      let cost = api.gameState.calculateBlueprintCost(plan).totalCost;
      let diff = api.gameState.getBudget() - cost;
      if (diff < 0) color = mod.__blueprints = config.colors.nil;
      else if (diff < config.buffer) color = mod.__blueprints = config.colors.min;
      else if (color != config.colors.max) {
        color = mod.__blueprints = config.colors.max;
        api.ui.showNotification("Blueprints Available!", "success");
        if (config.pause) api.actions.setPause(true);
      }
      let elem = document.querySelectorAll(icon2);
      if (elem[0]) elem[0].style.color = color;
    } else {
      if (!mod.__blueprints) return;
      let elem = document.querySelectorAll(icon2);
      if (elem[0]) elem[0].style.color = config.colors.max;
      delete mod.__blueprints;
    }
  };

  // plugins/panning.js
  var panning_default = (map) => {
    map.on("mousemove", (e) => {
      let mod = window.Conductor;
      let config = mod.config.panning;
      if (window.__panning) clearInterval(window.__panning);
      if (!config.enable) return;
      if (!config.area || !config.distance) return;
      const Pan = (dX, dY) => {
        window.__panning = setInterval(() => {
          map.panBy([dX * config.distance, dY * config.distance]);
        }, config.delay);
      };
      let size = map.getCanvas().getBoundingClientRect();
      let lenX = e.point.x - size.left;
      let lenY = e.point.y - size.top;
      if (lenY < config.area) Pan(0, -1);
      else if (lenY > size.height - config.area - 104) Pan(0, 1);
      else if (lenX < config.area) Pan(-1, 0);
      else if (lenX > size.width - config.area) Pan(1, 0);
    });
    map.on("mouseout", () => {
      if (window.__panning) clearInterval(window.__panning);
    });
  };

  // plugins/tickets.js
  var tickets_default = () => {
    let mod = window.Conductor;
    let config = mod.config.tickets;
    const api = window.SubwayBuilderAPI;
    if (config.enable) {
      let curr = 0;
      let hour = api.gameState.getCurrentHour();
      if (hour < 5) curr = 0;
      else if (hour < 6) curr = 1;
      else if (hour < 9) curr = 2;
      else if (hour < 16) curr = 1;
      else if (hour < 19) curr = 2;
      else if (hour < 20) curr = 1;
      else curr = 0;
      if (curr == mod.__ticket) return;
      else mod.__ticket = curr;
      let data = parseFloat(config.low);
      if (curr == 1) data = parseFloat(config.medium);
      if (curr == 2) data = parseFloat(config.high);
      api.actions.setTicketPrice(data);
      data = parseFloat(data).toFixed(2);
      api.ui.showNotification("Set Ticket Price To: $" + data);
      console.log(">> Conductor: Set Ticket Price To: $" + data);
    }
  };

  // index.js
  (function() {
    const api = window.SubwayBuilderAPI;
    let mod = window.Conductor = connect_default(api, config_exports);
    if (mod) mod.version = version;
    else return console.log(">> Conductor Err: No API Access.");
    mod.$addUI();
    api.hooks.onGameInit(() => {
      mod.$addUI();
      mod.$startWatch();
      if (mod.loop) clearInterval(mod.loop);
      mod.loop = setInterval(() => {
        demand_default();
        blueprints_default();
        tickets_default();
      }, 1e3);
    });
    api.hooks.onMapReady((map) => {
      panning_default(map);
    });
    api.hooks.onGameEnd(() => {
      mod.$endWatch();
      if (mod.loop) clearInterval(mod.loop);
    });
  })();
})();
