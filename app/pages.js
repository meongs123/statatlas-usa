// pages.js — one render function per route. Every figure comes from data.js
// (verified U#/I# rows only) and every stat block carries its source + year.
import { USA, STATES, STATES_SOURCE, INDONESIA, RELEASES } from './data.js';
import { barChart, pairedBarChart } from './charts.js';

function srcLine(text) {
  return '<p class="src">Source: ' + text + '</p>';
}

// Move 3 — dek lines: one clause restating what the figure counts, using
// only the label / vintage / source wording already on the card. No new facts.
var DEKS = {
  'Total population': 'People living in the United States, in the latest estimate.',
  'Gross domestic product': 'The value of everything produced in a year.',
  'GDP, total': 'The value of everything produced in a year.',
  'Median household income': 'The middle household income, before tax.',
  'Poverty rate': 'The share of people below the official poverty line.',
  'Life expectancy at birth': 'How long a newborn could expect to live.',
  'Unemployment, modeled ILO est.': 'The share of the labour force without work, modelled.',
  'Age 0–14': 'Children, as a share of everyone.',
  'Age 15–64': 'People of working age, as a share of everyone.',
  'Age 65+': 'Older people, as a share of everyone.',
  'Female share': 'Women and girls, as a share of everyone.',
  'Growth 2024 \u2192 2025 (+0.5%)': 'People added between the July estimates.',
  'Growth 2023 \u2192 2024 (+1.0%)': 'People added between the July estimates.',
  'Net international migration': 'People arriving minus people leaving.',
  'Migration vs the year before (2.7M)': 'The change on the previous year’s migration.',
  'GDP per capita': 'Output per person.',
  'Per capita income': 'Income per person.',
  'Median home value': 'The middle value of owner-occupied homes.',
  'Median gross rent': 'The middle monthly rent.',
  'Housing units': 'Homes in the latest estimate.',
  'Owner-occupied housing': 'Homes lived in by their owners.',
  'Households': 'Occupied homes.',
  'Persons per household': 'People per occupied home, on average.',
  'Employer establishments': 'Businesses with paid employees.',
  'Employment at those firms': 'People working at those businesses.',
  'Annual payroll': 'Pay for a year across those businesses.',
  'Retail sales per capita': 'Shop sales per person.'
};

// Fix pass 2b (M1): the eyebrow used to repeat the card label verbatim
// (label + year), then the label appeared again as .card-label and the
// year a third time in .card-meta. Now the eyebrow carries the SECTION
// name + vintage (per brief Move 3: e.g. POPULATION · 2024 ESTIMATE),
// so the label is stated exactly once, as .card-label.
function statCard(value, label, year, source, section) {
  var eyebrow = (section || label).toUpperCase() + ' \u00b7 ' + String(year).toUpperCase();
  var dek = DEKS[label] || '';
  return '<article class="card"><div class="card-eyebrow">' + eyebrow + '</div>'
    + '<div class="card-value">' + value + '</div>'
    + '<div class="card-label">' + label + '</div>'
    + (dek ? '<div class="card-dek">' + dek + '</div>' : '')
    + '<div class="card-meta">Source: ' + source + ' \u00b7 ' + year + '</div></article>';
}

// Move 2 — categorical chart palette in the site's own hues (teal / slate-blue /
// muted plum / amber), so multi-series bars read as distinct series.
var CAT_COLORS = ['#0e7a6d', '#4a6b8a', '#7d5a7a', '#e8a33d'];
function colored(rows) {
  return rows.map(function (r, i) {
    return { label: r.label, value: r.value, display: r.display, color: CAT_COLORS[i % CAT_COLORS.length] };
  });
}

function stateRows(list) {
  return list.map(function (s) {
    const growth = s.growthPct !== null ? '+' + s.growthPct.toFixed(1) + '%' : (s.growthNote ? 'see note' : '—');
    return '<tr data-state="' + s.name + '"><td>' + (s.rank === null ? '—' : s.rank) + '</td>'
      + '<td><strong>' + s.name + '</strong></td><td>' + s.display + '</td>'
      + '<td>' + s.region + '</td><td>' + growth + '</td></tr>';
  }).join('');
}

