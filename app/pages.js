// pages.js — one render function per route. Every figure comes from data.js
// (verified U#/I# rows only) and every stat block carries its source + year.
import { USA, STATES, STATES_SOURCE, INDONESIA, RELEASES } from './data.js';
import { barChart, pairedBarChart } from './charts.js';

function srcLine(text) {
  return '<p class="src">Source: ' + text + '</p>';
}

function statCard(value, label, year, source) {
  return '<article class="card"><div class="card-value">' + value + '</div>'
    + '<div class="card-label">' + label + '</div>'
    + '<div class="card-meta">' + year + ' · ' + source + '</div></article>';
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
  const chart = barChart(USA.ageStructure, { width: 560, unit: '%', color: '#0e7a6d' });
  const top5 = STATES.filter(function (s) { return s.rank !== null; });
  return '<section class="releases"><strong>Latest releases</strong> '
    + RELEASES.map(function (r) { return '<span><b>' + r.date + '</b> — ' + r.text + '</span>'; }).join('<i>·</i> ')
    + '</section>'
    + '<h1>The United States in Numbers</h1>'
    + '<p class="lede">One country, every number that matters. Population, economy, housing, education and the states — each figure labelled with its source and year.</p>'
    + '<div class="cards">'
    + statCard(USA.population.display, 'Total population', '1 Jul 2025', 'U.S. statistics bureau, Vintage 2025')
    + statCard(USA.gdp.display, 'Gross domestic product', '2024', 'World Bank WDI')
    + statCard(USA.medianIncome.display, 'Median household income', '2023', 'U.S. statistics bureau, CPS ASEC')
    + statCard(USA.poverty.display, 'Poverty rate', '2023', 'U.S. statistics bureau, CPS')
    + statCard(USA.lifeExpectancy.display, 'Life expectancy at birth', '2024', 'World Bank WDI')
    + statCard(USA.unemployment.display, 'Unemployment, modeled ILO est.', '2024', 'World Bank WDI')
    + '</div>'
    + '<div class="duo">'
    + '<section class="panel"><h2>Age structure, 2024</h2>' + chart
    + srcLine('World Bank WDI — age shares SP.POP.0014 / SP.POP.1564 / SP.POP.65UP, 2024.') + '</section>'
    + '<section class="panel"><h2>Most populous states</h2>'
    + '<table class="mini"><thead><tr><th>#</th><th>State</th><th>Population</th></tr></thead><tbody>'
    + top5.map(function (s) { return '<tr><td>' + s.rank + '</td><td><strong>' + s.name + '</strong></td><td>' + s.display + '</td></tr>'; }).join('')
    + '</tbody></table>' + srcLine('U.S. statistics bureau, Vintage 2025 (1 Jul 2025).')
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
      + statCard('17.32%', 'Age 0–14', '2024', 'World Bank WDI')
      + statCard('64.75%', 'Age 15–64', '2024', 'World Bank WDI')
      + statCard('17.93%', 'Age 65+', '2024', 'World Bank WDI')
      + statCard('50.9%', 'Female share', '2020–2024', 'U.S. statistics bureau, QuickFacts')
      + '</div>'
      + '<div class="panel"><h2>Age structure — share of population</h2>'
      + barChart(USA.ageStructure, { width: 560, unit: '%' })
      + srcLine('World Bank WDI, 2024. QuickFacts adds: under 5 is 5.4%, under 18 is 21.1%, age 65+ is 18.9% (2025 vintage / 2020–2024).')
      + '</div>';
  } else {
    body = '<div class="cards">'
      + statCard('+1.8 million', 'Growth 2024 → 2025 (+0.5%)', 'Jul 2024–Jul 2025', 'U.S. statistics bureau, Vintage 2025')
      + statCard('+3.2 million', 'Growth 2023 → 2024 (+1.0%)', 'Jul 2023–Jul 2024', 'U.S. statistics bureau, Vintage 2025')
      + statCard('1.3 million', 'Net international migration', 'Jul 2024–Jun 2025', 'U.S. statistics bureau, Vintage 2025')
      + statCard('−53.8%', 'Migration vs the year before (2.7M)', 'Jul 2024–Jun 2025', 'U.S. statistics bureau, Vintage 2025')
      + '</div>'
      + '<div class="panel"><h2>Growth &amp; migration</h2>'
      + barChart([
          { label: 'Growth 2023→24', value: 3.2, display: '+3.2M people' },
          { label: 'Growth 2024→25', value: 1.8, display: '+1.8M people' },
          { label: 'Migration 2023→24', value: 2.7, display: '2.7M' },
          { label: 'Migration 2024→25', value: 1.3, display: '1.3M' },
        ], { width: 560, unit: '', decimals: 1, max: 3.2 })
      + srcLine('U.S. statistics bureau, Vintage 2025 estimates release, Jan 2026. 2024→2025 was the slowest growth since early COVID.')
      + '</div>';
  }
  return '<h1>Population</h1>'
    + '<p class="lede">341,784,857 people on 1 Jul 2025 — up from the 2020 count of 331,449,281.</p>'
    + '<div class="tabs" role="tablist">'
    + '<button data-poptab="age" class="' + (tab === 'age' ? 'on' : '') + '">Age structure</button>'
    + '<button data-poptab="growth" class="' + (tab === 'growth' ? 'on' : '') + '">Growth &amp; migration</button>'
    + '</div>' + body
    + '<div class="panel"><h2>People at a glance</h2><dl class="facts">'
    + '<dt>Foreign-born</dt><dd>14.1% (2020–2024)</dd>'
    + '<dt>Veterans</dt><dd>16,185,883 (2020–2024)</dd>'
    + '<dt>Households with broadband</dt><dd>91.0% (2020–2024)</dd>'
    + '<dt>Mean commute</dt><dd>26.4 minutes (2020–2024)</dd>'
    + '<dt>Population density</dt><dd>93.8 people / sq mi (2020)</dd>'
    + '<dt>Land area</dt><dd>3,533,038.28 sq mi (2020)</dd>'
    + '</dl>' + srcLine('U.S. statistics bureau, QuickFacts.') + '</div>';
}

