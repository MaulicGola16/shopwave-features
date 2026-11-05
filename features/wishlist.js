// Feature: wishlist — heart toggle on every card, with a saved count in the header.
ShopWave.use(function (sw) {
  var KEY = 'sw-wishlist';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) { /* storage unavailable */ }
  }

  var saved = load();

  sw.addStyles(
    '.wish-btn{position:absolute;top:10px;right:10px;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.9);color:#c4c7d4;font-size:1.2rem;cursor:pointer;line-height:1}' +
    '.wish-btn.on{color:#ff3b5c}'
  );

  var badge = document.createElement('button');
  badge.type = 'button';
  badge.className = 'pill-btn';
  badge.id = 'wishlist-badge';
  sw.els.headerActions.appendChild(badge);

  function updateBadge() {
    badge.textContent = '♥ Wishlist (' + saved.length + ')';
  }
  updateBadge();

  sw.decorators.push(function (card, p) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'wish-btn';
    btn.setAttribute('aria-label', 'Toggle wishlist for ' + p.name);

    function paint() {
      var on = saved.indexOf(p.id) !== -1;
      btn.classList.toggle('on', on);
      btn.textContent = on ? '♥' : '♡';
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    paint();

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var i = saved.indexOf(p.id);
      if (i === -1) saved.push(p.id); else saved.splice(i, 1);
      save();
      paint();
      updateBadge();
    });

    card.querySelector('.card-media').appendChild(btn);
  });
});
