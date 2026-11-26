// main.js — wires the router to the page renderers and owns the controls:
// population tabs, economy tabs, and the states sort / region / filter /
// row-detail controls. Every control re-renders its view from state.
import { startRouter } from './router.js';
import {
  renderHome, renderPopulation, renderEconomy, renderStates, renderCompare,
  renderSources, renderAbout,
} from './pages.js';

const view = document.getElementById('view');
const nav = document.getElementById('nav');

// Control state. Hash params seed the states view (so a link can show the
// table already sorted or filtered); tabs live in memory.
const state = {
  popTab: 'age',
  ecoTab: 'income',
  sort: 'population',
  region: 'All',
  q: '',
  selected: null,
};

function show(html, route) {
  view.innerHTML = html;
  // Fix pass 2 — route class on the view, so the per-route accent rules
  // (.route-home h2, .route-population .tabs button.on, …) take effect.
  view.className = 'route-' + (route || 'home');
  // Move 3 — panel eyebrow: the section name above each ruled panel header
  // (visual only; fresh innerHTML each render, so no duplicates accumulate).
  var section = { '': 'The United States in Numbers', population: 'Population', economy: 'Economy', states: 'States', compare: 'Compare', sources: 'Sources', about: 'About' }[route] || '';
  if (section) {
    view.querySelectorAll('.panel:not(.detail) h2').forEach(function (h2) {
      var e = document.createElement('p');
      e.className = 'eyebrow';
      e.textContent = section;
      h2.parentNode.insertBefore(e, h2);
    });
  }
  nav.querySelectorAll('a').forEach(function (a) {
    const r = a.getAttribute('href').replace('#/', '').split('?')[0];
    a.classList.toggle('on', r === route);
  });
  window.scrollTo(0, 0);
}

function render(route) {
  // Sources data is lazy: the table lives in sources-data.js and is only
  // fetched when this route opens, so it never weighs down the first load.
  if (route === 'sources') {
    import('./sources-data.js').then(function (m) {
      show(renderSources(m.SOURCE_ROWS), route);
    }).catch(function () {
      show('<h1>Sources</h1><p class="lede">The source list could not be loaded. Please reload the page.</p>', route);
    });
    return;
  }
  let html = '';
  if (route === 'population') html = renderPopulation(state);
  else if (route === 'economy') html = renderEconomy(state);
  else if (route === 'states') html = renderStates(state);
  else if (route === 'compare') html = renderCompare();
  else if (route === 'about') html = renderAbout();
  else html = renderHome();
  show(html, route);
}

function rerender() {
  const hash = (window.location.hash || '#/').replace(/^#\/?/, '').split('?')[0];
  render(hash === '' ? '' : hash);
}

// Tabs: one delegated click handler for both tab groups.
document.addEventListener('click', function (e) {
  const pop = e.target.closest('[data-poptab]');
  if (pop) { state.popTab = pop.getAttribute('data-poptab'); rerender(); return; }
  const eco = e.target.closest('[data-ecotab]');
  if (eco) { state.ecoTab = eco.getAttribute('data-ecotab'); rerender(); return; }
  const row = e.target.closest('tr[data-state]');
  if (row) {
    state.selected = row.getAttribute('data-state');
    rerender();
  }
});

// States controls: change events re-render from state.
document.addEventListener('change', function (e) {
  if (e.target.id === 'sortSel') { state.sort = e.target.value; rerender(); }
  if (e.target.id === 'regionSel') { state.region = e.target.value; rerender(); }
});
document.addEventListener('input', function (e) {
  if (e.target.id === 'filterInput') {
    state.q = e.target.value;
    // Re-render the table only, keeping the caret in the filter box.
    const keep = document.getElementById('filterInput');
    const pos = keep ? keep.selectionStart : 0;
    rerender();
    const back = document.getElementById('filterInput');
    if (back) { back.focus(); back.setSelectionRange(pos, pos); }
  }
});

startRouter(function (parsed) {
  if (parsed.route === 'states') {
    if (parsed.params.sort) state.sort = parsed.params.sort;
    if (parsed.params.region) state.region = parsed.params.region;
    if (parsed.params.q !== undefined) state.q = parsed.params.q;
  }
  // Tabs are deep-linkable too (e.g. #/population?tab=growth) so a link can
  // open a page already on its second tab.
  if (parsed.route === 'population' && parsed.params.tab) state.popTab = parsed.params.tab;
  if (parsed.route === 'economy' && parsed.params.tab) state.ecoTab = parsed.params.tab;
  render(parsed.route);
});