export function renderHome() {
  const chart = barChart(colored(USA.ageStructure), { width: 560, unit: '%', color: '#0e7a6d' });
  const top5 = STATES.filter(function (s) { return s.rank !== null; });
  return '<section class="releases"><strong>Latest releases</strong> '
    + RELEASES.map(function (r, i) { return '<span><b>' + r.date + '</b> — ' + r.text + (i < RELEASES.length - 1 ? '&nbsp;·' : '') + '</span>'; }).join(' ')
    + '</section>'
    + '<section class="band band-amber band-home"><p class="band-line"><span class="band-num">' + USA.population.display + '</span> people — one country, estimated 1 Jul 2025</p></section>'
    + '<h1>The United States in Numbers</h1>'
    + '<p class="lede">One country, every number that matters. Population, economy, housing, education and the states — each figure labelled with its source and year.</p>'
    + '<div class="ground ground-amber"><div class="cards cards-lead">'
    + statCard(USA.population.display, 'Total population', '1 Jul 2025', 'U.S. Census Bureau, Vintage 2025', 'Population')
    + statCard(USA.gdp.display, 'Gross domestic product', '2024', 'World Bank WDI', 'Economy')
    + statCard(USA.medianIncome.display, 'Median household income', '2023', 'U.S. Census Bureau, CPS ASEC', 'Economy')
    + statCard(USA.poverty.display, 'Poverty rate', '2023', 'U.S. Census Bureau, CPS', 'Economy')
    + statCard(USA.lifeExpectancy.display, 'Life expectancy at birth', '2024', 'World Bank WDI', 'Population')
    + statCard(USA.unemployment.display, 'Unemployment, modeled ILO est.', '2024', 'World Bank WDI', 'Economy')
    + '</div></div>'
    + '<div class="duo">'
    + '<section class="panel"><h2>Age structure, 2024</h2>' + chart
    + srcLine('World Bank WDI — age shares SP.POP.0014 / SP.POP.1564 / SP.POP.65UP, 2024.') + '</section>'
    + '<section class="panel"><h2>Most populous states <a class="more" href="#/states">View all \u2192</a></h2>'
    + '<table class="mini"><thead><tr><th>#</th><th>State</th><th>Population</th></tr></thead><tbody>'
    + top5.map(function (s) { return '<tr><td>' + s.rank + '</td><td><strong>' + s.name + '</strong></td><td>' + s.display + '</td></tr>'; }).join('')
    + '</tbody></table>' + srcLine('U.S. Census Bureau, Vintage 2025 (1 Jul 2025).')
    + '<p><a href="#/states">See all states &amp; rankings →</a></p></section>'
    + '</div>'
    + '<section class="panel"><h2>Explore the numbers</h2><p class="explore">'
    + '<a href="#/population">Population &amp; age</a> · <a href="#/economy">Economy, housing &amp; education</a> · '
    + '<a href="#/states">States ranked</a> · <a href="#/compare">United States vs Indonesia</a> · '
    + '<a href="#/sources">Every figure &amp; its source</a> · <a href="#/about">How the numbers are made</a></p></section>';
}