export function renderEconomy(state) {
  const tab = state.ecoTab || 'income';
  let body = '';
  if (tab === 'income') {
    body = '<div class="cards">'
      + statCard(USA.gdp.display, 'GDP, total', '2024', 'World Bank WDI')
      + statCard(USA.gdpPerCapita.display, 'GDP per capita', '2024', 'World Bank WDI')
      + statCard(USA.medianIncome.display, 'Median household income', '2023', 'U.S. statistics bureau, CPS ASEC')
      + statCard(USA.poverty.display, 'Poverty rate', '2023', 'U.S. statistics bureau, CPS')
      + statCard(USA.perCapitaIncome.display, 'Per capita income', '2020–2024', 'U.S. statistics bureau, ACS 5-yr')
      + statCard(USA.unemployment.display, 'Unemployment, modeled ILO est.', '2024', 'World Bank WDI')
      + '</div>'
      + '<div class="panel"><h2>Rates that shape daily life</h2>'
      + barChart([
          { label: 'Poverty rate', value: 11.1, display: '11.1%' },
          { label: 'Unemployment', value: 4.02, display: '4.02%' },
          { label: 'Owner-occupied', value: 65.2, display: '65.2%' },
          { label: 'High school+', value: 89.6, display: '89.6%' },
          { label: 'Bachelor’s+', value: 35.7, display: '35.7%' },
          { label: 'Broadband', value: 91.0, display: '91.0%' },
        ], { width: 560, unit: '%', max: 100, labelWidth: 140 })
      + srcLine('Poverty: CPS 2023. Unemployment: World Bank WDI 2024. The rest: U.S. statistics bureau, QuickFacts, 2020–2024.')
      + '<p class="note">One income figure per view: the headline median is $80,610 (CPS ASEC, 2023). The ACS 5-year median ($80,734, 2020–2024) is listed only on the Sources page. Poverty is 11.1% (CPS 2023); the QuickFacts current value is 10.2%.</p></div>';
  } else if (tab === 'housing') {
    body = '<div class="cards">'
      + statCard(USA.homeValue.display, 'Median home value', '2020–2024', 'U.S. statistics bureau, ACS 5-yr')
      + statCard(USA.rent.display, 'Median gross rent', '2020–2024', 'U.S. statistics bureau, ACS 5-yr')
      + statCard(USA.housingUnits.display, 'Housing units', '1 Jul 2025', 'U.S. statistics bureau, Vintage 2025')
      + statCard(USA.ownerOccupied.display, 'Owner-occupied housing', '2020–2024', 'U.S. statistics bureau, ACS 5-yr')
      + statCard(USA.households.display, 'Households', '2020–2024', 'U.S. statistics bureau, ACS 5-yr')
      + statCard(USA.personsPerHousehold.display, 'Persons per household', '2020–2024', 'U.S. statistics bureau, ACS 5-yr')
      + '</div>'
      + '<div class="panel"><h2>Housing in context</h2><p>148,260,882 housing units serve 129,227,496 households — 2.53 people per household on average. '
      + '65.2% of homes are owner-occupied; the median home is worth $332,700 and the median rent is $1,413 a month.</p>'
      + srcLine('U.S. statistics bureau, QuickFacts (ACS 5-year 2020–2024; housing units Vintage 2025).') + '</div>';
  } else {
    body = '<div class="cards">'
      + statCard(USA.establishments.display, 'Employer establishments', '2023', 'U.S. statistics bureau, QuickFacts')
      + statCard(USA.businessEmployment.display, 'Employment at those firms', '2023', 'U.S. statistics bureau, QuickFacts')
      + statCard(USA.payroll.display, 'Annual payroll', '2023', 'U.S. statistics bureau, QuickFacts')
      + statCard(USA.retailPerCapita.display, 'Retail sales per capita', '2022', 'U.S. statistics bureau, QuickFacts')
      + '</div>'
      + '<div class="panel"><h2>Business &amp; education</h2><p>8,361,342 employer establishments employ 139,831,742 people and pay $9.556 trillion a year. '
      + 'Among residents age 25 and older, 89.6% finished high school and 35.7% hold a bachelor’s degree or higher (2020–2024).</p>'
      + srcLine('U.S. statistics bureau, QuickFacts.') + '</div>';
  }
  return '<h1>Economy</h1>'
    + '<p class="lede">A $29.298 trillion economy in 2024 — $86,169.66 per person, the same in purchasing-power terms.</p>'
    + '<div class="tabs" role="tablist">'
    + '<button data-ecotab="income" class="' + (tab === 'income' ? 'on' : '') + '">Income &amp; poverty</button>'
    + '<button data-ecotab="housing" class="' + (tab === 'housing' ? 'on' : '') + '">Housing</button>'
    + '<button data-ecotab="business" class="' + (tab === 'business' ? 'on' : '') + '">Business &amp; education</button>'
    + '</div>' + body;
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
  return '<h1>States, ranked</h1>'
    + '<p class="lede">The most populous states, 1 Jul 2025. Click a row for its detail. Only the top 5 populations are published in the verified table — South Carolina is listed for its growth rate.</p>'
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
    + '<div class="panel"><table class="full"><thead><tr><th>Rank</th><th>State</th><th>Population</th><th>Region</th><th>Growth 2024→2025</th></tr></thead>'
    + '<tbody>' + (list.length ? stateRows(list) : '<tr><td colspan="5">No state matches that filter.</td></tr>') + '</tbody></table>'
    + srcLine(STATES_SOURCE)
    + '<p class="note">Growth notes: South Carolina +1.5% — fastest-growing state. Texas +391,243 people — largest numeric gain. Growth figures for the other states are not in the verified table, so they show “—”.</p></div>'
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
  return '<h1>United States vs Indonesia</h1>'
    + '<p class="lede">Same indicators, same source, same year — every row below is a World Bank WDI indicator for 2024, so the two columns are genuinely comparable.</p>'
    + '<p class="legend"><span class="sw us"></span> United States &nbsp; <span class="sw id"></span> Indonesia</p>'
    + '<div class="panel"><table class="full"><thead><tr><th>Indicator</th><th>United States</th><th>Indonesia</th><th>WDI code</th></tr></thead><tbody>'
    + row('Population', USA.population.display, INDONESIA.population.display, 'SP.POP.TOTL')
    + row('GDP, total', USA.gdp.display, INDONESIA.gdp.display, 'NY.GDP.MKTP.CD')
    + row('GDP per capita', USA.gdpPerCapita.display, INDONESIA.gdpPerCapita.display, 'NY.GDP.PCAP.CD')
    + row('GDP per capita, PPP', USA.gdpPerCapitaPpp.display, INDONESIA.gdpPerCapitaPpp.display, 'NY.GDP.PCAP.PP.CD')
    + row('Life expectancy', USA.lifeExpectancy.display, INDONESIA.lifeExpectancy.display, 'SP.DYN.LE00.IN')
    + row('Urban population', USA.urban.display, INDONESIA.urban.display, 'SP.URB.TOTL.IN.ZS')
    + row('Unemployment, modeled ILO est.', USA.unemployment.display, INDONESIA.unemployment.display, 'SL.UEM.TOTL.ZS')
    + '</tbody></table>' + srcLine('World Bank WDI, 2024 (dataset updated 11 Nov 2026) for every row except population: US population is the Vintage 2025 estimate, 1 Jul 2025; Indonesia population is WDI 2024.') + '</div>'
    + '<div class="panel"><h2>Age structure — who is young, who is old</h2>' + chart
    + srcLine('World Bank WDI, 2024. Indonesia is far younger: 24.60% under 15 vs 17.32% in the US; only 7.29% are 65+ vs 17.93%.')
    + '</div>'
    + '<div class="panel"><h2>What is NOT compared here</h2><p>' + INDONESIA.povertyFootnote + '</p>'
    + '<p>Unemployment is compared only on the modeled ILO estimates (US 4.02%, Indonesia 3.30%). Indonesia’s national survey rate (BPS TPT 4.91%, Aug 2024) uses a different method and is not placed beside the US figure.</p>'
    + srcLine('BPS, “Profil Kemiskinan di Indonesia September 2024” and Sakernas Aug 2024.') + '</div>';
}

