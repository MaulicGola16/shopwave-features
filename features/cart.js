// Feature: shopping cart — add to cart, quantity controls, running total, saved between visits.
ShopWave.use(function (sw) {
  var KEY = 'sw-cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable */ }
  }

  var cart = load(); // { productId: quantity }

  sw.addStyles(
    '.add-btn{flex:1;border:0;border-radius:10px;background:var(--brand);color:#fff;padding:.55rem;font:inherit;font-weight:600;cursor:pointer}' +
    '.add-btn:hover{filter:brightness(1.1)}' +
    '.cart-panel{position:fixed;top:64px;right:4%;width:min(360px,92vw);max-height:70vh;overflow:auto;background:var(--card);color:var(--ink);border:1px solid var(--line);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.2);padding:1rem;z-index:20}' +
    '.cart-panel[hidden]{display:none}' +
    '.cart-row{display:flex;align-items:center;gap:.6rem;padding:.5rem 0;border-bottom:1px solid var(--line)}' +
    '.cart-row .name{flex:1;font-size:.9rem}' +
    '.cart-row button{border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:8px;width:28px;height:28px;cursor:pointer}' +
    '.cart-total{display:flex;justify-content:space-between;font-weight:800;padding-top:.8rem}' +
    '.cart-clear{margin-top:.8rem;width:100%;border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:10px;padding:.5rem;cursor:pointer;font:inherit}'
  );

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pill-btn';
  btn.id = 'cart-btn';
  sw.els.headerActions.appendChild(btn);

  var panel = document.createElement('div');
  panel.className = 'cart-panel';
  panel.id = 'cart-panel';
  panel.hidden = true;
  document.body.appendChild(panel);

  function ids() {
    return Object.keys(cart).filter(function (id) { return cart[id] > 0 && sw.findProduct(Number(id)); });
  }
  function itemCount() {
    return ids().reduce(function (s, id) { return s + cart[id]; }, 0);
  }
  function total() {
    return ids().reduce(function (s, id) { return s + sw.findProduct(Number(id)).price * cart[id]; }, 0);
  }

  function renderPanel() {
    btn.textContent = '🛒 Cart (' + itemCount() + ')';
    if (!ids().length) {
      panel.innerHTML = '<p class="muted" style="margin:0">Your cart is empty.</p>';
      return;
    }
    panel.innerHTML = ids().map(function (id) {
      var p = sw.findProduct(Number(id));
      return '<div class="cart-row">' +
        '<span class="name">' + p.emoji + ' ' + p.name + '<br><small class="muted">' + sw.inr(p.price) + ' each</small></span>' +
        '<button type="button" data-act="dec" data-id="' + id + '" aria-label="Decrease">−</button>' +
        '<span>' + cart[id] + '</span>' +
        '<button type="button" data-act="inc" data-id="' + id + '" aria-label="Increase">+</button>' +
      '</div>';
    }).join('') +
      '<div class="cart-total"><span>Total</span><span id="cart-total">' + sw.inr(total()) + '</span></div>' +
      '<button type="button" class="cart-clear" data-act="clear">Clear cart</button>';
  }

  function change(id, delta) {
    cart[id] = Math.max(0, (cart[id] || 0) + delta);
    if (cart[id] === 0) delete cart[id];
    save();
    renderPanel();
  }

  panel.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    if (t.dataset.act === 'clear') { cart = {}; save(); renderPanel(); return; }
    change(t.dataset.id, t.dataset.act === 'inc' ? 1 : -1);
  });

  btn.addEventListener('click', function () { panel.hidden = !panel.hidden; });

  sw.decorators.push(function (card, p) {
    var add = document.createElement('button');
    add.type = 'button';
    add.className = 'add-btn';
    add.textContent = 'Add to cart';
    add.addEventListener('click', function () { change(p.id, 1); });
    card.querySelector('.card-actions').appendChild(add);
  });

  renderPanel();
});
