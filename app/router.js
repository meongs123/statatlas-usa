// router.js — hash router for the seven routes. One job: turn the URL hash
// into { route, params } and call back on every change.
export const ROUTES = ['', 'population', 'economy', 'states', 'compare', 'sources', 'about'];

export function parseHash() {
  const raw = (window.location.hash || '#/').replace(/^#\/?/, '');
  const parts = raw.split('?');
  const route = parts[0] || '';
  const params = {};
  if (parts[1]) {
    parts[1].split('&').forEach(function (pair) {
      const kv = pair.split('=');
      if (kv[0]) params[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
    });
  }
  return { route: ROUTES.indexOf(route) === -1 ? '' : route, params: params };
}

export function startRouter(onRoute) {
  function fire() { onRoute(parseHash()); }
  window.addEventListener('hashchange', fire);
  fire();
}
