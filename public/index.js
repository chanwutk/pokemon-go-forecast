(function() {
  const d = new Date();
  const date = document.getElementById('date');
  date.innerHTML = d.toString();

  /** @type import('vega') */
  const vg = vega;

  const view = new vg.View(vg.parse(spec))
    .renderer('svg')
    .initialize('#vis');

  const render = () => view.runAsync();
  render();
  setInterval(render, 120000);
})();
