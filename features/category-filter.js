// Feature: category filter tabs (All / Clothes / Watches / Shoes).
ShopWave.use(function (sw) {
  var active = 'all';
  var categories = [
    ['all', 'All'],
    ['clothes', '👕 Clothes'],
    ['watches', '⌚ Watches'],
    ['shoes', '👟 Shoes']
  ];

  sw.addStyles(
    '.tabs{display:flex;gap:.5rem;flex-wrap:wrap}' +
    '.tab{border:1px solid var(--line);background:var(--card);color:var(--ink);padding:.5rem 1rem;border-radius:999px;font:inherit;font-weight:600;cursor:pointer}' +
    '.tab.active{background:var(--ink);color:var(--card);border-color:var(--ink)}'
  );

  var wrap = document.createElement('div');
  wrap.className = 'tabs';
  wrap.setAttribute('role', 'group');
  wrap.setAttribute('aria-label', 'Filter by category');

  categories.forEach(function (c) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tab' + (c[0] === active ? ' active' : '');
    btn.dataset.category = c[0];
    btn.textContent = c[1];
    btn.addEventListener('click', function () {
      active = c[0];
      Array.prototype.forEach.call(wrap.children, function (b) {
        b.classList.toggle('active', b.dataset.category === active);
      });
      sw.refresh();
    });
    wrap.appendChild(btn);
  });
  sw.els.toolbar.appendChild(wrap);

  sw.filters.push(function (p) {
    return active === 'all' || p.category === active;
  });
});
