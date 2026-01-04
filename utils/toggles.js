/**
 * Subway Conductor
 * The UI Toggles
 */

// the top bar selectors
export const mainTop = '.absolute.top-4.right-4.z-20'
export const gameTop = 'div[data-mod-id="top-bar"]:first-child .ml-auto'

// icon for main menu
export const main = () => {
  return `<button id="conductMain" onclick="window.Conductor.$showUI()"
    class="inline-flex items-center justify-center gap-2 mr-1 whitespace-nowrap rounded-md hover:bg-secondary size-10" type="button">
    ${ icon('1.3rem') }
  </button>`
}

// icon for game play
export const game = () => {
  return `<div id="conductGame" onclick="window.Conductor.$showUI()" 
    class="pointer-events-auto bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg text-sm flex items-center justify-center shadow-lg overflow-hidden w-10 h-10 p-2 cursor-pointer hover:bg-secondary">
    ${ icon('1.5rem') }
  </div>`
}

// define our icon
const icon = size => `
  <svg style="width: ${ size }; height: ${ size };" 
  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-network-icon lucide-chart-network"><path d="m13.11 7.664 1.78 2.672"/><path d="m14.162 12.788-3.324 1.424"/><path d="m20 4-6.06 1.515"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="15" r="2"/></svg>
`