const SOURCE_ROWS = [
  ['U1', 'Total population, 2020 count', '331,449,281', '1 Apr 2020', 'U.S. statistics bureau, QuickFacts US profile', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U2', 'Total population, estimate', '341,784,857', '1 Jul 2025 (Vintage 2025)', 'U.S. statistics bureau, QuickFacts + Vintage 2025 release', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U3', 'Population growth', '+1.8M (+0.5%) 2024→25; +3.2M (+1.0%) 2023→24', 'Jul 2024–Jul 2025', 'U.S. statistics bureau, Vintage 2025 press release, 27 Jan 2026', 'census.gov newsroom, “population-growth-slows”'],
  ['U4', 'Net international migration', '1.3M (was 2.7M, −53.8%)', 'Jul 2024–Jun 2025', 'U.S. statistics bureau, Vintage 2025 press release', 'census.gov newsroom, “population-growth-slows”'],
  ['U5', 'Median household income', '$80,610 (CPS ASEC)', '2023', 'U.S. statistics bureau, “Income, Poverty and Health Insurance Coverage: 2023”', 'census.gov newsroom, “income-poverty-health-insurance-coverage” (2024)'],
  ['U6', 'Poverty rate', '11.1% (CPS 2023); 10.2% QuickFacts current', '2023', 'U.S. statistics bureau, 2023 release + QuickFacts', 'census.gov newsroom (2024) + QuickFacts'],
  ['U7', 'GDP, total', '$29.298 trillion', '2024', 'World Bank WDI NY.GDP.MKTP.CD', 'api.worldbank.org/v2/country/USA/indicator/NY.GDP.MKTP.CD'],
  ['U8', 'GDP per capita', '$86,169.66', '2024', 'World Bank WDI NY.GDP.PCAP.CD', 'api.worldbank.org/v2/country/USA/indicator/NY.GDP.PCAP.CD'],
  ['U9', 'GDP per capita, PPP', '$86,169.66', '2024', 'World Bank WDI NY.GDP.PCAP.PP.CD', 'api.worldbank.org/v2/country/USA/indicator/NY.GDP.PCAP.PP.CD'],
  ['U10', 'Life expectancy', '78.89 years', '2024', 'World Bank WDI SP.DYN.LE00.IN', 'api.worldbank.org/v2/country/USA/indicator/SP.DYN.LE00.IN'],
  ['U11', 'Urban population share', '80.12%', '2024', 'World Bank WDI SP.URB.TOTL.IN.ZS', 'api.worldbank.org/v2/country/USA/indicator/SP.URB.TOTL.IN.ZS'],
  ['U12', 'Unemployment, modeled ILO est.', '4.02%', '2024', 'World Bank WDI SL.UEM.TOTL.ZS', 'api.worldbank.org/v2/country/USA/indicator/SL.UEM.TOTL.ZS'],
  ['U13', 'Age & sex shares', 'Under 5: 5.4%; under 18: 21.1%; 65+: 18.9%; female 50.9%', '2025 vintage / 2020–2024', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U14', 'Age structure (WB)', '0–14: 17.32%; 15–64: 64.75%; 65+: 17.93%', '2024', 'World Bank WDI SP.POP.0014 / SP.POP.1564 / SP.POP.65UP', 'api.worldbank.org/v2/country/USA/indicator/SP.POP.0014.TO.ZS'],
  ['U15', 'Owner-occupied housing', '65.2%', '2020–2024 (ACS 5-yr)', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U16', 'Median home value / rent', '$332,700 / $1,413 per month', '2020–2024 (ACS 5-yr)', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U17', 'Housing units', '148,260,882', '1 Jul 2025 (V2025)', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U18', 'Education, age 25+', 'High school+: 89.6%; bachelor’s+: 35.7%', '2020–2024 (ACS 5-yr)', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U19', 'Per capita income', '$44,673 (2024 dollars)', '2020–2024 (ACS 5-yr)', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U20', 'Households / persons per household', '129,227,496 / 2.53', '2020–2024 (ACS 5-yr)', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U21', 'Businesses', '8,361,342 establishments; 139,831,742 employed; $9.556T payroll', '2023', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U22', 'Geography', 'Density 93.8 / sq mi; land 3,533,038.28 sq mi', '2020', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['U23', 'Top 5 states by population', 'CA 39,355,309; TX 31,709,821; FL 23,462,518; NY 20,002,427; PA 13,059,432', '1 Jul 2025 (Vintage 2025)', 'U.S. statistics bureau, “Top Ten Most Populous States: 2025”', 'census.gov newsroom, “population-growth-slows”'],
  ['U24', 'Fastest-growing state', 'South Carolina +1.5%; Texas +391,243 people', 'Jul 2024–Jul 2025', 'U.S. statistics bureau, Vintage 2025 release', 'census.gov newsroom, “population-growth-slows”'],
  ['U25', 'Other QuickFacts figures', 'Foreign-born 14.1%; veterans 16,185,883; broadband 91.0%; commute 26.4 min; retail $20,928 per capita (2022)', '2020–2024 / 2022', 'U.S. statistics bureau, QuickFacts', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['—', 'Median household income (ACS 5-yr)', '$80,734', '2020–2024', 'U.S. statistics bureau, QuickFacts (listed here only, not as a headline)', 'census.gov/quickfacts/fact/table/US/PST045224'],
  ['I2', 'Indonesia population (WB)', '283,487,931', '2024', 'World Bank WDI SP.POP.TOTL', 'api.worldbank.org/v2/country/IDN/indicator/SP.POP.TOTL'],
  ['I4', 'Indonesia GDP', '$1.396 trillion', '2024', 'World Bank WDI NY.GDP.MKTP.CD', 'api.worldbank.org/v2/country/IDN/indicator/NY.GDP.MKTP.CD'],
  ['I5', 'Indonesia GDP per capita', '$4,925.44', '2024', 'World Bank WDI NY.GDP.PCAP.CD', 'api.worldbank.org/v2/country/IDN/indicator/NY.GDP.PCAP.CD'],
  ['I6', 'Indonesia GDP per capita, PPP', '$16,472.48', '2024', 'World Bank WDI NY.GDP.PCAP.PP.CD', 'api.worldbank.org/v2/country/IDN/indicator/NY.GDP.PCAP.PP.CD'],
  ['I10', 'Indonesia unemployment, modeled ILO', '3.30%', '2024', 'World Bank WDI SL.UEM.TOTL.ZS', 'api.worldbank.org/v2/country/IDN/indicator/SL.UEM.TOTL.ZS'],
  ['I11', 'Indonesia life expectancy', '71.29 years', '2024', 'World Bank WDI SP.DYN.LE00.IN', 'api.worldbank.org/v2/country/IDN/indicator/SP.DYN.LE00.IN'],
  ['I12', 'Indonesia urban share', '58.75%', '2024', 'World Bank WDI SP.URB.TOTL.IN.ZS', 'api.worldbank.org/v2/country/IDN/indicator/SP.URB.TOTL.IN.ZS'],
  ['I13', 'Indonesia age structure', '0–14: 24.60%; 15–64: 68.11%; 65+: 7.29%', '2024', 'World Bank WDI SP.POP.0014 / SP.POP.1564 / SP.POP.65UP', 'api.worldbank.org/v2/country/IDN/indicator/SP.POP.0014.TO.ZS'],
  ['I8', 'Indonesia poverty (national line)', '8.57% — 24.06M people', 'Sep 2024', 'BPS, “Profil Kemiskinan di Indonesia September 2024” (line Rp 595,242/capita/month)', 'bps.go.id press release 15 Jan 2025'],
];

export function renderSources() {
  return '<h1>Sources</h1>'
    + '<p class="lede">Every figure on this site, with its value, vintage and where it came from. Full web addresses are given as plain text so the page works with no network at all.</p>'
    + '<div class="panel"><table class="full src-table"><thead><tr><th>Code</th><th>Figure</th><th>Value</th><th>Vintage</th><th>Source</th><th>Location</th></tr></thead><tbody>'
    + SOURCE_ROWS.map(function (r) {
        return '<tr><td>' + r[0] + '</td><td>' + r[1] + '</td><td><strong>' + r[2] + '</strong></td><td>' + r[3] + '</td><td>' + r[4] + '</td><td><code>' + r[5] + '</code></td></tr>';
      }).join('')
    + '</tbody></table></div>'
    + '<div class="panel"><h2>Method notes</h2>'
    + '<p><strong>Two incomes, one headline.</strong> $80,610 is the annual CPS ASEC 2023 median; $80,734 is the ACS 5-year 2020–2024 median. The site shows one per view and labels its vintage.</p>'
    + '<p><strong>Two poverty rates, one headline.</strong> 11.1% is the CPS 2023 rate; 10.2% is the QuickFacts current value. The site headlines 11.1% and footnotes 10.2%.</p>'
    + '<p><strong>Three Indonesia populations.</strong> The 2024 total differs by method: World Bank 283.5M, BPS mid-year projection 281.6M, civil registry about 282.5M. The compare view uses the World Bank figure only and says so.</p>'
    + '<p><strong>Indonesia’s #5 province.</strong> Jawa Timur’s mid-2024 figure (41,814,499) is used in research notes with a caveat; it is not shown as a ranked table on this site because the province ranking could not be completed from verified figures.</p>'
    + '<p><strong>What was left out.</strong> Figures that could not be verified against a named source — a US median age, $81,604 / $87,460 incomes, a 36.8% bachelor’s share, a March 2026 Indonesia poverty rate, a 73.6-year Indonesia life expectancy and a 2026 Indonesia population — are not on this site at all.</p></div>';
}

export function renderAbout() {
  return '<h1>About StatAtlas</h1>'
    + '<p class="lede">StatAtlas is an independent atlas of national statistics. It is not affiliated with any government or statistics office. Every number here is copied from a named public source and labelled with its vintage.</p>'
    + '<div class="panel"><h2>What CPS, ACS and WDI mean</h2>'
    + '<p><strong>CPS ASEC</strong> — the Current Population Survey’s Annual Social and Economic Supplement, the survey behind the headline median income ($80,610, 2023) and poverty rate (11.1%, 2023). One survey, one year, one national figure.</p>'
    + '<p><strong>ACS 5-year</strong> — the American Community Survey pooled over five years (2020–2024). It is the source for housing, education and per-capita income figures, which need large samples to be stable. Its median income ($80,734) is a different figure from the CPS one, which is why this site never shows both as headlines.</p>'
    + '<p><strong>World Bank WDI</strong> — the World Bank’s World Development Indicators, the same series for every country. That is what makes the United States vs Indonesia comparison fair: GDP, life expectancy, urban share and unemployment are measured the same way on both sides (dataset updated 11 Nov 2026).</p>'
    + '<p><strong>Vintage 2025 estimates</strong> — the national statistics bureau’s annual population estimates, dated 1 July 2025 and released in January 2026. The 2020 figure (331,449,281) is the actual count; 341,784,857 is the estimate.</p></div>'
    + '<div class="panel"><h2>Why vintages differ</h2><p>Different surveys run on different clocks. A population estimate can be dated July 2025 while the income survey still reports 2023 and the World Bank series stops at 2024. This site never re-dates a figure to make the page look tidier — each number keeps the year its source gave it.</p></div>'
    + '<div class="panel"><h2>Method</h2><p>Figures were verified against their named sources in November 2026. Anything that could not be verified was left out rather than guessed. The site is static files only: it loads nothing from the network and works offline.</p></div>';
}
