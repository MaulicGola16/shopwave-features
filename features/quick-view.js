// Quick View plugin initialized for ShopWave storefront
// Feature: quick view — click a product image to open a details popup.
ShopWave.use(function (sw) {
  sw.addStyles(
    '.card-media{cursor:zoom-in}' +
    '.qv-overlay{position:fixed;inset:0;background:rgba(10,12,25,.6);display:grid;place-items:center;z-index:50;padding:1rem}' +
    '.qv-overlay[hidden]{display:none}' +
    '.qv-modal{background:var(--card);color:var(--ink);border-radius:20px;width:min(560px,100%);overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)}' +
    '.qv-media{height:200px;display:grid;place-items:center;font-size:6rem}' +
    '.qv-body{padding:1.2rem 1.4rem 1.5rem;position:relative}' +
    '.qv-close{position:absolute;top:-2.6rem;right:1rem;border:0;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.92);color:#1b1d29;font-size:1.2rem;cursor:pointer}' +
    '.qv-body h2{margin:.2rem 0}' +
    '.qv-price{font-size:1.5rem;font-weight:800;margin:.6rem 0 0}'
  );

  var overlay = document.createElement('div');
  overlay.className = 'qv-overlay';
  overlay.id = 'quick-view';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  document.body.appendChild(overlay);

  function close() { overlay.hidden = true; overlay.innerHTML = ''; }

  function open(p) {
    overlay.innerHTML =
      '<div class="qv-modal">' +
        '<div class="qv-media" style="background:linear-gradient(135deg,' + p.colors[0] + ',' + p.colors[1] + ')">' + p.emoji + '</div>' +
        '<div class="qv-body">' +
          '<button type="button" class="qv-close" aria-label="Close">✕</button>' +
          '<div class="brand">' + p.brand + ' · ' + p.category + '</div>' +
          '<h2>' + p.name + '</h2>' +
          '<div class="rating">★ ' + p.rating + '</div>' +
          '<p class="muted">' + p.description + '</p>' +
          '<div class="qv-price">' + sw.inr(p.price) + '</div>' +
        '</div>' +
      '</div>';
    overlay.hidden = false;
    overlay.querySelector('.qv-close').addEventListener('click', close);
  }

  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  sw.cardClicks.push(function (p) { open(p); });
});
