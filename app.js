/*
 * ShopWave Features — core app.
 *
 * Renders the product grid and exposes a tiny plugin API (window.ShopWave).
 * Feature modules in /features plug in through ShopWave.use(plugin):
 *   sw.filters     array of (product) => boolean   — hide/show products
 *   sw.sorter      (a, b) => number | null         — order products
 *   sw.decorators  array of (cardEl, product)      — add UI to each card
 *   sw.cardClicks  array of (product, event)       — react to clicks on a card image
 *   sw.els         headerActions, toolbar, grid, count — places to add UI
 *   sw.refresh()   re-render after changing filters/sorter
 */
(function () {
  var products = [
    { id: 1, name: 'Classic Cotton Crew Tee', category: 'clothes', brand: 'UrbanThread', price: 599, rating: 4.4, emoji: '👕', colors: ['#ff9a8b', '#ff6a88'], description: 'Soft 100% combed cotton t-shirt with a relaxed fit. Pre-shrunk and built to last.' },
    { id: 2, name: 'Slim Fit Denim Jacket', category: 'clothes', brand: 'IndigoCo', price: 2499, rating: 4.6, emoji: '🧥', colors: ['#74ebd5', '#9face6'], description: 'Mid-weight stretch denim jacket with a clean slim silhouette and metal buttons.' },
    { id: 3, name: 'Oxford Button-Down Shirt', category: 'clothes', brand: 'Northline', price: 1299, rating: 4.3, emoji: '👔', colors: ['#fbc2eb', '#a6c1ee'], description: 'Breathable cotton Oxford shirt that works for the office and the weekend.' },
    { id: 4, name: 'Cozy Fleece Hoodie', category: 'clothes', brand: 'UrbanThread', price: 1799, rating: 4.7, emoji: '🧶', colors: ['#f6d365', '#fda085'], description: 'Brushed fleece interior, kangaroo pocket and a roomy hood for cold evenings.' },
    { id: 5, name: 'Chrono Steel Analog Watch', category: 'watches', brand: 'Meridian', price: 4999, rating: 4.6, emoji: '⌚', colors: ['#667eea', '#764ba2'], description: 'Stainless steel chronograph with sapphire-coated glass and 50m water resistance.' },
    { id: 6, name: 'Minimalist Leather Watch', category: 'watches', brand: 'Aurelle', price: 3499, rating: 4.5, emoji: '🕰️', colors: ['#cfd9df', '#b8c6db'], description: 'Slim 40mm dial on a genuine leather strap. Quartz movement, quietly elegant.' },
    { id: 7, name: 'Smart Fit Band 5', category: 'watches', brand: 'PulseTech', price: 2999, rating: 4.3, emoji: '⌚', colors: ['#84fab0', '#8fd3f4'], description: 'AMOLED display, heart-rate tracking, 14-day battery and 100+ workout modes.' },
    { id: 8, name: 'Rugged Sports Digital Watch', category: 'watches', brand: 'TerraX', price: 1999, rating: 4.4, emoji: '⏱️', colors: ['#485563', '#29323c'], description: 'Shock-resistant digital watch with backlight, stopwatch and 100m water resistance.' },
    { id: 9, name: 'AirRun Performance Sneakers', category: 'shoes', brand: 'StrideX', price: 3299, rating: 4.6, emoji: '👟', colors: ['#43cea2', '#185a9d'], description: 'Responsive cushioning and a breathable knit upper for daily runs.' },
    { id: 10, name: 'Classic White Court Shoes', category: 'shoes', brand: 'Northline', price: 2199, rating: 4.4, emoji: '👟', colors: ['#e0eafc', '#cfdef3'], description: 'Clean low-top sneakers that pair with everything in your wardrobe.' },
    { id: 11, name: 'Leather Formal Oxfords', category: 'shoes', brand: 'Heritage', price: 3999, rating: 4.5, emoji: '👞', colors: ['#b08968', '#7f5539'], description: 'Hand-finished leather Oxfords with a cushioned insole for all-day comfort.' },
    { id: 12, name: 'Trail Blazer Hiking Boots', category: 'shoes', brand: 'TerraX', price: 4599, rating: 4.7, emoji: '🥾', colors: ['#56ab2f', '#a8e063'], description: 'Waterproof, grippy-sole boots with ankle support for rough trails.' }
  ];

  var els = {
    headerActions: document.getElementById('header-actions'),
    toolbar: document.getElementById('toolbar'),
    grid: document.getElementById('grid'),
    count: document.getElementById('result-count')
  };

  function inr(n) {
    return '₹' + Number(n).toLocaleString('en-IN');
  }

  var sw = {
    products: products,
    filters: [],
    sorter: null,
    decorators: [],
    cardClicks: [],
    els: els,
    inr: inr,
    use: function (plugin) { plugin(sw); },
    addStyles: function (css) {
      var s = document.createElement('style');
      s.textContent = css;
      document.head.appendChild(s);
    },
    findProduct: function (id) {
      return products.find(function (p) { return p.id === id; });
    },
    refresh: render,
    start: render
  };

  function render() {
    var list = products.filter(function (p) {
      return sw.filters.every(function (f) { return f(p); });
    });
    if (sw.sorter) list = list.slice().sort(sw.sorter);

    els.grid.innerHTML = '';
    els.count.textContent = list.length + (list.length === 1 ? ' product' : ' products');

    if (!list.length) {
      els.grid.innerHTML = '<p class="empty">No products match your selection.</p>';
      return;
    }

    list.forEach(function (p) {
      var card = document.createElement('article');
      card.className = 'card';
      card.dataset.id = p.id;
      card.innerHTML =
        '<div class="card-media" style="background:linear-gradient(135deg,' + p.colors[0] + ',' + p.colors[1] + ')"><span>' + p.emoji + '</span></div>' +
        '<div class="card-body">' +
          '<div class="brand">' + p.brand + '</div>' +
          '<h3 class="card-title">' + p.name + '</h3>' +
          '<div class="rating">★ ' + p.rating + '</div>' +
          '<div class="price">' + inr(p.price) + '</div>' +
          '<div class="card-actions"></div>' +
        '</div>';
      card.querySelector('.card-media').addEventListener('click', function (e) {
        sw.cardClicks.forEach(function (fn) { fn(p, e); });
      });
      sw.decorators.forEach(function (fn) { fn(card, p); });
      els.grid.appendChild(card);
    });
  }

  window.ShopWave = sw;
})();
