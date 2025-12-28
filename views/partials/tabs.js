/* Subway Conductor */
/* Tab Copying / Templates */

export default (tabA, tabB) => `
  <div class="flex gap-1">
    <button id="tabbedA" style="border: 1px solid hsl(var(--foreground))" onclick="window.showTab(true)"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
      ${ tabA.name }
    </button>
    <button id="tabbedB" onclick="window.showTab()"
      class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground px-4 w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
      ${ tabB.name }
    </button>
  </div>

  <div id="tabA" class="flex flex-col gap-4">
    <div class="flex flex-col gap-2 w-full px-1">
      ${ tabA.body() }
    </div>
  </div>

  <div id="tabB" class="flex flex-col gap-4 hidden">
    <div class="flex flex-col gap-2 w-full px-1">
      ${ tabB.body() }
    </div>
  </div>
`