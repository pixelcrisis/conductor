/**
 * Subway Conductor
 * Recreating Game Panels
 */

export default data => {
  return `
    <div class="pointer-events-auto backdrop-blur-sm border border-border/50 h-fit rounded-lg text-sm items-center justify-center shadow-lg overflow-hidden bg-transparent w-full max-h-full flex flex-col">
      <div class="flex h-9 min-h-9 w-full p-1 border-b border-primary/15 items-center justify-between bg-primary-foreground">
        <div class="flex items-center h-full w-full"></div>
        <div class="flex items-center h-full w-full">
          <h1 class="font-semibold whitespace-nowrap">
            
            ${ data.head } 
            
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

            ${ data.body }

            <div class="pt-2 border-t"></div>
          </div>
        </div>
      </div>
    </div>
  `
}