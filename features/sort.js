// Feature: sort products by price, rating or name.
ShopWave.use(function (sw) {
  var sorters = {
    featured: null,
    'price-asc': function (a, b) { return a.price - b.price; },
    'price-desc': function (a, b) { return b.price - a.price; },
    rating: function (a, b) { return b.rating - a.rating; },
    name: function (a, b) { return a.name.localeCompare(b.name); }
  };

  var select = document.createElement('select');
  select.className = 'control';
  select.id = 'sort-select';
  select.setAttribute('aria-label', 'Sort products');
  [
    ['featured', 'Sort: Featured'],
    ['price-asc', 'Price: low to high'],
    ['price-desc', 'Price: high to low'],
    ['rating', 'Top rated'],
    ['name', 'Name A–Z']
  ].forEach(function (o) {
    var opt = document.createElement('option');
    opt.value = o[0];
    opt.textContent = o[1];
    select.appendChild(opt);
  });

  select.addEventListener('change', function () {
    sw.sorter = sorters[select.value];
    sw.refresh();
  });
  sw.els.toolbar.appendChild(select);
});
