/**
 * Subway Conductor
 * Base Input Elements
 */

export const toggle = data => {
  return `
    <div class="${ _grid }">
      <span class="${ _label }">${ data.name }</span>
      <span class="text-xs cursor-pointer hover:underline" 
        onclick="this.nextElementSibling.checked = !this.nextElementSibling.checked;
          this.innerText = this.nextElementSibling.checked ? 'Enabled' : 'Disabled';
          window.Conductor.$update('${ data.key }', this.nextElementSibling.checked);">
        ${ data.value ? 'Enabled' : 'Disabled' }
      </span>
      <input type="checkbox" class="sr-only" checked="${ data.value }" />
    </div>`
}

export const number = data => {
  const str = data.cash ? '$' : ''
  return `
  <span class="${ _label } pt-1">${ data.name }</span>
  <div class="${ _grid }" style="margin-top: -0.75rem">
    <input type="range" 
      value="${ data.value }"
      min="${ data.min }" max="${ data.max }" step="${ data.step }"
      onchange="window.Conductor.$update('${ data.key }', parseInt(this.value))"
      oninput="this.nextElementSibling.value = '${ str }' + parseInt(this.value).toLocaleString()"
      class="rounded-md border border-input px-3 py-2 bg-background text-right text-xs" />
    <output class="text-xs font-bold text-muted-foreground">
      ${ str }${ data.value.toLocaleString() }
    </output>
  </div>`
}

// reusable styles
const _grid = 'flex items-center justify-between gap-2'
const _label = 'text-xs font-bold uppercase text-muted-foreground select-none'