export function renderPopulation(state) {
  const tab = state.popTab || 'age';
  let body = '';
  if (tab === 'age') {
    body = '<div class="cards">'
      + statCard('17.32%', 'Age 0–14', '2024', 'World Bank WDI', 'Population')
      + statCard('64.75%', 'Age 15–64', '2024', 'World Bank WDI', 'Population')
      + statCard('17.93%', 'Age 65+', '2024', 'World Bank WDI', 'Population')
      + statCard('50.9%', 'Female share', '2020–2024', 'U.S. Census Bureau, QuickFacts', 'Population')
      + '</div>'
      + '<div class="panel"><h2>Age structure — share of population</h2>'
      + barChart(colored(USA.ageStructure), { width: 560, unit: '%' })
      + srcLine('World Bank WDI, 2024. QuickFacts adds: under 5 is 5.4%, under 18 is 21.1%, age 65+ is 18.9% (2025 vintage / 2020–2024).')
      + '</div>';
  } else {
    body = '<div class="cards">'
      + statCard('+1.8 million', 'Growth 2024 → 2025 (+0.5%)', 'Jul 2024–Jul 2025', 'U.S. Census Bureau, Vintage 2025', 'Population')
      + statCard('+3.2 million', 'Growth 2023 → 2024 (+1.0%)', 'Jul 2023–Jul 2024', 'U.S. Census Bureau, Vintage 2025', 'Population')
      + statCard('1.3 million', 'Net international migration', 'Jul 2024–Jun 2025', 'U.S. Census Bureau, Vintage 2025', 'Population')
      + statCard('−53.8%', 'Migration vs the year before (2.7M)', 'Jul 2024–Jun 2025', 'U.S. Census Bureau, Vintage 2025', 'Population')
      + '</div>'
      + '<div class="panel"><h2>Growth &amp; migration</h2>'
      + barChart(colored([
          { label: 'Growth 2023→24', value: 3.2, display: '+3.2M' },
          { label: 'Growth 2024→25', value: 1.8, display: '+1.8M' },
          { label: 'Migration 2023→24', value: 2.7, display: '2.7M' },
          { label: 'Migration 2024→25', value: 1.3, display: '1.3M' },
        ]), { width: 560, unit: '', decimals: 1, max: 3.2, labelWidth: 140 })
      + srcLine('U.S. Census Bureau, Vintage 2025 estimates release, Jan 2026. 2024→2025 was the slowest growth since early COVID.')
      + '</div>';
  }
  return '<section class="band band-pine"><h1>Population</h1><p class="band-sub">341,784,857 people · 1 Jul 2025</p></section>'
    + '<p class="lede">341,784,857 people on 1 Jul 2025 — up from the 2020 count of 331,449,281.</p>'
    + '<div class="tabs" role="tablist">'
    + '<button data-poptab="age" class="' + (tab === 'age' ? 'on' : '') + '">Age structure</button>'
    + '<button data-poptab="growth" class="' + (tab === 'growth' ? 'on' : '') + '">Growth &amp; migration</button>'
    + '</div>'
    + '<figure class="photo-strip"><img src="img/population.jpg" alt="Daytime view of Times Square in New York City, with billboards and a bustling crowd." loading="lazy"></figure>'
    + '<div class="people-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>'
    + '<div class="ground ground-teal">' + body + '</div>'
    + '<div class="panel"><h2>People at a glance</h2><dl class="facts">'
    + '<dt>Foreign-born</dt><dd>14.1% (2020–2024)</dd>'
    + '<dt>Veterans</dt><dd>16,185,883 (2020–2024)</dd>'
    + '<dt>Households with broadband</dt><dd>91.0% (2020–2024)</dd>'
    + '<dt>Mean commute</dt><dd>26.4 minutes (2020–2024)</dd>'
    + '<dt>Population density</dt><dd>93.8 people / sq mi (2020)</dd>'
    + '<dt>Land area</dt><dd>3,533,038.28 sq mi (2020)</dd>'
    + '</dl>' + srcLine('U.S. Census Bureau, QuickFacts.') + '</div>';
}

