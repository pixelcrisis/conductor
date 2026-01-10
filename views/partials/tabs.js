/**
 * Subway Conductor
 * Homebrew Tab Clone
 */

export default (tabA, tabB, tabC) => {
  const style = 'border-bottom: 1px solid hsl(var(--foreground))'
  return `
    <div class="flex gap-1">
      <button id="${ tabA.id }Btn" style="${ style }"
        onclick="window.Conductor.$showTab('#${ tabA.id }')" 
        class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
        ${ tabA.name }
      </button>
      
      <button id="${ tabB.id }Btn"
        onclick="window.Conductor.$showTab('#${ tabB.id }')" 
        class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
        ${ tabB.name }
      </button>
      
      <button id="${ tabC.id }Btn"
        onclick="window.Conductor.$showTab('#${ tabC.id }')" 
        class="c-tab-btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium border w-full pl-3 pr-2 py-2 bg-primary-foreground h-8 text-xs">
        ${ tabC.name }
      </button>
    </div>

    <div class="border-t"></div>

    <div id="${ tabA.id }" class="c-tab flex flex-col gap-4">
      <div class="flex gap-3">
        ${ tabA.body() }
      </div>
    </div>
    <div id="${ tabB.id }" class="c-tab flex flex-col gap-4 hidden">
      <div class="flex gap-3">
        ${ tabB.body() }
      </div>
    </div>
    <div id="${ tabC.id }" class="c-tab flex flex-col gap-4 hidden">
      <div class="flex gap-3">
        ${ tabC.body() }
      </div>
    </div>
  `
}