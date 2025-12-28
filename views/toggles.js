/* trigger html */

const icon = size => `
  <svg style="width: ${ size }; height: ${ size };" 
  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-network-icon lucide-chart-network"><path d="m13.11 7.664 1.78 2.672"/><path d="m14.162 12.788-3.324 1.424"/><path d="m20 4-6.06 1.515"/><path d="M3 3v16a2 2 0 0 0 2 2h16"/><circle cx="12" cy="6" r="2"/><circle cx="16" cy="12" r="2"/><circle cx="9" cy="15" r="2"/></svg>
`

export const main = `
  <button id="mainConduct" onclick="window.showConductor()"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:text-accent-foreground pointer-events-auto focus-visible:ring-transparent outline-none hover:bg-secondary border-none size-10 shadow-none bg-background/95" type="button">
    ${ icon('1.3rem') }
  </button>
`

export const game = `
  <div id="gameConduct" onclick="window.showConductor()" class="pointer-events-auto bg-primary-foreground backdrop-blur-sm border border-border/50 rounded-lg text-sm flex items-center justify-center shadow-lg overflow-hidden w-10 h-10 p-2 cursor-pointer hover:bg-secondary">
    ${ icon('1.5rem') }
  </div>
`

export const mTop = '.absolute.top-4.right-4.z-20'
export const gTop = 'main > .absolute.bottom-0 .max-h-full .max-h-full .ml-auto'
// export const gTop = 'div[data-mod-id="top-bar"]:first-child .ml-auto'

export const showConductor = () => {
  let menu = document.querySelector('#conductMenu')
  let icon = document.querySelector('#gameConduct')
  if (!icon) icon = document.querySelector('#mainConduct')
  if (menu) menu.classList.toggle('hidden')
  let show = menu.classList.contains('hidden')
  icon.setAttribute('style', `filter: invert(${ show ? 0 : 1 })`)
}

export const showTab = left => {
  let tabA = document.querySelector('#tabA')
  let tabB = document.querySelector('#tabB')
  let curT = left ? tabA : tabB
  if (!curT.classList.contains('hidden')) return
  tabA.classList.toggle('hidden')
  tabB.classList.toggle('hidden')

  let btnA = document.querySelector('#tabbedA')
  let btnB = document.querySelector('#tabbedB')
  let curB = left ? btnA : btnB, oldB = left ? btnB : btnA
  curB.setAttribute('style', 'border: 1px solid hsl(var(--foreground))')
  oldB.setAttribute('style', '')
}