export function renderEconomy(state) {
  const tab = state.ecoTab || 'income';
  let body = '';
  if (tab === 'income') {
    body = '<div class="cards">'
      + statCard(USA.gdp.display, 'GDP, total', '2024', 'World Bank WDI', 'Economy')
      + statCard(USA.gdpPerCapita.display, 'GDP per capita', '2024', 'World Bank WDI', 'Economy')
      + statCard(USA.medianIncome.display, 'Median household income', '2023', 'U.S. Census Bureau, CPS ASEC', 'Economy')
      + statCard(USA.poverty.display, 'Poverty rate', '2023', 'U.S. Census Bureau, CPS', 'Economy')
      + statCard(USA.perCapitaIncome.display, 'Per capita income', '2020–2024', 'U.S. Census Bureau, ACS 5-yr', 'Economy')
      + statCard(USA.unemployment.display, 'Unemployment, modeled ILO est.', '2024', 'World Bank WDI', 'Economy')
      + '</div>'
      + '<p class="note">GDP per capita is $86,169.66 in purchasing-power terms too — the same figure, not a coincidence: the US dollar is the base currency for PPP comparisons, so for the United States nominal and PPP per-capita GDP coincide by construction.</p>'
      + '<div class="panel"><h2>Rates</h2>'
      + barChart(colored([
          { label: 'Poverty rate', value: 11.1, display: '11.1%' },
          { label: 'Unemployment', value: 4.02, display: '4.02%' },
        ]), { width: 560, unit: '%', max: 100, labelWidth: 140 })
      + srcLine('Poverty: CPS 2023. Unemployment: World Bank WDI 2024.')
      + '</div>'
      + '<div class="panel"><h2>Shares of people &amp; homes</h2>'
      + barChart(colored([
          { label: 'Owner-occupied', value: 65.2, display: '65.2%' },
          { label: 'High school+', value: 89.6, display: '89.6%' },
          { label: 'Bachelor’s+', value: 35.7, display: '35.7%' },
          { label: 'Broadband', value: 91.0, display: '91.0%' },
        ]), { width: 560, unit: '%', max: 100, labelWidth: 140 })
      + srcLine('U.S. Census Bureau, QuickFacts, 2020–2024.')
      + '<p class="note">One income figure per view: the headline median is $80,610 (CPS ASEC, 2023). The ACS 5-year median ($80,734, 2020–2024) is listed only on the Sources page. Poverty is 11.1% (CPS 2023); the QuickFacts current value is 10.2%.</p></div>';
  } else if (tab === 'housing') {
    body = '<div class="cards">'
      + statCard(USA.homeValue.display, 'Median home value', '2020–2024', 'U.S. Census Bureau, ACS 5-yr', 'Economy')
      + statCard(USA.rent.display, 'Median gross rent', '2020–2024', 'U.S. Census Bureau, ACS 5-yr', 'Economy')
      + statCard(USA.housingUnits.display, 'Housing units', '1 Jul 2025', 'U.S. Census Bureau, Vintage 2025', 'Economy')
      + statCard(USA.ownerOccupied.display, 'Owner-occupied housing', '2020–2024', 'U.S. Census Bureau, ACS 5-yr', 'Economy')
      + statCard(USA.households.display, 'Households', '2020–2024', 'U.S. Census Bureau, ACS 5-yr', 'Economy')
      + statCard(USA.personsPerHousehold.display, 'Persons per household', '2020–2024', 'U.S. Census Bureau, ACS 5-yr', 'Economy')
      + '</div>'
      + '<div class="panel"><h2>Housing in context</h2><p>148,260,882 housing units serve 129,227,496 households — 2.53 people per household on average. '
      + '65.2% of homes are owner-occupied; the median home is worth $332,700 and the median rent is $1,413 a month.</p>'
      + srcLine('U.S. Census Bureau, QuickFacts (ACS 5-year 2020–2024; housing units Vintage 2025).') + '</div>';
  } else {
    body = '<div class="cards">'
      + statCard(USA.establishments.display, 'Employer establishments', '2023', 'U.S. Census Bureau, QuickFacts', 'Economy')
      + statCard(USA.businessEmployment.display, 'Employment at those firms', '2023', 'U.S. Census Bureau, QuickFacts', 'Economy')
      + statCard(USA.payroll.display, 'Annual payroll', '2023', 'U.S. Census Bureau, QuickFacts', 'Economy')
      + statCard(USA.retailPerCapita.display, 'Retail sales per capita', '2022', 'U.S. Census Bureau, QuickFacts', 'Economy')
      + '</div>'
      + '<div class="panel panel-photo"><div class="panel-main"><h2>Business &amp; education</h2><p>8,361,342 employer establishments employ 139,831,742 people and pay $9.556 trillion a year. '
      + 'Among residents age 25 and older, 89.6% finished high school and 35.7% hold a bachelor’s degree or higher (2020–2024).</p>'
      + srcLine('U.S. Census Bureau, QuickFacts.') + '</div>'
      + '<figure class="photo-side"><img src="img/economy.jpg" alt="The New York Stock Exchange facade with columns in New York City." loading="lazy"></figure></div>';
  }
  return '<section class="band band-pine"><h1>Economy</h1><p class="band-sub">$29.298 trillion · 2024</p></section>'
    + '<p class="lede">A $29.298 trillion economy in 2024 — $86,169.66 per person, the same in purchasing-power terms.</p>'
    + '<div class="tabs" role="tablist">'
    + '<button data-ecotab="income" class="' + (tab === 'income' ? 'on' : '') + '">Income &amp; poverty</button>'
    + '<button data-ecotab="housing" class="' + (tab === 'housing' ? 'on' : '') + '">Housing</button>'
    + '<button data-ecotab="business" class="' + (tab === 'business' ? 'on' : '') + '">Business &amp; education</button>'
    + '</div><div class="ground ground-slate">' + body + '</div>';
}

