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

function render(route) {
  let html = '';
  if (route === 'population') html = renderPopulation(state);
  else if (route === 'economy') html = renderEconomy(state);
  else if (route === 'states') html = renderStates(state);
  else if (route === 'compare') html = renderCompare();
  else if (route === 'sources') html = renderSources();
  else if (route === 'about') html = renderAbout();
  else html = renderHome();
  view.innerHTML = html;
  nav.querySelectorAll('a').forEach(function (a) {
    const r = a.getAttribute('href').replace('#/', '').split('?')[0];
    a.classList.toggle('on', r === route);
  });
  window.scrollTo(0, 0);
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
  render(parsed.route);
});
