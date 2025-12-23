/* Subway Conductor  */
/* Batch UI Registry */

export default (api, menu, target) => {
  if (menu) for (let id in menu) {
    const opt = menu[id], res = { id, ...opt }

    if (opt.type == 'button') api.ui.addButton(target, res)
    if (opt.type == 'toggle') api.ui.addToggle(target, res)
    if (opt.type == 'slider') api.ui.addSlider(target, res)
    if (opt.type == 'select') api.ui.addSelect(target, res)
    if (opt.type == 'sep') api.ui.addSeparator(target, res)
    if (opt.type == 'text') api.ui.addText(target, res)
  }
}