export function renderStates(state) {
  const sort = state.sort || 'population';
  const region = state.region || 'All';
  const q = (state.q || '').toLowerCase();
  let list = STATES.slice();
  if (region !== 'All') list = list.filter(function (s) { return s.region === region; });
  if (q) list = list.filter(function (s) { return s.name.toLowerCase().indexOf(q) !== -1; });
  list.sort(function (a, b) {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'growth') return (b.growthPct || -1) - (a.growthPct || -1);
    return (b.population || 0) - (a.population || 0);
  });
  const detail = state.selected ? STATES.find(function (s) { return s.name === state.selected; }) : null;
  return '<section class="band band-pine band-states"><h1>States, ranked</h1><p class="band-sub">Ten most populous · 1 Jul 2025</p></section>'
    + '<p class="lede">The ten most populous states, 1 Jul 2025. Click a row for its detail. South Carolina sits below the top 10, listed for its growth rate — the nation’s fastest at +1.5%.</p>'
    + '<div class="controls"><label>Sort <select id="sortSel">'
    + '<option value="population"' + (sort === 'population' ? ' selected' : '') + '>Population, largest first</option>'
    + '<option value="name"' + (sort === 'name' ? ' selected' : '') + '>Name A–Z</option>'
    + '<option value="growth"' + (sort === 'growth' ? ' selected' : '') + '>Growth rate, fastest first</option>'
    + '</select></label>'
    + '<label>Region <select id="regionSel">'
    + ['All', 'West', 'South', 'Northeast', 'Midwest'].map(function (r) { return '<option' + (region === r ? ' selected' : '') + '>' + r + '</option>'; }).join('')
    + '</select></label>'
    + '<label>Filter <input id="filterInput" type="search" placeholder="Type a state name…" value="' + (state.q || '').replace(/"/g, '&quot;') + '"></label>'
    + '</div>'
    + '<div class="ground ground-plum"><div class="panel"><table class="full"><thead><tr><th>Rank</th><th>State</th><th>Population</th><th>Region</th><th>Growth 2024→2025</th></tr></thead>'
    + '<tbody>' + (list.length ? stateRows(list) : '<tr><td colspan="5">No state matches that filter.</td></tr>') + '</tbody></table>'
    + srcLine(STATES_SOURCE)
    + '<p class="note">Growth notes: South Carolina +1.5% — fastest-growing state. North Carolina +1.3%, Texas +1.2%. Texas +391,243 people — largest numeric gain. Growth figures for the other states are not in the verified table, so they show “—”.</p></div></div>'
    + (detail ? '<div class="panel detail"><h2>' + detail.name + '</h2><p><strong>Population:</strong> ' + detail.display
      + (detail.rank ? ' (rank #' + detail.rank + ' of the states)' : '') + '<br><strong>Region:</strong> ' + detail.region
      + (detail.growthNote ? '<br><strong>Growth:</strong> ' + detail.growthNote : '')
      + '</p>' + srcLine(STATES_SOURCE) + '</div>' : '<p class="hint">Tip: click any row above to see that state’s detail here.</p>');
}

