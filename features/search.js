// Feature: live search over product name, brand and category.
ShopWave.use(function (sw) {
  var query = '';

  var input = document.createElement('input');
  input.type = 'search';
  input.className = 'control';
  input.id = 'search-input';
  input.placeholder = 'Search products…';
  input.setAttribute('aria-label', 'Search products');
  input.addEventListener('input', function (e) {
    query = e.target.value.trim().toLowerCase();
    sw.refresh();
  });
  sw.els.toolbar.appendChild(input);

  sw.filters.push(function (p) {
    if (!query) return true;
    return [p.name, p.brand, p.category].some(function (field) {
      return field.toLowerCase().indexOf(query) !== -1;
    });
  });
});
