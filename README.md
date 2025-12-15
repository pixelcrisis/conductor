# Subway Conductor
Subway Builder Mod - Minor Settings Tweaks & Gameplay  
  
## How To Use The Mod
*Note: You can open your mods folder from the Subway Builder Settings Menu*  
  
Open your mod folder and delete (if any) your old version of Subway Conductor.  
Download `conductor.zip` and extract it to your mods folder.  
[Direct Download Link](https://github.com/pixelcrisis/conductor/raw/refs/heads/main/conductor.zip)

#### Currently only compatible with beta version `v0.10.3`

## What This Mod Does
- **Blueprint Tracking:** Tracks Game Funds vs Blueprint Costs  
  Cash Icon will be gray when you can't afford your blueprints, yellow when you can afford them, and green when you can afford your blueprints + 100m for additional trains.  

- **Edge Scrolling:** Automatically pan the map when the cursor is near the edge. Disabled by default, change the configs to enable.
  
- **Tweaks Game Settings:** Any settings in `GAME` will overwrite the corresponding settings in the base Subway Builder game. Most common ones come pre-defined.

## Changing Configs
Open your mods folder, and open `conductor/index.js` in your favorite text editor.  
Change the config values at the top, save the file, restart the game. Profit!
  
## Development / Testing
*Required: Install Node.js, and run `npm install --global yarn`*  
  
- Open a terminal in your working directory.
- Run `git clone https://github.com/pixelcrisis/conductor.git`
- `cd conductor` to get into the new directory.
- Run `yarn install` to install esbuild for build purposes.
- Run `yarn build` and copy `conductor/` to your mods folder