export function renderCompare() {
  const chart = pairedBarChart([
    { label: 'Age 0–14', a: 17.32, aDisplay: '17.32%', b: 24.60, bDisplay: '24.60%' },
    { label: 'Age 15–64', a: 64.75, aDisplay: '64.75%', b: 68.11, bDisplay: '68.11%' },
    { label: 'Age 65+', a: 17.93, aDisplay: '17.93%', b: 7.29, bDisplay: '7.29%' },
  ], { width: 560, max: 100 });
  function row(label, us, id, note) {
    return '<tr><td>' + label + '</td><td>' + us + '</td><td>' + id + '</td><td>' + note + '</td></tr>';
  }
  return '<section class="band band-pine"><h1>United States vs Indonesia</h1><p class="band-sub">Same indicators · same year · 2024</p></section>'
    + '<p class="lede">Same indicators, same source, same year — every row below is a World Bank WDI indicator for 2024, so the two columns are genuinely comparable.</p>'
    + '<figure class="photo-duo"><img src="img/compare-us.jpg" alt="Aerial view of the New York City skyline in daytime." loading="lazy"><span class="duo-rule" aria-hidden="true"></span><img src="img/compare-id.jpg" alt="Jakarta skyline with modern skyscrapers under a clear blue sky." loading="lazy"></figure>'
    + '<p class="legend"><span class="sw us"></span> United States &nbsp; <span class="sw id"></span> Indonesia</p>'
    + '<div class="ground ground-amber"><div class="panel"><table class="full"><thead><tr><th>Indicator</th><th>United States</th><th>Indonesia</th><th>WDI code</th></tr></thead><tbody>'
    + row('Population', USA.populationWdi2024.display, INDONESIA.population.display, 'SP.POP.TOTL')
    + row('GDP, total', USA.gdp.display, INDONESIA.gdp.display, 'NY.GDP.MKTP.CD')
    + row('GDP per capita', USA.gdpPerCapita.display, INDONESIA.gdpPerCapita.display, 'NY.GDP.PCAP.CD')
    + row('GDP per capita, PPP', USA.gdpPerCapitaPpp.display, INDONESIA.gdpPerCapitaPpp.display, 'NY.GDP.PCAP.PP.CD')
    + row('Life expectancy', USA.lifeExpectancy.display, INDONESIA.lifeExpectancy.display, 'SP.DYN.LE00.IN')
    + row('Urban population', USA.urban.display, INDONESIA.urban.display, 'SP.URB.TOTL.IN.ZS')
    + row('Unemployment, modeled ILO est.', USA.unemployment.display, INDONESIA.unemployment.display, 'SL.UEM.TOTL.ZS')
    + '</tbody></table>' + srcLine('World Bank WDI, 2024 (dataset updated 11 Nov 2026) — every row, both countries. US population here is the WDI 2024 figure (340,003,797); the Vintage 2025 estimate (341,784,857, 1 Jul 2025) is shown on the Population page.') + '</div></div>'
    + '<div class="vs-divider" aria-hidden="true">— VS —</div>'
    + '<div class="panel"><h2>Age structure — who is young, who is old</h2>' + chart
    + srcLine('World Bank WDI, 2024. Indonesia is far younger: 24.60% under 15 vs 17.32% in the US; only 7.29% are 65+ vs 17.93%.')
    + '</div>'
    + '<div class="panel"><h2>What is NOT compared here</h2><p>' + INDONESIA.povertyFootnote + '</p>'
    + '<p>Unemployment is compared only on the modeled ILO estimates (US 4.02%, Indonesia 3.30%). Indonesia’s national survey rate (BPS TPT 4.91%, Aug 2024) uses a different method and is not placed beside the US figure.</p>'
    + srcLine('BPS, “Profil Kemiskinan di Indonesia September 2024” and Sakernas Aug 2024.') + '</div>';
}

