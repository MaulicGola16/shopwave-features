// Feature: light / dark theme toggle, remembered between visits.
ShopWave.use(function (sw) {
  var KEY = 'sw-theme';
  var root = document.documentElement;

  sw.addStyles(
    '[data-theme="dark"]{--bg:#12131c;--card:#1d1f2e;--ink:#f1f2f8;--muted:#9aa0b8;--line:#2e3148;--shadow:0 6px 22px rgba(0,0,0,.4)}'
  );

  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* storage unavailable */ }
  var prefersDark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  var theme = stored || (prefersDark ? 'dark' : 'light');

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pill-btn';
  btn.id = 'theme-toggle';

  function apply() {
    root.setAttribute('data-theme', theme);
    btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  btn.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, theme); } catch (e) { /* storage unavailable */ }
    apply();
  });

  sw.els.headerActions.appendChild(btn);
  apply();
});
