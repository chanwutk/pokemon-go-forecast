(function() {
  const d = new Date();
  const date = document.getElementById('date');
  date.innerHTML = d.toString();

  function render() {
    const parseSpec = vega.parse(spec);
    new vega.View(parseSpec)
      .renderer('svg')
      .initialize('#vis')
      .run();
  };
  render();
  setInterval(render, 120000);
})();