export function renderSources(rows) {
  return '<section class="band band-pine"><h1>Sources</h1><p class="band-sub">Every figure · its value · its vintage</p></section>'
    + '<p class="lede">Every figure on this site, with its value, vintage and where it came from. Full web addresses are given as plain text so the page works with no network at all.</p>'
    + '<figure class="photo-strip"><img src="img/sources.jpg" alt="Stacks of old documents and papers piled on dusty shelves." loading="lazy"></figure>'
    + '<div class="panel"><table class="full src-table"><thead><tr><th>Code</th><th>Figure</th><th>Value</th><th>Vintage</th><th>Source</th><th>Location</th></tr></thead><tbody>'
    + rows.map(function (r) {
        return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td><strong>' + r[2] + '</strong></td><td>' + r[3] + '</td><td>' + r[4] + '</td><td><code>' + r[5] + '</code></td></tr>';
      }).join('')
    + '</tbody></table></div>'
    + '<div class="ground ground-slate"><div class="panel"><h2>Method notes</h2>'
    + '<p><strong>Two incomes, one headline.</strong> $80,610 is the annual CPS ASEC 2023 median; $80,734 is the ACS 5-year 2020–2024 median. The site shows one per view and labels its vintage.</p>'
    + '<p><strong>Two poverty rates, one headline.</strong> 11.1% is the CPS 2023 rate; 10.2% is the QuickFacts current value. The site headlines 11.1% and footnotes 10.2%.</p>'
    + '<p><strong>Three Indonesia populations.</strong> The 2024 total differs by method: World Bank 283.5M, BPS mid-year projection 281.6M, civil registry about 282.5M. The compare view uses the World Bank figure only and says so.</p>'
    + '<p><strong>Indonesia’s #5 province.</strong> Jawa Timur’s mid-2024 figure (41,814,499) is used in research notes with a caveat; it is not shown as a ranked table on this site because the province ranking could not be completed from verified figures.</p>'
    + '<p><strong>What was left out.</strong> Figures that could not be verified against a named source — a US median age, $81,604 / $87,460 incomes, a 36.8% bachelor’s share, a March 2026 Indonesia poverty rate, a 73.6-year Indonesia life expectancy and a 2026 Indonesia population — are not on this site at all.</p></div></div>';
}

export function renderAbout() {
  return '<section class="band band-pine band-about"><h1>About StatAtlas</h1><p class="band-sub">How the numbers are made</p></section>'
    + '<p class="lede">StatAtlas is an independent atlas of national statistics. It is not affiliated with any government or statistics office. Every number here is copied from a named public source and labelled with its vintage.</p>'
    + '<div class="ground ground-pine"><div class="panel"><h2>What CPS, ACS and WDI mean</h2>'
    + '<p><strong>CPS ASEC</strong> — the Current Population Survey’s Annual Social and Economic Supplement, the survey behind the headline median income ($80,610, 2023) and poverty rate (11.1%, 2023). One survey, one year, one national figure.</p>'
    + '<p><strong>ACS 5-year</strong> — the American Community Survey pooled over five years (2020–2024). It is the source for housing, education and per-capita income figures, which need large samples to be stable. Its median income ($80,734) is a different figure from the CPS one, which is why this site never shows both as headlines.</p>'
    + '<p><strong>World Bank WDI</strong> — the World Bank’s World Development Indicators, the same series for every country. That is what makes the United States vs Indonesia comparison fair: GDP, life expectancy, urban share and unemployment are measured the same way on both sides (dataset updated 11 Nov 2026).</p>'
    + '<p><strong>Vintage 2025 estimates</strong> — the U.S. Census Bureau’s annual population estimates, dated 1 July 2025 and released in January 2026. The 2020 figure (331,449,281) is the actual count; 341,784,857 is the estimate.</p></div>'
    + '<div class="panel"><h2>Why vintages differ</h2><p>Different surveys run on different clocks. A population estimate can be dated July 2025 while the income survey still reports 2023 and the World Bank series stops at 2024. This site never re-dates a figure to make the page look tidier — each number keeps the year its source gave it.</p></div>'
    + '<div class="panel"><h2>Method</h2><p>Figures were verified against their named sources in November 2026. Anything that could not be verified was left out rather than guessed. The site is static files only: it loads nothing from the network and works offline.</p></div></div>';
}
