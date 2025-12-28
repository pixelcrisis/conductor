/* Subway Conductor */
/* Standard Elements */

export const toggle = data => {
  const str = data.value ? 'Enabled' : 'Disabled'
  return `<div class="flex items-center justify-between gap-2">
    <span class="text-xs font-bold uppercase text-muted-foreground">${ data.name }</span>
    <span class="text-xs cursor-pointer hover:underline" 
      onclick="this.nextElementSibling.checked = !this.nextElementSibling.checked;
      this.innerText = this.nextElementSibling.checked ? 'Enabled' : 'Disabled'; 
      window.Conductor.db.update('${ data.key }', this.nextElementSibling.checked);">
      ${ str }
    </span>
    <input type="checkbox" class="sr-only" checked="${ data.value }">
  </div>`
}

export const number = data => {
  const str = data.cash ? '$' : ''
  return `<span class="text-xs font-bold text-muted-foreground pt-1">${ data.name }</span>
  <div class="flex items-center justify-between gap-2" style="margin-top: -0.75rem">
    <input type="range" 
      value="${ data.value }" 
      min="${ data.min }" max="${ data.max }" step="${ data.step }"
      onchange="window.Conductor.db.update('${ data.key }', parseInt(this.value))"
      oninput="this.nextElementSibling.value = '${ str }' + parseInt(this.value).toLocaleString()"
      class="rounded-md border border-input px-3 py-2 bg-background text-right text-xs" />
    <output class="text-xs font-bold text-muted-foreground">
      ${ str }${ data.value.toLocaleString() }
    </output>
  </div>`
}